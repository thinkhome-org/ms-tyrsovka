import { addDays, mondayOfWeek } from "./dates";
import { getDb, getMediaBucket } from "./env";
import { mediaUrl } from "./media";

const MAX_BYTES = 15 * 1024 * 1024;

const ALLOWED_TYPES: Record<string, { ext: string; contentType: string }> = {
    "application/pdf": { ext: "pdf", contentType: "application/pdf" },
    "image/png": { ext: "png", contentType: "image/png" },
    "image/jpeg": { ext: "jpg", contentType: "image/jpeg" },
    "image/webp": { ext: "webp", contentType: "image/webp" },
};

const ALLOWED_EXTENSIONS: Record<string, { ext: string; contentType: string }> = {
    pdf: ALLOWED_TYPES["application/pdf"],
    png: ALLOWED_TYPES["image/png"],
    jpg: ALLOWED_TYPES["image/jpeg"],
    jpeg: ALLOWED_TYPES["image/jpeg"],
    webp: ALLOWED_TYPES["image/webp"],
};

export type MenuFile = {
    week_start: string;
    file_key: string;
    file_name: string;
    updated_at: string;
};

export type PublishedMenus = {
    currentStart: string;
    nextStart: string;
    current: MenuFile | null;
    next: MenuFile | null;
};

export function publishedWeekStarts(today?: string): {
    current: string;
    next: string;
} {
    const current = mondayOfWeek(today);
    return { current, next: addDays(current, 7) };
}

export function isMenuPdf(fileKey: string): boolean {
    return fileKey.toLowerCase().endsWith(".pdf");
}

export function menuFileUrl(file: MenuFile | null): string | null {
    if (!file?.file_key) return null;
    return mediaUrl(file.file_key);
}

function extensionOf(name: string): string | null {
    const match = name.toLowerCase().match(/\.([a-z0-9]+)$/);
    return match?.[1] ?? null;
}

function fileMeta(file: File): { ext: string; contentType: string } {
    const fromType = ALLOWED_TYPES[file.type];
    if (fromType) return fromType;
    const fromName = ALLOWED_EXTENSIONS[extensionOf(file.name) ?? ""];
    if (fromName) return fromName;
    throw new Error("Povolené formáty jsou PDF, PNG, JPEG a WebP.");
}

function safeFileName(name: string): string {
    const base = name.split(/[/\\]/).pop()?.trim() || "jidelnicek";
    return base.slice(0, 180);
}

function assertPublishedWeek(weekStart: string): string {
    const monday = mondayOfWeek(weekStart);
    const weeks = publishedWeekStarts();
    if (monday !== weeks.current && monday !== weeks.next) {
        throw new Error("Jídelníček lze nahrát jen pro aktuální a příští týden.");
    }
    return monday;
}

export async function getMenuFile(weekStart: string): Promise<MenuFile | null> {
    const db = await getDb();
    if (!db) return null;
    try {
        const row = await db
            .prepare(
                `SELECT week_start, file_key, file_name, updated_at
                 FROM menu_files
                 WHERE week_start = ?`,
            )
            .bind(mondayOfWeek(weekStart))
            .first<MenuFile>();
        return row ?? null;
    } catch {
        return null;
    }
}

export async function getPublishedMenus(): Promise<PublishedMenus> {
    const weeks = publishedWeekStarts();
    const [current, next] = await Promise.all([
        getMenuFile(weeks.current),
        getMenuFile(weeks.next),
    ]);
    return {
        currentStart: weeks.current,
        nextStart: weeks.next,
        current,
        next,
    };
}

async function removeStoredObject(key: string): Promise<void> {
    if (!key || key.startsWith("http://") || key.startsWith("https://") || key.startsWith("/")) {
        return;
    }
    const bucket = await getMediaBucket();
    if (!bucket) return;
    try {
        await bucket.delete(key);
    } catch {
        // The new file is already saved; a leftover object can be cleaned later.
    }
}

export async function putMenuFile(weekStart: string, file: File): Promise<MenuFile> {
    const monday = assertPublishedWeek(weekStart);
    const db = await getDb();
    if (!db) throw new Error("Databáze není dostupná.");
    const bucket = await getMediaBucket();
    if (!bucket) throw new Error("Úložiště souborů není dostupné.");
    if (file.size === 0) throw new Error("Vyberte soubor.");
    if (file.size > MAX_BYTES) {
        throw new Error("Soubor může mít nejvýše 15 MB.");
    }
    const meta = fileMeta(file);
    const previous = await getMenuFile(monday);
    const key = `jidelnicek/${crypto.randomUUID()}.${meta.ext}`;
    const bytes = await file.arrayBuffer();
    await bucket.put(key, bytes, {
        httpMetadata: { contentType: meta.contentType },
    });
    const now = new Date().toISOString();
    const fileName = safeFileName(file.name);
    await db
        .prepare(
            `INSERT INTO menu_files (week_start, file_key, file_name, updated_at)
             VALUES (?, ?, ?, ?)
             ON CONFLICT(week_start) DO UPDATE SET
                file_key = excluded.file_key,
                file_name = excluded.file_name,
                updated_at = excluded.updated_at`,
        )
        .bind(monday, key, fileName, now)
        .run();
    if (previous && previous.file_key !== key) {
        await removeStoredObject(previous.file_key);
    }
    return {
        week_start: monday,
        file_key: key,
        file_name: fileName,
        updated_at: now,
    };
}

export async function deleteMenuFile(weekStart: string): Promise<void> {
    const monday = assertPublishedWeek(weekStart);
    const db = await getDb();
    if (!db) throw new Error("Databáze není dostupná.");
    const existing = await getMenuFile(monday);
    if (!existing) return;
    await db.prepare(`DELETE FROM menu_files WHERE week_start = ?`).bind(monday).run();
    await removeStoredObject(existing.file_key);
}
