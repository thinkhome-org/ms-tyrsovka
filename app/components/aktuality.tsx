import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import aktuality from "@/app/data/aktuality.json";

type Aktualita = {
    title: string;
    slug: string;
    publishedAt: string;
    image: string;
};

function formatDateCs(dateIso: string) {
    const date = new Date(dateIso);
    if (Number.isNaN(date.getTime())) return dateIso;
    return new Intl.DateTimeFormat("cs-CZ", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(date);
}

export default function Aktuality() {
    const items = (aktuality as Aktualita[])
        .slice()
        .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
        .slice(0, 5);

    return (
        <section id="aktuality" className="text-zinc-900">
            <div className="page-shell py-20 sm:py-24 lg:py-28">
                {/* Header */}
                <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                            Novinky
                        </p>
                        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                            Aktuality
                        </h2>
                    </div>
                    <Link
                        href="/aktuality"
                        className="hidden shrink-0 items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:flex"
                    >
                        Všechny aktuality
                        <ArrowRight className="size-4" />
                    </Link>
                </div>

                {/* List */}
                <div className="mt-12 border-t border-border">
                    {items.map((item) => (
                        <Link
                            key={item.slug}
                            href={`/aktuality/${item.slug}`}
                            className="group flex items-center gap-5 border-b border-border py-4 transition-colors hover:bg-accent/30 sm:gap-8 sm:py-5"
                        >
                            <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-md bg-muted sm:h-16 sm:w-24">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                                    sizes="96px"
                                />
                            </div>
                            <time
                                dateTime={item.publishedAt}
                                className="hidden w-40 shrink-0 text-sm text-muted-foreground lg:block"
                            >
                                {formatDateCs(item.publishedAt)}
                            </time>
                            <span className="flex-1 text-base font-medium text-foreground sm:text-lg">
                                {item.title}
                            </span>
                            <time
                                dateTime={item.publishedAt}
                                className="shrink-0 text-sm text-muted-foreground lg:hidden"
                            >
                                {formatDateCs(item.publishedAt)}
                            </time>
                            <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1" />
                        </Link>
                    ))}
                </div>

                {/* Mobile CTA */}
                <div className="mt-8 flex sm:hidden">
                    <Link
                        href="/aktuality"
                        className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Všechny aktuality
                        <ArrowRight className="size-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
