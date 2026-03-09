"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Fibonacci-inspired desktop layout: columns 1, 1, 2, 3, 2, 1 and rows 2, 3, 2.
const HERO_IMAGES = [
    { src: "/tyrsovka-1.jpg", alt: "MŠ Tyršovka", col: "1 / 5", row: "1 / 3" },
    { src: "/tyrsovka-2.jpg", alt: "Prostředí školy", col: "5 / 7", row: "1 / 3" },
    { src: "/tyrsovka-1.jpg", alt: "Děti", col: "1 / 3", row: "3 / 4" },
    { src: "/tyrsovka-2.jpg", alt: "Aktivity", col: "3 / 5", row: "3 / 4" },
    { src: "/tyrsovka-1.jpg", alt: "Tyršovka", col: "5 / 7", row: "3 / 4" },
];

function HeroImageGrid() {
    return (
        <>
            <div className="grid h-full min-h-[360px] w-full grid-cols-[2fr_3fr] grid-rows-[3fr_2fr_2fr] gap-2 rounded-lg border border-border bg-card p-2 sm:min-h-[420px] sm:gap-3 sm:p-3 lg:hidden">
                {HERO_IMAGES.map((img, i) => (
                    <div
                        key={i}
                        className={cn(
                            "relative overflow-hidden rounded-md border border-border/80 bg-muted transition-transform duration-300 hover:scale-[1.02]",
                            i === 0 && "row-span-2"
                        )}
                    >
                        <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            className="object-cover"
                            sizes="100vw"
                        />
                    </div>
                ))}
            </div>

            <div
                className="hidden h-full min-h-[520px] w-full gap-3 rounded-lg border border-border bg-card p-3 lg:grid"
                style={{
                    gridTemplateColumns: "1fr 1fr 2fr 3fr 2fr 1fr",
                    gridTemplateRows: "2fr 3fr 2fr",
                }}
            >
                {HERO_IMAGES.map((img, i) => (
                    <div
                        key={i}
                        className="relative overflow-hidden rounded-md border border-border/80 bg-muted transition-transform duration-300 hover:scale-[1.02]"
                        style={{
                            gridColumn: img.col,
                            gridRow: img.row,
                        }}
                    >
                        <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            className="object-cover"
                            sizes="45vw"
                        />
                    </div>
                ))}
            </div>
        </>
    );
}

export default function Hero() {
    return (
        <section
            id="hero"
            className="relative isolate overflow-hidden text-zinc-900"
        >
            <div className="page-shell section-shell grid items-start gap-10 lg:min-h-[calc(100vh-5rem)] lg:items-center lg:gap-14 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="z-10 flex max-w-2xl flex-col gap-7 py-2 sm:py-4 lg:py-8">
                    <div className="space-y-5">
                        <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                            Mateřská škola
                        </p>
                        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                            MŠ Tyršovka
                        </h1>
                        <p className="max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                            Jsme mateřská škola zaměřená na zdravý životní styl,
                            pohyb a bezpečné prostředí, ve kterém děti získávají
                            jistotu, samostatnost a chuť objevovat svět.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                        <Link
                            href="/aktuality"
                            className={cn(
                                buttonVariants({ size: "lg" }),
                                "h-10 w-full justify-center rounded-md px-5 sm:w-auto"
                            )}
                        >
                            Aktuality
                        </Link>
                        <Link
                            href="/o-nas"
                            className={cn(
                                buttonVariants({ variant: "outline", size: "lg" }),
                                "h-10 w-full justify-center rounded-md px-5 sm:w-auto"
                            )}
                        >
                            O nás
                        </Link>
                    </div>

                    <div className="grid gap-6 border-t border-border pt-6 sm:grid-cols-2">
                        <div>
                            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                                <CalendarDays className="size-4 text-muted-foreground" />
                                Každodenní rytmus
                            </div>
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                Vyvážený program plný pohybu, hry a klidných
                                momentů.
                            </p>
                        </div>
                        <div>
                            <div className="text-sm font-medium text-foreground">
                                Co je pro nás důležité
                            </div>
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                Respektující přístup, zdravé návyky a úzká
                                spolupráce s rodiči.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="order-first relative min-h-[360px] sm:min-h-[420px] lg:order-0 lg:min-h-[520px]">
                    <HeroImageGrid />
                </div>
            </div>
        </section>
    );
}
