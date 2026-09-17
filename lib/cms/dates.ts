export function formatDateCs(
    dateIso: string,
    month: "2-digit" | "long" = "2-digit",
): string {
    const date = new Date(dateIso);
    if (Number.isNaN(date.getTime())) return dateIso;
    return new Intl.DateTimeFormat("cs-CZ", {
        day: "2-digit",
        month,
        year: "numeric",
    }).format(date);
}

export function toDateInput(dateIso: string | null | undefined): string {
    if (!dateIso) return "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateIso)) return dateIso;
    const date = new Date(dateIso);
    if (Number.isNaN(date.getTime())) return "";
    return date.toISOString().slice(0, 10);
}

export function todayIsoDate(): string {
    return new Date().toISOString().slice(0, 10);
}

export function mondayOfWeek(dateIso = todayIsoDate()): string {
    const date = new Date(`${toDateInput(dateIso) || todayIsoDate()}T12:00:00`);
    const day = date.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    date.setDate(date.getDate() + diff);
    return date.toISOString().slice(0, 10);
}

export function addDays(dateIso: string, days: number): string {
    const date = new Date(`${toDateInput(dateIso) || dateIso}T12:00:00`);
    date.setDate(date.getDate() + days);
    return date.toISOString().slice(0, 10);
}

export const CZECH_WEEKDAYS = [
    "Pondělí",
    "Úterý",
    "Středa",
    "Čtvrtek",
    "Pátek",
] as const;

export function czechWeekday(dateIso: string): string {
    const date = new Date(`${toDateInput(dateIso) || dateIso}T12:00:00`);
    const day = date.getDay();
    const index = day === 0 ? 6 : day - 1;
    return CZECH_WEEKDAYS[index] ?? "";
}
