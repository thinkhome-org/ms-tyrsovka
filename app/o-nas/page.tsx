import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    linkButtonOutlineSm,
    linkButtonPrimaryLg,
} from "@/lib/button-link-classes";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
    title: "O nás",
    description:
        "Představení MŠ Tyršovka: zaměření na zdravý životní styl, podpora každého dítěte a klidné zázemí v Modřanech. Provozní zaměstnanci.",
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

const OPERATIONS_STAFF = [
    {
        role: "Kuchařky",
        people: ["Kateřina Maudrová", "Marta Terdy", "Hana Fáberová"],
    },
    {
        role: "Uklízečky",
        people: ["Denisa Ježková", "Jana Záleská", "Tereza Svobodová"],
    },
    {
        role: "Školnice",
        people: ["Hana Fáberová"],
    },
    {
        role: "Obsluha kotelny",
        people: ["Michal Hřebíček"],
    },
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
                            O nás
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

                <section className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                    <Card className="bg-card">
                        <CardHeader>
                            <CardTitle className="text-2xl">MŠ Tyršovka</CardTitle>
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

                    <Card className="bg-card">
                        <CardHeader>
                            <CardTitle className="text-2xl">
                                Kontakt a adresa
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                            <div>
                                <p className="font-medium text-foreground">
                                    Kontaktujte nás
                                </p>
                                <p className="mt-2">reditelka@tyrsovka.cz</p>
                                <p>+420 737 381 935</p>
                            </div>
                            <div>
                                <p className="font-medium text-foreground">
                                    Adresa
                                </p>
                                <p className="mt-2">
                                    Lysinská 184/45
                                    <br />
                                    143 00, Praha 4 - Modřany
                                </p>
                            </div>
                            <div>
                                <p className="font-medium text-foreground">
                                    Identifikační údaje
                                </p>
                                <p className="mt-2">Datová schránka: 9u4k2vr</p>
                                <p>IČ: 63109719</p>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                <section className="mt-14 border-t border-border pt-10">
                    <div className="max-w-2xl">
                        <h2 className="section-title">Co je pro školu důležité</h2>
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
                            <CardTitle className="text-2xl">Třídy v MŠ</CardTitle>
            
                        </CardHeader>
                        <CardContent>
                            <Link href="/tridy" className={linkButtonPrimaryLg}>
                                Zobrazit třídy
                            </Link>
                        </CardContent>
                    </Card>
                </section>

                <section className="mt-14 border-t border-border pt-10">
                    <div className="max-w-2xl">
                        <h2 className="section-title">Provozní zaměstnanci</h2>
                        <p className="section-copy mt-3">
                            Lidé, kteří zajišťují každodenní zázemí školy a podílí
                            se na jejím plynulém provozu.
                        </p>
                    </div>

                    <div className="mt-8 grid gap-5 md:grid-cols-2">
                        {OPERATIONS_STAFF.map((group) => (
                            <Card
                                key={group.role}
                                className="bg-card"
                            >
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-xl">
                                        {group.role}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                                        {group.people.map((person) => (
                                            <li key={person}>{person}</li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}

