"use client";

import { useEffect, useState } from "react";
import { MAP_CONSENT_EVENT, readMapConsent } from "@/lib/map-consent";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const CF_TOKEN = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN;

function isGaId(value: string | undefined): value is string {
    return Boolean(value && /^G-[A-Z0-9]+$/i.test(value));
}

function isCfToken(value: string | undefined): value is string {
    return Boolean(value && /^[a-zA-Z0-9_-]{8,128}$/.test(value));
}

export function SiteAnalytics() {
    const [accepted, setAccepted] = useState(false);

    useEffect(() => {
        const sync = () => setAccepted(readMapConsent() === "accepted");
        sync();
        window.addEventListener(MAP_CONSENT_EVENT, sync);
        return () => window.removeEventListener(MAP_CONSENT_EVENT, sync);
    }, []);

    useEffect(() => {
        if (!isCfToken(CF_TOKEN)) return;
        if (document.querySelector("script[data-cf-beacon]")) return;
        const script = document.createElement("script");
        script.defer = true;
        script.src = "https://static.cloudflareinsights.com/beacon.min.js";
        script.dataset.cfBeacon = JSON.stringify({ token: CF_TOKEN });
        document.head.appendChild(script);
    }, []);

    useEffect(() => {
        if (!accepted || !isGaId(GA_ID)) return;
        if (document.querySelector(`script[data-ga="${GA_ID}"]`)) return;
        const loader = document.createElement("script");
        loader.async = true;
        loader.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;
        loader.dataset.ga = GA_ID;
        document.head.appendChild(loader);
        const config = document.createElement("script");
        config.dataset.gaConfig = GA_ID;
        config.text = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config',${JSON.stringify(GA_ID)});`;
        document.head.appendChild(config);
    }, [accepted]);

    return null;
}
