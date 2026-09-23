import Link from "next/link";
import { StubPage } from "@/app/components/stub-page";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
    title: "Ochrana osobních údajů",
    description: "Informace o zpracování osobních údajů v MŠ Tyršovka.",
    path: "/ochrana-osobnich-udaju",
});

export default function PrivacyPage() {
    return (
        <StubPage
            eyebrow="Dokumenty"
            title="Ochrana osobních údajů"
            description="Krátký přehled, jak tento web pracuje s údaji. Oficiální souhlasy a formuláře školy jsou na úřední desce."
        >
            <div className="space-y-4">
                <p>
                    Správcem osobních údajů je Mateřská škola Tyršovka, Lysinská 184/45, 143 00
                    Praha 4 – Modřany, e-mail{" "}
                    <a
                        href="mailto:reditelka@tyrsovka.cz"
                        className="text-primary underline underline-offset-2"
                    >
                        reditelka@tyrsovka.cz
                    </a>
                    .
                </p>
                <p>
                    Veřejný web nemá uživatelské účty a nespouští nástroje pro měření
                    návštěvnosti. Kontaktní formulář tu není; píšete nám e-mailem nebo telefonem.
                    Mapa Google se načte jen po vašem souhlasu, podrobnosti jsou na stránce{" "}
                    <Link href="/cookies" className="text-primary underline underline-offset-2">
                        Cookies
                    </Link>
                    .
                </p>
                <p>
                    Údaje o dětech, docházce a zápisu škola zpracovává mimo tyto stránky. Informovaný
                    souhlas a související formuláře jsou na{" "}
                    <Link
                        href="/uredni-deska#dokumenty"
                        className="text-primary underline underline-offset-2"
                    >
                        úřední desce
                    </Link>
                    .
                </p>
                <p>
                    Toto není úplný záznam o činnostech zpracování. Jde o srozumitelný popis webu
                    pro návštěvníky.
                </p>
            </div>
        </StubPage>
    );
}
