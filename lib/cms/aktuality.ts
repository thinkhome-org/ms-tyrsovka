import { getDb, type CmsDb } from "./env";
import { excerptFromHtml, sanitizeBody } from "./sanitize";
import { slugifyCs } from "./slug";
import { todayIsoDate } from "./dates";

export type AktualitaStatus = "draft" | "published";

export type Aktualita = {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    body_html: string;
    cover_key: string | null;
    status: AktualitaStatus;
    published_at: string | null;
    created_at: string;
    updated_at: string;
};

export type AktualitaInput = {
    title: string;
    slug?: string;
    excerpt?: string;
    body_html?: string;
    cover_key?: string | null;
    status?: AktualitaStatus;
    published_at?: string | null;
};

type AktualitaRow = Omit<Aktualita, "status"> & { status: string };

function mapRow(row: AktualitaRow): Aktualita {
    return {
        ...row,
        status: row.status === "published" ? "published" : "draft",
        body_html: sanitizeBody(row.body_html ?? ""),
    };
}

export async function listPublished(limit?: number): Promise<Aktualita[]> {
    const db = await getDb();
    if (!db) return [];
    const sql = limit
        ? `SELECT * FROM aktuality WHERE status = 'published' ORDER BY published_at DESC, created_at DESC LIMIT ?`
        : `SELECT * FROM aktuality WHERE status = 'published' ORDER BY published_at DESC, created_at DESC`;
    const result = limit
        ? await db.prepare(sql).bind(limit).all<AktualitaRow>()
        : await db.prepare(sql).all<AktualitaRow>();
    return (result.results ?? []).map(mapRow);
}

export async function listAll(): Promise<Aktualita[]> {
    const db = await getDb();
    if (!db) return [];
    const result = await db
        .prepare(
            `SELECT * FROM aktuality ORDER BY
                CASE status WHEN 'published' THEN 0 ELSE 1 END,
                COALESCE(published_at, created_at) DESC`,
        )
        .all<AktualitaRow>();
    return (result.results ?? []).map(mapRow);
}

export async function getBySlug(
    slug: string,
    options: { includeDrafts?: boolean } = {},
): Promise<Aktualita | null> {
    const db = await getDb();
    if (!db) return null;
    const row = options.includeDrafts
        ? await db
              .prepare(`SELECT * FROM aktuality WHERE slug = ? LIMIT 1`)
              .bind(slug)
              .first<AktualitaRow>()
        : await db
              .prepare(
                  `SELECT * FROM aktuality WHERE slug = ? AND status = 'published' LIMIT 1`,
              )
              .bind(slug)
              .first<AktualitaRow>();
    return row ? mapRow(row) : null;
}

export async function getById(id: string): Promise<Aktualita | null> {
    const db = await getDb();
    if (!db) return null;
    const row = await db
        .prepare(`SELECT * FROM aktuality WHERE id = ? LIMIT 1`)
        .bind(id)
        .first<AktualitaRow>();
    return row ? mapRow(row) : null;
}

async function uniqueSlug(db: CmsDb, base: string, ignoreId?: string): Promise<string> {
    let candidate = slugifyCs(base);
    let n = 2;
    while (true) {
        const existing = ignoreId
            ? await db
                  .prepare(`SELECT id FROM aktuality WHERE slug = ? AND id != ? LIMIT 1`)
                  .bind(candidate, ignoreId)
                  .first<{ id: string }>()
            : await db
                  .prepare(`SELECT id FROM aktuality WHERE slug = ? LIMIT 1`)
                  .bind(candidate)
                  .first<{ id: string }>();
        if (!existing) return candidate;
        candidate = `${slugifyCs(base)}-${n}`;
        n += 1;
    }
}

function normalizeExcerpt(excerpt: string | undefined, bodyHtml: string): string {
    const trimmed = excerpt?.trim() ?? "";
    return trimmed || excerptFromHtml(bodyHtml);
}

export async function createAktualita(input: AktualitaInput): Promise<Aktualita> {
    const db = await getDb();
    if (!db) throw new Error("Databáze není dostupná.");
    const title = input.title.trim();
    if (!title) throw new Error("Název je povinný.");
    const bodyHtml = sanitizeBody(input.body_html ?? "");
    const status: AktualitaStatus = input.status === "published" ? "published" : "draft";
    const publishedAt =
        status === "published" ? input.published_at?.trim() || todayIsoDate() : input.published_at?.trim() || null;
    const now = new Date().toISOString();
    const id = crypto.randomUUID();
    const slug = await uniqueSlug(db, input.slug?.trim() || title);
    const excerpt = normalizeExcerpt(input.excerpt, bodyHtml);
    await db
        .prepare(
            `INSERT INTO aktuality
                (id, slug, title, excerpt, body_html, cover_key, status, published_at, created_at, updated_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        )
        .bind(
            id,
            slug,
            title,
            excerpt,
            bodyHtml,
            input.cover_key ?? null,
            status,
            publishedAt,
            now,
            now,
        )
        .run();
    const created = await getById(id);
    if (!created) throw new Error("Aktualitu se nepodařilo vytvořit.");
    return created;
}

export async function updateAktualita(
    id: string,
    input: AktualitaInput,
): Promise<Aktualita> {
    const db = await getDb();
    if (!db) throw new Error("Databáze není dostupná.");
    const existing = await getById(id);
    if (!existing) throw new Error("Aktualita neexistuje.");
    const title = input.title.trim();
    if (!title) throw new Error("Název je povinný.");
    const bodyHtml = sanitizeBody(input.body_html ?? "");
    const status: AktualitaStatus = input.status === "published" ? "published" : "draft";
    const publishedAt =
        status === "published"
            ? input.published_at?.trim() || existing.published_at || todayIsoDate()
            : input.published_at?.trim() || null;
    const slug = await uniqueSlug(db, input.slug?.trim() || existing.slug, id);
    const excerpt = normalizeExcerpt(input.excerpt, bodyHtml);
    const now = new Date().toISOString();
    await db
        .prepare(
            `UPDATE aktuality SET
                slug = ?, title = ?, excerpt = ?, body_html = ?, cover_key = ?,
                status = ?, published_at = ?, updated_at = ?
             WHERE id = ?`,
        )
        .bind(
            slug,
            title,
            excerpt,
            bodyHtml,
            input.cover_key === undefined ? existing.cover_key : input.cover_key,
            status,
            publishedAt,
            now,
            id,
        )
        .run();
    const updated = await getById(id);
    if (!updated) throw new Error("Aktualitu se nepodařilo uložit.");
    return updated;
}

export async function deleteAktualita(id: string): Promise<boolean> {
    const db = await getDb();
    if (!db) throw new Error("Databáze není dostupná.");
    const result = await db.prepare(`DELETE FROM aktuality WHERE id = ?`).bind(id).run();
    return (result.meta.changes ?? 0) > 0;
}
