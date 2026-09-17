import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/auth";
import {
    getSettingsMap,
    upsertSettings,
    type SettingKey,
} from "@/lib/cms/settings";

export const dynamic = "force-dynamic";

export async function GET() {
    const denied = await requireAdmin();
    if (denied) return denied;
    const settings = await getSettingsMap();
    return NextResponse.json({ settings });
}

export async function POST(request: Request) {
    const denied = await requireAdmin();
    if (denied) return denied;
    try {
        const input = (await request.json()) as Partial<Record<SettingKey, string>>;
        const settings = await upsertSettings(input);
        return NextResponse.json({ settings });
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Uložení se nepovedlo.";
        return NextResponse.json({ error: message }, { status: 400 });
    }
}
