import {
    CLASSROOMS,
    getClassroom,
    type Classroom,
} from "@/lib/classrooms";
import { getDb } from "./env";

export type ClassroomContact = {
    slug: string;
    email: string;
    phone: string | null;
};

export async function listClassroomContacts(): Promise<ClassroomContact[]> {
    const db = await getDb();
    if (!db) {
        return CLASSROOMS.map((classroom) => ({
            slug: classroom.slug,
            email: classroom.email,
            phone: classroom.phone ?? null,
        }));
    }
    const result = await db
        .prepare(`SELECT slug, email, phone FROM classroom_contacts`)
        .all();
    const overlays = new Map(
        ((result.results ?? []) as ClassroomContact[]).map((row) => [
            row.slug,
            row,
        ]),
    );
    return CLASSROOMS.map((classroom) => {
        const overlay = overlays.get(classroom.slug);
        return {
            slug: classroom.slug,
            email: overlay?.email || classroom.email,
            phone: overlay ? overlay.phone : classroom.phone ?? null,
        };
    });
}

function applyOverlay(
    classroom: Classroom,
    overlay: ClassroomContact | undefined,
): Classroom {
    if (!overlay) return classroom;
    return {
        ...classroom,
        email: overlay.email || classroom.email,
        phone: overlay.phone || undefined,
    };
}

export async function listClassroomsWithContacts(): Promise<Classroom[]> {
    const overlays = new Map(
        (await listClassroomContacts()).map((row) => [row.slug, row]),
    );
    return CLASSROOMS.map((classroom) =>
        applyOverlay(classroom, overlays.get(classroom.slug)),
    );
}

export async function getClassroomWithContacts(
    slug: string,
): Promise<Classroom | undefined> {
    const classroom = getClassroom(slug);
    if (!classroom) return undefined;
    const overlays = await listClassroomContacts();
    return applyOverlay(
        classroom,
        overlays.find((row) => row.slug === slug),
    );
}

export async function upsertClassroomContact(
    slug: string,
    input: { email?: string; phone?: string | null },
): Promise<ClassroomContact> {
    const classroom = getClassroom(slug);
    if (!classroom) throw new Error("Třída neexistuje.");
    const db = await getDb();
    if (!db) throw new Error("Databáze není dostupná.");
    const email = (input.email ?? classroom.email).trim();
    if (!email) throw new Error("E-mail třídy je povinný.");
    const phoneRaw = input.phone === undefined ? classroom.phone : input.phone;
    const phone = phoneRaw?.trim() || null;
    await db
        .prepare(
            `INSERT INTO classroom_contacts (slug, email, phone)
             VALUES (?, ?, ?)
             ON CONFLICT(slug) DO UPDATE SET email = excluded.email, phone = excluded.phone`,
        )
        .bind(slug, email, phone)
        .run();
    return { slug, email, phone };
}
