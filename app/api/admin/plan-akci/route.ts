import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/auth";
import { createEvent, listEvents, type CmsEventInput } from "@/lib/cms/events";

export const dynamic = "force-dynamic";

export async function GET() {
    const denied = await requireAdmin();
    if (denied) return denied;
    const items = await listEvents();
    return NextResponse.json({ items });
}

export async function POST(request: Request) {
    const denied = await requireAdmin();
    if (denied) return denied;
    try {
        const input = (await request.json()) as CmsEventInput;
        const item = await createEvent(input);
        return NextResponse.json({ item }, { status: 201 });
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Uložení se nepovedlo.";
        return NextResponse.json({ error: message }, { status: 400 });
    }
}
