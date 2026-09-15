import { StubPage } from "@/app/components/stub-page";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
    title: "Zpráva ČŠI",
    description: "Zpráva České školní inspekce k MŠ Tyršovka ke stažení.",
    path: "/zprava-csi",
});

export default function ZpravaCsiPage() {
    return (
        <StubPage
            eyebrow="O škole"
            title="Zpráva České školní inspekce"
            description="Krátké uvedení, datum zprávy a dokument ke stažení. Shrnutí bude vycházet přímo ze zprávy."
        >
            <p>
                Dokument zveřejňujeme na{" "}
                <a
                    href="https://www.tyrsovka.cz/o-%C5%A1kole/v%C3%BDro%C4%8Dn%C3%AD-zpr%C3%A1vy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-2"
                >
                    původním zdroji zpráv ČŠI
                </a>
                . Až bude k dispozici aktuální soubor, zůstane spravovaný na jednom místě a odkazy povedou sem.
            </p>
        </StubPage>
    );
}
