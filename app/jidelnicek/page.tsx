import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { JIDELNICEK_PAGE } from "@/lib/static-page-content";
import { linkButtonOutlineSm } from "@/lib/button-link-classes";
import { buildPageMetadata } from "@/lib/seo";
import { czechWeekday, formatDateCs } from "@/lib/cms/dates";
import { getWeekMenu, isMenuDayFilled } from "@/lib/cms/menu";

export const dynamic = "force-dynamic";

export const metadata = buildPageMetadata({
    title: JIDELNICEK_PAGE.title,
    description: JIDELNICEK_PAGE.description,
    path: "/jidelnicek",
});

const noteMarkdown = {
    h2: ({ children }: { children?: React.ReactNode }) => (
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground first:mt-0 sm:text-[2rem]">
            {children}
        </h2>
    ),
    p: ({ children }: { children?: React.ReactNode }) => (
        <p className="mb-5 max-w-prose text-base leading-relaxed text-muted-foreground last:mb-0">
            {children}
        </p>
    ),
    a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
        <a
            href={href}
            className="text-primary underline underline-offset-2 hover:text-primary/90"
        >
            {children}
        </a>
    ),
};

export default async function JidelnicekPage() {
    const days = await getWeekMenu();
    const hasMeals = days.some(isMenuDayFilled);
    const noteSections = JIDELNICEK_PAGE.markdown
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
                                {JIDELNICEK_PAGE.eyebrow}
                            </p>
                            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                                {JIDELNICEK_PAGE.title}
                            </h1>
                            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                                {JIDELNICEK_PAGE.description}
                            </p>
                        </div>
                        <Link href="/" className={linkButtonOutlineSm}>
                            ← Zpět
                        </Link>
                    </header>

                    <Card className="content-card mt-12 overflow-hidden sm:mt-14">
                        <CardHeader className="border-b border-border/80 bg-muted/40 py-6 sm:py-8">
                            <h2 className="text-2xl font-semibold tracking-tight">
                                Aktuální týden
                            </h2>
                            <p className="mt-2 text-sm text-muted-foreground">
                                {formatDateCs(days[0]?.day_date ?? "")} –{" "}
                                {formatDateCs(days[4]?.day_date ?? "")}
                            </p>
                        </CardHeader>
                        <CardContent className="p-0">
                            {hasMeals ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-[40rem] w-full text-left text-sm">
                                        <thead className="border-b border-border bg-muted/30 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                                            <tr>
                                                <th className="px-4 py-3 sm:px-6">Den</th>
                                                <th className="px-3 py-3">Přesnídávka</th>
                                                <th className="px-3 py-3">Polévka</th>
                                                <th className="px-3 py-3">Hlavní</th>
                                                <th className="px-3 py-3 sm:pr-6">Svačina</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {days.map((day) => (
                                                <tr
                                                    key={day.day_date}
                                                    className="border-b border-border last:border-0"
                                                >
                                                    <td className="whitespace-nowrap px-4 py-4 font-medium sm:px-6">
                                                        {czechWeekday(day.day_date)}
                                                    </td>
                                                    <td className="px-3 py-4 text-muted-foreground">
                                                        {day.snack_1 || "—"}
                                                    </td>
                                                    <td className="px-3 py-4 text-muted-foreground">
                                                        {day.soup || "—"}
                                                    </td>
                                                    <td className="px-3 py-4 text-muted-foreground">
                                                        {day.main_meal || "—"}
                                                    </td>
                                                    <td className="px-3 py-4 text-muted-foreground sm:pr-6">
                                                        {day.snack_2 || "—"}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p className="p-6 text-sm leading-relaxed text-muted-foreground sm:p-8">
                                    Jídelníček na tento týden zatím není zveřejněný.
                                </p>
                            )}
                        </CardContent>
                    </Card>

                    <div className="mt-8 space-y-8">
                        {noteSections.map((section) => (
                            <Card key={section} className="content-card overflow-hidden">
                                <CardContent className="p-6 sm:p-8 md:p-10">
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        components={noteMarkdown}
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
