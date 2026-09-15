import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CLASSROOMS, getClassroom } from "@/lib/classrooms";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { linkButtonOutlineSm } from "@/lib/button-link-classes";
import { buildPageMetadata } from "@/lib/seo";

export function generateStaticParams() {
    return CLASSROOMS.map((classroom) => ({ slug: classroom.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const classroom = getClassroom(slug);
    if (!classroom) return {};
    return buildPageMetadata({
        title: classroom.fullName,
        description: `${classroom.fullName}: ${classroom.age}. Kontakt, učitelky a zaměření třídy v MŠ Tyršovka.`,
        path: `/tridy/${classroom.slug}`,
    });
}

export default async function ClassroomPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const classroom = getClassroom(slug);
    if (!classroom) notFound();

    return (
        <main className="flex-1 text-zinc-900">
            <div className="page-shell section-shell">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="text-sm text-muted-foreground">
                        <Link href="/tridy" className="hover:text-foreground">
                            Třídy
                        </Link>
                        <span className="mx-2 text-border">/</span>
                        <span>{classroom.name}</span>
                    </div>
                    <Link href="/tridy" className={linkButtonOutlineSm}>
                        ← Přehled tříd
                    </Link>
                </div>

                <div className={`mt-8 rounded-2xl px-6 py-8 sm:px-8 ${classroom.barClass}`}>
                    <p className="text-4xl" aria-hidden="true">
                        {classroom.symbol}
                    </p>
                    <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
                        {classroom.fullName}
                    </h1>
                    <p className="mt-2 text-sm opacity-80">{classroom.age}</p>
                    <div className="mt-6 flex flex-wrap gap-4 text-sm font-medium">
                        <a href={`mailto:${classroom.email}`} className="underline underline-offset-2">
                            {classroom.email}
                        </a>
                        {classroom.phone ? (
                            <a
                                href={`tel:${classroom.phone.replace(/\s+/g, "")}`}
                                className="underline underline-offset-2"
                            >
                                {classroom.phone}
                            </a>
                        ) : null}
                    </div>
                </div>

                <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                    <Card className="content-card overflow-hidden">
                        <div className="relative aspect-4/3 bg-muted">
                            <Image
                                src={classroom.image}
                                alt={classroom.fullName}
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        </div>
                        <CardContent className="space-y-4 p-6 sm:p-8">
                            <Badge variant="soft">Pro koho třída je</Badge>
                            <p className="text-base leading-relaxed text-muted-foreground">
                                Věkové rozmezí {classroom.age}. {classroom.location}.
                            </p>
                            {classroom.paragraphs.map((paragraph) => (
                                <p
                                    key={paragraph}
                                    className="text-base leading-relaxed text-muted-foreground"
                                >
                                    {paragraph}
                                </p>
                            ))}
                        </CardContent>
                    </Card>

                    <div className="space-y-6">
                        <Card className="content-card">
                            <CardContent className="p-6 sm:p-8">
                                <h2 className="text-xl font-semibold tracking-tight">Učitelky</h2>
                                <ul className="mt-4 space-y-2 text-muted-foreground">
                                    {classroom.teachers.map((teacher) => (
                                        <li key={teacher}>{teacher}</li>
                                    ))}
                                </ul>
                                {classroom.note ? (
                                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                                        {classroom.note}
                                    </p>
                                ) : null}
                            </CardContent>
                        </Card>
                        <Card className="content-card">
                            <CardContent className="p-6 sm:p-8">
                                <h2 className="text-xl font-semibold tracking-tight">
                                    Den ve třídě
                                </h2>
                                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                                    Společný režim školy, vyzvedávání a omluvenky jsou v praktických informacích. Třídní specifika doplníme sem.
                                </p>
                                <Link
                                    href="/prakticke-informace"
                                    className="mt-4 inline-flex text-sm font-medium text-primary underline underline-offset-2"
                                >
                                    Praktické informace
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </main>
    );
}
