import Link from "next/link";
import Image from "next/image";
import aktuality from "@/app/data/aktuality.json";

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
        <section className="w-full bg-white px-6 text-zinc-900">
            <div className="mx-auto w-full max-w-7xl pt-14 pb-20 md:pl-28 2xl:max-w-360">
                <div className="flex items-end justify-between gap-6">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
                            Aktuality
                        </h2>
                        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base">
                            Nejdůležitější novinky a oznámení pro rodiče.
                        </p>
                    </div>
                    <Link
                        href="/aktuality"
                        className="hidden sm:inline-flex h-9 items-center gap-2 rounded-lg border border-black/10 bg-white/80 px-4 text-sm font-medium uppercase tracking-wide text-zinc-800 shadow-sm transition hover:bg-[#A0C4FF]"
                    >
                        Všechny aktuality
                    </Link>
                </div>

                <div className="mt-10 -mx-2 overflow-x-auto pb-2">
                    <div className="flex min-w-full w-max flex-nowrap gap-4 px-2">
                        {items.map((item) => (
                            <Link
                                key={item.slug}
                                href={`/aktuality/${item.slug}`}
                                className="group flex w-[340px] shrink-0 items-center gap-4 rounded-xl border border-black/10 bg-white/80 p-4 shadow-sm transition hover:border-black/20 hover:bg-[#A0C4FF]/25 sm:w-[420px] sm:p-5"
                            >
                                <div className="flex min-w-0 flex-1 items-center gap-4">
                                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-black/10 bg-white sm:h-16 sm:w-16">
                                        <Image
                                            src={item.image}
                                            alt=""
                                            fill
                                            className="object-cover"
                                            sizes="64px"
                                        />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="w-full truncate text-lg font-semibold leading-snug text-zinc-900 transition-colors group-hover:text-black">
                                            {item.title}
                                        </div>
                                        <div className="mt-2 text-sm text-zinc-600">
                                            <time dateTime={item.publishedAt}>
                                                {formatDateCs(item.publishedAt)}
                                            </time>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="mt-8 sm:hidden">
                    <Link
                        href="/aktuality"
                        className="inline-flex h-9 items-center gap-2 rounded-lg border border-black/10 bg-white/80 px-4 text-sm font-medium uppercase tracking-wide text-zinc-800 shadow-sm transition hover:bg-[#A0C4FF]"
                    >
                        Všechny aktuality
                    </Link>
                </div>
            </div>
        </section>
    );
}

