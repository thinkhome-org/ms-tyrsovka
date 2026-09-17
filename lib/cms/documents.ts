import { getMediaBucket } from "./env";
import { mediaUrl } from "./media";

const MAX_BYTES = 15 * 1024 * 1024;
const ALLOWED_TYPES: Record<string, string> = {
    "application/pdf": "pdf",
    "application/msword": "doc",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        "docx",
};

function extensionFromName(name: string): string | null {
    const match = name.toLowerCase().match(/\.([a-z0-9]+)$/);
    if (!match) return null;
    if (match[1] === "pdf" || match[1] === "doc" || match[1] === "docx") {
        return match[1];
    }
    return null;
}

export async function putDocument(file: File): Promise<{ key: string; url: string }> {
    const bucket = await getMediaBucket();
    if (!bucket) throw new Error("Úložiště dokumentů není dostupné.");
    if (file.size > MAX_BYTES) {
        throw new Error("Dokument může mít nejvýše 15 MB.");
    }
    const ext = ALLOWED_TYPES[file.type] || extensionFromName(file.name);
    if (!ext) {
        throw new Error("Povolené formáty jsou PDF, DOC a DOCX.");
    }
    const key = `docs/${crypto.randomUUID()}.${ext}`;
    const bytes = await file.arrayBuffer();
    const contentType =
        file.type && file.type !== "application/octet-stream"
            ? file.type
            : ext === "pdf"
              ? "application/pdf"
              : "application/octet-stream";
    await bucket.put(key, bytes, {
        httpMetadata: { contentType },
    });
    return { key, url: mediaUrl(key) };
}
