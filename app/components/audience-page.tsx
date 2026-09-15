import Link from "next/link";
import type { ReactNode } from "react";
import { CLASSROOMS } from "@/lib/classrooms";
import { Card, CardContent } from "@/components/ui/card";
import { linkButtonOutlineSm } from "@/lib/button-link-classes";

export function ClassroomLinks({
    slugs,
}: {
    slugs: string[];
}) {
    const items = CLASSROOMS.filter((classroom) => slugs.includes(classroom.slug));
    return (
        <div className="grid gap-3 sm:grid-cols-2">
            {items.map((classroom) => (
                <Link
                    key={classroom.slug}
                    href={`/tridy/${classroom.slug}`}
                    className="flex items-center gap-3 rounded-xl border border-border bg-card p-4"
                >
                    <span className="text-2xl" aria-hidden="true">
                        {classroom.symbol}
                    </span>
                    <span>
                        <span className="block font-medium">{classroom.fullName}</span>
                        <span className="text-sm text-muted-foreground">{classroom.age}</span>
                    </span>
                </Link>
            ))}
        </div>
    );
}

export function AudiencePage({
    eyebrow,
    title,
    description,
    sections,
}: {
    eyebrow: string;
    title: string;
    description: string;
    sections: { title: string; content: ReactNode }[];
}) {
    return (
        <main className="flex-1 text-zinc-900">
            <div className="page-shell section-shell">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div className="max-w-3xl">
                        <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                            {eyebrow}
                        </p>
                        <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
                            {title}
                        </h1>
                        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                            {description}
                        </p>
                    </div>
                    <Link href="/pro-zajemce" className={linkButtonOutlineSm}>
                        ← Pro zájemce
                    </Link>
                </div>
                <div className="mt-12 space-y-6">
                    {sections.map((section, index) => (
                        <Card key={section.title} className="content-card overflow-hidden">
                            <CardContent className="p-6 sm:p-8">
                                <p className="text-xs font-medium tabular-nums text-muted-foreground">
                                    {String(index + 1).padStart(2, "0")}
                                </p>
                                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                                    {section.title}
                                </h2>
                                <div className="mt-4 space-y-3 text-base leading-relaxed text-muted-foreground">
                                    {section.content}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </main>
    );
}
