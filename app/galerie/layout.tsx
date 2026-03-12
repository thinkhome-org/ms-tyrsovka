import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
    title: "Galerie",
    description:
        "Fotografie z každodenního života, akcí a prostor MŠ Tyršovka.",
    path: "/galerie",
});

export default function GalerieLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
