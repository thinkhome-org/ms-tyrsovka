"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Notice, NoticeCategory } from "@/lib/cms/notices";
import { noticeHref, noticeKind } from "@/lib/cms/notice-view";
import { formatDateCs, toDateInput } from "@/lib/cms/dates";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NOTICE_CATEGORY_LABELS, selectClassName } from "../form-classes";

const CATEGORIES = Object.keys(NOTICE_CATEGORY_LABELS) as NoticeCategory[];

export function NoticesStudio({ items }: { items: Notice[] }) {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState<NoticeCategory>("dokumenty");
    const [href, setHref] = useState("");
    const [expiresAt, setExpiresAt] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);
    const [deleting, setDeleting] = useState<string | null>(null);

    async function create() {
        setPending(true);
        setError("");
        try {
            const form = new FormData();
            form.append("title", title);
            form.append("category", category);
            form.append("href", href);
            form.append("expires_at", expiresAt);
            if (file) form.append("file", file);
            const response = await fetch("/api/admin/uredni-deska", {
                method: "POST",
                body: form,
            });
            const data = (await response.json().catch(() => null)) as
                | { error?: string }
                | null;
            if (!response.ok) {
                setError(data?.error || "Uložení se nepovedlo.");
                return;
            }
            setTitle("");
            setHref("");
            setExpiresAt("");
            setFile(null);
            router.refresh();
        } finally {
            setPending(false);
        }
    }

    async function remove(id: string) {
        setDeleting(id);
        setError("");
        try {
            const response = await fetch(`/api/admin/uredni-deska/${id}`, {
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
                className="grid gap-4 rounded-2xl border border-border bg-card p-5 sm:p-6"
                onSubmit={(event) => {
                    event.preventDefault();
                    void create();
                }}
            >
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="notice-title">Název dokumentu</Label>
                        <Input
                            id="notice-title"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            placeholder="Např. Rozpočet 2026"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="notice-category">Kategorie</Label>
                        <select
                            id="notice-category"
                            value={category}
                            onChange={(event) =>
                                setCategory(event.target.value as NoticeCategory)
                            }
                            className={selectClassName}
                        >
                            {CATEGORIES.map((value) => (
                                <option key={value} value={value}>
                                    {NOTICE_CATEGORY_LABELS[value]}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="notice-href">Odkaz (když nahráváte soubor, nemusí)</Label>
                        <Input
                            id="notice-href"
                            value={href}
                            onChange={(event) => setHref(event.target.value)}
                            placeholder="https://…"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="notice-expires">Vyvěsit do</Label>
                        <Input
                            id="notice-expires"
                            type="date"
                            value={expiresAt}
                            onChange={(event) => setExpiresAt(event.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2 md:col-span-2">
                        <Label htmlFor="notice-file">Soubor PDF / DOC</Label>
                        <Input
                            id="notice-file"
                            type="file"
                            accept=".pdf,.doc,.docx,application/pdf"
                            onChange={(event) =>
                                setFile(event.target.files?.[0] ?? null)
                            }
                        />
                    </div>
                </div>
                {error ? (
                    <p className="text-sm text-destructive" role="alert">
                        {error}
                    </p>
                ) : null}
                <Button type="submit" disabled={pending || !title.trim()}>
                    {pending ? "Ukládám…" : "Uložit a vyvěsit"}
                </Button>
            </form>

            {items.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                    Na desce zatím nic není.
                </p>
            ) : (
                <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
                    {items.map((item) => {
                        const href = noticeHref(item);
                        return (
                            <li
                                key={item.id}
                                className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
                            >
                                <div className="min-w-0">
                                    {href ? (
                                        <a
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-medium text-foreground underline-offset-2 hover:underline"
                                        >
                                            {item.title}
                                        </a>
                                    ) : (
                                        <p className="font-medium">{item.title}</p>
                                    )}
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {NOTICE_CATEGORY_LABELS[item.category]} ·{" "}
                                        {noticeKind(item)}
                                        {item.expires_at
                                            ? ` · do ${formatDateCs(toDateInput(item.expires_at) || item.expires_at)}`
                                            : ""}
                                    </p>
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
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
