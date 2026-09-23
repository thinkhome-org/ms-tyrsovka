"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
    MAP_CONSENT_EVENT,
    readMapConsent,
    writeMapConsent,
    type MapConsent,
} from "@/lib/map-consent";

export function CookieBanner() {
    const [consent, setConsent] = useState<MapConsent>(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const sync = () => setConsent(readMapConsent());
        sync();
        setReady(true);
        window.addEventListener(MAP_CONSENT_EVENT, sync);
        return () => window.removeEventListener(MAP_CONSENT_EVENT, sync);
    }, []);

    if (!ready || consent !== null) return null;

    return (
        <div
            data-cookie-banner
            className="fixed inset-x-0 bottom-0 z-[70] border-t border-border bg-background/92 px-4 py-4 shadow-[0_-12px_32px_-18px_oklch(0.22_0.02_260_/_0.35)] backdrop-blur-xl"
        >
            <div className="page-shell flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    Na webu používáme jen nezbytné cookies. Mapa Google se načte, až ji
                    povolíte. Podrobnosti jsou na stránce{" "}
                    <Link href="/cookies" className="font-medium text-foreground underline underline-offset-2">
                        Cookies
                    </Link>
                    .
                </p>
                <div className="flex flex-wrap gap-2">
                    <button
                        type="button"
                        className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                        onClick={() => writeMapConsent("rejected")}
                    >
                        Odmítnout
                    </button>
                    <button
                        type="button"
                        className={cn(buttonVariants({ size: "sm" }))}
                        onClick={() => writeMapConsent("accepted")}
                    >
                        Povolit mapu
                    </button>
                </div>
            </div>
        </div>
    );
}
