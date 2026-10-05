import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/auth";
import {
    deleteGalleryAlbum,
    updateGalleryAlbum,
    type GalleryDirection,
} from "@/lib/cms/gallery";

export const dynamic = "force-dynamic";

function isDirection(value: unknown): value is GalleryDirection {
    return value === "up" || value === "down";
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    const denied = await requireAdmin();
    if (denied) return denied;
    const { id } = await params;
    try {
        const input = (await request.json()) as {
            title?: string;
            direction?: unknown;
        };
        const album = await updateGalleryAlbum(id, {
            title: input.title,
            direction: isDirection(input.direction) ? input.direction : undefined,
        });
        return NextResponse.json({ album });
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Uložení se nepovedlo.";
        const status = message === "Album neexistuje." ? 404 : 400;
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
        const deleted = await deleteGalleryAlbum(id);
        if (!deleted) {
            return NextResponse.json({ error: "Album neexistuje." }, { status: 404 });
        }
        return NextResponse.json({ ok: true });
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Odstranění se nepovedlo.";
        return NextResponse.json({ error: message }, { status: 400 });
    }
}
