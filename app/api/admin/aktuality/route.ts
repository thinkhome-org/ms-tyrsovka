import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/auth";
import { createAktualita, listAll } from "@/lib/cms/aktuality";
import type { AktualitaInput } from "@/lib/cms/aktuality";

export const dynamic = "force-dynamic";

export async function GET() {
    const denied = await requireAdmin();
    if (denied) return denied;
    const items = await listAll();
    return NextResponse.json({ items });
}

export async function POST(request: Request) {
    const denied = await requireAdmin();
    if (denied) return denied;
    try {
        const input = (await request.json()) as AktualitaInput;
        const item = await createAktualita(input);
        return NextResponse.json({ item }, { status: 201 });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Uložení se nepovedlo.";
        return NextResponse.json({ error: message }, { status: 400 });
    }
}
