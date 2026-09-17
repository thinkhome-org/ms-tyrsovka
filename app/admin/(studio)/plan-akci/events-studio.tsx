"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { CmsEvent } from "@/lib/cms/events";
import { eventDateLabel } from "@/lib/events";
import { todayIsoDate } from "@/lib/cms/dates";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function EventsStudio({ items }: { items: CmsEvent[] }) {
    const router = useRouter();
    const [dateVal, setDateVal] = useState(todayIsoDate());
    const [dateDisplay, setDateDisplay] = useState("");
    const [title, setTitle] = useState("");
    const [who, setWho] = useState("");
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);
    const [deleting, setDeleting] = useState<string | null>(null);

    async function create() {
        setPending(true);
        setError("");
        try {
            const response = await fetch("/api/admin/plan-akci", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    date_val: dateVal,
                    date_display: dateDisplay,
                    title,
                    who,
                }),
            });
            const data = (await response.json().catch(() => null)) as
                | { error?: string }
                | null;
            if (!response.ok) {
                setError(data?.error || "Uložení se nepovedlo.");
                return;
            }
            setTitle("");
            setWho("");
            setDateDisplay("");
            router.refresh();
        } finally {
            setPending(false);
        }
    }

    async function remove(id: string) {
        setDeleting(id);
        setError("");
        try {
            const response = await fetch(`/api/admin/plan-akci/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                const data = (await response.json().catch(() => null)) as
                    | { error?: string }
                    | null;
                setError(data?.error || "Odstranění se nepovedlo.");
                return;
            }
            router.refresh();
        } finally {
            setDeleting(null);
        }
    }

    return (
        <div className="mt-10 space-y-8">
            <form
                className="grid gap-4 rounded-2xl border border-border bg-card p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-4"
                onSubmit={(event) => {
                    event.preventDefault();
                    void create();
                }}
            >
                <div className="flex flex-col gap-2">
                    <Label htmlFor="event-date">Datum</Label>
                    <Input
                        id="event-date"
                        type="date"
                        value={dateVal}
                        onChange={(event) => setDateVal(event.target.value)}
                        required
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="event-display">Termín na webu</Label>
                    <Input
                        id="event-display"
                        value={dateDisplay}
                        onChange={(event) => setDateDisplay(event.target.value)}
                        placeholder="např. 12. 3."
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="event-title">Název akce</Label>
                    <Input
                        id="event-title"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        required
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="event-who">Kdo</Label>
                    <Input
                        id="event-who"
                        value={who}
                        onChange={(event) => setWho(event.target.value)}
                        placeholder="Všechny třídy"
                    />
                </div>
                {error ? (
                    <p className="text-sm text-destructive sm:col-span-2 lg:col-span-4" role="alert">
                        {error}
                    </p>
                ) : null}
                <div className="sm:col-span-2 lg:col-span-4">
                    <Button type="submit" disabled={pending || !title.trim()}>
                        {pending ? "Přidávám…" : "Přidat akci"}
                    </Button>
                </div>
            </form>

            {items.length === 0 ? (
                <p className="text-sm text-muted-foreground">Zatím tu není žádná akce.</p>
            ) : (
                <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
                    {items.map((item) => (
                        <li
                            key={item.id}
                            className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
                        >
                            <div>
                                <p className="text-sm font-medium tabular-nums text-foreground">
                                    {eventDateLabel({
                                        date: item.date_val,
                                        dateLabel: item.date_display || undefined,
                                        title: item.title,
                                        who: item.who,
                                    })}
                                </p>
                                <p className="mt-1 font-medium">{item.title}</p>
                                {item.who ? (
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {item.who}
                                    </p>
                                ) : null}
                            </div>
                            <Button
                                type="button"
                                variant="ghost"
                                className="self-start text-destructive hover:text-destructive"
                                disabled={deleting === item.id}
                                onClick={() => void remove(item.id)}
                            >
                                {deleting === item.id ? "Mažu…" : "Smazat"}
                            </Button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
