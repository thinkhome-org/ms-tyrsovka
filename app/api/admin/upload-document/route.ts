import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/auth";
import { putDocument } from "@/lib/cms/documents";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
    const denied = await requireAdmin();
    if (denied) return denied;

    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File) || file.size === 0) {
        return NextResponse.json({ error: "Vyberte soubor." }, { status: 400 });
    }
    try {
        const uploaded = await putDocument(file);
        return NextResponse.json(uploaded);
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Nahrání se nepovedlo.";
        return NextResponse.json({ error: message }, { status: 400 });
    }
}
