import Link from "next/link";
import { AudiencePage, ClassroomLinks } from "@/app/components/audience-page";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
    title: "Pro mladší děti",
    description:
        "Nabídka MŠ Tyršovka pro mladší děti: adaptace, běžný den a třídy Jahodová a Meruňková.",
    path: "/pro-zajemce/mladsi-deti",
});

export default function MladsiDetiPage() {
    return (
        <AudiencePage
            eyebrow="Pro zájemce"
            title="Pro mladší děti"
            description="Pro rodiny, které hledají školku pro děti na začátku předškolní cesty. Stránka drží pořadí informací, obsah se bude doplňovat."
            sections={[
                {
                    title: "Pro koho je stránka",
                    content: (
                        <p>
                            Jahodová a Meruňková třída přijímají děti zhruba od 2,5 do 4 let. Důraz je na klidnou adaptaci, hru a první samostatnost.
                        </p>
                    ),
                },
                {
                    title: "Proč Tyršovka",
                    content: (
                        <p>
                            Škola staví na pohybu, bezpečném prostředí a respektujícím přístupu. Areál má tři pavilony a zahradu, nejmenší děti mají oddělené hřiště.
                        </p>
                    ),
                },
                {
                    title: "Adaptace a první dny",
                    content: (
                        <p>
                            Nástup je pozvolný: první den společná prohlídka, další dny krátký samostatný pobyt. Podrobný postup je na stránce{" "}
                            <Link href="/nove-prijati" className="text-primary underline underline-offset-2">
                                Nově přijatí
                            </Link>
                            .
                        </p>
                    ),
                },
                {
                    title: "Jak vypadá běžný den",
                    content: (
                        <p>
                            Škola je otevřená od 6:30 do 17:30. Příchod je nejpozději do 8:20. Režim, vyzvedávání a omluvenky jsou v{" "}
                            <Link href="/prakticke-informace" className="text-primary underline underline-offset-2">
                                praktických informacích
                            </Link>
                            .
                        </p>
                    ),
                },
                {
                    title: "Odpovídající třídy",
                    content: <ClassroomLinks slugs={["jahodova", "merunkova"]} />,
                },
                {
                    title: "Časté otázky",
                    content: (
                        <p>
                            Otázky k adaptaci, stravování a docházce doplníme sem. Do té doby pište na{" "}
                            <a href="mailto:reditelka@tyrsovka.cz" className="text-primary underline underline-offset-2">
                                reditelka@tyrsovka.cz
                            </a>
                            .
                        </p>
                    ),
                },
                {
                    title: "Zápis a kontakt",
                    content: (
                        <p>
                            Termíny a postup jsou na stránce{" "}
                            <Link href="/zapisy" className="text-primary underline underline-offset-2">
                                Zápis a přijetí
                            </Link>
                            . Kontakty na vedení i třídy najdete v{" "}
                            <Link href="/kontakty" className="text-primary underline underline-offset-2">
                                kontaktech
                            </Link>
                            .
                        </p>
                    ),
                },
            ]}
        />
    );
}
