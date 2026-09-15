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
            description="Informace o zpracování osobních údajů. Podrobný dokument spravujeme na jednom místě."
        >
            <p>
                Informovaný souhlas a související formuláře jsou na{" "}
                <Link href="/uredni-deska#dokumenty" className="text-primary underline underline-offset-2">
                    úřední desce
                </Link>
                .
            </p>
        </StubPage>
    );
}
