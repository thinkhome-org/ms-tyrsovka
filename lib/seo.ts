import type { Metadata } from "next";

const SITE_NAME = "MŠ Tyršovka";
const DEFAULT_DESCRIPTION =
    "Oficiální web Mateřské školy Tyršovka v Praze 4 – Modřanech. Informace o zápisech, provozu, aktualitách a kontaktech.";

/**
 * Base URL for canonical links, Open Graph, and sitemap.
 * Set NEXT_PUBLIC_SITE_URL in production (e.g. https://tyrsovka.cz).
 */
export function getBaseUrl(): string {
    if (process.env.NEXT_PUBLIC_SITE_URL) {
        return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
    }
    if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}`;
    }
    return "http://localhost:3000";
}

export function buildAbsoluteUrl(path: string): string {
    const base = getBaseUrl();
    const p = path.startsWith("/") ? path : `/${path}`;
    return `${base}${p}`;
}

export function buildPageMetadata({
    title,
    description,
    path,
    imagePath = "/logo.png",
}: {
    title: string;
    description: string;
    path: string;
    imagePath?: string;
}): Metadata {
    const url = buildAbsoluteUrl(path);
    const imageUrl = imagePath.startsWith("http")
        ? imagePath
        : buildAbsoluteUrl(imagePath);

    return {
        title,
        description,
        alternates: {
            canonical: url,
        },
        openGraph: {
            title: `${title} | ${SITE_NAME}`,
            description,
            url,
            siteName: SITE_NAME,
            locale: "cs_CZ",
            type: "website",
            images: [{ url: imageUrl, width: 1200, height: 630, alt: SITE_NAME }],
        },
        twitter: {
            card: "summary_large_image",
            title: `${title} | ${SITE_NAME}`,
            description,
        },
    };
}

export const defaultMetadata = {
    siteName: SITE_NAME,
    defaultDescription: DEFAULT_DESCRIPTION,
} as const;
