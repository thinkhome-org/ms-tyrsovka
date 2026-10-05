import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/auth";
import { addGalleryPhoto } from "@/lib/cms/gallery";

export const dynamic = "force-dynamic";

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    const denied = await requireAdmin();
    if (denied) return denied;
    const { id } = await params;
    try {
        const input = (await request.json()) as { src?: string; alt?: string };
        const photo = await addGalleryPhoto(id, {
            src: input.src ?? "",
            alt: input.alt,
        });
        return NextResponse.json({ photo }, { status: 201 });
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Uložení se nepovedlo.";
        const status = message === "Album neexistuje." ? 404 : 400;
        return NextResponse.json({ error: message }, { status });
    }
}
