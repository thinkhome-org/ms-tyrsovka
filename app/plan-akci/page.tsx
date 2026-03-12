import StaticContentPage from "@/app/components/static-content-page";
import { PLAN_AKCI_PAGE } from "@/lib/static-page-content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
    title: PLAN_AKCI_PAGE.title,
    description: PLAN_AKCI_PAGE.description,
    path: "/plan-akci",
});

export default function PlanAkciPage() {
    return <StaticContentPage content={PLAN_AKCI_PAGE} />;
}
