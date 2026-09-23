"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { SCHOOL_CONTACT } from "@/lib/site-nav";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
    MAP_CONSENT_EVENT,
    readMapConsent,
    writeMapConsent,
    type MapConsent,
} from "@/lib/map-consent";

const MAP_SRC =
    "https://www.google.com/maps?q=M%C5%A0+Tyr%C5%A1ovka,+Lysinsk%C3%A1+184%2F45,+Praha+4&z=16&output=embed";

export function SchoolMap({
    className,
    address = SCHOOL_CONTACT.address,
}: {
    className?: string;
    address?: string;
}) {
    const [consent, setConsent] = useState<MapConsent>(null);

    useEffect(() => {
        const sync = () => setConsent(readMapConsent());
        sync();
        window.addEventListener(MAP_CONSENT_EVENT, sync);
        return () => window.removeEventListener(MAP_CONSENT_EVENT, sync);
    }, []);

    return (
        <div className={className}>
            <div className="grid gap-4 lg:grid-cols-2">
                <div className="overflow-hidden rounded-xl bg-muted">
                    <div className="aspect-16/10 w-full">
                        {consent === "accepted" ? (
                            <iframe
                                title="Mapa – MŠ Tyršovka"
                                src={MAP_SRC}
                                className="h-full w-full"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                allowFullScreen
                            />
                        ) : (
                            <div className="flex h-full flex-col items-start justify-center gap-3 px-6 py-8">
                                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                                    Mapa Google se zobrazí po souhlasu s cookies třetí strany.
                                </p>
                                <button
                                    type="button"
                                    className={cn(buttonVariants({ size: "sm" }))}
                                    onClick={() => writeMapConsent("accepted")}
                                >
                                    Povolit mapu
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="overflow-hidden rounded-xl bg-white">
                    <div className="relative aspect-16/10 w-full">
                        <Image
                            src="/prichod.jpg"
                            alt="Schéma příchodu do MŠ Tyršovka: pavilony tříd od ulice Nad Belárií a vchod z ulice Lysinská"
                            fill
                            className="object-contain p-3"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                    </div>
                </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {address}
            </p>
        </div>
    );
}
