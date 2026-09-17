import { getWeekMenu } from "@/lib/cms/menu";
import { mondayOfWeek } from "@/lib/cms/dates";
import { MenuStudio } from "./menu-studio";

export const dynamic = "force-dynamic";

export default async function AdminJidelnicekPage() {
    const start = mondayOfWeek();
    const items = await getWeekMenu(start);

    return (
        <main className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                Strava
            </p>
            <h1 className="mt-2 font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
                Jídelníček
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Uložte pondělí až pátek. Prázdný týden na webu zůstane jako
                prázdný stav.
            </p>
            <MenuStudio initialDays={items} initialStart={start} />
        </main>
    );
}
