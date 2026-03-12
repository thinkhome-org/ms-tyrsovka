import StaticContentPage from "@/app/components/static-content-page";
import { PROJEKTY_A_VYZVY_PAGE } from "@/lib/static-page-content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
    title: PROJEKTY_A_VYZVY_PAGE.title,
    description: PROJEKTY_A_VYZVY_PAGE.description,
    path: "/projekty-a-vyzvy",
});

export default function ProjektyAVyzvyPage() {
    return <StaticContentPage content={PROJEKTY_A_VYZVY_PAGE} />;
}
