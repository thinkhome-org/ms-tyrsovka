import { mediaUrl } from "./media";
import { todayIsoDate } from "./dates";

type NoticeView = {
    file_key: string | null;
    href: string | null;
    expires_at?: string | null;
};

export function noticeHref(notice: NoticeView): string | null {
    if (notice.file_key) return mediaUrl(notice.file_key);
    if (notice.href) return notice.href;
    return null;
}

export function noticeKind(notice: NoticeView): string {
    if (notice.file_key) return "Ke stažení";
    const href = notice.href ?? "";
    if (href.includes(".pdf") || href.includes("files.site")) {
        return "Přímé stažení PDF";
    }
    return "Odkaz";
}

export function isNoticeLive(notice: NoticeView, today = todayIsoDate()): boolean {
    if (!notice.expires_at) return true;
    return notice.expires_at >= today;
}
