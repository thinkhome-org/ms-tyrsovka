import Image from "next/image";
import Link from "next/link";
import { listAll } from "@/lib/cms/aktuality";
import { formatDateCs } from "@/lib/cms/dates";
import { coverSrc } from "@/lib/cms/media";
import { Badge } from "@/components/ui/badge";
import { linkButtonPrimaryLg } from "@/lib/button-link-classes";

export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
    const items = await listAll();

    return (
        <main className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
            <div className="flex flex-wrap items-end justify-between gap-5">
                <div>
                    <p className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                        Připnuté lístky
                    </p>
                    <h1 className="mt-2 font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
                        Aktuality
                    </h1>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                        Co sem uložíte jako publikované, uvidí rodiče na webu. Koncept
                        zůstane jen tady.
                    </p>
                </div>
                <Link href="/admin/nova" className={linkButtonPrimaryLg}>
                    Nová aktualita
                </Link>
            </div>

            {items.length === 0 ? (
                <div className="mt-12 rounded-2xl border border-dashed border-border bg-card/70 px-6 py-16 text-center">
                    <p className="font-heading text-2xl">Nástěnka je prázdná</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Přidejte první novinku pro rodiče.
                    </p>
                </div>
            ) : (
                <ul className="mt-10 grid gap-4">
                    {items.map((item) => {
                        const image = coverSrc(item.cover_key);
                        const date = item.published_at || item.created_at;
                        return (
                            <li key={item.id}>
                                <Link
                                    href={`/admin/${item.id}`}
                                    className="group grid overflow-hidden rounded-2xl border border-border bg-card shadow-[0_12px_40px_-28px_rgba(40,28,12,0.45)] transition-transform hover:-translate-y-0.5 sm:grid-cols-[9.5rem_1fr]"
                                >
                                    <div className="relative h-36 bg-muted sm:h-full">
                                        {image ? (
                                            <Image
                                                src={image}
                                                alt=""
                                                fill
                                                className="object-cover"
                                                sizes="160px"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center text-xs uppercase tracking-[0.18em] text-muted-foreground">
                                                Bez fotky
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col justify-center gap-3 p-5 sm:p-6">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <Badge
                                                variant={
                                                    item.status === "published"
                                                        ? "default"
                                                        : "outline"
                                                }
                                            >
                                                {item.status === "published"
                                                    ? "Publikováno"
                                                    : "Koncept"}
                                            </Badge>
                                            <time
                                                dateTime={date}
                                                className="text-sm text-muted-foreground"
                                            >
                                                {formatDateCs(date, "long")}
                                            </time>
                                        </div>
                                        <h2 className="font-heading text-2xl font-semibold tracking-tight group-hover:text-primary">
                                            {item.title}
                                        </h2>
                                        {item.excerpt ? (
                                            <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                                                {item.excerpt}
                                            </p>
                                        ) : null}
                                    </div>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            )}
        </main>
    );
}
