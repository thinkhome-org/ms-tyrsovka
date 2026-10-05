import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/auth";
import { deleteMenuFile, getPublishedMenus, putMenuFile } from "@/lib/cms/menu";

export const dynamic = "force-dynamic";

export async function GET() {
    const denied = await requireAdmin();
    if (denied) return denied;
    const menus = await getPublishedMenus();
    return NextResponse.json(menus);
}

export async function POST(request: Request) {
    const denied = await requireAdmin();
    if (denied) return denied;
    try {
        const form = await request.formData();
        const file = form.get("file");
        const week = String(form.get("week_start") ?? "");
        if (!(file instanceof File)) {
            return NextResponse.json({ error: "Vyberte soubor." }, { status: 400 });
        }
        const item = await putMenuFile(week, file);
        return NextResponse.json({ item });
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Nahrání se nepovedlo.";
        return NextResponse.json({ error: message }, { status: 400 });
    }
}

export async function DELETE(request: Request) {
    const denied = await requireAdmin();
    if (denied) return denied;
    try {
        const week = new URL(request.url).searchParams.get("week") ?? "";
        await deleteMenuFile(week);
        return NextResponse.json({ ok: true });
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Odstranění se nepovedlo.";
        return NextResponse.json({ error: message }, { status: 400 });
    }
}
