import StaticContentPage from "@/app/components/static-content-page";
import { JIDELNICEK_PAGE } from "@/lib/static-page-content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
    title: JIDELNICEK_PAGE.title,
    description: JIDELNICEK_PAGE.description,
    path: "/jidelnicek",
});

export default function JidelnicekPage() {
    return <StaticContentPage content={JIDELNICEK_PAGE} />;
}
