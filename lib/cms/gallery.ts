import { GALLERY_ALBUMS } from "@/app/galerie/content";
import { getDb, getMediaBucket } from "./env";
import { coverSrc } from "./media";
import { slugifyCs } from "./slug";

export type CmsGalleryPhoto = {
    id: string;
    album_id: string;
    src: string;
    alt: string;
    position_order: number;
    created_at: string;
};

export type CmsGalleryAlbum = {
    id: string;
    slug: string;
    title: string;
    position_order: number;
    created_at: string;
    updated_at: string;
    photos: CmsGalleryPhoto[];
};

export type PublicGalleryPhoto = {
    src: string;
    alt: string;
};

export type PublicGalleryAlbum = {
    slug: string;
    title: string;
    photos: PublicGalleryPhoto[];
};

export type GalleryDirection = "up" | "down";

const TITLE_MAX = 120;
const ALT_MAX = 300;

function isMissingTable(error: unknown): boolean {
    const message = error instanceof Error ? error.message : String(error);
    return message.toLowerCase().includes("no such table");
}

function requireTitle(title: string): string {
    const value = title.trim();
    if (!value) throw new Error("Název alba je povinný.");
    if (value.length > TITLE_MAX) {
        throw new Error(`Název alba může mít nejvýše ${TITLE_MAX} znaků.`);
    }
    return value;
}

function requireAlt(alt: string): string {
    const value = alt.trim();
    if (value.length > ALT_MAX) {
        throw new Error(`Popisek může mít nejvýše ${ALT_MAX} znaků.`);
    }
    return value;
}

function requireSrc(src: string): string {
    const value = src.trim();
    if (!value || value.includes("..") || value.includes("\\")) {
        throw new Error("Neplatná fotka.");
    }
    if (value.startsWith("https://") || value.startsWith("http://")) return value;
    if (/^(galerie|aktuality)\/[0-9a-f-]+\.(jpg|jpeg|png|webp)$/i.test(value)) {
        return value;
    }
    throw new Error("Neplatná fotka.");
}

async function nextPosition(
    table: "gallery_albums" | "gallery_photos",
    albumId?: string,
): Promise<number> {
    const db = await getDb();
    if (!db) throw new Error("Databáze není dostupná.");
    const query =
        table === "gallery_photos"
            ? `SELECT COALESCE(MAX(position_order), -1) AS pos FROM gallery_photos WHERE album_id = ?`
            : `SELECT COALESCE(MAX(position_order), -1) AS pos FROM gallery_albums`;
    const statement = db.prepare(query);
    const row = await (albumId ? statement.bind(albumId) : statement).first<{
        pos: number;
    }>();
    return (row?.pos ?? -1) + 1;
}

async function uniqueSlug(title: string): Promise<string> {
    const db = await getDb();
    if (!db) throw new Error("Databáze není dostupná.");
    const base = slugifyCs(title, "album");
    let slug = base;
    let suffix = 2;
    while (
        await db
            .prepare(`SELECT id FROM gallery_albums WHERE slug = ? LIMIT 1`)
            .bind(slug)
            .first<{ id: string }>()
    ) {
        slug = `${base}-${suffix}`;
        suffix += 1;
    }
    return slug;
}

function toPublicAlbum(album: CmsGalleryAlbum): PublicGalleryAlbum {
    return {
        slug: album.slug,
        title: album.title,
        photos: album.photos.map((photo) => ({
            src: coverSrc(photo.src) ?? photo.src,
            alt: photo.alt,
        })),
    };
}

export async function listGalleryAlbums(): Promise<CmsGalleryAlbum[]> {
    const db = await getDb();
    if (!db) return [];
    const albums = await db
        .prepare(
            `SELECT * FROM gallery_albums ORDER BY position_order ASC, title ASC`,
        )
        .all<Omit<CmsGalleryAlbum, "photos">>();
    const photos = await db
        .prepare(
            `SELECT * FROM gallery_photos ORDER BY position_order ASC, created_at ASC`,
        )
        .all<CmsGalleryPhoto>();
    const byAlbum = new Map<string, CmsGalleryPhoto[]>();
    for (const photo of photos.results ?? []) {
        const list = byAlbum.get(photo.album_id) ?? [];
        list.push(photo);
        byAlbum.set(photo.album_id, list);
    }
    const albumRows: Omit<CmsGalleryAlbum, "photos">[] = albums.results ?? [];
    return albumRows.map((album: Omit<CmsGalleryAlbum, "photos">) => ({
        ...album,
        photos: byAlbum.get(album.id) ?? [],
    }));
}

export async function listPublicAlbums(): Promise<PublicGalleryAlbum[]> {
    const db = await getDb();
    if (!db) return GALLERY_ALBUMS;
    try {
        const albums = await listGalleryAlbums();
        return albums.map(toPublicAlbum);
    } catch (error) {
        if (isMissingTable(error)) return GALLERY_ALBUMS;
        throw error;
    }
}

export async function getGalleryAlbum(id: string): Promise<CmsGalleryAlbum | null> {
    const albums = await listGalleryAlbums();
    return albums.find((album) => album.id === id) ?? null;
}

async function getPhoto(id: string): Promise<CmsGalleryPhoto | null> {
    const db = await getDb();
    if (!db) return null;
    return (
        (await db
            .prepare(`SELECT * FROM gallery_photos WHERE id = ? LIMIT 1`)
            .bind(id)
            .first<CmsGalleryPhoto>()) ?? null
    );
}

export async function createGalleryAlbum(title: string): Promise<CmsGalleryAlbum> {
    const db = await getDb();
    if (!db) throw new Error("Databáze není dostupná.");
    const name = requireTitle(title);
    const slug = await uniqueSlug(name);
    const now = new Date().toISOString();
    const id = crypto.randomUUID();
    const position = await nextPosition("gallery_albums");
    await db
        .prepare(
            `INSERT INTO gallery_albums (id, slug, title, position_order, created_at, updated_at)
             VALUES (?, ?, ?, ?, ?, ?)`,
        )
        .bind(id, slug, name, position, now, now)
        .run();
    const created = await getGalleryAlbum(id);
    if (!created) throw new Error("Album se nepodařilo uložit.");
    return created;
}

export async function updateGalleryAlbum(
    id: string,
    input: { title?: string; direction?: GalleryDirection },
): Promise<CmsGalleryAlbum> {
    const db = await getDb();
    if (!db) throw new Error("Databáze není dostupná.");
    const existing = await getGalleryAlbum(id);
    if (!existing) throw new Error("Album neexistuje.");
    if (input.direction) await moveAlbum(existing, input.direction);
    if (typeof input.title === "string") {
        const title = requireTitle(input.title);
        await db
            .prepare(
                `UPDATE gallery_albums SET title = ?, updated_at = ? WHERE id = ?`,
            )
            .bind(title, new Date().toISOString(), id)
            .run();
    }
    const updated = await getGalleryAlbum(id);
    if (!updated) throw new Error("Album se nepodařilo uložit.");
    return updated;
}

async function moveAlbum(
    album: CmsGalleryAlbum,
    direction: GalleryDirection,
): Promise<void> {
    const albums = await listGalleryAlbums();
    const next = movedIds(
        albums.map((item) => item.id),
        album.id,
        direction,
    );
    if (!next) return;
    await writePositions("gallery_albums", next);
}

export async function deleteGalleryAlbum(id: string): Promise<boolean> {
    const db = await getDb();
    if (!db) throw new Error("Databáze není dostupná.");
    const existing = await getGalleryAlbum(id);
    if (!existing) return false;
    await db.prepare(`DELETE FROM gallery_photos WHERE album_id = ?`).bind(id).run();
    const result = await db
        .prepare(`DELETE FROM gallery_albums WHERE id = ?`)
        .bind(id)
        .run();
    await Promise.all(existing.photos.map((photo) => removeStoredObject(photo.src)));
    return (result.meta.changes ?? 0) > 0;
}

export async function addGalleryPhoto(
    albumId: string,
    input: { src: string; alt?: string },
): Promise<CmsGalleryPhoto> {
    const db = await getDb();
    if (!db) throw new Error("Databáze není dostupná.");
    const album = await getGalleryAlbum(albumId);
    if (!album) throw new Error("Album neexistuje.");
    const src = requireSrc(input.src);
    const alt = requireAlt(input.alt?.trim() ? input.alt : album.title);
    const id = crypto.randomUUID();
    const position = await nextPosition("gallery_photos", albumId);
    const now = new Date().toISOString();
    await db
        .prepare(
            `INSERT INTO gallery_photos (id, album_id, src, alt, position_order, created_at)
             VALUES (?, ?, ?, ?, ?, ?)`,
        )
        .bind(id, albumId, src, alt, position, now)
        .run();
    await db
        .prepare(`UPDATE gallery_albums SET updated_at = ? WHERE id = ?`)
        .bind(now, albumId)
        .run();
    const created = await getPhoto(id);
    if (!created) throw new Error("Fotku se nepodařilo uložit.");
    return created;
}

export async function updateGalleryPhoto(
    id: string,
    input: { alt?: string; direction?: GalleryDirection },
): Promise<CmsGalleryPhoto> {
    const db = await getDb();
    if (!db) throw new Error("Databáze není dostupná.");
    const existing = await getPhoto(id);
    if (!existing) throw new Error("Fotka neexistuje.");
    if (input.direction) await movePhoto(existing, input.direction);
    if (typeof input.alt === "string") {
        const alt = requireAlt(input.alt);
        await db
            .prepare(`UPDATE gallery_photos SET alt = ? WHERE id = ?`)
            .bind(alt, id)
            .run();
    }
    const updated = await getPhoto(id);
    if (!updated) throw new Error("Fotku se nepodařilo uložit.");
    return updated;
}

async function movePhoto(
    photo: CmsGalleryPhoto,
    direction: GalleryDirection,
): Promise<void> {
    const album = await getGalleryAlbum(photo.album_id);
    if (!album) throw new Error("Album neexistuje.");
    const next = movedIds(
        album.photos.map((item) => item.id),
        photo.id,
        direction,
    );
    if (!next) return;
    await writePositions("gallery_photos", next);
}

function movedIds(
    ids: string[],
    id: string,
    direction: GalleryDirection,
): string[] | null {
    const index = ids.indexOf(id);
    const target = direction === "up" ? index - 1 : index + 1;
    if (index < 0 || target < 0 || target >= ids.length) return null;
    const next = [...ids];
    const item = next[index];
    if (!item) return null;
    next.splice(index, 1);
    next.splice(target, 0, item);
    return next;
}

async function writePositions(
    table: "gallery_albums" | "gallery_photos",
    ids: string[],
): Promise<void> {
    const db = await getDb();
    if (!db) throw new Error("Databáze není dostupná.");
    const statements = ids.map((id, index) =>
        db
            .prepare(`UPDATE ${table} SET position_order = ? WHERE id = ?`)
            .bind(index, id),
    );
    for (let offset = 0; offset < statements.length; offset += 40) {
        await db.batch(statements.slice(offset, offset + 40));
    }
}

export async function deleteGalleryPhoto(id: string): Promise<boolean> {
    const db = await getDb();
    if (!db) throw new Error("Databáze není dostupná.");
    const existing = await getPhoto(id);
    if (!existing) return false;
    const result = await db
        .prepare(`DELETE FROM gallery_photos WHERE id = ?`)
        .bind(id)
        .run();
    await removeStoredObject(existing.src);
    return (result.meta.changes ?? 0) > 0;
}

async function removeStoredObject(src: string): Promise<void> {
    if (
        src.startsWith("http://") ||
        src.startsWith("https://") ||
        src.startsWith("/")
    ) {
        return;
    }
    const bucket = await getMediaBucket();
    if (!bucket) return;
    try {
        await bucket.delete(src);
    } catch {
        // The database row is already gone; a leftover file can be cleaned later.
    }
}
