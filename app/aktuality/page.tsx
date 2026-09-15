import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SchoolEventsList } from "@/app/components/school-events";
import { linkButtonOutlineSm } from "@/lib/button-link-classes";
import { buildPageMetadata } from "@/lib/seo";
import { listPublished } from "@/lib/cms/aktuality";
import { formatDateCs } from "@/lib/cms/dates";
import { coverSrc } from "@/lib/cms/media";
import { pastEvents, upcomingEvents } from "@/lib/events";

export const dynamic = "force-dynamic";

export const metadata = buildPageMetadata({
    title: "Aktuality",
    description:
        "Nadcházející akce, oznámení a zprávy MŠ Tyršovka.",
    path: "/aktuality",
});

export default async function AktualityPage() {
    const items = await listPublished();
    const upcoming = upcomingEvents();
    const past = pastEvents();

    return (
        <main className="flex-1 text-zinc-900">
            <div className="page-shell section-shell">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <Badge variant="soft" className="mb-4">
                            Zprávy a akce
                        </Badge>
                        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                            Aktuality
                        </h1>
                        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                            Nadcházející akce nahoře, pod nimi oznámení a zprávy.
                        </p>
                    </div>

                    <Link href="/" className={linkButtonOutlineSm}>
                        ← Zpět
                    </Link>
                </div>

                <section className="mt-12">
                    <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                        Nadcházející akce
                    </h2>
                    <div className="mt-6">
                        <SchoolEventsList
                            events={upcoming}
                            emptyText="Teď tu není žádná naplánovaná akce."
                        />
                    </div>
                </section>

                <section className="mt-16">
                    <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                        Oznámení a zprávy
                    </h2>
                    {items.length === 0 ? (
                        <p className="mt-6 text-muted-foreground">
                            Zatím tu nejsou žádné zveřejněné aktuality.
                        </p>
                    ) : (
                        <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
                            {items.map((item, index) => {
                                const image = coverSrc(item.cover_key);
                                const date = item.published_at || item.created_at;
                                return (
                                    <Link
                                        key={item.slug}
                                        href={`/aktuality/${item.slug}`}
                                        className="group block"
                                    >
                                        <Card className="overflow-hidden bg-card">
                                            <div className="grid gap-0 sm:grid-cols-[200px_1fr]">
                                                <div className="relative h-48 bg-muted sm:h-full">
                                                    {image ? (
                                                        <Image
                                                            src={image}
                                                            alt={item.title}
                                                            fill
                                                            loading={index === 0 ? "eager" : "lazy"}
                                                            className="object-cover"
                                                            sizes="(max-width: 640px) 100vw, 200px"
                                                        />
                                                    ) : null}
                                                </div>
                                                <div>
                                                    <CardHeader className="pb-3">
                                                        <Badge variant="outline" className="w-fit">
                                                            <time dateTime={date}>
                                                                {formatDateCs(date)}
                                                            </time>
                                                        </Badge>
                                                        <h3 className="w-full truncate text-xl font-semibold tracking-tight">
                                                            {item.title}
                                                        </h3>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <p className="text-sm leading-relaxed text-muted-foreground">
                                                            {item.excerpt ||
                                                                "Otevřít detail aktuality."}
                                                        </p>
                                                    </CardContent>
                                                </div>
                                            </div>
                                        </Card>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </section>

                {past.length > 0 ? (
                    <section className="mt-16">
                        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                            Proběhlé akce
                        </h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Historie školních akcí zůstává dostupná tady.
                        </p>
                        <div className="mt-6">
                            <SchoolEventsList events={past} />
                        </div>
                    </section>
                ) : null}
            </div>
        </main>
    );
}
