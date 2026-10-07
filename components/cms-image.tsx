import Image, { type ImageProps } from "next/image";

/**
 * Uploaded CMS files live at `/media/…` and are served from R2.
 * The Cloudflare image optimizer only reads static assets, so those URLs
 * must skip `/_next/image` and load directly.
 */
export function CmsImage({ src, alt, unoptimized, ...props }: ImageProps) {
    const direct = typeof src === "string" && src.startsWith("/media/");
    return (
        <Image src={src} alt={alt} unoptimized={unoptimized || direct} {...props} />
    );
}
