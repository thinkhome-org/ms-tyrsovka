import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getAdminSecrets } from "./env";

export const ADMIN_COOKIE = "tyrsovka_admin";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;
const encoder = new TextEncoder();

function bytesToBase64Url(bytes: ArrayBuffer | Uint8Array): string {
    const view = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
    let binary = "";
    for (const byte of view) binary += String.fromCharCode(byte);
    return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlToBytes(value: string): Uint8Array {
    const padded = value.replace(/-/g, "+").replace(/_/g, "/");
    const pad = padded.length % 4 === 0 ? "" : "=".repeat(4 - (padded.length % 4));
    const binary = atob(padded + pad);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
    return bytes;
}

function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
    if (a.length !== b.length) return false;
    let mismatch = 0;
    for (let i = 0; i < a.length; i += 1) mismatch |= a[i] ^ b[i];
    return mismatch === 0;
}

async function importHmacKey(secret: string): Promise<CryptoKey> {
    return crypto.subtle.importKey(
        "raw",
        encoder.encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"],
    );
}

async function hmacSign(value: string, secret: string): Promise<string> {
    const key = await importHmacKey(secret);
    const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));
    return bytesToBase64Url(signature);
}

async function sha256(value: string): Promise<Uint8Array> {
    const digest = await crypto.subtle.digest("SHA-256", encoder.encode(value));
    return new Uint8Array(digest);
}

export async function passwordsMatch(input: string, expected: string): Promise<boolean> {
    if (!expected) return false;
    const [left, right] = await Promise.all([sha256(input), sha256(expected)]);
    return timingSafeEqual(left, right);
}

export async function createSessionToken(secret: string): Promise<string> {
    const expiresAt = String(Date.now() + SESSION_TTL_SECONDS * 1000);
    const signature = await hmacSign(expiresAt, secret);
    return `${expiresAt}.${signature}`;
}

export async function isValidSessionToken(
    token: string | undefined,
    secret: string,
): Promise<boolean> {
    if (!token || !secret) return false;
    const dot = token.indexOf(".");
    if (dot <= 0) return false;
    const expiresAt = token.slice(0, dot);
    const signature = token.slice(dot + 1);
    const expected = await hmacSign(expiresAt, secret);
    try {
        if (!timingSafeEqual(base64UrlToBytes(signature), base64UrlToBytes(expected))) {
            return false;
        }
    } catch {
        return false;
    }
    const exp = Number(expiresAt);
    return Number.isFinite(exp) && Date.now() < exp;
}

export function applySessionCookie(response: NextResponse, token: string): NextResponse {
    response.cookies.set(ADMIN_COOKIE, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: SESSION_TTL_SECONDS,
    });
    return response;
}

export function clearSessionCookie(response: NextResponse): NextResponse {
    response.cookies.set(ADMIN_COOKIE, "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 0,
    });
    return response;
}

export async function isAdmin(): Promise<boolean> {
    const { secret } = await getAdminSecrets();
    const jar = await cookies();
    return isValidSessionToken(jar.get(ADMIN_COOKIE)?.value, secret);
}

export async function requireAdmin(): Promise<NextResponse | null> {
    if (await isAdmin()) return null;
    return NextResponse.json({ error: "Nepřihlášeno." }, { status: 401 });
}
