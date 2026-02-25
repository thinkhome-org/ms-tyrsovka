import Link from "next/link";
import aktuality from "@/app/data/aktuality.json";

type Aktualita = {
    title: string;
    slug: string;
    publishedAt: string; // YYYY-MM-DD
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

export default function AktualityPage() {
    const items = (aktuality as Aktualita[])
        .slice()
        .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

    return (
        <main className="min-h-screen bg-[#f5f5f5] px-6 text-zinc-900">
            <div className="mx-auto w-full max-w-6xl pt-10 pb-16 md:pl-28">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight text-black sm:text-5xl">
                            Aktuality
                        </h1>
                        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base">
                            Přehled všech novinek a oznámení.
                        </p>
                    </div>

                    <Link
                        href="/"
                        className="inline-flex h-9 items-center gap-2 rounded-lg border border-black/10 bg-white/80 px-4 text-sm font-medium uppercase tracking-wide text-zinc-800 shadow-sm transition hover:bg-[#A0C4FF]"
                    >
                        ← Zpět
                    </Link>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
                    {items.map((item) => (
                        <Link
                            key={item.slug}
                            href={`/aktuality/${item.slug}`}
                            className="group rounded-xl border border-black/10 bg-white/80 p-5 shadow-sm transition hover:border-black/20 hover:bg-[#A0C4FF]/25"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="min-w-0">
                                    <div className="w-full truncate text-lg font-semibold leading-snug text-zinc-900 transition-colors group-hover:text-black">
                                        {item.title}
                                    </div>
                                    <div className="mt-2 text-sm text-zinc-600">
                                        <time dateTime={item.publishedAt}>
                                            {formatDateCs(item.publishedAt)}
                                        </time>
                                    </div>
                                </div>
                                <span
                                    aria-hidden
                                    className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white/70 text-zinc-700 transition group-hover:translate-x-0.5 group-hover:border-black/20"
                                >
                                    →
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}

