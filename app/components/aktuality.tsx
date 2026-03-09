import Link from "next/link";
import Image from "next/image";
import aktuality from "@/app/data/aktuality.json";
import { Card, CardContent } from "@/components/ui/card";

const linkButtonClass =
    "inline-flex h-9 items-center justify-center rounded-md border border-border bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

type Aktualita = {
    title: string;
    slug: string;
    publishedAt: string; // YYYY-MM-DD
    image: string;
};

function formatDateCs(dateIso: string) {
    const date = new Date(dateIso);
    if (Number.isNaN(date.getTime())) return dateIso;
    return new Intl.DateTimeFormat("cs-CZ", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    }).format(date);
}

export default function Aktuality() {
    const items = (aktuality as Aktualita[])
        .slice()
        .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
        .slice(0, 4);

    return (
        <section id="aktuality" className="bg-transparent text-zinc-900">
            <div className="page-shell section-shell border-t border-border">
                <div className="flex flex-col gap-6 pt-10 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h2 className="section-title">
                            Aktuality
                        </h2>
                        <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                            Nejdůležitější novinky, oznámení a rychlé informace
                            pro rodiče na jednom místě.
                        </p>
                    </div>
                    <Link
                        href="/aktuality"
                        className={`${linkButtonClass} hidden sm:inline-flex`}
                    >
                        Všechny aktuality
                    </Link>
                </div>

                <div className="mt-8 overflow-x-auto pb-2 sm:overflow-visible sm:pb-0">
                    <div className="flex w-max min-w-full items-stretch gap-4 sm:grid sm:w-full sm:grid-cols-2 xl:grid-cols-4">
                        {items.map((item) => (
                            <Link
                                key={item.slug}
                                href={`/aktuality/${item.slug}`}
                                className="group flex h-full w-[280px] shrink-0 grow sm:w-auto"
                            >
                                <Card className="flex h-full grow flex-col overflow-hidden border-border bg-card">
                                    <div className="relative h-40 w-full bg-muted sm:h-44">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 640px) 300px, 340px"
                                        />
                                    </div>
                                    <CardContent className="flex grow flex-col p-4 sm:p-5">
                                        <div className="mb-2 text-sm text-muted-foreground">
                                            <time dateTime={item.publishedAt}>
                                                {formatDateCs(item.publishedAt)}
                                            </time>
                                        </div>
                                        <div className="line-clamp-2 text-base font-semibold leading-snug text-foreground">
                                            {item.title}
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="mt-8 sm:hidden">
                    <Link href="/aktuality" className={linkButtonClass}>
                        Všechny aktuality
                    </Link>
                </div>
            </div>
        </section>
    );
}

