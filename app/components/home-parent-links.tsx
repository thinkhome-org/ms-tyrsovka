import Link from "next/link";
import { ArrowUpRight, UtensilsCrossed, Info, AppWindow } from "lucide-react";
import { NASE_MS_URL } from "@/lib/site-nav";

const LINKS = [
    {
        href: "/jidelnicek",
        label: "Jídelníček",
        text: "Aktuální týden, alergeny a stravování.",
        icon: UtensilsCrossed,
    },
    {
        href: "/prakticke-informace",
        label: "Praktické informace",
        text: "Provoz, vyzvedávání, omluvenky a platby.",
        icon: Info,
    },
    {
        href: NASE_MS_URL,
        label: "Naše MŠ",
        text: "Rodičovský portál pro docházku a aktuální dění.",
        icon: AppWindow,
        external: true,
    },
];

export function HomeParentLinks() {
    return (
        <section className="border-y border-border bg-muted/40 text-zinc-900">
            <div className="page-shell py-14 sm:py-16">
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    Pro rodiče
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight">Rychlé odkazy</h2>
                <div className="mt-8 grid gap-4 md:grid-cols-3">
                    {LINKS.map((link) => {
                        const Icon = link.icon;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                target={link.external ? "_blank" : undefined}
                                rel={link.external ? "noopener noreferrer" : undefined}
                                className="flex items-start gap-4 rounded-xl border border-border bg-card p-5"
                            >
                                <Icon className="mt-0.5 size-5 shrink-0 text-primary" />
                                <div>
                                    <p className="inline-flex items-center gap-1 font-medium">
                                        {link.label}
                                        {link.external ? (
                                            <ArrowUpRight className="size-3.5 opacity-70" />
                                        ) : null}
                                    </p>
                                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                                        {link.text}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
