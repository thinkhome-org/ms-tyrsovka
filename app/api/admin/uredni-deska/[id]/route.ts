import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/auth";
import { putDocument } from "@/lib/cms/documents";
import {
    deleteNotice,
    getNoticeById,
    updateNotice,
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

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    const denied = await requireAdmin();
    if (denied) return denied;
    const { id } = await params;
    const item = await getNoticeById(id);
    if (!item) {
        return NextResponse.json({ error: "Dokument neexistuje." }, { status: 404 });
    }
    return NextResponse.json({ item });
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    const denied = await requireAdmin();
    if (denied) return denied;
    const { id } = await params;
    try {
        const input = await noticeInputFromRequest(request);
        const item = await updateNotice(id, input);
        return NextResponse.json({ item });
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Uložení se nepovedlo.";
        const status = message === "Dokument neexistuje." ? 404 : 400;
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
        const deleted = await deleteNotice(id);
        if (!deleted) {
            return NextResponse.json({ error: "Dokument neexistuje." }, { status: 404 });
        }
        return NextResponse.json({ ok: true });
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Odstranění se nepovedlo.";
        return NextResponse.json({ error: message }, { status: 400 });
    }
}
