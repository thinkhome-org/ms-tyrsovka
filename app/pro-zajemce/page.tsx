import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { linkButtonOutlineSm } from "@/lib/button-link-classes";

export const metadata = buildPageMetadata({
    title: "Pro zájemce",
    description:
        "Informace pro rodiny, které zvažují MŠ Tyršovka: mladší děti, předškoláci a zápis.",
    path: "/pro-zajemce",
});

const LINKS = [
    {
        href: "/pro-zajemce/mladsi-deti",
        title: "Pro mladší děti",
        text: "Adaptace, první dny a třídy pro děti, které školku teprve poznávají.",
    },
    {
        href: "/pro-zajemce/predskolaci",
        title: "Pro předškoláky",
        text: "Poslední rok před základní školou, příprava a povinná docházka.",
    },
    {
        href: "/zapisy",
        title: "Zápis a přijetí",
        text: "Termíny, postup, kritéria a dokumenty ke stažení.",
    },
];

export default function ProZajemcePage() {
    return (
        <main className="flex-1 text-zinc-900">
            <div className="page-shell section-shell">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div className="max-w-3xl">
                        <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                            Pro zájemce
                        </p>
                        <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
                            Seznamte se s Tyršovkou
                        </h1>
                        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                            Tři vstupy podle toho, kde právě jste: mladší děti, předškoláci, nebo zápis.
                        </p>
                    </div>
                    <Link href="/" className={linkButtonOutlineSm}>
                        ← Zpět
                    </Link>
                </div>
                <div className="mt-10 grid gap-5 md:grid-cols-3">
                    {LINKS.map((link) => (
                        <Link key={link.href} href={link.href} className="group">
                            <Card className="h-full content-card">
                                <CardHeader>
                                    <h2 className="text-2xl font-semibold tracking-tight group-hover:text-primary">
                                        {link.title}
                                    </h2>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                                        {link.text}
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
