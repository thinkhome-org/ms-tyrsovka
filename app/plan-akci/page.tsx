import Link from "next/link";
import { SchoolEventsList } from "@/app/components/school-events";
import { linkButtonOutlineSm } from "@/lib/button-link-classes";
import { buildPageMetadata } from "@/lib/seo";
import { pastEvents, upcomingEvents } from "@/lib/cms/events";

export const dynamic = "force-dynamic";

export const metadata = buildPageMetadata({
    title: "Plán akcí",
    description: "Nadcházející i proběhlé akce MŠ Tyršovka.",
    path: "/plan-akci",
});

export default async function PlanAkciPage() {
    const [upcoming, past] = await Promise.all([upcomingEvents(), pastEvents()]);

    return (
        <main className="flex-1 text-zinc-900">
            <div className="page-shell section-shell">
                <header className="flex flex-wrap items-end justify-between gap-6">
                    <div className="min-w-0 max-w-3xl">
                        <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                            Kalendář
                        </p>
                        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                            Plán akcí
                        </h1>
                        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                            Bližší informace škola uvádí ve třídách. Další akce
                            mohou být průběžně doplňovány.
                        </p>
                    </div>
                    <Link href="/aktuality" className={linkButtonOutlineSm}>
                        ← Aktuality
                    </Link>
                </header>

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

                {past.length > 0 ? (
                    <section className="mt-16">
                        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                            Proběhlé akce
                        </h2>
                        <div className="mt-6">
                            <SchoolEventsList events={past} />
                        </div>
                    </section>
                ) : null}
            </div>
        </main>
    );
}
