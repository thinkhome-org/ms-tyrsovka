import { SCHOOL_CONTACT } from "@/lib/site-nav";
import { getDb } from "./env";

export const SETTING_KEYS = [
    "org_name",
    "address",
    "email",
    "phone",
    "ico",
    "databox",
    "bank_account",
    "founder",
    "current_info",
    "urgent_title",
    "urgent_description",
    "urgent_phone",
] as const;

export type SettingKey = (typeof SETTING_KEYS)[number];

export type SchoolSettings = Record<SettingKey, string>;

export const DEFAULT_SETTINGS: SchoolSettings = {
    org_name: "Mateřská škola Tyršovka v Praze 12",
    address: SCHOOL_CONTACT.address,
    email: SCHOOL_CONTACT.email,
    phone: SCHOOL_CONTACT.phone,
    ico: "63109719",
    databox: "9u4k2vr",
    bank_account: "2000765379/0800",
    founder:
        "Zřizovatelem školy je Městská část Praha 12, Generála Šišky 2375/6, 143 00 Praha 4 - Modřany.",
    current_info: "",
    urgent_title: "Citrónová třída pro provozní situace",
    urgent_description:
        "V případě brzkého ranního provozu, odpoledního provozu nebo pobytu dětí na zahradě kontaktujte tuto třídu.",
    urgent_phone: "+420 731 252 242",
};

function isSettingKey(value: string): value is SettingKey {
    return (SETTING_KEYS as readonly string[]).includes(value);
}

export async function getSettingsMap(): Promise<SchoolSettings> {
    const db = await getDb();
    if (!db) return { ...DEFAULT_SETTINGS };
    try {
        const result = await db.prepare(`SELECT key, value FROM settings`).all();
        const map = { ...DEFAULT_SETTINGS };
        for (const row of (result.results ?? []) as {
            key: string;
            value: string;
        }[]) {
            if (isSettingKey(row.key)) map[row.key] = row.value ?? "";
        }
        return map;
    } catch {
        return { ...DEFAULT_SETTINGS };
    }
}

export async function upsertSettings(
    input: Partial<Record<SettingKey, string>>,
): Promise<SchoolSettings> {
    const db = await getDb();
    if (!db) throw new Error("Databáze není dostupná.");
    const entries = Object.entries(input).filter(
        (entry): entry is [SettingKey, string] => isSettingKey(entry[0]),
    );
    if (entries.length === 0) throw new Error("Není co uložit.");
    const statements = entries.map(([key, value]) =>
        db
            .prepare(
                `INSERT INTO settings (key, value) VALUES (?, ?)
                 ON CONFLICT(key) DO UPDATE SET value = excluded.value`,
            )
            .bind(key, value ?? ""),
    );
    await db.batch(statements);
    return getSettingsMap();
}

export async function getSchoolContact() {
    const settings = await getSettingsMap();
    const phone = settings.phone || SCHOOL_CONTACT.phone;
    return {
        name: settings.org_name || SCHOOL_CONTACT.name,
        address: settings.address || SCHOOL_CONTACT.address,
        phone,
        phoneHref: `tel:${phone.replace(/\s+/g, "")}`,
        email: settings.email || SCHOOL_CONTACT.email,
    };
}
