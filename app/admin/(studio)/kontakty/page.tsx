import { listClassroomContacts } from "@/lib/cms/classrooms";
import { listPeople } from "@/lib/cms/people";
import { ContactsStudio } from "./contacts-studio";

export const dynamic = "force-dynamic";

export default async function AdminKontaktyPage() {
    const [people, classrooms] = await Promise.all([
        listPeople(),
        listClassroomContacts(),
    ]);

    return (
        <main className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                Lidé
            </p>
            <h1 className="mt-2 font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
                Kontakty
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Vedení, jídelna a telefony tříd. Oficiální údaje školy jsou v
                nastavení.
            </p>
            <ContactsStudio people={people} classrooms={classrooms} />
        </main>
    );
}
