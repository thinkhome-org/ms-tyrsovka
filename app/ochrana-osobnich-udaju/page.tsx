import Link from "next/link";
import { StubPage } from "@/app/components/stub-page";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
    title: "Ochrana osobních údajů",
    description:
        "Jak web MŠ Tyršovka pracuje s údaji: mapa Google, Google Analytics a Cloudflare Web Analytics.",
    path: "/ochrana-osobnich-udaju",
});

const linkClass = "text-primary underline underline-offset-2";

export default function PrivacyPage() {
    return (
        <StubPage
            eyebrow="Dokumenty"
            title="Ochrana osobních údajů"
            description="Srozumitelný popis webu pro návštěvníky. Oficiální souhlasy a formuláře školy jsou na úřední desce."
        >
            <div className="space-y-4">
                <h2 className="text-xl font-semibold tracking-tight text-foreground">Správce</h2>
                <p>
                    Správcem osobních údajů je Mateřská škola Tyršovka, Lysinská 184/45, 143 00
                    Praha 4 – Modřany, e-mail{" "}
                    <a href="mailto:reditelka@tyrsovka.cz" className={linkClass}>
                        reditelka@tyrsovka.cz
                    </a>
                    .
                </p>
                <p>
                    Veřejný web nemá uživatelské účty a nemá kontaktní formulář. Píšete nám
                    e-mailem nebo telefonem.
                </p>

                <h2 className="pt-4 text-xl font-semibold tracking-tight text-foreground">
                    Mapa a Google Analytics
                </h2>
                <p>
                    Mapa Google a Google Analytics se načtou jen po vašem souhlasu. Google přitom
                    může uložit cookies a zpracovat údaje o navštívených stránkách a přibližnou
                    polohu. Souhlas i odmítnutí si prohlížeč pamatuje 180 dní. Podrobnosti jsou na
                    stránce{" "}
                    <Link href="/cookies" className={linkClass}>
                        Cookies
                    </Link>
                    .
                </p>

                <h2 className="pt-4 text-xl font-semibold tracking-tight text-foreground">
                    Cloudflare Web Analytics
                </h2>
                <p>
                    Návštěvnost webu měříme také přes Cloudflare Web Analytics. Tento nástroj
                    nenastavuje cookie. Zpracovává jen souhrnné údaje o návštěvách, například
                    počet zobrazení stránek, bez profilu konkrétního návštěvníka.
                </p>

                <h2 className="pt-4 text-xl font-semibold tracking-tight text-foreground">
                    Údaje o dětech
                </h2>
                <p>
                    Údaje o dětech, docházce a zápisu škola zpracovává mimo tyto stránky.
                    Informovaný souhlas a související formuláře jsou na{" "}
                    <Link href="/uredni-deska#dokumenty" className={linkClass}>
                        úřední desce
                    </Link>
                    .
                </p>

                <h2 className="pt-4 text-xl font-semibold tracking-tight text-foreground">
                    Vaše práva
                </h2>
                <p>
                    Můžete požádat o přístup k údajům, jejich opravu nebo výmaz a podat stížnost u
                    Úřadu pro ochranu osobních údajů. Žádost k webu směřujte na e-mail ředitelky.
                </p>
                <p>
                    Toto není úplný záznam o činnostech zpracování. Jde o popis toho, co dělá tento
                    web.
                </p>
            </div>
        </StubPage>
    );
}
