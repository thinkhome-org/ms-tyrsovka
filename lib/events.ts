export type SchoolEvent = {
    date: string;
    dateLabel?: string;
    title: string;
    who: string;
};

export function eventDateLabel(event: SchoolEvent): string {
    if (event.dateLabel) return event.dateLabel;
    return new Intl.DateTimeFormat("cs-CZ", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
    }).format(new Date(`${event.date}T12:00:00`));
}
