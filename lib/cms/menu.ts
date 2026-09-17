import { getDb } from "./env";
import { addDays, mondayOfWeek } from "./dates";

export type MenuDay = {
    day_date: string;
    snack_1: string;
    soup: string;
    main_meal: string;
    snack_2: string;
    updated_at: string;
};

export type MenuDayInput = {
    day_date: string;
    snack_1?: string;
    soup?: string;
    main_meal?: string;
    snack_2?: string;
};

function emptyDay(day_date: string): MenuDay {
    return {
        day_date,
        snack_1: "",
        soup: "",
        main_meal: "",
        snack_2: "",
        updated_at: "",
    };
}

export function weekDates(start = mondayOfWeek()): string[] {
    const monday = mondayOfWeek(start);
    return Array.from({ length: 5 }, (_, index) => addDays(monday, index));
}

export function isMenuDayFilled(day: MenuDay): boolean {
    return Boolean(
        day.snack_1.trim() ||
            day.soup.trim() ||
            day.main_meal.trim() ||
            day.snack_2.trim(),
    );
}

export async function listMenuRange(start: string, end: string): Promise<MenuDay[]> {
    const db = await getDb();
    if (!db) return [];
    const result = await db
        .prepare(
            `SELECT * FROM menu_days
             WHERE day_date >= ? AND day_date <= ?
             ORDER BY day_date ASC`,
        )
        .bind(start, end)
        .all<MenuDay>();
    return result.results ?? [];
}

export async function getWeekMenu(start = mondayOfWeek()): Promise<MenuDay[]> {
    const dates = weekDates(start);
    const rows = await listMenuRange(dates[0], dates[4]);
    const byDate = new Map(rows.map((row) => [row.day_date, row]));
    return dates.map((day) => byDate.get(day) ?? emptyDay(day));
}

export async function upsertMenuDays(days: MenuDayInput[]): Promise<MenuDay[]> {
    const db = await getDb();
    if (!db) throw new Error("Databáze není dostupná.");
    if (!Array.isArray(days) || days.length === 0) {
        throw new Error("Chybí dny jídelníčku.");
    }
    const now = new Date().toISOString();
    const statements = days.map((day) => {
        const date = day.day_date?.trim() ?? "";
        if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
            throw new Error("Zadejte platné datum dne.");
        }
        return db
            .prepare(
                `INSERT INTO menu_days (day_date, snack_1, soup, main_meal, snack_2, updated_at)
                 VALUES (?, ?, ?, ?, ?, ?)
                 ON CONFLICT(day_date) DO UPDATE SET
                    snack_1 = excluded.snack_1,
                    soup = excluded.soup,
                    main_meal = excluded.main_meal,
                    snack_2 = excluded.snack_2,
                    updated_at = excluded.updated_at`,
            )
            .bind(
                date,
                day.snack_1?.trim() ?? "",
                day.soup?.trim() ?? "",
                day.main_meal?.trim() ?? "",
                day.snack_2?.trim() ?? "",
                now,
            );
    });
    await db.batch(statements);
    const dates = days.map((day) => day.day_date);
    dates.sort();
    return listMenuRange(dates[0], dates[dates.length - 1]);
}
