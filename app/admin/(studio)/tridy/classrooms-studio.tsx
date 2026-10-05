"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ImageIcon } from "lucide-react";
import type { ClassroomDraft } from "@/lib/cms/classrooms";
import { coverSrc } from "@/lib/cms/media";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { textareaClassName } from "../form-classes";
import { uploadCmsImage } from "../cover-dropzone";

export function ClassroomsStudio({ classes }: { classes: ClassroomDraft[] }) {
    const [activeSlug, setActiveSlug] = useState(classes[0]?.slug ?? "");
    const active = classes.find((item) => item.slug === activeSlug) ?? classes[0];

    return (
        <div className="mt-10 grid min-w-0 gap-8 lg:grid-cols-[16rem_minmax(0,1fr)]">
            <aside className="min-w-0">
                <ul className="flex max-w-full gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
                    {classes.map((item) => {
                        const selected = item.slug === active?.slug;
                        return (
                            <li key={item.slug} className="shrink-0 lg:shrink">
                                <button
                                    type="button"
                                    onClick={() => setActiveSlug(item.slug)}
                                    className={cn(
                                        "w-full rounded-xl px-3 py-2 text-left text-sm transition-colors",
                                        selected
                                            ? "bg-foreground text-background"
                                            : "hover:bg-accent",
                                    )}
                                >
                                    <span aria-hidden="true">{item.symbol}</span> {item.fullName}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </aside>
            {active ? (
                <div className="min-w-0">
                    <ClassroomEditor key={active.slug} classroom={active} />
                </div>
            ) : null}
        </div>
    );
}

function ClassroomEditor({ classroom }: { classroom: ClassroomDraft }) {
    const router = useRouter();
    const [draft, setDraft] = useState(classroom);
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);
    const [uploading, setUploading] = useState(false);

    function setField<K extends keyof ClassroomDraft>(key: K, value: ClassroomDraft[K]) {
        setDraft((current) => ({ ...current, [key]: value }));
    }

    async function upload(file: File | undefined) {
        if (!file) return;
        setUploading(true);
        setError("");
        try {
            const uploaded = await uploadCmsImage(file, "tridy");
            setDraft((current) => ({
                ...current,
                imageKey: uploaded.key,
                image: coverSrc(uploaded.key) ?? current.image,
            }));
        } catch (err) {
            setError(err instanceof Error ? err.message : "Nahrání se nepovedlo.");
        } finally {
            setUploading(false);
        }
    }

    async function save() {
        setPending(true);
        setError("");
        try {
            const response = await fetch(`/api/admin/kontakty/tridy/${classroom.slug}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: draft.email,
                    phone: draft.phone || null,
                    age: draft.age,
                    location: draft.location,
                    teachers: draft.teachers,
                    body: draft.body,
                    note: draft.note,
                    dayText: draft.dayText,
                    imageKey: draft.imageKey,
                }),
            });
            const data = (await response.json().catch(() => null)) as
                | { item?: ClassroomDraft; error?: string }
                | null;
            if (!response.ok || !data?.item) {
                setError(data?.error || "Uložení se nepovedlo.");
                return;
            }
            setDraft({ ...classroom, ...data.item, defaultImage: classroom.defaultImage });
            router.refresh();
        } finally {
            setPending(false);
        }
    }

    return (
        <form
            className="space-y-5"
            onSubmit={(event) => {
                event.preventDefault();
                void save();
            }}
        >
            <div>
                <h2 className="font-heading text-3xl font-semibold tracking-tight">
                    <span aria-hidden="true">{classroom.symbol}</span> {classroom.fullName}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                    Učitelky pište každou na vlastní řádek. Odstavce oddělte prázdným řádkem.
                </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-[12rem_minmax(0,1fr)] sm:items-center">
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
                    {draft.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={draft.image} alt="" className="size-full object-contain p-4" />
                    ) : (
                        <ImageIcon className="absolute inset-0 m-auto size-6 text-muted-foreground" />
                    )}
                </div>
                <div className="flex min-w-0 flex-wrap gap-2">
                    <input
                        id={`${classroom.slug}-photo`}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="sr-only"
                        disabled={uploading || pending}
                        onChange={(event) => {
                            void upload(event.target.files?.[0]);
                            event.target.value = "";
                        }}
                    />
                    <Button
                        type="button"
                        variant="outline"
                        disabled={uploading || pending}
                        onClick={() =>
                            document.getElementById(`${classroom.slug}-photo`)?.click()
                        }
                    >
                        {uploading ? "Nahrávám…" : "Vybrat fotku"}
                    </Button>
                    {draft.imageKey ? (
                        <Button
                            type="button"
                            variant="outline"
                            disabled={pending}
                            onClick={() =>
                                setDraft((current) => ({
                                    ...current,
                                    imageKey: "",
                                    image: current.defaultImage,
                                }))
                            }
                        >
                            Původní obrázek
                        </Button>
                    ) : null}
                    <p className="w-full text-xs text-muted-foreground">
                        {uploading
                            ? "Nahrávám fotku…"
                            : "JPEG, PNG nebo WebP, nejvýše 5 MB. Změna se zveřejní až po uložení."}
                    </p>
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Věk" id={`${classroom.slug}-age`}>
                    <Input
                        id={`${classroom.slug}-age`}
                        value={draft.age}
                        onChange={(event) => setField("age", event.target.value)}
                    />
                </Field>
                <Field label="Umístění" id={`${classroom.slug}-location`}>
                    <Input
                        id={`${classroom.slug}-location`}
                        value={draft.location}
                        onChange={(event) => setField("location", event.target.value)}
                    />
                </Field>
                <Field label="E-mail" id={`${classroom.slug}-email`}>
                    <Input
                        id={`${classroom.slug}-email`}
                        type="email"
                        value={draft.email}
                        required
                        onChange={(event) => setField("email", event.target.value)}
                    />
                </Field>
                <Field label="Telefon" id={`${classroom.slug}-phone`}>
                    <Input
                        id={`${classroom.slug}-phone`}
                        value={draft.phone}
                        onChange={(event) => setField("phone", event.target.value)}
                    />
                </Field>
            </div>

            <Field label="Učitelky" id={`${classroom.slug}-teachers`}>
                <textarea
                    id={`${classroom.slug}-teachers`}
                    value={draft.teachers}
                    rows={4}
                    className={textareaClassName}
                    onChange={(event) => setField("teachers", event.target.value)}
                />
            </Field>
            <Field label="Text na stránce" id={`${classroom.slug}-body`}>
                <textarea
                    id={`${classroom.slug}-body`}
                    value={draft.body}
                    rows={8}
                    className={textareaClassName}
                    onChange={(event) => setField("body", event.target.value)}
                />
            </Field>
            <Field label="Poznámka pod učitelkami" id={`${classroom.slug}-note`}>
                <textarea
                    id={`${classroom.slug}-note`}
                    value={draft.note}
                    rows={3}
                    className={textareaClassName}
                    onChange={(event) => setField("note", event.target.value)}
                />
            </Field>
            <Field label="Den ve třídě" id={`${classroom.slug}-day`}>
                <textarea
                    id={`${classroom.slug}-day`}
                    value={draft.dayText}
                    rows={4}
                    className={textareaClassName}
                    onChange={(event) => setField("dayText", event.target.value)}
                />
            </Field>

            {error ? (
                <p className="text-sm text-destructive" role="alert">
                    {error}
                </p>
            ) : null}
            <Button type="submit" disabled={pending || uploading}>
                {pending ? "Ukládám…" : "Uložit stránku třídy"}
            </Button>
        </form>
    );
}

function Field({
    label,
    id,
    children,
}: {
    label: string;
    id: string;
    children: ReactNode;
}) {
    return (
        <div className="flex flex-col gap-2">
            <Label htmlFor={id}>{label}</Label>
            {children}
        </div>
    );
}
