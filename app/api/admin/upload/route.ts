import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/auth";
import { getMediaBucket } from "@/lib/cms/env";
import { mediaUrl } from "@/lib/cms/media";

export const dynamic = "force-dynamic";

const MAX_BYTES = 20 * 1024 * 1024;

function sniffImage(bytes: Uint8Array): { ext: string; contentType: string } | null {
    if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
        return { ext: "jpg", contentType: "image/jpeg" };
    }
    if (
        bytes.length >= 8 &&
        bytes[0] === 0x89 &&
        bytes[1] === 0x50 &&
        bytes[2] === 0x4e &&
        bytes[3] === 0x47
    ) {
        return { ext: "png", contentType: "image/png" };
    }
    if (
        bytes.length >= 12 &&
        bytes[0] === 0x52 &&
        bytes[1] === 0x49 &&
        bytes[2] === 0x46 &&
        bytes[3] === 0x46 &&
        bytes[8] === 0x57 &&
        bytes[9] === 0x45 &&
        bytes[10] === 0x42 &&
        bytes[11] === 0x50
    ) {
        return { ext: "webp", contentType: "image/webp" };
    }
    return null;
}

function isHeic(bytes: Uint8Array): boolean {
    if (bytes.length < 12) return false;
    const box = String.fromCharCode(bytes[4], bytes[5], bytes[6], bytes[7]);
    if (box !== "ftyp") return false;
    const brand = String.fromCharCode(
        bytes[8],
        bytes[9],
        bytes[10],
        bytes[11],
    ).toLowerCase();
    return brand.startsWith("hei") || brand.startsWith("mif") || brand === "msf1";
}

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
            { error: "Fotka může mít nejvýše 20 MB." },
            { status: 400 },
        );
    }
    const requested = form.get("folder");
    const folder =
        requested === "galerie" || requested === "tridy" ? requested : "aktuality";
    const bytes = new Uint8Array(await file.arrayBuffer());
    if (isHeic(bytes) || file.type === "image/heic" || file.type === "image/heif") {
        return NextResponse.json(
            {
                error: "Fotku z telefonu se nepodařilo převést. Vyberte ji znovu.",
            },
            { status: 400 },
        );
    }
    const sniffed = sniffImage(bytes);
    if (!sniffed) {
        return NextResponse.json(
            { error: "Povolené formáty jsou JPEG, PNG a WebP." },
            { status: 400 },
        );
    }
    const key = `${folder}/${crypto.randomUUID()}.${sniffed.ext}`;
    await bucket.put(key, bytes, {
        httpMetadata: { contentType: sniffed.contentType },
    });

    return NextResponse.json({ key, url: mediaUrl(key) });
}
