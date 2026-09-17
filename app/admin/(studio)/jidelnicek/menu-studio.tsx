"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { MenuDay } from "@/lib/cms/menu";
import { addDays, czechWeekday, formatDateCs, mondayOfWeek } from "@/lib/cms/dates";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { textareaClassName } from "../form-classes";

const FIELDS: { key: keyof Pick<MenuDay, "snack_1" | "soup" | "main_meal" | "snack_2">; label: string }[] =
    [
        { key: "snack_1", label: "Přesnídávka" },
        { key: "soup", label: "Polévka" },
        { key: "main_meal", label: "Hlavní" },
        { key: "snack_2", label: "Svačina" },
    ];

export function MenuStudio({
    initialDays,
    initialStart,
}: {
    initialDays: MenuDay[];
    initialStart: string;
}) {
    const router = useRouter();
    const [start, setStart] = useState(mondayOfWeek(initialStart));
    const [days, setDays] = useState(initialDays);
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);

    async function loadWeek(nextStart: string) {
        const monday = mondayOfWeek(nextStart);
        setStart(monday);
        setError("");
        const response = await fetch(`/api/admin/jidelnicek?start=${monday}`);
        const data = (await response.json().catch(() => null)) as
            | { items?: MenuDay[]; error?: string }
            | null;
        if (!response.ok || !data?.items) {
            setError(data?.error || "Týden se nepodařilo načíst.");
            return;
        }
        setDays(data.items);
    }

    async function save() {
        setPending(true);
        setError("");
        try {
            const response = await fetch("/api/admin/jidelnicek", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ days }),
            });
            const data = (await response.json().catch(() => null)) as
                | { items?: MenuDay[]; error?: string }
                | null;
            if (!response.ok) {
                setError(data?.error || "Uložení se nepovedlo.");
                return;
            }
            if (data?.items) setDays(data.items);
            router.refresh();
        } finally {
            setPending(false);
        }
    }

    const end = addDays(start, 4);

    return (
        <div className="mt-10 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-medium text-foreground">
                    {formatDateCs(start)} – {formatDateCs(end)}
                </p>
                <div className="flex gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => void loadWeek(addDays(start, -7))}
                    >
                        Předchozí týden
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => void loadWeek(addDays(start, 7))}
                    >
                        Další týden
                    </Button>
                </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-border bg-card">
                <table className="min-w-[52rem] w-full text-left text-sm">
                    <thead className="border-b border-border bg-muted/40 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                        <tr>
                            <th className="px-4 py-3">Den</th>
                            {FIELDS.map((field) => (
                                <th key={field.key} className="px-3 py-3">
                                    {field.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {days.map((day, index) => (
                            <tr key={day.day_date} className="border-b border-border last:border-0">
                                <td className="whitespace-nowrap bg-muted/20 px-4 py-3 align-top font-medium">
                                    {czechWeekday(day.day_date)}
                                    <span className="mt-1 block text-xs font-normal text-muted-foreground">
                                        {formatDateCs(day.day_date)}
                                    </span>
                                </td>
                                {FIELDS.map((field) => (
                                    <td key={field.key} className="p-2 align-top">
                                        <Label className="sr-only" htmlFor={`${day.day_date}-${field.key}`}>
                                            {field.label}
                                        </Label>
                                        <textarea
                                            id={`${day.day_date}-${field.key}`}
                                            value={day[field.key]}
                                            onChange={(event) => {
                                                const next = [...days];
                                                next[index] = {
                                                    ...day,
                                                    [field.key]: event.target.value,
                                                };
                                                setDays(next);
                                            }}
                                            rows={3}
                                            className={`${textareaClassName} min-h-16`}
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {error ? (
                <p className="text-sm text-destructive" role="alert">
                    {error}
                </p>
            ) : null}
            <Button type="button" disabled={pending} onClick={() => void save()}>
                {pending ? "Ukládám…" : "Uložit jídelníček"}
            </Button>
        </div>
    );
}
