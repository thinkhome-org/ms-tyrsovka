import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/auth";
import { putDocument } from "@/lib/cms/documents";
import {
    createNotice,
    listNotices,
    type NoticeInput,
} from "@/lib/cms/notices";

export const dynamic = "force-dynamic";

async function noticeInputFromRequest(request: Request): Promise<NoticeInput> {
    const contentType = request.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) {
        return (await request.json()) as NoticeInput;
    }
    const form = await request.formData();
    const file = form.get("file");
    let file_key: string | null | undefined;
    if (file instanceof File && file.size > 0) {
        file_key = (await putDocument(file)).key;
    }
    const href = String(form.get("href") ?? "").trim();
    return {
        title: String(form.get("title") ?? ""),
        category: (form.get("category") as NoticeInput["category"]) || undefined,
        expires_at: String(form.get("expires_at") ?? "") || null,
        published_at: String(form.get("published_at") ?? "") || null,
        href: href || null,
        file_key,
    };
}

export async function GET() {
    const denied = await requireAdmin();
    if (denied) return denied;
    const items = await listNotices();
    return NextResponse.json({ items });
}

export async function POST(request: Request) {
    const denied = await requireAdmin();
    if (denied) return denied;
    try {
        const input = await noticeInputFromRequest(request);
        const item = await createNotice(input);
        return NextResponse.json({ item }, { status: 201 });
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Uložení se nepovedlo.";
        return NextResponse.json({ error: message }, { status: 400 });
    }
}
