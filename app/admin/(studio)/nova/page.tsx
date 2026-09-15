import { ArticleEditor } from "../article-editor";

export const dynamic = "force-dynamic";

export default function NewArticlePage() {
    return (
        <main className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                Nový lístek
            </p>
            <h1 className="mt-2 font-heading text-4xl font-semibold tracking-tight">
                Napsat aktualitu
            </h1>
            <ArticleEditor />
        </main>
    );
}
