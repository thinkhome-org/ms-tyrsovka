import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { SchoolEventsList } from "@/app/components/school-events";
import { listPublished } from "@/lib/cms/aktuality";
import { formatDateCs } from "@/lib/cms/dates";
import { coverSrc } from "@/lib/cms/media";
import { linkButtonOutlineSm } from "@/lib/button-link-classes";
import { upcomingEvents } from "@/lib/cms/events";

export default async function Aktuality() {
    const items = await listPublished(5);
    const events = (await upcomingEvents()).slice(0, 4);

    if (items.length === 0 && events.length === 0) {
        return null;
    }

    return (
        <section id="aktuality" className="text-zinc-900">
            <div className="page-shell py-20 sm:py-24 lg:py-28">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                            Aktuálně ve škole
                        </p>
                        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                            Akce a zprávy
                        </h2>
                    </div>
                    <Link
                        href="/aktuality"
                        className={`${linkButtonOutlineSm} hidden gap-2 sm:inline-flex`}
                    >
                        Všechny aktuality
                        <ArrowRight className="size-4" />
                    </Link>
                </div>

                {events.length > 0 ? (
                    <div className="mt-10">
                        <h3 className="text-lg font-semibold tracking-tight">Nejbližší akce</h3>
                        <div className="mt-4">
                            <SchoolEventsList events={events} />
                        </div>
                    </div>
                ) : null}

                {items.length > 0 ? (
                    <div className={events.length > 0 ? "mt-12" : "mt-12"}>
                        <h3 className="text-lg font-semibold tracking-tight">Poslední zprávy</h3>
                        <div className="mt-4 border-t border-border">
                            {items.map((item) => {
                                const image = coverSrc(item.cover_key);
                                const date = item.published_at || item.created_at;
                                return (
                                    <Link
                                        key={item.slug}
                                        href={`/aktuality/${item.slug}`}
                                        className="group flex items-center gap-5 border-b border-border py-4 transition-colors hover:bg-accent/30 sm:gap-8 sm:py-5"
                                    >
                                        <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-md bg-muted sm:h-16 sm:w-24">
                                            {image ? (
                                                <Image
                                                    src={image}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                                                    sizes="96px"
                                                />
                                            ) : null}
                                        </div>
                                        <time
                                            dateTime={date}
                                            className="hidden w-40 shrink-0 text-sm text-muted-foreground lg:block"
                                        >
                                            {formatDateCs(date, "long")}
                                        </time>
                                        <span className="flex-1 text-base font-medium text-foreground sm:text-lg">
                                            {item.title}
                                        </span>
                                        <time
                                            dateTime={date}
                                            className="shrink-0 text-sm text-muted-foreground lg:hidden"
                                        >
                                            {formatDateCs(date, "long")}
                                        </time>
                                        <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1" />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ) : null}

                <div className="mt-8 flex sm:hidden">
                    <Link
                        href="/aktuality"
                        className={`${linkButtonOutlineSm} gap-2`}
                    >
                        Všechny aktuality
                        <ArrowRight className="size-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
