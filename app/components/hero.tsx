"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarDays, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GALLERY_ALBUMS } from "@/app/galerie/content";

const ALL_PHOTOS = GALLERY_ALBUMS.flatMap((a) => a.photos);

function shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// Fibonacci grid — 5 cols (2:3:5:3:2) × 2 rows (3:5)
const DESKTOP_GRID = {
    gridTemplateColumns: "2fr 3fr 5fr 3fr 2fr",
    gridTemplateRows: "3fr 5fr",
};

const BENTO = [
    { col: "1 / 2", row: "1 / 3" },
    { col: "2 / 4", row: "1 / 2" },
    { col: "4 / 5", row: "1 / 2" },
    { col: "5 / 6", row: "1 / 2" },
    { col: "2 / 3", row: "2 / 3" },
    { col: "3 / 5", row: "2 / 3" },
    { col: "5 / 6", row: "2 / 3" },
];

const MOBILE_GRID = {
    gridTemplateColumns: "3fr 5fr",
    gridTemplateRows: "5fr 3fr",
};

export default function Hero() {
    const [photos, setPhotos] = useState<typeof ALL_PHOTOS>([]);

    useEffect(() => {
        setPhotos(shuffle(ALL_PHOTOS).slice(0, 7));
    }, []);

    return (
        <section id="hero" className="relative isolate overflow-hidden">
            <div className="page-shell flex flex-col gap-12 py-12 sm:gap-14 sm:py-16 lg:min-h-[calc(100dvh-5rem)] lg:gap-16 lg:py-20">
                {/* Header */}
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
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
                            Mateřská škola zaměřená na zdravý životní styl,
                            pohyb a bezpečné prostředí pro vaše děti.
                        </p>
                        <div className="flex gap-3 lg:justify-end">
                            <Link
                                href="/aktuality"
                                className={cn(
                                    buttonVariants({ size: "lg" }),
                                    "rounded-md px-6"
                                )}
                            >
                                Aktuality
                            </Link>
                            <Link
                                href="/pro-zajemce"
                                className={cn(
                                    buttonVariants({
                                        variant: "outline",
                                        size: "lg",
                                    }),
                                    "rounded-md px-6"
                                )}
                            >
                                Pro zájemce
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Photo grid – mobile */}
                <div
                    className="grid min-h-[260px] gap-3 sm:min-h-[320px] lg:hidden"
                    style={MOBILE_GRID}
                >
                    {photos.slice(0, 4).map((photo, i) => (
                        <motion.div
                            key={photo.src}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="overflow-hidden rounded-xl bg-muted"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={photo.src}
                                alt={photo.alt}
                                className="h-full w-full object-cover"
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Photo grid – desktop */}
                <div
                    className="hidden flex-1 gap-3 lg:grid"
                    style={DESKTOP_GRID}
                >
                    {photos.slice(0, 7).map((photo, i) => (
                        <motion.div
                            key={photo.src}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: i * 0.08 }}
                            className="relative overflow-hidden rounded-xl bg-muted"
                            style={{
                                gridColumn: BENTO[i].col,
                                gridRow: BENTO[i].row,
                            }}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={photo.src}
                                alt={photo.alt}
                                className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                            />
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
