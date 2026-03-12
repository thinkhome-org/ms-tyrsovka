import StaticContentPage from "@/app/components/static-content-page";
import { REZIM_DNE_PAGE } from "@/lib/static-page-content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
    title: REZIM_DNE_PAGE.title,
    description: REZIM_DNE_PAGE.description,
    path: "/rezim-dne-a-provozni-doba",
});

export default function RezimDnePage() {
    return <StaticContentPage content={REZIM_DNE_PAGE} />;
}
