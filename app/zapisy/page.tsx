import StaticContentPage from "@/app/components/static-content-page";
import { buildPageMetadata } from "@/lib/seo";
import { ZAPISY_PAGE } from "./content";

export const metadata = buildPageMetadata({
    title: ZAPISY_PAGE.title,
    description:
        "Termíny zápisu do MŠ Tyršovka, předzápis, osobní zápis a kritéria přijímání pro školní rok 2026/2027.",
    path: "/zapisy",
});

export default function ZapisyPage() {
    return <StaticContentPage content={ZAPISY_PAGE} />;
}
