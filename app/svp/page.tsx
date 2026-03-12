import StaticContentPage from "@/app/components/static-content-page";
import { SVP_PAGE } from "@/lib/static-page-content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
    title: SVP_PAGE.title,
    description: SVP_PAGE.description,
    path: "/svp",
});

export default function SvpPage() {
    return <StaticContentPage content={SVP_PAGE} />;
}
