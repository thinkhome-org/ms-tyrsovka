import StaticContentPage from "@/app/components/static-content-page";
import { PRO_ZAJEMCE_PAGE } from "@/lib/static-page-content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
    title: PRO_ZAJEMCE_PAGE.title,
    description: PRO_ZAJEMCE_PAGE.description,
    path: "/pro-zajemce",
});

export default function ProZajemcePage() {
    return <StaticContentPage content={PRO_ZAJEMCE_PAGE} />;
}
