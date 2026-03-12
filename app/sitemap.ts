import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/seo";
import aktuality from "@/app/data/aktuality.json";

type Aktualita = { slug: string };

export default function sitemap(): MetadataRoute.Sitemap {
    const base = getBaseUrl();

    const staticPaths = [
        "",
        "pro-zajemce",
        "zapisy",
        "nove-prijati",
        "rezim-dne-a-provozni-doba",
        "plan-akci",
        "jidelnicek",
        "kontakty",
        "o-nas",
        "tridy",
        "galerie",
        "aktuality",
        "svp",
        "projekty-a-vyzvy",
        "uredni-deska",
        "spoluprace",
    ];

    const staticRoutes: MetadataRoute.Sitemap = staticPaths.map((path) => ({
        url: path ? `${base}/${path}` : base,
        lastModified: new Date(),
        changeFrequency: path === "" || path === "aktuality" ? "weekly" : ("monthly" as const),
        priority: path === "" ? 1 : 0.8,
    }));

    const aktualitySlugs = (aktuality as Aktualita[]).map((a) => ({
        url: `${base}/aktuality/${a.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
    }));

    return [...staticRoutes, ...aktualitySlugs];
}
