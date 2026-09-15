import { NextResponse } from "next/server";
import {
    applySessionCookie,
    createSessionToken,
    passwordsMatch,
} from "@/lib/cms/auth";
import { getAdminSecrets } from "@/lib/cms/env";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
    const { password, secret } = await getAdminSecrets();
    if (!password || !secret) {
        return NextResponse.json(
            { error: "Přihlášení není nastavené." },
            { status: 500 },
        );
    }

    let body: { password?: string } = {};
    try {
        body = (await request.json()) as { password?: string };
    } catch {
        return NextResponse.json({ error: "Neplatný požadavek." }, { status: 400 });
    }

    const ok = await passwordsMatch(body.password ?? "", password);
    if (!ok) {
        return NextResponse.json({ error: "Nesprávné heslo." }, { status: 401 });
    }

    const token = await createSessionToken(secret);
    const response = NextResponse.json({ ok: true });
    return applySessionCookie(response, token);
}
