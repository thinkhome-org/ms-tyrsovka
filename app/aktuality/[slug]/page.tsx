import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import aktuality from "@/app/data/aktuality.json";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { linkButtonOutlineSm } from "@/lib/button-link-classes";
import { buildPageMetadata, buildAbsoluteUrl } from "@/lib/seo";

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

export function generateStaticParams() {
    return (aktuality as Aktualita[]).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const item = (aktuality as Aktualita[]).find((a) => a.slug === slug);
    if (!item) return {};
    const path = `/aktuality/${slug}`;
    return buildPageMetadata({
        title: item.title,
        description: `${item.title} – aktuality MŠ Tyršovka.`,
        path,
        imagePath: item.image.startsWith("http") ? item.image : buildAbsoluteUrl(item.image),
    });
}

export default async function AktualitaDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const item = (aktuality as Aktualita[]).find((a) => a.slug === slug);
    if (!item) notFound();

    const articleJsonLd = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: item.title,
        datePublished: item.publishedAt,
        image: buildAbsoluteUrl(item.image.startsWith("http") ? item.image : item.image),
        publisher: {
            "@type": "Organization",
            name: "MŠ Tyršovka",
            logo: { "@type": "ImageObject", url: buildAbsoluteUrl("/logo.png") },
        },
    };

    return (
        <main className="flex-1 text-zinc-900">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
            />
            <div className="page-shell section-shell">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="text-sm text-muted-foreground">
                        <Link href="/aktuality" className="hover:text-foreground">
                            Aktuality
                        </Link>
                        <span className="mx-2 text-border">/</span>
                        <span className="text-foreground/75">Detail</span>
                    </div>
                    <Link href="/aktuality" className={linkButtonOutlineSm}>
                        ← Zpět
                    </Link>
                </div>

                <Card className="mt-8 overflow-hidden bg-card">
                    <div className="relative h-64 w-full bg-muted sm:h-80 lg:h-112">
                        <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                            sizes="100vw"
                        />
                    </div>
                    <CardContent className="p-6 sm:p-8">
                        <Badge variant="soft" className="mb-4">
                            Publikováno{" "}
                            <time dateTime={item.publishedAt}>
                                {formatDateCs(item.publishedAt)}
                            </time>
                        </Badge>
                        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                            {item.title}
                        </h1>

                        <div className="mt-8 space-y-4 leading-relaxed text-muted-foreground">
                            <p>
                                Tohle je zatím ukázková stránka detailu aktuality.
                                Až budeš chtít, napojíme sem reálný obsah z CMS
                                nebo z JSON/MD souborů.
                            </p>
                            <p>
                                Pro teď řešíme hlavně to, aby karta z domovské
                                stránky vedla na hezkou URL podle slugu a měla
                                sjednocený vzhled s novým homepage designem.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}

