import { getSettingsMap } from "@/lib/cms/settings";
import { SettingsStudio } from "./settings-studio";

export const dynamic = "force-dynamic";

export default async function AdminNastaveniPage() {
    const settings = await getSettingsMap();

    return (
        <main className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                Web
            </p>
            <h1 className="mt-2 font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
                Nastavení
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Oficiální údaje školy, provozní telefon a volitelný banner na
                homepage. Logo zůstává soubor v webu.
            </p>
            <SettingsStudio initial={settings} />
        </main>
    );
}
