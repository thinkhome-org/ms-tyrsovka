"use client";

import { useCallback, useRef, useState } from "react";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { coverSrc } from "@/lib/cms/media";

const ACCEPT = "image/jpeg,image/png,image/webp";

export async function uploadCmsImage(file: File): Promise<{ key: string; url: string }> {
    if (file.size > 5 * 1024 * 1024) {
        throw new Error("Obrázek může mít nejvýše 5 MB.");
    }
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        throw new Error("Povolené formáty jsou JPEG, PNG a WebP.");
    }
    const form = new FormData();
    form.append("file", file);
    const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: form,
    });
    const payload = (await response.json().catch(() => null)) as
        | { key?: string; url?: string; error?: string }
        | null;
    if (!response.ok || !payload?.key || !payload.url) {
        throw new Error(payload?.error || "Nahrání se nepovedlo.");
    }
    return { key: payload.key, url: payload.url };
}

export function CoverDropzone({
    coverKey,
    onChange,
}: {
    coverKey: string | null;
    onChange: (key: string | null) => void;
}) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const preview = coverSrc(coverKey);

    const handleFile = useCallback(
        async (file: File | undefined) => {
            if (!file) return;
            setError("");
            setPending(true);
            try {
                const uploaded = await uploadCmsImage(file);
                onChange(uploaded.key);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Nahrání se nepovedlo.");
            } finally {
                setPending(false);
            }
        },
        [onChange],
    );

    return (
        <div className="flex flex-col gap-2">
            <button
                type="button"
                onClick={() => inputRef.current?.click()}
                onDragOver={(event) => {
                    event.preventDefault();
                    setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(event) => {
                    event.preventDefault();
                    setDragOver(false);
                    void handleFile(event.dataTransfer.files[0]);
                }}
                className={cn(
                    "relative flex min-h-48 w-full overflow-hidden rounded-2xl border border-dashed border-border bg-card text-left transition-colors",
                    dragOver && "border-primary bg-accent/60",
                )}
            >
                {preview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={preview}
                        alt=""
                        className="absolute inset-0 size-full object-cover"
                    />
                ) : null}
                <span
                    className={cn(
                        "relative z-10 m-auto flex max-w-xs flex-col items-center gap-2 px-6 py-8 text-center",
                        preview && "rounded-xl bg-background/85 px-5 py-4 shadow-sm",
                    )}
                >
                    <ImageIcon className="size-5 text-primary" />
                    <span className="font-heading text-lg font-semibold tracking-tight">
                        {pending ? "Nahrávám fotku…" : "Položit fotografii"}
                    </span>
                    <span className="text-xs leading-relaxed text-muted-foreground">
                        JPEG, PNG nebo WebP, nejvýše 5 MB. Klikněte nebo přetáhněte.
                    </span>
                </span>
            </button>
            <input
                ref={inputRef}
                type="file"
                accept={ACCEPT}
                className="sr-only"
                onChange={(event) => {
                    void handleFile(event.target.files?.[0]);
                    event.target.value = "";
                }}
            />
            {coverKey ? (
                <button
                    type="button"
                    className="self-start text-sm text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
                    onClick={() => onChange(null)}
                >
                    Odebrat fotku
                </button>
            ) : null}
            {error ? (
                <p className="text-sm text-destructive" role="alert">
                    {error}
                </p>
            ) : null}
        </div>
    );
}
