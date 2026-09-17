import Link from "next/link";
import { Download, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { linkButtonOutlineSm } from "@/lib/button-link-classes";
import { buildPageMetadata } from "@/lib/seo";
import {
    listLiveNotices,
    noticeHref,
    noticeKind,
    type Notice,
} from "@/lib/cms/notices";
import { UREDNI_DESKA_SECTIONS } from "./content";

export const dynamic = "force-dynamic";

export const metadata = buildPageMetadata({
    title: "Úřední deska",
    description:
        "Důležité dokumenty MŠ Tyršovka: výroční zprávy, formuláře ke stažení a školní řád.",
    path: "/uredni-deska",
});

function isDirectDownload(notice: Notice) {
    return noticeKind(notice) === "Ke stažení" || noticeKind(notice) === "Přímé stažení PDF";
}

export default async function UredniDeskaPage() {
    const notices = await listLiveNotices();

    return (
        <main className="flex-1 text-zinc-900">
            <div className="page-shell section-shell">
                <header className="flex flex-wrap items-end justify-between gap-6">
                    <div className="min-w-0 max-w-3xl">
                        <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                            Dokumenty a oznámení
                        </p>
                        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                            Úřední deska a dokumenty
                        </h1>
                        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                            Přehled důležitých dokumentů školy: výroční zprávy,
                            formuláře ke stažení a školní řád.
                        </p>
                    </div>

                    <Link href="/" className={linkButtonOutlineSm}>
                        ← Zpět
                    </Link>
                </header>

                <div className="mt-12 space-y-8 sm:mt-14">
                    {UREDNI_DESKA_SECTIONS.map((section) => {
                        const items = notices.filter(
                            (notice) => notice.category === section.id,
                        );
                        if (section.id === "ostatni" && items.length === 0) {
                            return null;
                        }

                        return (
                            <Card
                                key={section.id}
                                id={section.id}
                                className="content-card scroll-mt-28 overflow-hidden"
                            >
                                <CardHeader className="border-b border-border/80 bg-muted/40 py-6 sm:py-8">
                                    <h2 className="text-2xl font-semibold tracking-tight">
                                        {section.title}
                                    </h2>
                                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                                        {section.description}
                                    </p>
                                </CardHeader>

                                <CardContent className="p-6 sm:p-8">
                                    {items.length === 0 ? (
                                        <p className="text-sm leading-relaxed text-muted-foreground">
                                            Zatím tu není žádný dokument.
                                        </p>
                                    ) : (
                                        <div className="grid gap-3">
                                            {items.map((item) => {
                                                const href = noticeHref(item);
                                                if (!href) return null;
                                                const download = isDirectDownload(item);

                                                return (
                                                    <a
                                                        key={item.id}
                                                        href={href}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex flex-col gap-2 rounded-lg border border-border bg-background p-4 transition-colors hover:border-primary/20 hover:bg-accent/30 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                                                    >
                                                        <div className="min-w-0">
                                                            <p className="font-medium text-foreground">
                                                                {item.title}
                                                            </p>
                                                            <p className="mt-0.5 text-sm text-muted-foreground">
                                                                {noticeKind(item)}
                                                            </p>
                                                        </div>

                                                        <span className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-primary">
                                                            {download ? (
                                                                <Download className="size-4" />
                                                            ) : (
                                                                <ExternalLink className="size-4" />
                                                            )}
                                                            Otevřít
                                                        </span>
                                                    </a>
                                                );
                                            })}
                                        </div>
                                    )}

                                    {section.note ? (
                                        <p className="mt-6 rounded-lg border border-border/80 bg-muted/30 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
                                            {section.note}
                                        </p>
                                    ) : null}
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}
