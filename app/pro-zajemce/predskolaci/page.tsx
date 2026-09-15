import Link from "next/link";
import { AudiencePage, ClassroomLinks } from "@/app/components/audience-page";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
    title: "Pro předškoláky",
    description:
        "Poslední rok v MŠ Tyršovka: příprava na školu, program během roku a třídy Jablková a Hrušková.",
    path: "/pro-zajemce/predskolaci",
});

export default function PredskolaciPage() {
    return (
        <AudiencePage
            eyebrow="Pro zájemce"
            title="Pro předškoláky"
            description="Pro rodiny, jejichž děti čeká poslední rok před základní školou. Osnova stránky je hotová, texty se budou doplňovat."
            sections={[
                {
                    title: "Poslední rok před školou",
                    content: (
                        <p>
                            Jablková a Hrušková třída připravují děti na vstup do základní školy: samostatnost, komunikace, sebedůvěra a radost z objevování.
                        </p>
                    ),
                },
                {
                    title: "Jak příprava probíhá",
                    content: (
                        <p>
                            Programy během roku spojují pohyb, práci s emocemi a zážitkové učení v přírodě. Předškoláci se mohou účastnit například plaveckého nebo lyžařského kurzu.
                        </p>
                    ),
                },
                {
                    title: "Běžný den a program roku",
                    content: (
                        <p>
                            Režim dne je společný pro celou školku, akce a výlety se objevují v{" "}
                            <Link href="/aktuality" className="text-primary underline underline-offset-2">
                                aktualitách
                            </Link>
                            .
                        </p>
                    ),
                },
                {
                    title: "Povinná předškolní docházka",
                    content: (
                        <p>
                            Praktické vysvětlení povinné docházky, omlouvání a souvisejících formulářů doplníme sem. Základní postup je v{" "}
                            <Link href="/prakticke-informace" className="text-primary underline underline-offset-2">
                                praktických informacích
                            </Link>
                            .
                        </p>
                    ),
                },
                {
                    title: "Odpovídající třídy",
                    content: <ClassroomLinks slugs={["jablkova", "hruskova"]} />,
                },
                {
                    title: "Časté otázky",
                    content: (
                        <p>
                            Časté otázky k přípravě na školu sem doplníme. Dotazy směřujte na{" "}
                            <Link href="/kontakty" className="text-primary underline underline-offset-2">
                                kontakty
                            </Link>
                            .
                        </p>
                    ),
                },
                {
                    title: "Zápis a kontakt",
                    content: (
                        <p>
                            <Link href="/zapisy" className="text-primary underline underline-offset-2">
                                Zápis a přijetí
                            </Link>{" "}
                            má termíny, kritéria a dokumenty. Pro osobní dotaz použijte{" "}
                            <Link href="/kontakty" className="text-primary underline underline-offset-2">
                                kontakty školy
                            </Link>
                            .
                        </p>
                    ),
                },
            ]}
        />
    );
}
