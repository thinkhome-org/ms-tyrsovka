import { getSettingsMap } from "@/lib/cms/settings";

export async function SiteBanner() {
    const settings = await getSettingsMap();
    const message = settings.current_info.trim();
    if (!message) return null;

    return (
        <div className="border-b border-border bg-accent/70">
            <div className="page-shell py-3">
                <p className="text-sm leading-relaxed text-foreground sm:text-base">
                    {message}
                </p>
            </div>
        </div>
    );
}
