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
