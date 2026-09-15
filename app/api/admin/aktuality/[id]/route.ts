import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/auth";
import {
    deleteAktualita,
    getById,
    updateAktualita,
    type AktualitaInput,
} from "@/lib/cms/aktuality";

export const dynamic = "force-dynamic";

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    const denied = await requireAdmin();
    if (denied) return denied;
    const { id } = await params;
    const item = await getById(id);
    if (!item) {
        return NextResponse.json({ error: "Aktualita neexistuje." }, { status: 404 });
    }
    return NextResponse.json({ item });
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    const denied = await requireAdmin();
    if (denied) return denied;
    const { id } = await params;
    try {
        const input = (await request.json()) as AktualitaInput;
        const item = await updateAktualita(id, input);
        return NextResponse.json({ item });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Uložení se nepovedlo.";
        const status = message === "Aktualita neexistuje." ? 404 : 400;
        return NextResponse.json({ error: message }, { status });
    }
}

export async function DELETE(
    _request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    const denied = await requireAdmin();
    if (denied) return denied;
    const { id } = await params;
    try {
        const deleted = await deleteAktualita(id);
        if (!deleted) {
            return NextResponse.json({ error: "Aktualita neexistuje." }, { status: 404 });
        }
        return NextResponse.json({ ok: true });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Odstranění se nepovedlo.";
        return NextResponse.json({ error: message }, { status: 400 });
    }
}
