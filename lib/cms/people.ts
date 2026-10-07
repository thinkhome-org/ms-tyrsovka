import { getDb } from "./env";

export const PERSON_SECTIONS = ["vedeni", "jidelna"] as const;
export type PersonSection = (typeof PERSON_SECTIONS)[number];

export type Person = {
    id: string;
    name: string;
    role: string;
    email: string;
    phone: string;
    section: PersonSection;
    position_order: number;
    created_at: string;
    updated_at: string;
};

export type PersonInput = {
    name: string;
    role?: string;
    email?: string;
    phone?: string;
    section?: PersonSection;
    position_order?: number;
};

type PersonRow = Omit<Person, "section"> & { section: string };

function isSection(value: string): value is PersonSection {
    return (PERSON_SECTIONS as readonly string[]).includes(value);
}

function mapRow(row: PersonRow): Person {
    return {
        ...row,
        email: row.email ?? "",
        phone: row.phone ?? "",
        section: isSection(row.section) ? row.section : "vedeni",
    };
}

export async function listPeople(): Promise<Person[]> {
    const db = await getDb();
    if (!db) return [];
    const result = await db
        .prepare(
            `SELECT * FROM people ORDER BY section ASC, position_order ASC, name ASC`,
        )
        .all<PersonRow>();
    return (result.results ?? []).map(mapRow);
}

export async function getPersonById(id: string): Promise<Person | null> {
    const db = await getDb();
    if (!db) return null;
    const row = await db
        .prepare(`SELECT * FROM people WHERE id = ? LIMIT 1`)
        .bind(id)
        .first<PersonRow>();
    return row ? mapRow(row) : null;
}

function normalizePerson(input: PersonInput, existing?: Person) {
    const name = input.name.trim();
    if (!name) throw new Error("Jméno je povinné.");
    const section =
        input.section && isSection(input.section)
            ? input.section
            : existing?.section ?? "vedeni";
    return {
        name,
        role: (input.role ?? existing?.role ?? "").trim(),
        email: (input.email ?? existing?.email ?? "").trim(),
        phone: (input.phone ?? existing?.phone ?? "").trim(),
        section,
        position_order:
            input.position_order ?? existing?.position_order ?? 0,
    };
}

export async function createPerson(input: PersonInput): Promise<Person> {
    const db = await getDb();
    if (!db) throw new Error("Databáze není dostupná.");
    const data = normalizePerson(input);
    const now = new Date().toISOString();
    const id = crypto.randomUUID();
    await db
        .prepare(
            `INSERT INTO people
                (id, name, role, email, phone, section, position_order, created_at, updated_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        )
        .bind(
            id,
            data.name,
            data.role,
            data.email,
            data.phone,
            data.section,
            data.position_order,
            now,
            now,
        )
        .run();
    const created = await getPersonById(id);
    if (!created) throw new Error("Kontakt se nepodařilo uložit.");
    return created;
}

export async function updatePerson(id: string, input: PersonInput): Promise<Person> {
    const db = await getDb();
    if (!db) throw new Error("Databáze není dostupná.");
    const existing = await getPersonById(id);
    if (!existing) throw new Error("Kontakt neexistuje.");
    const data = normalizePerson(input, existing);
    const now = new Date().toISOString();
    await db
        .prepare(
            `UPDATE people SET
                name = ?, role = ?, email = ?, phone = ?,
                section = ?, position_order = ?, updated_at = ?
             WHERE id = ?`,
        )
        .bind(
            data.name,
            data.role,
            data.email,
            data.phone,
            data.section,
            data.position_order,
            now,
            id,
        )
        .run();
    const updated = await getPersonById(id);
    if (!updated) throw new Error("Kontakt se nepodařilo uložit.");
    return updated;
}

export async function movePerson(
    id: string,
    direction: "up" | "down",
): Promise<Person> {
    const db = await getDb();
    if (!db) throw new Error("Databáze není dostupná.");
    const person = await getPersonById(id);
    if (!person) throw new Error("Kontakt neexistuje.");
    const siblings = (await listPeople()).filter(
        (item) => item.section === person.section,
    );
    const index = siblings.findIndex((item) => item.id === id);
    const target = direction === "up" ? index - 1 : index + 1;
    if (index < 0 || target < 0 || target >= siblings.length) return person;
    const next = [...siblings];
    const [item] = next.splice(index, 1);
    if (!item) return person;
    next.splice(target, 0, item);
    const statements = next.map((entry, position) =>
        db
            .prepare(`UPDATE people SET position_order = ? WHERE id = ?`)
            .bind(position, entry.id),
    );
    if (statements.length > 0) await db.batch(statements);
    const updated = await getPersonById(id);
    if (!updated) throw new Error("Kontakt neexistuje.");
    return updated;
}

export async function deletePerson(id: string): Promise<boolean> {
    const db = await getDb();
    if (!db) throw new Error("Databáze není dostupná.");
    const result = await db.prepare(`DELETE FROM people WHERE id = ?`).bind(id).run();
    return (result.meta.changes ?? 0) > 0;
}
