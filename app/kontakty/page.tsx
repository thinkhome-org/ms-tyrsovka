import Link from "next/link";
import {
    Building2,
    CreditCard,
    Mail,
    MapPin,
    Phone,
    School,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { linkButtonOutlineSm } from "@/lib/button-link-classes";
import { buildPageMetadata } from "@/lib/seo";
import { KONTAKTY_CONTENT } from "./content";

export const metadata = buildPageMetadata({
    title: KONTAKTY_CONTENT.title,
    description: KONTAKTY_CONTENT.description,
    path: "/kontakty",
});

function DetailRow({
    icon,
    label,
    value,
    href,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    href?: string;
}) {
    const content = href ? (
        <a
            href={href}
            className="font-medium text-foreground underline-offset-2 hover:text-primary hover:underline"
        >
            {value}
        </a>
    ) : (
        <span className="font-medium text-foreground">{value}</span>
    );

    return (
        <div className="flex items-start gap-3">
            <div className="mt-0.5 text-muted-foreground">{icon}</div>
            <div>
                <p className="text-sm text-muted-foreground">{label}</p>
                <div className="mt-0.5 text-sm leading-relaxed">{content}</div>
            </div>
        </div>
    );
}

export default function KontaktyPage() {
    const content = KONTAKTY_CONTENT;

    return (
        <main className="flex-1 text-zinc-900">
            <div className="page-shell section-shell">
                <div className="mx-auto max-w-6xl">
                    <header className="flex flex-wrap items-end justify-between gap-6">
                        <div className="min-w-0 max-w-3xl">
                            <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                                {content.eyebrow}
                            </p>
                            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                                {content.title}
                            </h1>
                            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                                {content.description}
                            </p>
                        </div>

                        <Link href="/" className={linkButtonOutlineSm}>
                            ← Zpět
                        </Link>
                    </header>

                    <div className="mt-8 flex flex-wrap gap-3">
                        {content.quickLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                target={
                                    link.href.startsWith("http")
                                        ? "_blank"
                                        : undefined
                                }
                                rel={
                                    link.href.startsWith("http")
                                        ? "noopener noreferrer"
                                        : undefined
                                }
                                className={linkButtonOutlineSm}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
                        <Card className="content-card overflow-hidden">
                            <CardHeader className="border-b border-border/80 bg-muted/40 py-6">
                                <CardTitle className="text-2xl">
                                    {content.introTitle}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-5 p-6 sm:p-8">
                                <p className="max-w-prose text-base leading-relaxed text-muted-foreground">
                                    {content.introText}
                                </p>
                                <div className="rounded-xl border border-border/80 bg-background p-4">
                                    <p className="text-sm font-medium text-foreground">
                                        {content.urgentClassPhone.title}
                                    </p>
                                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                                        {content.urgentClassPhone.description}
                                    </p>
                                    <a
                                        href={`tel:${content.urgentClassPhone.phone.replace(/\s+/g, "")}`}
                                        className="mt-3 inline-flex text-sm font-medium text-primary underline underline-offset-2"
                                    >
                                        {content.urgentClassPhone.phone}
                                    </a>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="content-card overflow-hidden">
                            <CardHeader className="border-b border-border/80 bg-muted/40 py-6">
                                <CardTitle className="text-2xl">
                                    Hlavní údaje školy
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-5 p-6 sm:p-8">
                                <DetailRow
                                    icon={<School className="size-4" />}
                                    label="Škola"
                                    value={content.school.name}
                                />
                                <DetailRow
                                    icon={<MapPin className="size-4" />}
                                    label="Adresa"
                                    value={content.school.address.join(", ")}
                                />
                                <DetailRow
                                    icon={<Mail className="size-4" />}
                                    label="E-mail"
                                    value={content.school.email}
                                    href={`mailto:${content.school.email}`}
                                />
                                <DetailRow
                                    icon={<Phone className="size-4" />}
                                    label="Telefon"
                                    value={content.school.phone}
                                    href={`tel:${content.school.phone.replace(/\s+/g, "")}`}
                                />
                                <DetailRow
                                    icon={<Building2 className="size-4" />}
                                    label="IČ"
                                    value={content.school.ico}
                                />
                                <DetailRow
                                    icon={<Building2 className="size-4" />}
                                    label="Datová schránka"
                                    value={content.school.databox}
                                />
                                <DetailRow
                                    icon={<CreditCard className="size-4" />}
                                    label="Běžný účet"
                                    value={content.school.bankAccount}
                                />
                            </CardContent>
                        </Card>
                    </div>

                    <section className="mt-12">
                        <Card className="content-card overflow-hidden">
                            <CardHeader className="border-b border-border/80 bg-muted/40 py-6 sm:py-8">
                                <CardTitle className="text-2xl">
                                    Vedení a provoz školky
                                </CardTitle>
                                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                                    {content.school.founder}
                                </p>
                            </CardHeader>
                            <CardContent className="p-6 sm:p-8">
                                <div className="grid gap-4 md:grid-cols-3">
                                    {content.managementContacts.map((person) => (
                                        <div
                                            key={person.role}
                                            className="rounded-xl border border-border bg-background p-5"
                                        >
                                            <p className="text-sm font-medium uppercase tracking-[0.14em] text-muted-foreground">
                                                {person.role}
                                            </p>
                                            <h2 className="mt-3 text-xl font-semibold tracking-tight text-foreground">
                                                {person.name}
                                            </h2>
                                            <div className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
                                                {person.email ? (
                                                    <p>
                                                        E-mail:{" "}
                                                        <a
                                                            href={`mailto:${person.email}`}
                                                            className="font-medium text-foreground underline-offset-2 hover:text-primary hover:underline"
                                                        >
                                                            {person.email}
                                                        </a>
                                                    </p>
                                                ) : null}
                                                {person.phone ? (
                                                    <p>
                                                        Telefon:{" "}
                                                        <a
                                                            href={`tel:${person.phone.replace(/\s+/g, "")}`}
                                                            className="font-medium text-foreground underline-offset-2 hover:text-primary hover:underline"
                                                        >
                                                            {person.phone}
                                                        </a>
                                                    </p>
                                                ) : null}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </section>

                    <section className="mt-12">
                        <div className="mb-8 max-w-3xl">
                            <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                                Třídy
                            </p>
                            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
                                Kontakty na jednotlivé třídy
                            </h2>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {content.classroomContacts.map((classroom) => (
                                <Card
                                    key={classroom.title}
                                    className="content-card overflow-hidden"
                                >
                                    <CardHeader className="border-b border-border/80 bg-muted/40 py-6">
                                        <CardTitle className="text-2xl">
                                            {classroom.title}
                                        </CardTitle>
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            {classroom.location}
                                        </p>
                                    </CardHeader>
                                    <CardContent className="p-6">
                                        <p className="mt-4 text-sm font-medium uppercase tracking-[0.14em] text-muted-foreground">
                                            Třídní učitelky
                                        </p>
                                        <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
                                            {classroom.teachers.map((teacher) => (
                                                <li key={teacher}>{teacher}</li>
                                            ))}
                                        </ul>

                                        {classroom.note ? (
                                            <p className="mt-5 rounded-lg border border-border/80 bg-muted/30 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
                                                {classroom.note}
                                            </p>
                                        ) : null}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
