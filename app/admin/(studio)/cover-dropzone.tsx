"use client";

import { useCallback, useState } from "react";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { coverSrc } from "@/lib/cms/media";
import { Button } from "@/components/ui/button";
import { prepareCmsImage } from "./prepare-image";

const ACCEPT = "image/*,.heic,.heif,.jpg,.jpeg,.png,.webp";

export async function uploadCmsImage(
    file: File,
    folder?: "aktuality" | "galerie" | "tridy",
): Promise<{ key: string; url: string }> {
    const prepared = await prepareCmsImage(file);
    const form = new FormData();
    form.append("file", prepared);
    if (folder) form.append("folder", folder);
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

export function ArticlePhotos({
    photos,
    coverKey,
    onChange,
}: {
    photos: string[];
    coverKey: string | null;
    onChange: (next: { photos: string[]; coverKey: string | null }) => void;
}) {
    const [error, setError] = useState("");
    const [pending, setPending] = useState("");
    const [dragOver, setDragOver] = useState(false);

    const handleFiles = useCallback(
        async (list: FileList | File[]) => {
            const files = [...list];
            if (files.length === 0) return;
            if (photos.length >= 30) {
                setError("K jedné aktualitě jde přidat nejvýše 30 fotek.");
                return;
            }
            setError("");
            const uploaded: string[] = [];
            let failed = 0;
            let message = "Nahrání se nepovedlo.";
            setPending(`1 / ${files.length}`);
            try {
                for (let index = 0; index < files.length; index++) {
                    const file = files[index];
                    if (!file) continue;
                    if (photos.length + uploaded.length >= 30) {
                        setError("K jedné aktualitě jde přidat nejvýše 30 fotek.");
                        break;
                    }
                    setPending(`${index + 1} / ${files.length}`);
                    try {
                        const result = await uploadCmsImage(file);
                        uploaded.push(result.key);
                    } catch (err) {
                        failed += 1;
                        message =
                            err instanceof Error ? err.message : "Nahrání se nepovedlo.";
                    }
                }
                if (uploaded.length > 0) {
                    const next = [...photos, ...uploaded];
                    onChange({
                        photos: next,
                        coverKey: coverKey ?? uploaded[0] ?? null,
                    });
                }
                if (failed > 0) setError(message);
            } finally {
                setPending("");
            }
        },
        [coverKey, onChange, photos],
    );

    return (
        <div className="flex flex-col gap-3">
            <div
                onDragOver={(event) => {
                    event.preventDefault();
                    setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(event) => {
                    event.preventDefault();
                    setDragOver(false);
                    void handleFiles(event.dataTransfer.files);
                }}
                className={cn(
                    "relative flex min-h-36 w-full overflow-clip rounded-2xl border border-dashed border-border bg-card text-left transition-colors",
                    dragOver && "border-primary bg-accent/60",
                    pending && "pointer-events-none opacity-70",
                )}
            >
                <span className="relative z-10 m-auto flex max-w-sm flex-col items-center gap-2 px-6 py-8 text-center">
                    <ImageIcon className="size-5 text-primary" />
                    <span className="font-heading text-lg font-semibold tracking-tight">
                        {pending ? `Nahrávám ${pending}…` : "Přidat fotografie"}
                    </span>
                    <span className="text-xs leading-relaxed text-muted-foreground">
                        Vyberte jednu nebo víc fotek z telefonu. Velké snímky se před
                        odesláním zmenší. Jednu potom označte jako hlavní.
                    </span>
                </span>
                <input
                    type="file"
                    accept={ACCEPT}
                    multiple
                    disabled={pending !== ""}
                    aria-label="Vybrat fotky"
                    className="absolute inset-0 z-20 size-full cursor-pointer opacity-0"
                    onChange={(event) => {
                        void handleFiles(event.target.files ?? []);
                        event.target.value = "";
                    }}
                />
            </div>
            {photos.length > 0 ? (
                <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {photos.map((key) => {
                        const src = coverSrc(key);
                        const main = key === coverKey;
                        return (
                            <li
                                key={key}
                                className={cn(
                                    "overflow-hidden rounded-xl border bg-card",
                                    main ? "border-primary" : "border-border",
                                )}
                            >
                                <div className="relative aspect-4/3 bg-muted">
                                    {src ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={src}
                                            alt=""
                                            className="size-full object-cover"
                                        />
                                    ) : null}
                                    {main ? (
                                        <span className="absolute left-2 top-2 rounded-md bg-primary px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-[0.14em] text-primary-foreground">
                                            Hlavní
                                        </span>
                                    ) : null}
                                </div>
                                <div className="flex flex-col gap-1 p-2">
                                    {main ? null : (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                onChange({ photos, coverKey: key })
                                            }
                                        >
                                            Nastavit jako hlavní
                                        </Button>
                                    )}
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="text-destructive hover:text-destructive"
                                        onClick={() => {
                                            const next = photos.filter((item) => item !== key);
                                            onChange({
                                                photos: next,
                                                coverKey:
                                                    coverKey === key
                                                        ? (next[0] ?? null)
                                                        : coverKey,
                                            });
                                        }}
                                    >
                                        Odebrat
                                    </Button>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            ) : null}
            {error ? (
                <p className="text-sm text-destructive" role="alert">
                    {error}
                </p>
            ) : null}
        </div>
    );
}
