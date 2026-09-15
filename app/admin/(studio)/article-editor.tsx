"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Aktualita } from "@/lib/cms/aktuality";
import { toDateInput, todayIsoDate } from "@/lib/cms/dates";
import { coverSrc } from "@/lib/cms/media";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AktualitaBody } from "@/app/components/aktualita-body";
import { CoverDropzone } from "./cover-dropzone";
import { RichTextEditor } from "./rich-text-editor";

type SaveStatus = "draft" | "published";

export function ArticleEditor({ initial }: { initial?: Aktualita }) {
    const router = useRouter();
    const [title, setTitle] = useState(initial?.title ?? "");
    const [slug, setSlug] = useState(initial?.slug ?? "");
    const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
    const [bodyHtml, setBodyHtml] = useState(initial?.body_html ?? "");
    const [coverKey, setCoverKey] = useState<string | null>(initial?.cover_key ?? null);
    const [publishedAt, setPublishedAt] = useState(
        toDateInput(initial?.published_at) || todayIsoDate(),
    );
    const [error, setError] = useState("");
    const [pending, setPending] = useState<SaveStatus | "delete" | null>(null);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const cover = coverSrc(coverKey);

    async function save(status: SaveStatus) {
        setPending(status);
        setError("");
        const payload = {
            title,
            slug,
            excerpt,
            body_html: bodyHtml,
            cover_key: coverKey,
            status,
            published_at: publishedAt || null,
        };
        try {
            const response = await fetch(
                initial ? `/api/admin/aktuality/${initial.id}` : "/api/admin/aktuality",
                {
                    method: initial ? "PATCH" : "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                },
            );
            const data = (await response.json().catch(() => null)) as
                | { item?: Aktualita; error?: string }
                | null;
            if (!response.ok || !data?.item) {
                setError(data?.error || "Uložení se nepovedlo.");
                return;
            }
            if (!initial) {
                router.replace(`/admin/${data.item.id}`);
            }
            router.refresh();
        } finally {
            setPending(null);
        }
    }

    async function remove() {
        if (!initial) return;
        setPending("delete");
        setError("");
        try {
            const response = await fetch(`/api/admin/aktuality/${initial.id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                const data = (await response.json().catch(() => null)) as
                    | { error?: string }
                    | null;
                setError(data?.error || "Odstranění se nepovedlo.");
                return;
            }
            router.push("/admin");
            router.refresh();
        } finally {
            setPending(null);
            setConfirmDelete(false);
        }
    }

    return (
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.95fr)]">
            <div className="flex flex-col gap-5">
                <CoverDropzone coverKey={coverKey} onChange={setCoverKey} />
                <div className="flex flex-col gap-2">
                    <Label htmlFor="title">Nadpis</Label>
                    <Input
                        id="title"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        placeholder="Co se ve školce děje"
                    />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="slug">Adresa na webu</Label>
                        <Input
                            id="slug"
                            value={slug}
                            onChange={(event) => setSlug(event.target.value)}
                            placeholder="doplní se z nadpisu"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="publishedAt">Datum</Label>
                        <Input
                            id="publishedAt"
                            type="date"
                            value={publishedAt}
                            onChange={(event) => setPublishedAt(event.target.value)}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="excerpt">Perex na kartě</Label>
                    <textarea
                        id="excerpt"
                        value={excerpt}
                        onChange={(event) => setExcerpt(event.target.value)}
                        rows={3}
                        placeholder="Krátká věta, kterou uvidí rodiče v přehledu. Když ji necháte prázdnou, vezme se začátek textu."
                        className="min-h-24 w-full rounded-md border border-input bg-card px-3.5 py-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Label>Text</Label>
                    <RichTextEditor value={bodyHtml} onChange={setBodyHtml} />
                </div>
                {error ? (
                    <p className="text-sm text-destructive" role="alert">
                        {error}
                    </p>
                ) : null}
                <div className="flex flex-wrap items-center gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        disabled={pending !== null || !title.trim()}
                        onClick={() => void save("draft")}
                    >
                        {pending === "draft" ? "Ukládám…" : "Uložit koncept"}
                    </Button>
                    <Button
                        type="button"
                        disabled={pending !== null || !title.trim()}
                        onClick={() => void save("published")}
                    >
                        {pending === "published" ? "Publikuji…" : "Publikovat"}
                    </Button>
                    {initial ? (
                        <Button
                            type="button"
                            variant="ghost"
                            className="text-destructive hover:text-destructive"
                            disabled={pending !== null}
                            onClick={() => setConfirmDelete(true)}
                        >
                            Odstranit
                        </Button>
                    ) : null}
                </div>
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
                <p className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                    Jak to uvidí rodiče
                </p>
                <article className="mt-3 overflow-hidden rounded-2xl border border-border bg-card shadow-[0_16px_50px_-32px_rgba(40,28,12,0.5)]">
                    <div className="relative h-44 bg-muted">
                        {cover ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={cover} alt="" className="size-full object-cover" />
                        ) : (
                            <div className="flex h-full items-center justify-center text-xs uppercase tracking-[0.18em] text-muted-foreground">
                                Fotografie
                            </div>
                        )}
                    </div>
                    <div className="p-5 sm:p-6">
                        <p className="text-xs text-muted-foreground">
                            {publishedAt || "Datum se doplní při zveřejnění"}
                        </p>
                        <h2 className="mt-2 font-heading text-2xl font-semibold tracking-tight">
                            {title || "Nadpis aktuality"}
                        </h2>
                        <div className="mt-4">
                            {bodyHtml ? (
                                <AktualitaBody html={bodyHtml} />
                            ) : (
                                <p className="text-sm leading-relaxed text-muted-foreground">
                                    Náhled se objeví, jakmile začnete psát.
                                </p>
                            )}
                        </div>
                    </div>
                </article>
            </aside>

            {confirmDelete ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 px-4">
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="delete-title"
                        className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl"
                    >
                        <h2 id="delete-title" className="font-heading text-2xl font-semibold">
                            Odstranit aktualitu?
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            Zmizí z webu i z nástěnky. Tuto akci nelze vrátit.
                        </p>
                        <div className="mt-6 flex justify-end gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setConfirmDelete(false)}
                            >
                                Nechat
                            </Button>
                            <Button
                                type="button"
                                disabled={pending !== null}
                                onClick={() => void remove()}
                            >
                                {pending === "delete" ? "Odstraňuji…" : "Odstranit"}
                            </Button>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
