import { StubPage } from "@/app/components/stub-page";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
    title: "Prohlášení o přístupnosti",
    description: "Prohlášení o přístupnosti webu MŠ Tyršovka.",
    path: "/prohlaseni-o-pristupnosti",
});

export default function AccessibilityPage() {
    return (
        <StubPage
            eyebrow="Web"
            title="Prohlášení o přístupnosti"
            description="Jak je web MŠ Tyršovka připravený pro čtení, klávesnici a běžné prohlížeče."
        >
            <div className="space-y-4">
                <p>
                    Web je v češtině. Stránky používají sémantické nadpisy, odkazy s textem a
                    ovladatelnou navigaci z klávesnice. Hlavní menu lze otevřít a zavřít klávesou
                    Escape.
                </p>
                <p>
                    Obrázky mají popisek, kde nese význam. Logo, maskoti tříd a schéma příchodu jsou
                    doplněné alternativním textem. Barvy v menu slouží k rozlišení položek a text
                    zůstává čitelný i bez nich.
                </p>
                <p>
                    Mapa Google je volitelná a nenačte se bez souhlasu, aby stránka šla používat i
                    bez obsahu třetí strany. Pokud narazíte na překážku v přístupnosti, napište na{" "}
                    <a
                        href="mailto:reditelka@tyrsovka.cz"
                        className="text-primary underline underline-offset-2"
                    >
                        reditelka@tyrsovka.cz
                    </a>
                    .
                </p>
            </div>
        </StubPage>
    );
}
