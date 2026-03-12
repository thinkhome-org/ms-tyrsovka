import StaticContentPage from "@/app/components/static-content-page";
import { NOVE_PRIJATI_PAGE } from "@/lib/static-page-content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
    title: NOVE_PRIJATI_PAGE.title,
    description: NOVE_PRIJATI_PAGE.description,
    path: "/nove-prijati",
});

export default function NovePrijatiPage() {
    return <StaticContentPage content={NOVE_PRIJATI_PAGE} />;
}
