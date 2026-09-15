import { getCloudflareContext } from "@opennextjs/cloudflare";

export type CmsDb = CloudflareEnv["DB"];
export type CmsMedia = CloudflareEnv["MEDIA"];

export async function getCloudflareEnv(): Promise<CloudflareEnv | null> {
    try {
        const { env } = await getCloudflareContext({ async: true });
        return env;
    } catch {
        return null;
    }
}

export async function getDb(): Promise<CmsDb | null> {
    const env = await getCloudflareEnv();
    return env?.DB ?? null;
}

export async function getMediaBucket(): Promise<CmsMedia | null> {
    const env = await getCloudflareEnv();
    return env?.MEDIA ?? null;
}

export async function getAdminSecrets(): Promise<{
    password: string;
    secret: string;
}> {
    const env = await getCloudflareEnv();
    const password =
        env?.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || "";
    const secret = env?.AUTH_SECRET || process.env.AUTH_SECRET || "";
    return { password, secret };
}
