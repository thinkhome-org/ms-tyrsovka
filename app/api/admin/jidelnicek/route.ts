import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/auth";
import {
    getWeekMenu,
    upsertMenuDays,
    type MenuDayInput,
} from "@/lib/cms/menu";
import { mondayOfWeek } from "@/lib/cms/dates";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    const denied = await requireAdmin();
    if (denied) return denied;
    const { searchParams } = new URL(request.url);
    const start = searchParams.get("start") || mondayOfWeek();
    const items = await getWeekMenu(start);
    return NextResponse.json({ items, start: mondayOfWeek(start) });
}

export async function POST(request: Request) {
    const denied = await requireAdmin();
    if (denied) return denied;
    try {
        const body = (await request.json()) as { days?: MenuDayInput[] };
        const items = await upsertMenuDays(body.days ?? []);
        return NextResponse.json({ items });
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Uložení se nepovedlo.";
        return NextResponse.json({ error: message }, { status: 400 });
    }
}
