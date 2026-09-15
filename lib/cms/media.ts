export function coverSrc(coverKey: string | null | undefined): string | null {
    if (!coverKey) return null;
    if (coverKey.startsWith("http://") || coverKey.startsWith("https://")) {
        return coverKey;
    }
    if (coverKey.startsWith("/")) return coverKey;
    return `/media/${coverKey}`;
}

export function mediaUrl(key: string): string {
    return `/media/${key}`;
}
