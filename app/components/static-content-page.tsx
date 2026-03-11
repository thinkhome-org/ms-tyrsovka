import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { linkButtonOutlineSm } from "@/lib/button-link-classes";

export type StaticPageLink = {
    href: string;
    label: string;
    description: string;
};

export type StaticPageContent = {
    eyebrow: string;
    title: string;
    description: string;
    markdown: string;
    backHref?: string;
    backLabel?: string;
    quickLinks?: StaticPageLink[];
};

const markdownComponents = {
    h2: ({ children }: { children?: React.ReactNode }) => (
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground first:mt-0 sm:text-[2rem]">
            {children}
        </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
        <h3 className="mt-8 max-w-prose text-xl font-semibold tracking-tight text-foreground first:mt-0 sm:text-[1.4rem]">
            {children}
        </h3>
    ),
    p: ({ children }: { children?: React.ReactNode }) => (
        <p className="mb-5 max-w-prose text-base leading-relaxed text-muted-foreground last:mb-0">
            {children}
        </p>
    ),
    ul: ({ children }: { children?: React.ReactNode }) => (
        <ul className="mb-7 max-w-prose list-disc space-y-2.5 pl-6 text-base leading-relaxed text-muted-foreground">
            {children}
        </ul>
    ),
    ol: ({ children }: { children?: React.ReactNode }) => (
        <ol className="mb-7 max-w-prose list-decimal space-y-2.5 pl-6 text-base leading-relaxed text-muted-foreground">
            {children}
        </ol>
    ),
    li: ({ children }: { children?: React.ReactNode }) => (
        <li className="leading-relaxed">{children}</li>
    ),
    strong: ({ children }: { children?: React.ReactNode }) => (
        <strong className="font-semibold text-foreground">{children}</strong>
    ),
    a: ({
        href,
        children,
    }: {
        href?: string;
        children?: React.ReactNode;
    }) => (
        <a
            href={href}
            target={href?.startsWith("http") ? "_blank" : undefined}
            rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
            className="text-primary underline underline-offset-2 hover:text-primary/90"
        >
            {children}
        </a>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
        <blockquote className="my-8 max-w-prose border-l-2 border-border pl-4 text-base italic leading-relaxed text-muted-foreground">
            {children}
        </blockquote>
    ),
    img: ({ src, alt }: { src?: string; alt?: string }) =>
        src ? (
            <span className="my-4 block overflow-hidden rounded-lg border border-border bg-muted">
                <Image
                    src={src}
                    alt={alt ?? ""}
                    width={1600}
                    height={1200}
                    className="h-auto w-full object-cover"
                />
            </span>
        ) : null,
    table: ({ children }: { children?: React.ReactNode }) => (
        <div className="mb-6 overflow-x-auto">
            <table className="min-w-full border-collapse overflow-hidden rounded-lg border border-border text-left text-sm">
                {children}
            </table>
        </div>
    ),
    thead: ({ children }: { children?: React.ReactNode }) => (
        <thead className="bg-muted/70 text-foreground">{children}</thead>
    ),
    tbody: ({ children }: { children?: React.ReactNode }) => (
        <tbody className="bg-card">{children}</tbody>
    ),
    tr: ({ children }: { children?: React.ReactNode }) => (
        <tr className="border-b border-border last:border-b-0">{children}</tr>
    ),
    th: ({ children }: { children?: React.ReactNode }) => (
        <th className="px-4 py-3 align-top font-medium">{children}</th>
    ),
    td: ({ children }: { children?: React.ReactNode }) => (
        <td className="px-4 py-3 align-top text-muted-foreground">{children}</td>
    ),
};

export default function StaticContentPage({
    content,
}: {
    content: StaticPageContent;
}) {
    const sections = content.markdown
        .split(/\n---\n/g)
        .map((section) => section.trim())
        .filter(Boolean);

    return (
        <main className="flex-1 text-zinc-900">
            <div className="page-shell section-shell">
                <div className="mx-auto max-w-5xl">
                    <header className="flex flex-wrap items-end justify-between gap-6">
                        <div className="min-w-0 max-w-3xl">
                            <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                                {content.eyebrow}
                            </p>
                            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                                {content.title}
                            </h1>
                            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                                {content.description}
                            </p>
                        </div>

                        <Link
                            href={content.backHref ?? "/"}
                            className={linkButtonOutlineSm}
                        >
                            {content.backLabel ?? "← Zpět"}
                        </Link>
                    </header>

                    {content.quickLinks?.length ? (
                        <section className="mt-12">
                            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                {content.quickLinks.map((link) => (
                                    <Card
                                        key={link.href}
                                        className="content-card overflow-hidden transition-shadow hover:shadow-md"
                                    >
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-xl">
                                                <Link
                                                    href={link.href}
                                                    className="transition-colors hover:text-primary"
                                                >
                                                    {link.label}
                                                </Link>
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4 pt-0">
                                            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                                                {link.description}
                                            </p>
                                            <Link
                                                href={link.href}
                                                className="inline-flex text-sm font-medium text-primary underline underline-offset-2"
                                            >
                                                Otevřít stránku
                                            </Link>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </section>
                    ) : null}

                    <div className="mt-12 space-y-8 sm:mt-14">
                        {sections.map((section, index) => (
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
            </div>
        </main>
    );
}
