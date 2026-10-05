import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/auth";
import {
    deleteGalleryPhoto,
    updateGalleryPhoto,
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
            alt?: string;
            direction?: unknown;
            show_in_hero?: unknown;
        };
        const photo = await updateGalleryPhoto(id, {
            alt: input.alt,
            direction: isDirection(input.direction) ? input.direction : undefined,
            show_in_hero:
                typeof input.show_in_hero === "boolean"
                    ? input.show_in_hero
                    : undefined,
        });
        return NextResponse.json({ photo });
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Uložení se nepovedlo.";
        const status = message === "Fotka neexistuje." ? 404 : 400;
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
        const deleted = await deleteGalleryPhoto(id);
        if (!deleted) {
            return NextResponse.json({ error: "Fotka neexistuje." }, { status: 404 });
        }
        return NextResponse.json({ ok: true });
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Odstranění se nepovedlo.";
        return NextResponse.json({ error: message }, { status: 400 });
    }
}
