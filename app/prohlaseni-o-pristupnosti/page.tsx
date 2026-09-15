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
            description="Stránka pro prohlášení o přístupnosti webu podle požadavků na weby veřejné správy."
        >
            <p>
                Text prohlášení sem doplníme. Web je v češtině, používá sémantické nadpisy a ovladatelnou navigaci z klávesnice.
            </p>
        </StubPage>
    );
}
