const PASS_THROUGH_BYTES = 8 * 1024 * 1024;
const MAX_BYTES = 20 * 1024 * 1024;
const MAX_EDGE = 2560;

const PASSTHROUGH = new Set(["image/jpeg", "image/png", "image/webp"]);

function typeFromName(name: string): string {
    const ext = name.split(".").pop()?.toLowerCase() ?? "";
    if (ext === "jpg" || ext === "jpeg") return "image/jpeg";
    if (ext === "png") return "image/png";
    if (ext === "webp") return "image/webp";
    if (ext === "heic" || ext === "heif") return "image/heic";
    return "";
}

function declaredType(file: File): string {
    if (file.type === "image/jpg") return "image/jpeg";
    if (file.type && file.type !== "application/octet-stream") return file.type;
    return typeFromName(file.name);
}

function fileName(name: string, type: string): string {
    const base = name.replace(/\.[^.]+$/, "") || "fotka";
    const ext = type === "image/png" ? "png" : type === "image/webp" ? "webp" : "jpg";
    return `${base}.${ext}`;
}

async function decode(file: File): Promise<ImageBitmap> {
    try {
        return await createImageBitmap(file, { imageOrientation: "from-image" });
    } catch {
        const url = URL.createObjectURL(file);
        try {
            const image = await new Promise<HTMLImageElement>((resolve, reject) => {
                const el = new Image();
                el.onload = () => resolve(el);
                el.onerror = () => reject(new Error("decode"));
                el.src = url;
            });
            return await createImageBitmap(image);
        } finally {
            URL.revokeObjectURL(url);
        }
    }
}

function encodeJpeg(bitmap: ImageBitmap, maxEdge: number, quality: number): Promise<Blob> {
    const scale = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height));
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) {
        throw new Error("Fotku se nepodařilo zpracovat.");
    }
    context.drawImage(bitmap, 0, 0, width, height);
    return new Promise((resolve, reject) => {
        canvas.toBlob(
            (blob) => {
                if (!blob) reject(new Error("Fotku se nepodařilo zpracovat."));
                else resolve(blob);
            },
            "image/jpeg",
            quality,
        );
    });
}

export async function prepareCmsImage(file: File): Promise<File> {
    const type = declaredType(file);
    if (PASSTHROUGH.has(type) && file.size <= PASS_THROUGH_BYTES) {
        if (file.type === type) return file;
        return new File([file], fileName(file.name, type), { type });
    }

    let bitmap: ImageBitmap;
    try {
        bitmap = await decode(file);
    } catch {
        throw new Error(
            "Tuhle fotku se nepodařilo přečíst. Vyberte ji znovu, nebo ji uložte jako JPEG.",
        );
    }

    try {
        let quality = 0.86;
        let edge = MAX_EDGE;
        let blob: Blob | null = null;
        for (let attempt = 0; attempt < 8; attempt++) {
            blob = await encodeJpeg(bitmap, edge, quality);
            if (blob.size <= PASS_THROUGH_BYTES) break;
            quality = Math.max(0.45, quality - 0.08);
            edge = Math.round(edge * 0.8);
        }
        if (!blob || blob.size > MAX_BYTES) {
            throw new Error("Fotku se nepodařilo zmenšit. Vyberte ji znovu.");
        }
        return new File([blob], fileName(file.name, "image/jpeg"), { type: "image/jpeg" });
    } finally {
        bitmap.close();
    }
}
