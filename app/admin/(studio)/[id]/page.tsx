import { notFound } from "next/navigation";
import { getById } from "@/lib/cms/aktuality";
import { ArticleEditor } from "../article-editor";

export const dynamic = "force-dynamic";

export default async function EditArticlePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const item = await getById(id);
    if (!item) notFound();

    return (
        <main className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                Úprava lístku
            </p>
            <h1 className="mt-2 font-heading text-4xl font-semibold tracking-tight">
                {item.title}
            </h1>
            <ArticleEditor initial={item} />
        </main>
    );
}
