import Link from "next/link";
import type { ReactNode } from "react";
import {
    Building2,
    CreditCard,
    Mail,
    MapPin,
    Phone,
    School,
} from "lucide-react";
import { SchoolMap } from "@/app/components/school-map";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { listClassroomsWithContacts } from "@/lib/cms/classrooms";
import { listPeople } from "@/lib/cms/people";
import { getSettingsMap } from "@/lib/cms/settings";
import { linkButtonOutlineSm } from "@/lib/button-link-classes";
import { buildPageMetadata } from "@/lib/seo";
import { KONTAKTY_CONTENT } from "./content";

export const dynamic = "force-dynamic";

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
    icon: ReactNode;
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

export default async function KontaktyPage() {
    const content = KONTAKTY_CONTENT;
    const [settings, people, classrooms] = await Promise.all([
        getSettingsMap(),
        listPeople(),
        listClassroomsWithContacts(),
    ]);
    const leadership = people.filter((person) => person.section === "vedeni");
    const kitchen = people.filter((person) => person.section === "jidelna");
    const phoneHref = `tel:${settings.phone.replace(/\s+/g, "")}`;
    const urgentHref = settings.urgent_phone
        ? `tel:${settings.urgent_phone.replace(/\s+/g, "")}`
        : undefined;
    const quickLinks = [
        {
            label: "Napsat ředitelce",
            href: `mailto:${settings.email}`,
        },
        {
            label: "Zavolat do MŠ",
            href: phoneHref,
        },
        ...content.quickLinks.filter((link) => link.href.startsWith("http")),
    ];

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
                        {quickLinks.map((link) => (
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

                    <section id="vedeni" className="mt-12 scroll-mt-28">
                        <Card className="content-card overflow-hidden">
                            <CardHeader className="border-b border-border/80 bg-muted/40 py-6 sm:py-8">
                                <h2 className="text-2xl font-semibold tracking-tight">
                                    Vedení školy
                                </h2>
                                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                                    {settings.founder}
                                </p>
                            </CardHeader>
                            <CardContent className="p-6 sm:p-8">
                                {leadership.length === 0 ? (
                                    <p className="text-sm text-muted-foreground">
                                        Kontakty vedení zatím nejsou vyplněné.
                                    </p>
                                ) : (
                                    <div className="grid gap-4 md:grid-cols-2">
                                        {leadership.map((person) => (
                                            <div
                                                key={person.id}
                                                className="rounded-xl border border-border bg-background p-5"
                                            >
                                                <p className="text-sm font-medium uppercase tracking-[0.14em] text-muted-foreground">
                                                    {person.role}
                                                </p>
                                                <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground">
                                                    {person.name}
                                                </h3>
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
                                )}
                                {settings.urgent_phone ? (
                                    <div className="mt-6 rounded-xl border border-border/80 bg-muted/30 p-4">
                                        <p className="text-sm font-medium text-foreground">
                                            {settings.urgent_title}
                                        </p>
                                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                                            {settings.urgent_description}
                                        </p>
                                        <a
                                            href={urgentHref}
                                            className="mt-3 inline-flex text-sm font-medium text-primary underline underline-offset-2"
                                        >
                                            {settings.urgent_phone}
                                        </a>
                                    </div>
                                ) : null}
                            </CardContent>
                        </Card>
                    </section>

                    <section id="tridy" className="mt-12 scroll-mt-28">
                        <div className="mb-8 max-w-3xl">
                            <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                                Třídy
                            </p>
                            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
                                Jednotlivé třídy
                            </h2>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {classrooms.map((classroom) => (
                                <Card
                                    key={classroom.slug}
                                    className="content-card overflow-hidden"
                                >
                                    <CardHeader className="border-b border-border/80 bg-muted/40 py-6">
                                        <CardTitle className="text-2xl">
                                            <span aria-hidden="true">{classroom.symbol}</span>{" "}
                                            {classroom.fullName}
                                        </CardTitle>
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            {classroom.location}
                                        </p>
                                    </CardHeader>
                                    <CardContent className="space-y-3 p-6 text-sm leading-relaxed">
                                        <p>
                                            E-mail:{" "}
                                            <a
                                                href={`mailto:${classroom.email}`}
                                                className="font-medium text-foreground underline-offset-2 hover:text-primary hover:underline"
                                            >
                                                {classroom.email}
                                            </a>
                                        </p>
                                        {classroom.phone ? (
                                            <p>
                                                Telefon:{" "}
                                                <a
                                                    href={`tel:${classroom.phone.replace(/\s+/g, "")}`}
                                                    className="font-medium text-foreground underline-offset-2 hover:text-primary hover:underline"
                                                >
                                                    {classroom.phone}
                                                </a>
                                            </p>
                                        ) : null}
                                        <Link
                                            href={`/tridy/${classroom.slug}`}
                                            className="inline-flex text-sm font-medium text-primary underline underline-offset-2"
                                        >
                                            Detail třídy
                                        </Link>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>

                    {kitchen.length > 0 ? (
                        <section id="jidelna" className="mt-12 scroll-mt-28">
                            <Card className="content-card overflow-hidden">
                                <CardHeader className="border-b border-border/80 bg-muted/40 py-6">
                                    <h2 className="text-2xl font-semibold tracking-tight">
                                        Jídelna
                                    </h2>
                                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                        Kontakt pro otázky ke stravování.
                                    </p>
                                </CardHeader>
                                <CardContent className="space-y-8 p-6 sm:p-8">
                                    {kitchen.map((person) => (
                                        <div key={person.id}>
                                            <p className="text-sm font-medium uppercase tracking-[0.14em] text-muted-foreground">
                                                {person.role}
                                            </p>
                                            <h3 className="mt-3 text-xl font-semibold tracking-tight">
                                                {person.name}
                                            </h3>
                                            {person.email ? (
                                                <p className="mt-3 text-sm text-muted-foreground">
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
                                                <p className="mt-2 text-sm text-muted-foreground">
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
                                    ))}
                                    <p className="text-sm text-muted-foreground">
                                        Aktuální jídelníček je na stránce{" "}
                                        <Link
                                            href="/jidelnicek"
                                            className="text-primary underline underline-offset-2"
                                        >
                                            Jídelníček
                                        </Link>
                                        .
                                    </p>
                                </CardContent>
                            </Card>
                        </section>
                    ) : null}

                    <section id="adresa" className="mt-12 scroll-mt-28">
                        <Card className="content-card overflow-hidden">
                            <CardHeader className="border-b border-border/80 bg-muted/40 py-6">
                                <h2 className="text-2xl font-semibold tracking-tight">
                                    Adresa a příchod do školy
                                </h2>
                            </CardHeader>
                            <CardContent className="p-6 sm:p-8">
                                <SchoolMap address={settings.address} />
                            </CardContent>
                        </Card>
                    </section>

                    <section id="udaje" className="mt-12 scroll-mt-28">
                        <Card className="content-card overflow-hidden">
                            <CardHeader className="border-b border-border/80 bg-muted/40 py-6">
                                <h2 className="text-2xl font-semibold tracking-tight">
                                    Oficiální údaje školy
                                </h2>
                            </CardHeader>
                            <CardContent className="grid gap-5 p-6 sm:p-8 md:grid-cols-2">
                                <DetailRow
                                    icon={<School className="size-4" />}
                                    label="Škola"
                                    value={settings.org_name}
                                />
                                <DetailRow
                                    icon={<MapPin className="size-4" />}
                                    label="Adresa"
                                    value={settings.address}
                                />
                                <DetailRow
                                    icon={<Mail className="size-4" />}
                                    label="E-mail"
                                    value={settings.email}
                                    href={`mailto:${settings.email}`}
                                />
                                <DetailRow
                                    icon={<Phone className="size-4" />}
                                    label="Telefon"
                                    value={settings.phone}
                                    href={phoneHref}
                                />
                                <DetailRow
                                    icon={<Building2 className="size-4" />}
                                    label="IČ"
                                    value={settings.ico}
                                />
                                <DetailRow
                                    icon={<Building2 className="size-4" />}
                                    label="Datová schránka"
                                    value={settings.databox}
                                />
                                <DetailRow
                                    icon={<CreditCard className="size-4" />}
                                    label="Běžný účet"
                                    value={settings.bank_account}
                                />
                            </CardContent>
                        </Card>
                    </section>
                </div>
            </div>
        </main>
    );
}
