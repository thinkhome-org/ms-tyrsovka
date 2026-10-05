import { StubPage } from "@/app/components/stub-page";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
    title: "Prohlášení o přístupnosti",
    description: "Prohlášení o přístupnosti webu MŠ Tyršovka podle zákona o přístupnosti.",
    path: "/prohlaseni-o-pristupnosti",
});

const linkClass = "text-primary underline underline-offset-2";

export default function AccessibilityPage() {
    return (
        <StubPage
            eyebrow="Web"
            title="Prohlášení o přístupnosti"
            description="Mateřská škola Tyršovka usiluje o to, aby byl web použitelný z klávesnice, čtečky i běžného prohlížeče."
        >
            <div className="space-y-4">
                <p>
                    Toto prohlášení se vztahuje na web Mateřské školy Tyršovka. Povinný subjekt je
                    Mateřská škola Tyršovka, Lysinská 184/45, 143 00 Praha 4 – Modřany.
                </p>

                <h2 className="pt-4 text-xl font-semibold tracking-tight text-foreground">
                    Stav souladu
                </h2>
                <p>
                    Web je v částečném souladu s požadavky zákona o přístupnosti internetových
                    stránek a mobilních aplikací. Stránky jsou v češtině, používají sémantické
                    nadpisy a odkazy s textem. Navigaci lze ovládat z klávesnice. Hlavní menu lze
                    otevřít a zavřít klávesou Escape.
                </p>
                <p>
                    Obrázky, které nesou význam, mají popisek. Logo, maskoti tříd a schéma příchodu
                    jsou doplněné alternativním textem. Barvy v menu slouží k rozlišení položek a
                    text zůstává čitelný i bez nich.
                </p>

                <h2 className="pt-4 text-xl font-semibold tracking-tight text-foreground">
                    Mapa a měření
                </h2>
                <p>
                    Mapa Google je obsah třetí strany. Nenačte se bez souhlasu, takže stránka jde
                    použít i bez ní. Adresa školy je na stránce uvedená textem. Google Analytics se
                    rovněž spustí až po souhlasu a nemění obsah stránky. Cloudflare Web Analytics
                    cookie nenastavuje a do ovládání webu nezasahuje.
                </p>

                <h2 className="pt-4 text-xl font-semibold tracking-tight text-foreground">
                    Zpětná vazba a vynucení
                </h2>
                <p>
                    Pokud narazíte na překážku v přístupnosti, napište na{" "}
                    <a href="mailto:reditelka@tyrsovka.cz" className={linkClass}>
                        reditelka@tyrsovka.cz
                    </a>
                    . Když škola na podnět neodpoví včas nebo s ním nebudete spokojeni, můžete se
                    obrátit na veřejného ochránce práv, Údolní 39, 602 00 Brno,{" "}
                    <a href="https://www.ochrance.cz" className={linkClass}>
                        ochrance.cz
                    </a>
                    .
                </p>
                <p>Prohlášení bylo sestaveno 5. října 2026.</p>
            </div>
        </StubPage>
    );
}
