import Link from "next/link";
import { ArrowRight } from "lucide-react";

const PATHS = [
    {
        href: "/pro-zajemce/mladsi-deti",
        eyebrow: "Pro zájemce",
        title: "Pro mladší děti",
        text: "Adaptace, první dny a třídy, kde děti školku teprve objevují.",
    },
    {
        href: "/pro-zajemce/predskolaci",
        eyebrow: "Pro zájemce",
        title: "Pro předškoláky",
        text: "Poslední rok před školou, příprava a povinná předškolní docházka.",
    },
];

export function HomePaths() {
    return (
        <section className="text-zinc-900">
            <div className="page-shell py-16 sm:py-20">
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    Dvě cesty
                </p>
                <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
                    Vyberte, co hledáte
                </h2>
                <div className="mt-10 grid gap-5 md:grid-cols-2">
                    {PATHS.map((path) => (
                        <Link
                            key={path.href}
                            href={path.href}
                            className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-transform hover:-translate-y-0.5 sm:p-8"
                        >
                            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                                {path.eyebrow}
                            </p>
                            <h3 className="mt-3 font-heading text-2xl font-semibold tracking-tight group-hover:text-primary">
                                {path.title}
                            </h3>
                            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                                {path.text}
                            </p>
                            <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium">
                                Otevřít stránku
                                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
