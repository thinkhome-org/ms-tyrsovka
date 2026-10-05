import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/auth";
import {
    toClassroomDraft,
    upsertClassroomPage,
} from "@/lib/cms/classrooms";

export const dynamic = "force-dynamic";

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ slug: string }> },
) {
    const denied = await requireAdmin();
    if (denied) return denied;
    const { slug } = await params;
    try {
        const input = (await request.json()) as {
            email?: string;
            phone?: string | null;
            age?: string;
            location?: string;
            teachers?: string;
            body?: string;
            note?: string;
            dayText?: string;
            imageKey?: string;
        };
        const page = await upsertClassroomPage(slug, input);
        return NextResponse.json({ item: toClassroomDraft(page) });
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Uložení se nepovedlo.";
        const status = message === "Třída neexistuje." ? 404 : 400;
        return NextResponse.json({ error: message }, { status });
    }
}
