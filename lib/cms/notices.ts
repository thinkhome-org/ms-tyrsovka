import { getDb } from "./env";
import { todayIsoDate } from "./dates";
import { isNoticeLive } from "./notice-view";

export { isNoticeLive, noticeHref, noticeKind } from "./notice-view";

export const NOTICE_CATEGORIES = [
    "zpravy",
    "dokumenty",
    "skolni-rad",
    "ostatni",
] as const;

export type NoticeCategory = (typeof NOTICE_CATEGORIES)[number];

export type Notice = {
    id: string;
    title: string;
    category: NoticeCategory;
    file_key: string | null;
    href: string | null;
    expires_at: string | null;
    published_at: string | null;
    created_at: string;
    updated_at: string;
};

export type NoticeInput = {
    title: string;
    category?: NoticeCategory;
    file_key?: string | null;
    href?: string | null;
    expires_at?: string | null;
    published_at?: string | null;
};

type NoticeRow = Omit<Notice, "category"> & { category: string };

function isCategory(value: string): value is NoticeCategory {
    return (NOTICE_CATEGORIES as readonly string[]).includes(value);
}

function mapRow(row: NoticeRow): Notice {
    return {
        ...row,
        category: isCategory(row.category) ? row.category : "ostatni",
        file_key: row.file_key || null,
        href: row.href || null,
        expires_at: row.expires_at || null,
        published_at: row.published_at || null,
    };
}

export async function listNotices(): Promise<Notice[]> {
    const db = await getDb();
    if (!db) return [];
    const result = await db
        .prepare(
            `SELECT * FROM notices ORDER BY
                COALESCE(published_at, created_at) DESC, created_at DESC`,
        )
        .all<NoticeRow>();
    return (result.results ?? []).map(mapRow);
}

export async function listLiveNotices(): Promise<Notice[]> {
    const today = todayIsoDate();
    return (await listNotices()).filter((notice) => isNoticeLive(notice, today));
}

export async function getNoticeById(id: string): Promise<Notice | null> {
    const db = await getDb();
    if (!db) return null;
    const row = await db
        .prepare(`SELECT * FROM notices WHERE id = ? LIMIT 1`)
        .bind(id)
        .first<NoticeRow>();
    return row ? mapRow(row) : null;
}

function normalizeNotice(input: NoticeInput, existing?: Notice): {
    title: string;
    category: NoticeCategory;
    file_key: string | null;
    href: string | null;
    expires_at: string | null;
    published_at: string | null;
} {
    const title = input.title.trim();
    if (!title) throw new Error("Název dokumentu je povinný.");
    const category =
        input.category && isCategory(input.category)
            ? input.category
            : existing?.category ?? "dokumenty";
    const file_key =
        input.file_key === undefined ? existing?.file_key ?? null : input.file_key;
    const hrefRaw = input.href === undefined ? existing?.href ?? null : input.href;
    const href = hrefRaw?.trim() || null;
    if (!file_key && !href) {
        throw new Error("Nahrajte soubor nebo zadejte odkaz.");
    }
    return {
        title,
        category,
        file_key,
        href,
        expires_at:
            input.expires_at === undefined
                ? existing?.expires_at ?? null
                : input.expires_at?.trim() || null,
        published_at:
            input.published_at === undefined
                ? existing?.published_at ?? todayIsoDate()
                : input.published_at?.trim() || todayIsoDate(),
    };
}

export async function createNotice(input: NoticeInput): Promise<Notice> {
    const db = await getDb();
    if (!db) throw new Error("Databáze není dostupná.");
    const data = normalizeNotice(input);
    const now = new Date().toISOString();
    const id = crypto.randomUUID();
    await db
        .prepare(
            `INSERT INTO notices
                (id, title, category, file_key, href, expires_at, published_at, created_at, updated_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        )
        .bind(
            id,
            data.title,
            data.category,
            data.file_key,
            data.href,
            data.expires_at,
            data.published_at,
            now,
            now,
        )
        .run();
    const created = await getNoticeById(id);
    if (!created) throw new Error("Dokument se nepodařilo uložit.");
    return created;
}

export async function updateNotice(id: string, input: NoticeInput): Promise<Notice> {
    const db = await getDb();
    if (!db) throw new Error("Databáze není dostupná.");
    const existing = await getNoticeById(id);
    if (!existing) throw new Error("Dokument neexistuje.");
    const data = normalizeNotice(input, existing);
    const now = new Date().toISOString();
    await db
        .prepare(
            `UPDATE notices SET
                title = ?, category = ?, file_key = ?, href = ?,
                expires_at = ?, published_at = ?, updated_at = ?
             WHERE id = ?`,
        )
        .bind(
            data.title,
            data.category,
            data.file_key,
            data.href,
            data.expires_at,
            data.published_at,
            now,
            id,
        )
        .run();
    const updated = await getNoticeById(id);
    if (!updated) throw new Error("Dokument se nepodařilo uložit.");
    return updated;
}

export async function deleteNotice(id: string): Promise<boolean> {
    const db = await getDb();
    if (!db) throw new Error("Databáze není dostupná.");
    const result = await db.prepare(`DELETE FROM notices WHERE id = ?`).bind(id).run();
    return (result.meta.changes ?? 0) > 0;
}
