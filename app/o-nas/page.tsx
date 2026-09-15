import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    linkButtonOutlineSm,
    linkButtonPrimaryLg,
} from "@/lib/button-link-classes";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
    title: "Představení školy",
    description:
        "Kdo jsme, jak přistupujeme k dětem a jak probíhá vzdělávání v MŠ Tyršovka v Modřanech.",
    path: "/o-nas",
});

const SCHOOL_PILLARS = [
    {
        title: "Zdravý životní styl",
        text: "MŠ Tyršovka je zaměřená na výchovu a vzdělávání ke zdravému životnímu stylu. Důraz klade na pohybové aktivity, pestré stravování, prevenci rizikového chování a rozvoj emoční i sociální inteligence.",
    },
    {
        title: "Podpora každého dítěte",
        text: "Škola začleňuje do běžného kolektivu děti s odlišným mateřským jazykem a nabízí jim podporu pomocí kroužku českého jazyka. Do školy docházejí také děti s potravinovými alergiemi, pro které se vaří pod dohledem nutriční terapeutky.",
    },
    {
        title: "Klidné zázemí v Modřanech",
        text: "Areál v Lysinské ulici tvoří provozní budova a tři pavilony obklopené rozlehlou zahradou se vzrostlou zelení. Děti mají k dispozici velkou zahradu, vodní prvky i oddělenou menší zahradu pro adaptaci nově příchozích dětí.",
    },
];

const RELATED_LINKS = [
    { href: "/tridy", label: "Třídy" },
    { href: "/galerie", label: "Fotogalerie" },
    { href: "/svp", label: "ŠVP" },
    { href: "/zprava-csi", label: "Zpráva ČŠI" },
];

export default function ONasPage() {
    return (
        <main className="flex-1 text-zinc-900">
            <div className="page-shell section-shell">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div className="max-w-3xl">
                        <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                            O škole
                        </p>
                        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                            Představení školy
                        </h1>
                        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                            MŠ Tyršovka je mateřská škola zaměřená na zdravý
                            životní styl, pohyb, bezpečné prostředí a respektující
                            přístup k dětem.
                        </p>
                    </div>

                    <Link href="/" className={linkButtonOutlineSm}>
                        ← Zpět
                    </Link>
                </div>

                <section className="mt-10">
                    <Card className="bg-card">
                        <CardHeader>
                            <h2 className="text-2xl font-semibold tracking-tight">
                                Kdo jsme
                            </h2>
                        </CardHeader>
                        <CardContent className="space-y-4 text-base leading-relaxed text-muted-foreground">
                            <p>
                                Škola připravuje vzdělávací nabídku v souladu s
                                Rámcovým vzdělávacím programem pro předškolní
                                vzdělávání a průběžně reaguje na nové trendy v
                                předškolním vzdělávání.
                            </p>
                            <p>
                                V klidné vilové části starých Modřan mají děti k
                                dispozici provozní budovu, tři pavilony, velkou
                                zahradu s různorodými herními prvky a v teplých
                                měsících i vodní prvky. Pro nejmenší děti slouží
                                oddělená zahrada využívaná při adaptaci.
                            </p>
                            <p>
                                Každý pavilon má dvě třídy se šatnou, sociálním
                                zázemím, třídou a hernou, která zároveň slouží jako
                                ložnice. Součástí školy je také tělocvična,
                                keramická dílna s vlastní pecí a výtvarný ateliér.
                            </p>
                            <p>
                                Děti jsou rozdělené do tříd podle věku. V každé
                                třídě působí dva učitelé, škola má také asistenty
                                pedagoga a provozní zaměstnance, kteří společně
                                zajišťují provoz od 6:30 do 17:30.
                            </p>
                        </CardContent>
                    </Card>
                </section>

                <section className="mt-14 border-t border-border pt-10">
                    <div className="max-w-2xl">
                        <h2 className="section-title">Jak přistupujeme k dětem</h2>
                    </div>

                    <div className="mt-8 grid gap-5 md:grid-cols-3">
                        {SCHOOL_PILLARS.map((pillar) => (
                            <Card
                                key={pillar.title}
                                className="bg-card"
                            >
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-xl">
                                        {pillar.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                                        {pillar.text}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                <section className="mt-14 border-t border-border pt-10">
                    <Card className="bg-card">
                        <CardHeader className="gap-3">
                            <h2 className="text-2xl font-semibold tracking-tight">
                                Třídy, galerie a dokumenty
                            </h2>
                            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                                Podrobnosti o třídách, fotografie a oficiální dokumenty
                                vedeme na samostatných stránkách.
                            </p>
                        </CardHeader>
                        <CardContent className="flex flex-wrap gap-3">
                            {RELATED_LINKS.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={linkButtonPrimaryLg}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </CardContent>
                    </Card>
                </section>
            </div>
        </main>
    );
}
