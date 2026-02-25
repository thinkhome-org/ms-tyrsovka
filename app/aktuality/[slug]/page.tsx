import Link from "next/link";
import { notFound } from "next/navigation";
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

export function generateStaticParams() {
    return (aktuality as Aktualita[]).map((a) => ({ slug: a.slug }));
}

export default async function AktualitaDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const item = (aktuality as Aktualita[]).find((a) => a.slug === slug);
    if (!item) notFound();

    return (
        <main className="min-h-screen bg-[#f5f5f5] px-6 text-zinc-900">
            <div className="mx-auto w-full max-w-6xl pt-10 pb-16 md:pl-28">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="text-sm text-zinc-600">
                        <Link href="/aktuality" className="hover:text-zinc-900">
                            Aktuality
                        </Link>
                        <span className="mx-2 text-zinc-400">/</span>
                        <span className="text-zinc-700">Detail</span>
                    </div>
                    <Link
                        href="/aktuality"
                        className="inline-flex h-9 items-center gap-2 rounded-lg border border-black/10 bg-white/80 px-4 text-sm font-medium uppercase tracking-wide text-zinc-800 shadow-sm transition hover:bg-[#A0C4FF]"
                    >
                        ← Zpět
                    </Link>
                </div>

                <article className="mt-8 rounded-2xl border border-black/10 bg-white/80 p-6 shadow-sm sm:p-8">
                    <h1 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
                        {item.title}
                    </h1>
                    <div className="mt-3 text-sm text-zinc-600">
                        Publikováno{" "}
                        <time dateTime={item.publishedAt}>
                            {formatDateCs(item.publishedAt)}
                        </time>
                    </div>

                    <div className="mt-8 space-y-4 text-zinc-700 leading-relaxed">
                        <p>
                            Tohle je zatím ukázková stránka detailu aktuality. Až
                            budeš chtít, napojíme sem reálný obsah z CMS nebo z
                            JSON/MD souborů.
                        </p>
                        <p>
                            Pro teď řešíme hlavně to, aby karta z domovské
                            stránky vedla na hezkou URL podle slugu.
                        </p>
                    </div>
                </article>
            </div>
        </main>
    );
}

