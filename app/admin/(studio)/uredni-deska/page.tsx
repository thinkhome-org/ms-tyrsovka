import { listNotices } from "@/lib/cms/notices";
import { NoticesStudio } from "./notices-studio";

export const dynamic = "force-dynamic";

export default async function AdminUredniDeskaPage() {
    const items = await listNotices();

    return (
        <main className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                Dokumenty
            </p>
            <h1 className="mt-2 font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
                Úřední deska
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Co tady vyvěsíte, uvidí rodiče na stránce dokumentů. Po datu
                „vyvěsit do“ záznam z webu zmizí.
            </p>
            <NoticesStudio items={items} />
        </main>
    );
}
