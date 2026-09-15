import Link from "next/link";
import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { linkButtonOutlineSm } from "@/lib/button-link-classes";

export function StubPage({
    eyebrow,
    title,
    description,
    children,
}: {
    eyebrow: string;
    title: string;
    description: string;
    children: ReactNode;
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
                    <Link href="/" className={linkButtonOutlineSm}>
                        ← Zpět
                    </Link>
                </div>
                <Card className="mt-10 content-card">
                    <CardContent className="p-6 text-base leading-relaxed text-muted-foreground sm:p-8">
                        {children}
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
