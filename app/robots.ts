import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
    const base = getBaseUrl();

    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/admin", "/admin/", "/api/admin"],
        },
        sitemap: `${base}/sitemap.xml`,
    };
}
