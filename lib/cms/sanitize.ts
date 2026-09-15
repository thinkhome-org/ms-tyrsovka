import sanitizeHtml from "sanitize-html";

function isAllowedImageSrc(src: string): boolean {
    if (src.startsWith("/media/")) return true;
    if (src.startsWith("/") && !src.startsWith("//")) return true;
    return false;
}

export function sanitizeBody(html: string): string {
    return sanitizeHtml(html, {
        allowedTags: [
            "p",
            "h2",
            "h3",
            "ul",
            "ol",
            "li",
            "strong",
            "em",
            "a",
            "blockquote",
            "img",
            "br",
        ],
        allowedAttributes: {
            a: ["href", "target", "rel"],
            img: ["src", "alt"],
        },
        allowedSchemes: ["http", "https", "mailto"],
        transformTags: {
            a: (tagName, attribs) => ({
                tagName,
                attribs: {
                    href: attribs.href ?? "",
                    target: "_blank",
                    rel: "noopener noreferrer",
                },
            }),
        },
        exclusiveFilter: (frame) => {
            if (frame.tag === "img") {
                const src = frame.attribs.src ?? "";
                return !isAllowedImageSrc(src);
            }
            return false;
        },
    });
}

export function excerptFromHtml(html: string, maxLength = 180): string {
    const text = sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} })
        .replace(/\s+/g, " ")
        .trim();
    if (text.length <= maxLength) return text;
    return `${text.slice(0, maxLength).trimEnd()}…`;
}
