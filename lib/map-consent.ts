export const MAP_CONSENT_COOKIE = "tyrsovka_consent";
const RETIRED_CONSENT_COOKIE = "tyrsovka_map_consent";
export const MAP_CONSENT_MAX_AGE = 60 * 60 * 24 * 180;
export const MAP_CONSENT_EVENT = "tyrsovka-map-consent";

export type MapConsent = "accepted" | "rejected" | null;

export function readMapConsent(): MapConsent {
    if (typeof document === "undefined") return null;
    const match = document.cookie.match(/(?:^|; )tyrsovka_consent=([^;]*)/);
    if (match?.[1] === "1") return "accepted";
    if (match?.[1] === "0") return "rejected";
    return null;
}

export function writeMapConsent(value: Exclude<MapConsent, null>) {
    const maxAge = `Path=/; Max-Age=${MAP_CONSENT_MAX_AGE}; SameSite=Lax`;
    document.cookie = `${MAP_CONSENT_COOKIE}=${value === "accepted" ? "1" : "0"}; ${maxAge}`;
    document.cookie = `${RETIRED_CONSENT_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`;
    window.dispatchEvent(new Event(MAP_CONSENT_EVENT));
}
