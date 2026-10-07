"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { Person, PersonSection } from "@/lib/cms/people";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { selectClassName } from "../form-classes";

const SECTION_LABELS: Record<PersonSection, string> = {
    vedeni: "Vedení",
    jidelna: "Jídelna",
};

export function ContactsStudio({ people }: { people: Person[] }) {
    const router = useRouter();
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [section, setSection] = useState<PersonSection>("vedeni");
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);
    const [deleting, setDeleting] = useState<string | null>(null);
    const [moving, setMoving] = useState<string | null>(null);

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
                    position_order:
                        people
                            .filter((person) => person.section === section)
                            .reduce(
                                (max, person) => Math.max(max, person.position_order),
                                -1,
                            ) + 1,
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

    async function movePerson(id: string, direction: "up" | "down") {
        setMoving(id);
        setError("");
        try {
            const response = await fetch(`/api/admin/kontakty/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ direction }),
            });
            if (!response.ok) {
                const data = (await response.json().catch(() => null)) as
                    | { error?: string }
                    | null;
                setError(data?.error || "Pořadí se nepodařilo změnit.");
                return;
            }
            router.refresh();
        } finally {
            setMoving(null);
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

                <div className="mt-6 space-y-8">
                    <p className="text-sm text-muted-foreground">
                        Šipkami změníte pořadí v sekci. Stejně se kontakty seřadí na webu.
                    </p>
                    {(["vedeni", "jidelna"] as const).map((group) => {
                        const groupPeople = people.filter(
                            (person) => person.section === group,
                        );
                        if (groupPeople.length === 0) return null;
                        return (
                            <section key={group}>
                                <h3 className="text-lg font-semibold tracking-tight">
                                    {SECTION_LABELS[group]}
                                </h3>
                                <ul className="mt-3 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
                                    {groupPeople.map((person, index) => {
                                        const busy =
                                            moving === person.id || deleting === person.id;
                                        return (
                                            <li
                                                key={person.id}
                                                className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
                                            >
                                                <div>
                                                    <p className="font-medium">{person.name}</p>
                                                    <p className="mt-1 text-sm text-muted-foreground">
                                                        {person.role ? person.role : "Bez funkce"}
                                                        {person.email ? ` · ${person.email}` : ""}
                                                        {person.phone ? ` · ${person.phone}` : ""}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-2 self-start">
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="icon"
                                                        aria-label="Posunout výš"
                                                        disabled={busy || index === 0}
                                                        onClick={() =>
                                                            void movePerson(person.id, "up")
                                                        }
                                                    >
                                                        <ChevronUp />
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="icon"
                                                        aria-label="Posunout níž"
                                                        disabled={
                                                            busy ||
                                                            index === groupPeople.length - 1
                                                        }
                                                        onClick={() =>
                                                            void movePerson(person.id, "down")
                                                        }
                                                    >
                                                        <ChevronDown />
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        className="text-destructive hover:text-destructive"
                                                        disabled={busy}
                                                        onClick={() =>
                                                            void removePerson(person.id)
                                                        }
                                                    >
                                                        {deleting === person.id
                                                            ? "Mažu…"
                                                            : "Smazat"}
                                                    </Button>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </section>
                        );
                    })}
                </div>
            </section>

            <section>
                <h2 className="font-heading text-2xl font-semibold tracking-tight">
                    Třídy
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                    Text, učitelky, věk, místo a fotku třídy upravíte v sekci{" "}
                    <a href="/admin/tridy" className="font-medium text-primary underline underline-offset-2">
                        Třídy
                    </a>
                    .
                </p>
            </section>
        </div>
    );
}
