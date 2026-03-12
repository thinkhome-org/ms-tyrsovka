import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { linkButtonOutlineSm } from "@/lib/button-link-classes";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
    title: "Třídy",
    description:
        "Přehled tříd MŠ Tyršovka: Jahodová, Meruňková, Borůvková, Citrónová, Jablková a Hrušková. Věkové skupiny a zaměření tříd.",
    path: "/tridy",
});

const CLASSROOMS = [
    {
        name: "Jahodová třída",
        age: "2,5–4 let",
        image: "/tridy/jahodova.png",
        email: "jahodova@tyrsovka.cz",
        phone: "+420 XXX XXX 001",
        paragraphs: [
            "Jahodovou třídu navštěvují děti, které školku navštěvují prvním rokem. Třída má i oddělené hřiště, které pomáhá s pozvolnou a klidnou adaptací na nové prostředí.",
            "Hlavním cílem je vytvořit bezpečné a podnětné prostředí, ve kterém si děti zvykají na režim dne, nové vztahy i odloučení od rodičů. Důraz je na hru, rozvoj samostatnosti, sebeobsluhy a základních sociálních dovedností.",
        ],
    },
    {
        name: "Meruňková třída",
        age: "2,5–4 let",
        image: "/tridy/merunkova.png",
        email: "merunkova@tyrsovka.cz",
        phone: "+420 XXX XXX 002",
        paragraphs: [
            "Meruňková třída se soustředí na seznámení s mateřskou školou, orientaci v režimu dne a postupné osvojení hygienických a stravovacích návyků.",
            "Učitelky pracují s individualitou každého dítěte a jako hlavní prostředek rozvoje zůstává hra, která přirozeně provází celý den. Cílem je, aby děti zvládly odloučení od rodičů a těšily se na školku i své kamarády.",
        ],
    },
    {
        name: "Borůvková třída",
        age: "3–5 let",
        image: "/tridy/boruvkova.png",
        email: "boruvkova@tyrsovka.cz",
        phone: "+420 XXX XXX 003",
        paragraphs: [
            "Borůvková třída podporuje větší samostatnost dětí, rozvoj pohybových dovedností, komunikačních schopností a zdravých sociálních vztahů. Děti se učí pracovat s chybou a nebát se neúspěchu.",
            "Součástí vzdělávání je práce s emocemi, bezpečné řešení rizikových situací a zážitkové učení. Pravidelně se vyráží do přírody, kde se propojují vzdělávací aktivity s pohybem a posilováním sebevědomí.",
        ],
    },
    {
        name: "Citrónová třída",
        age: "3–5 let",
        image: "/tridy/citronova.png",
        email: "citronova@tyrsovka.cz",
        phone: "+420 XXX XXX 004",
        paragraphs: [
            "Ve třídě se klade důraz na komplexní rozvoj osobnosti dítěte s ohledem na jeho individuální potřeby, tempo a schopnosti. Děti jsou vedeny k sebedůvěře, komunikaci a zdravému prosazení vlastního názoru.",
            "Práce s chybou je vnímána jako přirozená součást učení. Třídu provází projekty zaměřené na emoční rozvoj i pohybovou zdatnost a důležitou roli hraje také otevřená spolupráce s rodinou.",
        ],
    },
    {
        name: "Jablková třída",
        age: "4–6 let",
        image: "/tridy/jablkova.png",
        email: "jablkova@tyrsovka.cz",
        phone: "+420 XXX XXX 005",
        paragraphs: [
            "Jablková třída se zaměřuje na samostatnost, sebeobsluhu, divergentní myšlení a přípravu předškolních dětí na vstup do základní školy. Děti se učí rozhodovat, jednat a v případě potřeby si říct o pomoc.",
            "Po celý rok třídu provázejí programy zaměřené na zdravý životní styl, emoční inteligenci i zážitkové učení v přírodě. Předškoláci mají možnost účastnit se například plaveckého nebo lyžařského kurzu.",
        ],
    },
    {
        name: "Hrušková třída",
        age: "5–7 let",
        image: "/tridy/hruskova.png",
        email: "hruskova@tyrsovka.cz",
        phone: "+420 XXX XXX 006",
        paragraphs: [
            "Poslední rok v mateřské škole je zaměřený na posílení sebedůvěry, schopnosti prosadit se, komunikačních dovedností a přípravy na vstup do základní školy. Děti jsou vedeny k samostatnému řešení problémů a k bádání.",
            "Třídu provází předškolní příprava, práce s emocemi, zážitkové učení v přírodě i řada školních akcí. Cílem je, aby si děti poslední rok ve školce užily a odcházely s radostí a jistotou.",
        ],
    },
];


export default function TridyPage() {
    return (
        <main className="flex-1 text-zinc-900">
            <div className="page-shell section-shell">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div className="max-w-3xl">
                        <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                            O škole
                        </p>
                        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                            Třídy v MŠ
                        </h1>
                        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                            Přehled tříd, věkového rozdělení a hlavního zaměření
                            jednotlivých skupin. 
                        </p>
                    </div>

                    <Link href="/o-nas" className={linkButtonOutlineSm}>
                        ← O nás
                    </Link>
                </div>

                <div className="mt-10 grid gap-6 xl:grid-cols-2">
                    {CLASSROOMS.map((classroom) => (
                        <Card
                            key={classroom.name}
                            className="overflow-hidden bg-card"
                        >
                            <div className="grid gap-0 md:grid-cols-[220px_1fr]">
                                <div className="p-4 md:p-5">
                                    <div className="relative aspect-square overflow-hidden rounded-md bg-muted/50">
                                        <Image
                                            src={classroom.image}
                                            alt={classroom.name}
                                            fill
                                            className="object-cover"
                                            sizes="220px"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <CardHeader className="pb-3">
                                        <p className="text-sm font-medium text-muted-foreground">
                                            {classroom.age}
                                        </p>
                                        <CardTitle className="text-2xl">
                                            {classroom.name}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {classroom.paragraphs.map((paragraph) => (
                                            <p
                                                key={paragraph}
                                                className="text-sm leading-relaxed text-muted-foreground sm:text-base"
                                            >
                                                {paragraph}
                                            </p>
                                        ))}
                                        <div className="border-t border-border pt-4 text-sm text-muted-foreground">
                                            <p>
                                                E-mail:{" "}
                                                <span className="font-medium text-foreground">
                                                    {classroom.email}
                                                </span>
                                            </p>
                                            <p className="mt-1">
                                                Telefon:{" "}
                                                <span className="font-medium text-foreground">
                                                    {classroom.phone}
                                                </span>
                                            </p>
                                        </div>
                                    </CardContent>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </main>
    );
}
