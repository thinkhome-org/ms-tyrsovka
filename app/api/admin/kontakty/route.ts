import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/auth";
import { listClassroomContacts } from "@/lib/cms/classrooms";
import { createPerson, listPeople, type PersonInput } from "@/lib/cms/people";

export const dynamic = "force-dynamic";

export async function GET() {
    const denied = await requireAdmin();
    if (denied) return denied;
    const [people, classrooms] = await Promise.all([
        listPeople(),
        listClassroomContacts(),
    ]);
    return NextResponse.json({ people, classrooms });
}

export async function POST(request: Request) {
    const denied = await requireAdmin();
    if (denied) return denied;
    try {
        const input = (await request.json()) as PersonInput;
        const item = await createPerson(input);
        return NextResponse.json({ item }, { status: 201 });
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Uložení se nepovedlo.";
        return NextResponse.json({ error: message }, { status: 400 });
    }
}
