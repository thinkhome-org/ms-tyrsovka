import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { linkButtonOutlineSm } from "@/lib/button-link-classes";

export default function UredniDeskaPage() {
    return (
        <main className="flex-1 text-zinc-900">
            <div className="page-shell section-shell">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <Badge variant="soft" className="mb-4">
                            Dokumenty a oznámení
                        </Badge>
                        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                            Úřední deska
                        </h1>
                        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                            Placeholder stránka – doplníme obsah později.
                        </p>
                    </div>

                    <Link href="/" className={linkButtonOutlineSm}>
                        ← Zpět
                    </Link>
                </div>

                <Card className="mt-10 border-border/70 bg-card/90">
                    <CardContent className="p-6 sm:p-8">
                        <p className="leading-relaxed text-muted-foreground">
                            Zde budou zveřejňované dokumenty a oznámení. Prozatím
                            jen kostra stránky, aby odkaz ve footeru fungoval.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}

