"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CLASSROOMS } from "@/lib/classrooms";
import type { ClassroomContact } from "@/lib/cms/classrooms";
import type { Person, PersonSection } from "@/lib/cms/people";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { selectClassName } from "../form-classes";

const SECTION_LABELS: Record<PersonSection, string> = {
    vedeni: "Vedení",
    jidelna: "Jídelna",
};

export function ContactsStudio({
    people,
    classrooms,
}: {
    people: Person[];
    classrooms: ClassroomContact[];
}) {
    const router = useRouter();
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [section, setSection] = useState<PersonSection>("vedeni");
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);
    const [deleting, setDeleting] = useState<string | null>(null);
    const [savingSlug, setSavingSlug] = useState<string | null>(null);
    const [classroomDrafts, setClassroomDrafts] = useState(() =>
        Object.fromEntries(
            classrooms.map((item) => [
                item.slug,
                { email: item.email, phone: item.phone ?? "" },
            ]),
        ),
    );

    async function addPerson() {
        setPending(true);
        setError("");
        try {
            const response = await fetch("/api/admin/kontakty", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    role,
                    email,
                    phone,
                    section,
                    position_order: people.length + 1,
                }),
            });
            const data = (await response.json().catch(() => null)) as
                | { error?: string }
                | null;
            if (!response.ok) {
                setError(data?.error || "Uložení se nepovedlo.");
                return;
            }
            setName("");
            setRole("");
            setEmail("");
            setPhone("");
            router.refresh();
        } finally {
            setPending(false);
        }
    }

    async function removePerson(id: string) {
        setDeleting(id);
        setError("");
        try {
            const response = await fetch(`/api/admin/kontakty/${id}`, {
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

    async function saveClassroom(slug: string) {
        setSavingSlug(slug);
        setError("");
        try {
            const draft = classroomDrafts[slug];
            const response = await fetch(`/api/admin/kontakty/tridy/${slug}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: draft?.email ?? "",
                    phone: draft?.phone || null,
                }),
            });
            if (!response.ok) {
                const data = (await response.json().catch(() => null)) as
                    | { error?: string }
                    | null;
                setError(data?.error || "Uložení se nepovedlo.");
                return;
            }
            router.refresh();
        } finally {
            setSavingSlug(null);
        }
    }

    return (
        <div className="mt-10 space-y-12">
            {error ? (
                <p className="text-sm text-destructive" role="alert">
                    {error}
                </p>
            ) : null}

            <section>
                <h2 className="font-heading text-2xl font-semibold tracking-tight">
                    Vedení a jídelna
                </h2>
                <form
                    className="mt-4 grid gap-3 rounded-2xl border border-border bg-card p-5 sm:grid-cols-2 lg:grid-cols-5"
                    onSubmit={(event) => {
                        event.preventDefault();
                        void addPerson();
                    }}
                >
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="person-name">Jméno</Label>
                        <Input
                            id="person-name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="person-role">Funkce</Label>
                        <Input
                            id="person-role"
                            value={role}
                            onChange={(event) => setRole(event.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="person-email">E-mail</Label>
                        <Input
                            id="person-email"
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="person-phone">Telefon</Label>
                        <Input
                            id="person-phone"
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="person-section">Sekce</Label>
                        <select
                            id="person-section"
                            value={section}
                            onChange={(event) =>
                                setSection(event.target.value as PersonSection)
                            }
                            className={selectClassName}
                        >
                            <option value="vedeni">Vedení</option>
                            <option value="jidelna">Jídelna</option>
                        </select>
                    </div>
                    <div className="lg:col-span-5">
                        <Button type="submit" disabled={pending || !name.trim()}>
                            {pending ? "Přidávám…" : "Přidat kontakt"}
                        </Button>
                    </div>
                </form>

                <ul className="mt-4 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
                    {people.map((person) => (
                        <li
                            key={person.id}
                            className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
                        >
                            <div>
                                <p className="font-medium">{person.name}</p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    {SECTION_LABELS[person.section]}
                                    {person.role ? ` · ${person.role}` : ""}
                                    {person.email ? ` · ${person.email}` : ""}
                                    {person.phone ? ` · ${person.phone}` : ""}
                                </p>
                            </div>
                            <Button
                                type="button"
                                variant="ghost"
                                className="self-start text-destructive hover:text-destructive"
                                disabled={deleting === person.id}
                                onClick={() => void removePerson(person.id)}
                            >
                                {deleting === person.id ? "Mažu…" : "Smazat"}
                            </Button>
                        </li>
                    ))}
                </ul>
            </section>

            <section>
                <h2 className="font-heading text-2xl font-semibold tracking-tight">
                    Kontakty tříd
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                    Mění se jen e-mail a telefon. Popis třídy, učitelky a fotka
                    zůstávají v kódu webu.
                </p>
                <div className="mt-4 grid gap-4">
                    {CLASSROOMS.map((classroom) => {
                        const draft = classroomDrafts[classroom.slug] ?? {
                            email: classroom.email,
                            phone: classroom.phone ?? "",
                        };
                        return (
                            <form
                                key={classroom.slug}
                                className="grid gap-3 rounded-2xl border border-border bg-card p-5 sm:grid-cols-[1fr_1fr_auto] sm:items-end"
                                onSubmit={(event) => {
                                    event.preventDefault();
                                    void saveClassroom(classroom.slug);
                                }}
                            >
                                <div className="sm:col-span-3">
                                    <p className="font-medium">
                                        {classroom.symbol} {classroom.fullName}
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor={`${classroom.slug}-email`}>E-mail</Label>
                                    <Input
                                        id={`${classroom.slug}-email`}
                                        type="email"
                                        value={draft.email}
                                        onChange={(event) =>
                                            setClassroomDrafts((current) => ({
                                                ...current,
                                                [classroom.slug]: {
                                                    ...draft,
                                                    email: event.target.value,
                                                },
                                            }))
                                        }
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor={`${classroom.slug}-phone`}>Telefon</Label>
                                    <Input
                                        id={`${classroom.slug}-phone`}
                                        value={draft.phone}
                                        onChange={(event) =>
                                            setClassroomDrafts((current) => ({
                                                ...current,
                                                [classroom.slug]: {
                                                    ...draft,
                                                    phone: event.target.value,
                                                },
                                            }))
                                        }
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    variant="outline"
                                    disabled={savingSlug === classroom.slug}
                                >
                                    {savingSlug === classroom.slug ? "Ukládám…" : "Uložit"}
                                </Button>
                            </form>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}
