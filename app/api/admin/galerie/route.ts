import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/auth";
import { createGalleryAlbum, listGalleryAlbums } from "@/lib/cms/gallery";

export const dynamic = "force-dynamic";

export async function GET() {
    const denied = await requireAdmin();
    if (denied) return denied;
    try {
        const albums = await listGalleryAlbums();
        return NextResponse.json({ albums });
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Galerii se nepodařilo načíst.";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const denied = await requireAdmin();
    if (denied) return denied;
    try {
        const input = (await request.json()) as { title?: string };
        const album = await createGalleryAlbum(input.title ?? "");
        return NextResponse.json({ album }, { status: 201 });
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Uložení se nepovedlo.";
        return NextResponse.json({ error: message }, { status: 400 });
    }
}
