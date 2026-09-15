import { StubPage } from "@/app/components/stub-page";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
    title: "Pracovní příležitosti",
    description: "Aktuální nabídka pracovních pozic v MŠ Tyršovka.",
    path: "/pracovni-prilezitosti",
});

export default function JobsPage() {
    return (
        <StubPage
            eyebrow="Škola"
            title="Pracovní příležitosti"
            description="Aktuální nabídky práce ve školce."
        >
            <p>Teď nemáme vypsanou žádnou otevřenou pozici.</p>
        </StubPage>
    );
}
