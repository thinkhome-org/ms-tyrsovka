import {
    CLASSROOMS,
    getClassroom,
    type Classroom,
} from "@/lib/classrooms";
import { getDb } from "./env";
import { coverSrc } from "./media";

export const CLASSROOM_DAY_DEFAULT =
    "Společný režim školy, vyzvedávání a omluvenky jsou v praktických informacích. Třídní specifika doplníme sem.";

type ClassroomRow = {
    slug: string;
    email: string;
    phone: string | null;
    age: string;
    location: string;
    teachers: string;
    body: string;
    note: string;
    day_text: string;
    image_key: string;
};

export type ClassroomContact = {
    slug: string;
    email: string;
    phone: string | null;
};

export type ClassroomPage = Classroom & {
    dayText: string;
    imageKey: string;
};

export type ClassroomDraft = {
    slug: string;
    symbol: string;
    fullName: string;
    email: string;
    phone: string;
    age: string;
    location: string;
    teachers: string;
    body: string;
    note: string;
    dayText: string;
    image: string;
    imageKey: string;
    defaultImage: string;
};

export type ClassroomPageInput = {
    email?: string;
    phone?: string | null;
    age?: string;
    location?: string;
    teachers?: string;
    body?: string;
    note?: string;
    dayText?: string;
    imageKey?: string;
};

function emptyRow(slug: string, classroom: Classroom): ClassroomRow {
    return {
        slug,
        email: classroom.email,
        phone: classroom.phone ?? null,
        age: "",
        location: "",
        teachers: "",
        body: "",
        note: "",
        day_text: "",
        image_key: "",
    };
}

function filled(value: string | null | undefined): string {
    return value?.trim() ?? "";
}

function lines(value: string): string[] | null {
    const items = value
        .split(/\n+/)
        .map((line) => line.trim())
        .filter(Boolean);
    return items.length > 0 ? items : null;
}

function paragraphs(value: string): string[] | null {
    const items = value
        .split(/\n\s*\n/)
        .map((part) => part.trim())
        .filter(Boolean);
    return items.length > 0 ? items : null;
}

function present(classroom: Classroom, row: ClassroomRow | undefined): ClassroomPage {
    const teachers = lines(row?.teachers ?? "");
    const body = paragraphs(row?.body ?? "");
    const imageKey = filled(row?.image_key);
    return {
        ...classroom,
        email: filled(row?.email) || classroom.email,
        phone: row ? filled(row.phone) || undefined : classroom.phone,
        age: filled(row?.age) || classroom.age,
        location: filled(row?.location) || classroom.location,
        teachers: teachers ?? classroom.teachers,
        paragraphs: body ?? classroom.paragraphs,
        note: filled(row?.note) || classroom.note,
        image: imageKey ? (coverSrc(imageKey) ?? classroom.image) : classroom.image,
        imageKey,
        dayText: filled(row?.day_text) || CLASSROOM_DAY_DEFAULT,
    };
}

export function toClassroomDraft(page: ClassroomPage): ClassroomDraft {
    return {
        slug: page.slug,
        symbol: page.symbol,
        fullName: page.fullName,
        email: page.email,
        phone: page.phone ?? "",
        age: page.age,
        location: page.location,
        teachers: page.teachers.join("\n"),
        body: page.paragraphs.join("\n\n"),
        note: page.note ?? "",
        dayText: page.dayText,
        image: page.image,
        imageKey: page.imageKey,
        defaultImage: getClassroom(page.slug)?.image ?? page.image,
    };
}

async function listRows(): Promise<Map<string, ClassroomRow>> {
    const db = await getDb();
    if (!db) return new Map();
    try {
        const result = await db
            .prepare(
                `SELECT slug, email, phone, age, location, teachers, body, note, day_text, image_key
                 FROM classroom_contacts`,
            )
            .all<ClassroomRow>();
        return new Map(
            (result.results ?? []).map((row: ClassroomRow) => [row.slug, row]),
        );
    } catch {
        const result = await db
            .prepare(`SELECT slug, email, phone FROM classroom_contacts`)
            .all<Pick<ClassroomRow, "slug" | "email" | "phone">>();
        return new Map(
            (result.results ?? []).map(
                (row: Pick<ClassroomRow, "slug" | "email" | "phone">) => {
                    const classroom = getClassroom(row.slug);
                    const base = classroom
                        ? emptyRow(row.slug, classroom)
                        : emptyRow(row.slug, CLASSROOMS[0]);
                    return [row.slug, { ...base, email: row.email, phone: row.phone }] as const;
                },
            ),
        );
    }
}

export async function listClassroomPages(): Promise<ClassroomPage[]> {
    const rows = await listRows();
    return CLASSROOMS.map((classroom) => present(classroom, rows.get(classroom.slug)));
}

export async function listClassroomContacts(): Promise<ClassroomContact[]> {
    const pages = await listClassroomPages();
    return pages.map((page) => ({
        slug: page.slug,
        email: page.email,
        phone: page.phone ?? null,
    }));
}

export async function listClassroomsWithContacts(): Promise<ClassroomPage[]> {
    return listClassroomPages();
}

export async function getClassroomWithContacts(
    slug: string,
): Promise<ClassroomPage | undefined> {
    const classroom = getClassroom(slug);
    if (!classroom) return undefined;
    const rows = await listRows();
    return present(classroom, rows.get(slug));
}

export async function upsertClassroomPage(
    slug: string,
    input: ClassroomPageInput,
): Promise<ClassroomPage> {
    const classroom = getClassroom(slug);
    if (!classroom) throw new Error("Třída neexistuje.");
    const db = await getDb();
    if (!db) throw new Error("Databáze není dostupná.");
    const current = await getClassroomWithContacts(slug);
    if (!current) throw new Error("Třída neexistuje.");

    const email = filled(input.email ?? current.email);
    if (!email) throw new Error("E-mail třídy je povinný.");
    const phone = filled(
        input.phone === undefined ? current.phone : input.phone,
    );
    const age = filled(input.age ?? current.age);
    const location = filled(input.location ?? current.location);
    const teachers = filled(input.teachers ?? current.teachers.join("\n"));
    const body = filled(input.body ?? current.paragraphs.join("\n\n"));
    const note = filled(input.note ?? current.note);
    const dayText = filled(input.dayText ?? current.dayText);
    const imageKey = filled(input.imageKey ?? current.imageKey);
    if (
        imageKey &&
        !/^(tridy|galerie|aktuality)\/[0-9a-f-]+\.(jpg|jpeg|png|webp)$/i.test(imageKey)
    ) {
        throw new Error("Neplatná fotka třídy.");
    }

    await db
        .prepare(
            `INSERT INTO classroom_contacts (
                slug, email, phone, age, location, teachers, body, note, day_text, image_key
             ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
             ON CONFLICT(slug) DO UPDATE SET
                email = excluded.email,
                phone = excluded.phone,
                age = excluded.age,
                location = excluded.location,
                teachers = excluded.teachers,
                body = excluded.body,
                note = excluded.note,
                day_text = excluded.day_text,
                image_key = excluded.image_key`,
        )
        .bind(
            slug,
            email,
            phone || null,
            age,
            location,
            teachers,
            body,
            note,
            dayText,
            imageKey,
        )
        .run();

    const saved = await getClassroomWithContacts(slug);
    if (!saved) throw new Error("Třídu se nepodařilo uložit.");
    return saved;
}
