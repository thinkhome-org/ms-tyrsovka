import Link from "next/link";
import { StubPage } from "@/app/components/stub-page";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
    title: "Cookies",
    description: "Jak MŠ Tyršovka používá cookies na tomto webu.",
    path: "/cookies",
});

export default function CookiesPage() {
    return (
        <StubPage
            eyebrow="Dokumenty"
            title="Cookies"
            description="Tento web používá jen to, co je nutné k zobrazení stránek. Mapa Google se načte až po vašem souhlasu."
        >
            <div className="space-y-4">
                <p>
                    Nezbytné cookies zajišťují běh webu, například přihlášení do redakce. Bez nich
                    by stránky nefungovaly.
                </p>
                <p>
                    Volitelné cookies třetí strany používá jen mapa Google na homepage a na
                    kontaktech. Mapa se nenačte, dokud ji nepovolíte v liště nebo tlačítkem
                    „Povolit mapu“. Souhlas i odmítnutí ukládáme do cookies prohlížeče na 180 dní.
                </p>
                <p>
                    Na veřejné části webu nespouštíme měření návštěvnosti ani reklamní sítě. Údaje
                    o dětech a docházce škola spravuje mimo tento web, v systému Naše MŠ a v
                    dokumentech na{" "}
                    <Link href="/uredni-deska" className="text-primary underline underline-offset-2">
                        úřední desce
                    </Link>
                    .
                </p>
                <p>
                    Další informace o zpracování osobních údajů jsou na stránce{" "}
                    <Link
                        href="/ochrana-osobnich-udaju"
                        className="text-primary underline underline-offset-2"
                    >
                        Ochrana osobních údajů
                    </Link>
                    .
                </p>
            </div>
        </StubPage>
    );
}
