import Image from "next/image";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import ReactMarkdown from "react-markdown";
import { markdownTextComponents } from "@/app/components/static-content-page";
import remarkGfm from "remark-gfm";
import { Card, CardContent } from "@/components/ui/card";
import { linkButtonOutlineSm } from "@/lib/button-link-classes";
import { SITE_PAGES } from "@/lib/site-content";
import { buildPageMetadata } from "@/lib/seo";
import { ZAPISY_HEADER_IMAGES, ZAPISY_MARKDOWN } from "./content";

export const metadata = buildPageMetadata({
    title: SITE_PAGES.zapisy.title,
    description:
        "Termíny zápisu do MŠ Tyršovka, předzápis, osobní zápis a kritéria přijímání pro školní rok 2026/2027.",
    path: "/zapisy",
});

const MARKDOWN_SECTIONS = ZAPISY_MARKDOWN.split(/\n---\n/g)
    .map((section) => section.trim())
    .filter(Boolean);

const markdownComponents = {
    ...markdownTextComponents,
    img: ({ src, alt }: ComponentPropsWithoutRef<"img">) =>
        typeof src === "string" ? (
            <span className="my-4 block overflow-hidden rounded-lg bg-muted">
                <Image
                    src={src}
                    alt={alt ?? ""}
                    width={800}
                    height={500}
                    className="h-auto w-full object-cover"
                    sizes="(max-width: 768px) 100vw, 800px"
                />
            </span>
        ) : null,
};

export default function ZapisyPage() {
    return (
        <main data-section="parents" className="flex-1 text-zinc-900">
            <div className="page-shell section-shell">
                <div className="mx-auto max-w-4xl">
                    <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-8">
                        <div className="min-w-0 max-w-3xl flex-1">
                            <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                                Informace pro rodiče
                            </p>
                            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                                {SITE_PAGES.zapisy.title}
                            </h1>
                            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                                Termíny, předzápis, osobní zápis a kritéria
                                přijímání do MŠ.
                            </p>
                        </div>

                        <div className="flex shrink-0 flex-col items-start gap-2 sm:flex-row md:flex-col md:items-end">
                            {ZAPISY_HEADER_IMAGES.length > 0 && (
                                <div className="w-full md:w-[280px] lg:w-[320px]">
                                    <div className="flex gap-2 overflow-x-auto pb-1 sm:grid sm:grid-cols-2 sm:overflow-visible md:flex md:flex-col md:gap-3">
                                        {ZAPISY_HEADER_IMAGES.map((img, i) => (
                                            <div
                                                key={i}
                                                className="relative h-40 shrink-0 overflow-hidden rounded-xl bg-muted sm:h-36 md:aspect-4/3 md:h-auto"
                                            >
                                                <Image
                                                    src={img.src}
                                                    alt={img.alt}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 640px) 160px, (max-width: 768px) 50vw, 320px"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <Link href="/" className={linkButtonOutlineSm}>
                                ← Zpět
                            </Link>
                        </div>
                    </header>
                </div>

                <div className="mx-auto mt-12 max-w-4xl space-y-8 sm:mt-14">
                    {MARKDOWN_SECTIONS.map((section, index) => (
                        <Card
                            key={index}
                            className="content-card overflow-hidden"
                        >
                            <CardContent className="p-6 sm:p-8 md:p-10">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={markdownComponents}
                                >
                                    {section}
                                </ReactMarkdown>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </main>
    );
}
