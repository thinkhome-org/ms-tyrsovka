import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/auth";
import { getMediaBucket } from "@/lib/cms/env";
import { mediaUrl } from "@/lib/cms/media";

export const dynamic = "force-dynamic";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
};

export async function POST(request: Request) {
    const denied = await requireAdmin();
    if (denied) return denied;

    const bucket = await getMediaBucket();
    if (!bucket) {
        return NextResponse.json(
            { error: "Úložiště obrázků není dostupné." },
            { status: 500 },
        );
    }

    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
        return NextResponse.json({ error: "Vyberte soubor." }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
        return NextResponse.json(
            { error: "Obrázek může mít nejvýše 5 MB." },
            { status: 400 },
        );
    }
    const ext = ALLOWED_TYPES[file.type];
    if (!ext) {
        return NextResponse.json(
            { error: "Povolené formáty jsou JPEG, PNG a WebP." },
            { status: 400 },
        );
    }

    const key = `aktuality/${crypto.randomUUID()}.${ext}`;
    const bytes = await file.arrayBuffer();
    await bucket.put(key, bytes, {
        httpMetadata: { contentType: file.type },
    });

    return NextResponse.json({ key, url: mediaUrl(key) });
}
