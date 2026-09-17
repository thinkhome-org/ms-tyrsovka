"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { SchoolSettings } from "@/lib/cms/settings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { textareaClassName } from "../form-classes";

const FIELDS: { key: keyof SchoolSettings; label: string; textarea?: boolean }[] = [
    { key: "org_name", label: "Název organizace" },
    { key: "address", label: "Adresa" },
    { key: "email", label: "E-mail" },
    { key: "phone", label: "Telefon" },
    { key: "ico", label: "IČ" },
    { key: "databox", label: "Datová schránka" },
    { key: "bank_account", label: "Běžný účet" },
    { key: "founder", label: "Zřizovatel", textarea: true },
    { key: "urgent_title", label: "Nadpis provozního telefonu" },
    { key: "urgent_phone", label: "Provozní telefon" },
    { key: "urgent_description", label: "Popis provozního telefonu", textarea: true },
    { key: "current_info", label: "Aktuální info / banner", textarea: true },
];

export function SettingsStudio({ initial }: { initial: SchoolSettings }) {
    const router = useRouter();
    const [settings, setSettings] = useState(initial);
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);
    const [saved, setSaved] = useState(false);

    async function save() {
        setPending(true);
        setError("");
        setSaved(false);
        try {
            const response = await fetch("/api/admin/nastaveni", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings),
            });
            const data = (await response.json().catch(() => null)) as
                | { settings?: SchoolSettings; error?: string }
                | null;
            if (!response.ok) {
                setError(data?.error || "Uložení se nepovedlo.");
                return;
            }
            if (data?.settings) setSettings(data.settings);
            setSaved(true);
            router.refresh();
        } finally {
            setPending(false);
        }
    }

    return (
        <form
            className="mt-10 grid gap-4"
            onSubmit={(event) => {
                event.preventDefault();
                void save();
            }}
        >
            <div className="grid gap-4 md:grid-cols-2">
                {FIELDS.map((field) => (
                    <div
                        key={field.key}
                        className={`flex flex-col gap-2 ${field.textarea ? "md:col-span-2" : ""}`}
                    >
                        <Label htmlFor={field.key}>{field.label}</Label>
                        {field.textarea ? (
                            <textarea
                                id={field.key}
                                value={settings[field.key]}
                                rows={field.key === "current_info" ? 5 : 3}
                                onChange={(event) =>
                                    setSettings((current) => ({
                                        ...current,
                                        [field.key]: event.target.value,
                                    }))
                                }
                                className={textareaClassName}
                            />
                        ) : (
                            <Input
                                id={field.key}
                                value={settings[field.key]}
                                onChange={(event) =>
                                    setSettings((current) => ({
                                        ...current,
                                        [field.key]: event.target.value,
                                    }))
                                }
                            />
                        )}
                    </div>
                ))}
            </div>
            {error ? (
                <p className="text-sm text-destructive" role="alert">
                    {error}
                </p>
            ) : null}
            {saved ? (
                <p className="text-sm text-muted-foreground">Uloženo.</p>
            ) : null}
            <Button type="submit" disabled={pending}>
                {pending ? "Ukládám…" : "Uložit nastavení"}
            </Button>
        </form>
    );
}
