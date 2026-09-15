import { eventDateLabel, type SchoolEvent } from "@/lib/events";

export function SchoolEventsList({
    events,
    emptyText,
}: {
    events: SchoolEvent[];
    emptyText?: string;
}) {
    if (events.length === 0) {
        return emptyText ? (
            <p className="text-sm leading-relaxed text-muted-foreground">{emptyText}</p>
        ) : null;
    }

    return (
        <ul className="divide-y divide-border border-y border-border">
            {events.map((event) => (
                <li
                    key={`${event.date}-${event.title}`}
                    className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-8"
                >
                    <time
                        dateTime={event.date}
                        className="w-40 shrink-0 text-sm font-medium tabular-nums text-foreground"
                    >
                        {eventDateLabel(event)}
                    </time>
                    <div className="min-w-0">
                        <p className="font-medium text-foreground">{event.title}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{event.who}</p>
                    </div>
                </li>
            ))}
        </ul>
    );
}
