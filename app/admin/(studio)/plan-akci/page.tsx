import { listEvents } from "@/lib/cms/events";
import { EventsStudio } from "./events-studio";

export const dynamic = "force-dynamic";

export default async function AdminPlanAkciPage() {
    const items = await listEvents();

    return (
        <main className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                Kalendář
            </p>
            <h1 className="mt-2 font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
                Plán akcí
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Akce se ukážou na webu, na homepage i v aktualitách. Termín na
                webu nechte prázdný, pokud stačí obyčejné datum.
            </p>
            <EventsStudio items={items} />
        </main>
    );
}
