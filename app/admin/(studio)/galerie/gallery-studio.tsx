"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp, ImagePlus, Trash2 } from "lucide-react";
import type { CmsGalleryAlbum, CmsGalleryPhoto } from "@/lib/cms/gallery";
import { coverSrc } from "@/lib/cms/media";
import { uploadCmsImage } from "../cover-dropzone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

async function readError(response: Response, fallback: string) {
    const data = (await response.json().catch(() => null)) as { error?: string } | null;
    return data?.error || fallback;
}

export function GalleryStudio({ albums }: { albums: CmsGalleryAlbum[] }) {
    const router = useRouter();
    const [activeId, setActiveId] = useState(albums[0]?.id ?? "");
    const [title, setTitle] = useState("");
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);
    const [uploading, setUploading] = useState("");
    const active = albums.find((album) => album.id === activeId) ?? albums[0];

    async function createAlbum() {
        setPending(true);
        setError("");
        try {
            const response = await fetch("/api/admin/galerie", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title }),
            });
            const data = (await response.json().catch(() => null)) as
                | { album?: CmsGalleryAlbum; error?: string }
                | null;
            if (!response.ok || !data?.album) {
                setError(data?.error || "Album se nepodařilo vytvořit.");
                return;
            }
            setTitle("");
            setActiveId(data.album.id);
            router.refresh();
        } finally {
            setPending(false);
        }
    }

    async function uploadFiles(files: FileList | File[]) {
        if (!active) return;
        const list = [...files];
        if (list.length === 0) return;
        setError("");
        for (const [index, file] of list.entries()) {
            setUploading(`Nahrávám ${index + 1} z ${list.length}…`);
            try {
                const uploaded = await uploadCmsImage(file, "galerie");
                const response = await fetch(`/api/admin/galerie/${active.id}/fotky`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ src: uploaded.key, alt: active.title }),
                });
                if (!response.ok) {
                    setError(await readError(response, "Fotku se nepodařilo uložit."));
                    break;
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "Nahrání se nepovedlo.");
                break;
            }
        }
        setUploading("");
        router.refresh();
    }

    return (
        <div className="mt-10 grid gap-8 lg:grid-cols-[18rem_minmax(0,1fr)]">
            <aside className="space-y-4">
                <form
                    className="space-y-3 rounded-2xl border border-border bg-card p-4"
                    onSubmit={(event) => {
                        event.preventDefault();
                        void createAlbum();
                    }}
                >
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="album-title">Nové album</Label>
                        <Input
                            id="album-title"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            placeholder="např. Vánoce 2026"
                            required
                        />
                    </div>
                    <Button type="submit" disabled={pending || !title.trim()}>
                        {pending ? "Přidávám…" : "Přidat album"}
                    </Button>
                </form>

                {albums.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Zatím tu není žádné album.</p>
                ) : (
                    <ul className="space-y-1">
                        {albums.map((album) => {
                            const selected = album.id === active?.id;
                            return (
                                <li key={album.id}>
                                    <button
                                        type="button"
                                        onClick={() => setActiveId(album.id)}
                                        className={cn(
                                            "flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors",
                                            selected
                                                ? "bg-foreground text-background"
                                                : "hover:bg-accent",
                                        )}
                                    >
                                        <span className="min-w-0 truncate font-medium">
                                            {album.title}
                                        </span>
                                        <span className="shrink-0 tabular-nums opacity-70">
                                            {album.photos.length}
                                        </span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </aside>

            <section className="min-w-0">
                {error ? (
                    <p className="mb-4 text-sm text-destructive" role="alert">
                        {error}
                    </p>
                ) : null}
                {active ? (
                    <AlbumEditor
                        key={active.id}
                        album={active}
                        albumCount={albums.length}
                        uploading={uploading}
                        onError={setError}
                        onUpload={uploadFiles}
                    />
                ) : (
                    <p className="text-sm text-muted-foreground">
                        Nejdřív vytvořte album, potom do něj přidejte fotky.
                    </p>
                )}
            </section>
        </div>
    );
}

function AlbumEditor({
    album,
    albumCount,
    uploading,
    onError,
    onUpload,
}: {
    album: CmsGalleryAlbum;
    albumCount: number;
    uploading: string;
    onError: (message: string) => void;
    onUpload: (files: FileList | File[]) => Promise<void>;
}) {
    const router = useRouter();
    const [title, setTitle] = useState(album.title);
    const [dragOver, setDragOver] = useState(false);
    const [busy, setBusy] = useState<string | null>(null);

    async function saveTitle() {
        const next = title.trim();
        if (!next || next === album.title) {
            setTitle(album.title);
            return;
        }
        onError("");
        const response = await fetch(`/api/admin/galerie/${album.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: next }),
        });
        if (!response.ok) {
            onError(await readError(response, "Název se nepodařilo uložit."));
            setTitle(album.title);
            return;
        }
        router.refresh();
    }

    async function moveAlbum(direction: "up" | "down") {
        setBusy(`album-${direction}`);
        onError("");
        try {
            const response = await fetch(`/api/admin/galerie/${album.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ direction }),
            });
            if (!response.ok) {
                onError(await readError(response, "Pořadí se nepodařilo změnit."));
                return;
            }
            router.refresh();
        } finally {
            setBusy(null);
        }
    }

    async function removeAlbum() {
        if (!window.confirm(`Smazat album „${album.title}“ i všechny jeho fotky?`)) {
            return;
        }
        setBusy("album-delete");
        onError("");
        try {
            const response = await fetch(`/api/admin/galerie/${album.id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                onError(await readError(response, "Album se nepodařilo smazat."));
                return;
            }
            router.refresh();
        } finally {
            setBusy(null);
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <Label htmlFor="active-album-title">Název alba</Label>
                    <Input
                        id="active-album-title"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        onBlur={() => {
                            void saveTitle();
                        }}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                event.preventDefault();
                                event.currentTarget.blur();
                            }
                        }}
                    />
                </div>
                <div className="flex gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        aria-label="Posunout album výš"
                        disabled={albumCount < 2 || busy !== null}
                        onClick={() => void moveAlbum("up")}
                    >
                        <ChevronUp />
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        aria-label="Posunout album níž"
                        disabled={albumCount < 2 || busy !== null}
                        onClick={() => void moveAlbum("down")}
                    >
                        <ChevronDown />
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        disabled={busy !== null}
                        onClick={() => void removeAlbum()}
                    >
                        <Trash2 />
                        Smazat album
                    </Button>
                </div>
            </div>

            <label
                className={cn(
                    "relative flex cursor-pointer flex-col items-center gap-2 rounded-2xl border border-dashed border-border bg-card px-6 py-8 text-center transition-colors",
                    dragOver && "border-primary bg-accent/60",
                    uploading && "pointer-events-none opacity-70",
                )}
                onDragOver={(event) => {
                    event.preventDefault();
                    setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(event) => {
                    event.preventDefault();
                    setDragOver(false);
                    void onUpload(event.dataTransfer.files);
                }}
            >
                <ImagePlus className="size-5 text-primary" />
                <span className="font-heading text-lg font-semibold tracking-tight">
                    {uploading || "Přidat fotky"}
                </span>
                <span className="pointer-events-none max-w-md text-xs leading-relaxed text-muted-foreground">
                    Klepněte a vyberte fotky z telefonu. Můžete jich vzít víc
                    najednou, velké snímky se před odesláním zmenší.
                </span>
                <input
                    type="file"
                    accept="image/*,.heic,.heif,.jpg,.jpeg,.png,.webp"
                    multiple
                    aria-label="Přidat fotky"
                    className="absolute inset-0 z-20 size-full cursor-pointer opacity-0"
                    onChange={(event) => {
                        if (event.target.files) void onUpload(event.target.files);
                        event.target.value = "";
                    }}
                />
            </label>

            {album.photos.length === 0 ? (
                <p className="text-sm text-muted-foreground">V albu zatím není žádná fotka.</p>
            ) : (
                <ul className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4">
                    {album.photos.map((photo, index) => (
                        <PhotoCard
                            key={`${photo.id}:${photo.alt}`}
                            photo={photo}
                            isFirst={index === 0}
                            isLast={index === album.photos.length - 1}
                            onError={onError}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}

function PhotoCard({
    photo,
    isFirst,
    isLast,
    onError,
}: {
    photo: CmsGalleryPhoto;
    isFirst: boolean;
    isLast: boolean;
    onError: (message: string) => void;
}) {
    const router = useRouter();
    const [alt, setAlt] = useState(photo.alt);
    const [inHero, setInHero] = useState(Boolean(photo.show_in_hero));
    const [busy, setBusy] = useState(false);
    const preview = coverSrc(photo.src);

    async function saveAlt() {
        const next = alt.trim();
        if (next === photo.alt) return;
        setBusy(true);
        onError("");
        try {
            const response = await fetch(`/api/admin/galerie/fotky/${photo.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ alt: next }),
            });
            if (!response.ok) {
                onError(await readError(response, "Popisek se nepodařilo uložit."));
                setAlt(photo.alt);
                return;
            }
            router.refresh();
        } finally {
            setBusy(false);
        }
    }

    async function toggleHero(next: boolean) {
        setInHero(next);
        setBusy(true);
        onError("");
        try {
            const response = await fetch(`/api/admin/galerie/fotky/${photo.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ show_in_hero: next }),
            });
            if (!response.ok) {
                setInHero(!next);
                onError(await readError(response, "Úvodní fotku se nepodařilo uložit."));
                return;
            }
            router.refresh();
        } finally {
            setBusy(false);
        }
    }

    async function move(direction: "up" | "down") {
        setBusy(true);
        onError("");
        try {
            const response = await fetch(`/api/admin/galerie/fotky/${photo.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ direction }),
            });
            if (!response.ok) {
                onError(await readError(response, "Pořadí se nepodařilo změnit."));
                return;
            }
            router.refresh();
        } finally {
            setBusy(false);
        }
    }

    async function remove() {
        setBusy(true);
        onError("");
        try {
            const response = await fetch(`/api/admin/galerie/fotky/${photo.id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                onError(await readError(response, "Fotku se nepodařilo smazat."));
                return;
            }
            router.refresh();
        } finally {
            setBusy(false);
        }
    }

    return (
        <li className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="aspect-4/3 bg-muted">
                {preview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={preview} alt="" className="size-full object-cover" />
                ) : null}
            </div>
            <div className="space-y-2 p-2">
                <Input
                    value={alt}
                    aria-label="Popisek fotky"
                    disabled={busy}
                    onChange={(event) => setAlt(event.target.value)}
                    onBlur={() => {
                        void saveAlt();
                    }}
                />
                <label className="flex items-center gap-2 text-xs font-medium text-foreground">
                    <input
                        type="checkbox"
                        className="size-4 accent-primary"
                        checked={inHero}
                        disabled={busy}
                        onChange={(event) => void toggleHero(event.target.checked)}
                    />
                    Úvod
                </label>
                <div className="flex gap-1">
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label="Posunout fotku dopředu"
                        disabled={busy || isFirst}
                        onClick={() => void move("up")}
                    >
                        <ChevronUp />
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label="Posunout fotku dozadu"
                        disabled={busy || isLast}
                        onClick={() => void move("down")}
                    >
                        <ChevronDown />
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="ml-auto"
                        aria-label="Smazat fotku"
                        disabled={busy}
                        onClick={() => void remove()}
                    >
                        <Trash2 />
                    </Button>
                </div>
            </div>
        </li>
    );
}
