import Link from "next/link";
import Image from "next/image";
import aktuality from "@/app/data/aktuality.json";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { linkButtonOutlineSm } from "@/lib/button-link-classes";

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

export default function AktualityPage() {
    const items = (aktuality as Aktualita[])
        .slice()
        .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

    return (
        <main className="flex-1 text-zinc-900">
            <div className="page-shell section-shell">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <Badge variant="soft" className="mb-4">
                            Přehled aktualit
                        </Badge>
                        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                            Aktuality
                        </h1>
                        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                            Přehled všech novinek a oznámení.
                        </p>
                    </div>

                    <Link href="/" className={linkButtonOutlineSm}>
                        ← Zpět
                    </Link>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
                    {items.map((item) => (
                        <Link
                            key={item.slug}
                            href={`/aktuality/${item.slug}`}
                            className="group block"
                        >
                            <Card className="overflow-hidden bg-card">
                                <div className="grid gap-0 sm:grid-cols-[200px_1fr]">
                                    <div className="relative h-48 bg-muted sm:h-full">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 640px) 100vw, 200px"
                                        />
                                    </div>
                                    <div>
                                        <CardHeader className="pb-3">
                                            <Badge variant="outline" className="w-fit">
                                                <time dateTime={item.publishedAt}>
                                                    {formatDateCs(item.publishedAt)}
                                                </time>
                                            </Badge>
                                            <CardTitle className="w-full truncate text-xl">
                                                {item.title}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm leading-relaxed text-muted-foreground">
                                                Otevřít detail aktuality a
                                                zobrazit další informace.
                                            </p>
                                        </CardContent>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}

