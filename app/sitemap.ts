import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/seo";
import { listPublished } from "@/lib/cms/aktuality";
import { CLASSROOMS } from "@/lib/classrooms";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const base = getBaseUrl();

    const staticPaths = [
        "",
        "pro-zajemce",
        "pro-zajemce/mladsi-deti",
        "pro-zajemce/predskolaci",
        "zapisy",
        "nove-prijati",
        "prakticke-informace",
        "jidelnicek",
        "kontakty",
        "o-nas",
        "tridy",
        "galerie",
        "aktuality",
        "plan-akci",
        "svp",
        "projekty-a-vyzvy",
        "uredni-deska",
        "spoluprace",
        "zprava-csi",
        "informacni-memorandum",
        "pracovni-prilezitosti",
        "ochrana-osobnich-udaju",
        "prohlaseni-o-pristupnosti",
        ...CLASSROOMS.map((classroom) => `tridy/${classroom.slug}`),
    ];

    const staticRoutes: MetadataRoute.Sitemap = staticPaths.map((path) => ({
        url: path ? `${base}/${path}` : base,
        lastModified: new Date(),
        changeFrequency: path === "" || path === "aktuality" ? "weekly" : ("monthly" as const),
        priority: path === "" ? 1 : 0.8,
    }));

    const published = await listPublished();
    const aktualitySlugs = published.map((item) => ({
        url: `${base}/aktuality/${item.slug}`,
        lastModified: item.updated_at ? new Date(item.updated_at) : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
    }));

    return [...staticRoutes, ...aktualitySlugs];
}
