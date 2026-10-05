import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { linkButtonOutlineSm } from "@/lib/button-link-classes";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
    title: "Edukační materiály",
    description:
        "Desatero předškoláka, profil předškoláka a profil prvňáka pro rodiče MŠ Tyršovka.",
    path: "/edukacni-materialy",
});

const MATERIALS = [
    {
        title: "Desatero předškoláka",
        text: "Desatero pro rodiče dětí předškolního věku. Deset oblastí, ve kterých se dítě před školou postupně posouvá: pohyb, sebeobsluha, řeč, jemná motorika i vztahy s ostatními.",
        href: "https://msmt.gov.cz/file/61051_1_1/",
        label: "Otevřít desatero (PDF, MŠMT)",
    },
    {
        title: "Profil předškoláka",
        text: "Konkretizované očekávané výstupy RVP PV. Podrobnější rozpis toho, co by dítě na konci mateřské školy mělo zvládat. Každé dítě k tomu dospívá vlastním tempem.",
        href: "https://www.msmt.cz/vzdelavani/predskolni-vzdelavani/konkretizovane-ocekavane-vystupy-rvp-pv",
        label: "Otevřít profil předškoláka (MŠMT)",
    },
    {
        title: "Profil prvňáka",
        text: "Stejné desatero MŠMT popisuje, s čím dítě vstupuje do první třídy. Není to zkouška. Je to orientace pro rodiče, co školní zralost v praxi znamená.",
        href: "https://msmt.gov.cz/file/61051_1_1/",
        label: "Otevřít profil prvňáka (PDF, MŠMT)",
    },
];

export default function EdukacniMaterialyPage() {
    return (
        <main className="flex-1 text-zinc-900">
            <div className="page-shell section-shell">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div className="max-w-3xl">
                        <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                            Pro rodiče
                        </p>
                        <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
                            Edukační materiály
                        </h1>
                        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                            Materiály ministerstva školství k tomu, co dítě postupně
                            zvládá v mateřské škole a před nástupem do první třídy.
                        </p>
                    </div>
                    <Link href="/" className={linkButtonOutlineSm}>
                        ← Zpět
                    </Link>
                </div>

                <div className="mt-10 space-y-6">
                    {MATERIALS.map((item) => (
                        <Card key={item.title} className="content-card overflow-hidden">
                            <CardContent className="p-6 sm:p-8">
                                <h2 className="text-2xl font-semibold tracking-tight">
                                    {item.title}
                                </h2>
                                <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
                                    {item.text}
                                </p>
                                <a
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary underline underline-offset-2"
                                >
                                    {item.label}
                                    <ArrowUpRight className="size-3.5" />
                                </a>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </main>
    );
}
