import { getMediaBucket } from "@/lib/cms/env";

export const dynamic = "force-dynamic";

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ key: string[] }> },
) {
    const { key } = await params;
    const objectKey = key.join("/");
    if (!objectKey || objectKey.includes("..") || objectKey.startsWith("/")) {
        return new Response("Neplatný soubor.", { status: 400 });
    }

    const bucket = await getMediaBucket();
    if (!bucket) {
        return new Response("Úložiště není dostupné.", { status: 500 });
    }

    const object = await bucket.get(objectKey);
    if (!object) {
        return new Response("Soubor nenalezen.", { status: 404 });
    }

    const headers = new Headers();
    headers.set(
        "Content-Type",
        object.httpMetadata?.contentType || "application/octet-stream",
    );
    headers.set("Cache-Control", "public, max-age=31536000, immutable");
    if (object.httpEtag) headers.set("ETag", object.httpEtag);

    return new Response(object.body, { headers });
}
