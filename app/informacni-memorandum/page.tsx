import Link from "next/link";
import { StubPage } from "@/app/components/stub-page";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
    title: "Informační memorandum",
    description: "Informační memorandum MŠ Tyršovka.",
    path: "/informacni-memorandum",
});

export default function MemorandumPage() {
    return (
        <StubPage
            eyebrow="Dokumenty"
            title="Informační memorandum"
            description="Dokument spravujeme na jednom místě a odkazujeme na něj z footeru i z příslušných postupů."
        >
            <p>
                Soubor sem doplníme. Související dokumenty už jsou na{" "}
                <Link href="/uredni-deska" className="text-primary underline underline-offset-2">
                    úřední desce
                </Link>
                .
            </p>
        </StubPage>
    );
}
