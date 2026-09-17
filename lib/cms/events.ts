import type { SchoolEvent } from "@/lib/events";
import { eventDateLabel } from "@/lib/events";
import { getDb } from "./env";

export type CmsEvent = {
    id: string;
    date_val: string;
    date_display: string;
    title: string;
    who: string;
    created_at: string;
    updated_at: string;
};

export type CmsEventInput = {
    date_val: string;
    date_display?: string;
    title: string;
    who?: string;
};

export function toSchoolEvent(event: CmsEvent): SchoolEvent {
    return {
        date: event.date_val,
        dateLabel: event.date_display || undefined,
        title: event.title,
        who: event.who,
    };
}

export function cmsEventLabel(event: CmsEvent): string {
    return eventDateLabel(toSchoolEvent(event));
}

export async function listEvents(): Promise<CmsEvent[]> {
    const db = await getDb();
    if (!db) return [];
    const result = await db
        .prepare(`SELECT * FROM events ORDER BY date_val ASC, title ASC`)
        .all<CmsEvent>();
    return result.results ?? [];
}

export async function upcomingEvents(now = new Date()): Promise<SchoolEvent[]> {
    const today = now.toISOString().slice(0, 10);
    return (await listEvents())
        .filter((event) => event.date_val >= today)
        .sort((a, b) => a.date_val.localeCompare(b.date_val))
        .map(toSchoolEvent);
}

export async function pastEvents(now = new Date()): Promise<SchoolEvent[]> {
    const today = now.toISOString().slice(0, 10);
    return (await listEvents())
        .filter((event) => event.date_val < today)
        .sort((a, b) => b.date_val.localeCompare(a.date_val))
        .map(toSchoolEvent);
}

export async function getEventById(id: string): Promise<CmsEvent | null> {
    const db = await getDb();
    if (!db) return null;
    return (
        (await db
            .prepare(`SELECT * FROM events WHERE id = ? LIMIT 1`)
            .bind(id)
            .first<CmsEvent>()) ?? null
    );
}

function normalizeEvent(input: CmsEventInput) {
    const title = input.title.trim();
    if (!title) throw new Error("Název akce je povinný.");
    const date_val = input.date_val.trim();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date_val)) {
        throw new Error("Zadejte platné datum.");
    }
    return {
        date_val,
        date_display: input.date_display?.trim() ?? "",
        title,
        who: input.who?.trim() ?? "",
    };
}

export async function createEvent(input: CmsEventInput): Promise<CmsEvent> {
    const db = await getDb();
    if (!db) throw new Error("Databáze není dostupná.");
    const data = normalizeEvent(input);
    const now = new Date().toISOString();
    const id = crypto.randomUUID();
    await db
        .prepare(
            `INSERT INTO events (id, date_val, date_display, title, who, created_at, updated_at)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
        )
        .bind(id, data.date_val, data.date_display, data.title, data.who, now, now)
        .run();
    const created = await getEventById(id);
    if (!created) throw new Error("Akci se nepodařilo uložit.");
    return created;
}

export async function updateEvent(id: string, input: CmsEventInput): Promise<CmsEvent> {
    const db = await getDb();
    if (!db) throw new Error("Databáze není dostupná.");
    const existing = await getEventById(id);
    if (!existing) throw new Error("Akce neexistuje.");
    const data = normalizeEvent(input);
    const now = new Date().toISOString();
    await db
        .prepare(
            `UPDATE events SET date_val = ?, date_display = ?, title = ?, who = ?, updated_at = ?
             WHERE id = ?`,
        )
        .bind(data.date_val, data.date_display, data.title, data.who, now, id)
        .run();
    const updated = await getEventById(id);
    if (!updated) throw new Error("Akci se nepodařilo uložit.");
    return updated;
}

export async function deleteEvent(id: string): Promise<boolean> {
    const db = await getDb();
    if (!db) throw new Error("Databáze není dostupná.");
    const result = await db.prepare(`DELETE FROM events WHERE id = ?`).bind(id).run();
    return (result.meta.changes ?? 0) > 0;
}
