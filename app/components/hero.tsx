"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import type { PublicGalleryPhoto } from "@/lib/cms/gallery";

const DESKTOP_COUNT = 6;
const MOBILE_COUNT = 4;

function shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

export default function Hero({ photos: source }: { photos: PublicGalleryPhoto[] }) {
    const [photos, setPhotos] = useState<PublicGalleryPhoto[]>([]);

    useEffect(() => {
        // Keep the random selection client-only to avoid a hydration mismatch.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPhotos(shuffle(source).slice(0, DESKTOP_COUNT));
    }, [source]);

    return (
        <section id="hero" className="relative isolate flex min-h-[calc(100dvh-4.5rem)] flex-col overflow-hidden">
            <div className="page-shell flex min-h-[calc(100dvh-4.5rem)] flex-1 flex-col gap-8 py-8 sm:gap-10 sm:py-10">
                <div className="flex shrink-0 flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div className="space-y-4">
                        <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                            Mateřská škola
                        </p>
                        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                            MŠ Tyršovka
                        </h1>
                    </div>

                    <div className="max-w-md space-y-5 lg:text-right">
                        <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                            Zaměřujeme se na výchovu a vzdělávání ke zdravému
                            životnímu stylu. Důraz klademe na pohyb, zdravé
                            stravování, pobyt venku a na emoční i sociální odolnost.
                        </p>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                                    Pro zájemce o školku
                                </p>
                                <div className="flex flex-wrap gap-3 lg:justify-end">
                                    <Link
                                        href="/pro-zajemce/mladsi-deti"
                                        className={buttonVariants({
                                            variant: "outline",
                                            size: "lg",
                                        })}
                                    >
                                        Mladší děti
                                    </Link>
                                    <Link
                                        href="/pro-zajemce/predskolaci"
                                        className={buttonVariants({
                                            variant: "outline",
                                            size: "lg",
                                        })}
                                    >
                                        Předškoláci
                                    </Link>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                                    Pro naše rodiče
                                </p>
                                <div className="flex flex-wrap gap-3 lg:justify-end">
                                    <Link
                                        href="/#aktuality"
                                        className={buttonVariants({ size: "lg" })}
                                    >
                                        Aktuality ze školky
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid min-h-0 flex-1 grid-cols-2 grid-rows-2 gap-3 lg:grid-cols-3">
                    {Array.from({ length: DESKTOP_COUNT }, (_, i) => {
                        const photo = photos[i];
                        const mobileHidden = i >= MOBILE_COUNT;
                        return (
                            <div
                                key={photo?.src ?? i}
                                className={
                                    mobileHidden
                                        ? "relative hidden min-h-0 overflow-hidden rounded-xl bg-muted lg:block"
                                        : "relative min-h-0 overflow-hidden rounded-xl bg-muted"
                                }
                            >
                                {photo ? (
                                    <motion.img
                                        src={photo.src}
                                        alt={photo.alt}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5 }}
                                        className="absolute inset-0 h-full w-full object-cover"
                                    />
                                ) : null}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
