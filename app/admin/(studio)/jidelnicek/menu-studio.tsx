"use client";

import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, ImageIcon } from "lucide-react";
import type { MenuFile } from "@/lib/cms/menu";
import { addDays, formatDateCs } from "@/lib/cms/dates";
import { coverSrc } from "@/lib/cms/media";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const ACCEPT = "application/pdf,image/png,image/jpeg,image/webp,.pdf,.png,.jpg,.jpeg,.webp";
const MAX_BYTES = 15 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
    "application/pdf",
    "image/png",
    "image/jpeg",
    "image/webp",
]);

function isAllowedMenuFile(file: File): boolean {
    if (ALLOWED_TYPES.has(file.type)) return true;
    return /\.(pdf|png|jpe?g|webp)$/i.test(file.name);
}

function isPdf(file: MenuFile): boolean {
    return file.file_key.toLowerCase().endsWith(".pdf");
}

function WeekSlot({
    title,
    weekStart,
    initialFile,
}: {
    title: string;
    weekStart: string;
    initialFile: MenuFile | null;
}) {
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState(initialFile);
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const preview = file && !isPdf(file) ? coverSrc(file.file_key) : null;
    const pdfUrl = file && isPdf(file) ? coverSrc(file.file_key) : null;

    const upload = useCallback(
        async (nextFile: File | undefined) => {
            if (!nextFile) return;
            setError("");
            if (!isAllowedMenuFile(nextFile)) {
                setError("Povolené formáty jsou PDF, PNG, JPEG a WebP.");
                return;
            }
            if (nextFile.size > MAX_BYTES) {
                setError("Soubor může mít nejvýše 15 MB.");
                return;
            }
            setPending(true);
            try {
                const form = new FormData();
                form.append("file", nextFile);
                form.append("week_start", weekStart);
                const response = await fetch("/api/admin/jidelnicek", {
                    method: "POST",
                    body: form,
                });
                const data = (await response.json().catch(() => null)) as
                    | { item?: MenuFile; error?: string }
                    | null;
                if (!response.ok || !data?.item) {
                    setError(data?.error || "Nahrání se nepovedlo.");
                    return;
                }
                setFile(data.item);
                router.refresh();
            } finally {
                setPending(false);
            }
        },
        [router, weekStart],
    );

    async function remove() {
        setPending(true);
        setError("");
        try {
            const response = await fetch(
                `/api/admin/jidelnicek?week=${encodeURIComponent(weekStart)}`,
                { method: "DELETE" },
            );
            const data = (await response.json().catch(() => null)) as
                | { error?: string }
                | null;
            if (!response.ok) {
                setError(data?.error || "Odstranění se nepovedlo.");
                return;
            }
            setFile(null);
            router.refresh();
        } finally {
            setPending(false);
        }
    }

    return (
        <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
            <h2 className="font-heading text-2xl font-semibold tracking-tight">{title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
                {formatDateCs(weekStart)} – {formatDateCs(addDays(weekStart, 4))}
            </p>

            <button
                type="button"
                disabled={pending}
                onClick={() => inputRef.current?.click()}
                onDragOver={(event) => {
                    event.preventDefault();
                    setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(event) => {
                    event.preventDefault();
                    setDragOver(false);
                    void upload(event.dataTransfer.files[0]);
                }}
                className={cn(
                    "mt-5 flex min-h-56 w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-border bg-background px-6 py-8 text-center transition-colors",
                    dragOver && "border-primary bg-accent/60",
                    pending && "opacity-70",
                )}
            >
                {preview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={preview}
                        alt=""
                        className="mb-4 max-h-64 w-full rounded-xl object-contain"
                    />
                ) : pdfUrl ? (
                    <FileText className="mb-3 size-8 text-primary" />
                ) : (
                    <ImageIcon className="mb-3 size-5 text-primary" />
                )}
                <span className="font-heading text-lg font-semibold tracking-tight">
                    {pending
                        ? "Nahrávám…"
                        : file
                          ? "Nahradit soubor"
                          : "Vložit jídelníček"}
                </span>
                <span className="mt-2 max-w-xs text-xs leading-relaxed text-muted-foreground">
                    PDF, PNG, JPEG nebo WebP, nejvýše 15 MB. Přetáhněte soubor sem,
                    nebo klikněte a vyberte ho.
                </span>
                {file ? (
                    <span className="mt-3 max-w-full truncate text-sm font-medium text-foreground">
                        {file.file_name || "Nahraný soubor"}
                    </span>
                ) : null}
            </button>
            <input
                ref={inputRef}
                type="file"
                accept={ACCEPT}
                className="sr-only"
                onChange={(event) => {
                    void upload(event.target.files?.[0]);
                    event.target.value = "";
                }}
            />

            <div className="mt-4 flex flex-wrap items-center gap-3">
                {pdfUrl ? (
                    <a
                        href={pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-primary underline underline-offset-2"
                    >
                        Otevřít PDF
                    </a>
                ) : null}
                {file ? (
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={pending}
                        onClick={() => void remove()}
                    >
                        Odebrat
                    </Button>
                ) : null}
            </div>
            {error ? (
                <p className="mt-3 text-sm text-destructive" role="alert">
                    {error}
                </p>
            ) : null}
        </section>
    );
}

export function MenuStudio({
    current,
    next,
    currentStart,
    nextStart,
}: {
    current: MenuFile | null;
    next: MenuFile | null;
    currentStart: string;
    nextStart: string;
}) {
    return (
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <WeekSlot title="Aktuální týden" weekStart={currentStart} initialFile={current} />
            <WeekSlot title="Příští týden" weekStart={nextStart} initialFile={next} />
        </div>
    );
}
