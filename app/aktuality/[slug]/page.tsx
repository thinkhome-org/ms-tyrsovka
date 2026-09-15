import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { linkButtonOutlineSm } from "@/lib/button-link-classes";
import { buildPageMetadata, buildAbsoluteUrl } from "@/lib/seo";
import { getBySlug } from "@/lib/cms/aktuality";
import { formatDateCs } from "@/lib/cms/dates";
import { coverSrc } from "@/lib/cms/media";
import { AktualitaBody } from "@/app/components/aktualita-body";

export const dynamic = "force-dynamic";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const item = await getBySlug(slug);
    if (!item) return {};
    const image = coverSrc(item.cover_key);
    return buildPageMetadata({
        title: item.title,
        description: item.excerpt || `${item.title} – aktuality MŠ Tyršovka.`,
        path: `/aktuality/${slug}`,
        imagePath: image
            ? image.startsWith("http")
                ? image
                : buildAbsoluteUrl(image)
            : "/logo.png",
    });
}

export default async function AktualitaDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const item = await getBySlug(slug);
    if (!item) notFound();

    const image = coverSrc(item.cover_key);
    const date = item.published_at || item.created_at;
    const articleJsonLd = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: item.title,
        datePublished: date,
        image: image ? buildAbsoluteUrl(image) : buildAbsoluteUrl("/logo.png"),
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
                    {image ? (
                        <div className="relative h-64 w-full bg-muted sm:h-80 lg:h-112">
                            <Image
                                src={image}
                                alt={item.title}
                                fill
                                loading="eager"
                                className="object-cover"
                                sizes="100vw"
                            />
                        </div>
                    ) : null}
                    <CardContent className="p-6 sm:p-8">
                        <Badge variant="soft" className="mb-4">
                            Publikováno{" "}
                            <time dateTime={date}>{formatDateCs(date)}</time>
                        </Badge>
                        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                            {item.title}
                        </h1>
                        {item.body_html ? (
                            <div className="mt-6">
                                <AktualitaBody html={item.body_html} />
                            </div>
                        ) : null}
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
