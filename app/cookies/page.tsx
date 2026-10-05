import Link from "next/link";
import { StubPage } from "@/app/components/stub-page";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
    title: "Cookies",
    description:
        "Nezbytné cookies webu MŠ Tyršovka, volitelná mapa a Google Analytics a měření Cloudflare bez cookie.",
    path: "/cookies",
});

const linkClass = "text-primary underline underline-offset-2";

export default function CookiesPage() {
    return (
        <StubPage
            eyebrow="Dokumenty"
            title="Cookies"
            description="Nezbytné cookies drží web v chodu. Mapa Google a Google Analytics se načtou až po souhlasu."
        >
            <div className="space-y-4">
                <h2 className="text-xl font-semibold tracking-tight text-foreground">
                    Nezbytné cookies
                </h2>
                <p>
                    Nezbytné cookies zajišťují běh webu, například přihlášení do redakce. Bez nich
                    by stránky nefungovaly. Tyto cookies nevyžadují souhlas.
                </p>

                <h2 className="pt-4 text-xl font-semibold tracking-tight text-foreground">
                    Volitelné cookies
                </h2>
                <p>
                    Po souhlasu se načte mapa Google na homepage a na kontaktech a měření Google
                    Analytics. Oba nástroje mohou uložit cookies třetí strany. Souhlas i odmítnutí
                    ukládáme do cookies prohlížeče na 180 dní. Volbu uděláte v liště tlačítky
                    Odmítnout a Povolit, nebo u mapy tlačítkem Povolit.
                </p>

                <h2 className="pt-4 text-xl font-semibold tracking-tight text-foreground">
                    Měření bez cookie
                </h2>
                <p>
                    Cloudflare Web Analytics cookie nenastavuje. Počítá souhrnnou návštěvnost webu
                    a nespouští se přes lištu souhlasu.
                </p>
                <p>
                    Údaje o dětech a docházce škola spravuje mimo tento web, v systému Naše MŠ a v
                    dokumentech na{" "}
                    <Link href="/uredni-deska" className={linkClass}>
                        úřední desce
                    </Link>
                    .
                </p>
                <p>
                    Další informace o zpracování osobních údajů jsou na stránce{" "}
                    <Link href="/ochrana-osobnich-udaju" className={linkClass}>
                        Ochrana osobních údajů
                    </Link>
                    .
                </p>
            </div>
        </StubPage>
    );
}
