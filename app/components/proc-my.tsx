import Link from "next/link";

const primaryButtonClass =
    "inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const VALUES = [
    {
        title: "Pohyb a zdraví",
        description:
            "Každodenní aktivity venku, tělocvična a pohybové programy vedoucí k přirozenému rozvoji dítěte.",
    },
    {
        title: "Bezpečné prostředí",
        description:
            "Respektující přístup, malé skupiny a zkušený pedagogický tým, který každé dítě zná jménem.",
    },
    {
        title: "Spolupráce s rodiči",
        description:
            "Pravidelné informace, setkání i otevřená komunikace – rodiče jsou součástí života školky.",
    },
    {
        title: "Bohatý program",
        description:
            "Výlety, divadla, sportovní dny, tvůrčí dílny a sezónní akce po celý školní rok.",
    },
];

export default function ProcMy() {
    return (
        <section className="text-zinc-900">
            <div className="page-shell border-t border-border py-20 sm:py-24 lg:py-28">
                {/* Top row: heading left, description + CTA right */}
                <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                            O nás
                        </p>
                        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                            Proč my
                        </h2>
                    </div>
                    <div className="flex max-w-lg flex-col gap-6 lg:items-end lg:text-right">
                        <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                            Jsme školka, kde se děti cítí bezpečně, pohybují
                            se s radostí a rostou v přirozeném prostředí.
                        </p>
                        <Link href="/o-nas" className={primaryButtonClass}>
                            O nás
                        </Link>
                    </div>
                </div>

                {/* Value columns */}
                <div className="mt-16 grid grid-cols-1 gap-0 border-t border-border sm:grid-cols-2 lg:grid-cols-4">
                    {VALUES.map((item, i) => (
                        <div
                            key={item.title}
                            className="flex flex-col gap-4 border-b border-r-0 border-border px-0 py-10 sm:border-r sm:px-8 sm:last:border-r-0 lg:py-12 lg:first:pl-0"
                        >
                            <span className="text-xs font-medium tabular-nums text-muted-foreground/60">
                                0{i + 1}
                            </span>
                            <h3 className="text-lg font-semibold tracking-tight text-foreground">
                                {item.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-muted-foreground">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
