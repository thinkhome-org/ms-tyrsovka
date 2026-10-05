import { listClassroomPages, toClassroomDraft } from "@/lib/cms/classrooms";
import { ClassroomsStudio } from "./classrooms-studio";

export const dynamic = "force-dynamic";

export default async function AdminTridyPage() {
    const classes = (await listClassroomPages()).map(toClassroomDraft);

    return (
        <main className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                O škole
            </p>
            <h1 className="mt-2 font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
                Třídy
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Text, učitelky, kontakt a fotka na stránce každé třídy. Název a
                barva třídy zůstávají pevné.
            </p>
            <ClassroomsStudio classes={classes} />
        </main>
    );
}
