"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { linkButtonOutlineSm } from "@/lib/button-link-classes";
import { cn } from "@/lib/utils";
import { GALLERY_ALBUMS, type GalleryPhoto } from "./content";

type LightboxState = { photos: GalleryPhoto[]; index: number } | null;

function Lightbox({
    state,
    onClose,
    onPrev,
    onNext,
}: {
    state: LightboxState;
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
}) {
    useEffect(() => {
        if (!state) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") onPrev();
            if (e.key === "ArrowRight") onNext();
        };
        document.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [state, onClose, onPrev, onNext]);

    return (
        <AnimatePresence>
            {state && (
                <motion.div
                    key="lightbox"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="fixed inset-0 z-9999 flex items-center justify-center bg-black/90"
                    onClick={onClose}
                >
                    {/* Prev */}
                    <button
                        type="button"
                        aria-label="Předchozí"
                        onClick={(e) => { e.stopPropagation(); onPrev(); }}
                        className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/25 sm:left-5"
                    >
                        <ChevronLeft className="size-6" />
                    </button>

                    {/* Image */}
                    <motion.div
                        key={state.index}
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.15 }}
                        className="relative max-h-[90dvh] max-w-[90vw]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={state.photos[state.index].src}
                            alt={state.photos[state.index].alt}
                            className="max-h-[90dvh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
                        />
                        {state.photos[state.index].alt && (
                            <div className="absolute bottom-0 left-0 right-0 rounded-b-lg bg-linear-to-t from-black/70 to-transparent px-4 py-3">
                                <p className="text-sm text-white/90">
                                    {state.photos[state.index].alt}
                                </p>
                            </div>
                        )}
                    </motion.div>

                    {/* Next */}
                    <button
                        type="button"
                        aria-label="Další"
                        onClick={(e) => { e.stopPropagation(); onNext(); }}
                        className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/25 sm:right-5"
                    >
                        <ChevronRight className="size-6" />
                    </button>

                    {/* Close */}
                    <button
                        type="button"
                        aria-label="Zavřít"
                        onClick={onClose}
                        className="absolute right-3 top-3 z-10 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/25 sm:right-5 sm:top-5"
                    >
                        <X className="size-5" />
                    </button>

                    {/* Counter */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-xs text-white/80">
                        {state.index + 1} / {state.photos.length}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default function GaleriePage() {
    const [activeSlug, setActiveSlug] = useState<string>("akce");
    const [lightbox, setLightbox] = useState<LightboxState>(null);

    const activeAlbum = GALLERY_ALBUMS.find((a) => a.slug === activeSlug) ?? GALLERY_ALBUMS[0];
    const photos = activeAlbum.photos;

    const openLightbox = useCallback((index: number) => {
        setLightbox({ photos, index });
    }, [photos]);

    const closeLightbox = useCallback(() => setLightbox(null), []);

    const goPrev = useCallback(() => {
        setLightbox((lb) =>
            lb ? { ...lb, index: (lb.index - 1 + lb.photos.length) % lb.photos.length } : null
        );
    }, []);

    const goNext = useCallback(() => {
        setLightbox((lb) =>
            lb ? { ...lb, index: (lb.index + 1) % lb.photos.length } : null
        );
    }, []);

    return (
        <main className="flex-1 text-zinc-900">
            <div className="page-shell section-shell">
                <div className="mx-auto max-w-7xl">
                    <header className="flex flex-wrap items-end justify-between gap-6">
                        <div className="min-w-0 max-w-3xl">
                            <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                                Fotografie
                            </p>
                            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                                Galerie
                            </h1>
                            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                                Fotografie z každodenního života, akcí a prostor MŠ
                                Tyršovka.
                            </p>
                        </div>

                        <Link href="/" className={linkButtonOutlineSm}>
                            ← Zpět
                        </Link>
                    </header>

                    {/* Album tabs */}
                    <div className="mt-10 flex flex-wrap gap-2">
                        {GALLERY_ALBUMS.map((album) => (
                            <button
                                key={album.slug}
                                type="button"
                                onClick={() => setActiveSlug(album.slug)}
                                className={cn(
                                    "inline-flex h-9 items-center rounded-md px-4 text-sm font-medium transition-colors",
                                    activeSlug === album.slug
                                        ? "bg-foreground text-background"
                                        : "border border-border bg-background text-foreground hover:bg-muted"
                                )}
                            >
                                {album.title}
                                <span className="ml-2 rounded-full bg-white/20 px-1.5 py-0.5 text-xs font-normal tabular-nums leading-none">
                                    {album.photos.length}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Masonry grid */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSlug}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2 }}
                            className="mt-8 columns-2 gap-3 sm:columns-3 lg:columns-4 xl:columns-5"
                        >
                            {photos.map((photo, i) => (
                                <button
                                    key={photo.src}
                                    type="button"
                                    onClick={() => openLightbox(i)}
                                    className="mb-3 block w-full overflow-hidden rounded-lg focus-visible:outline focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                                    aria-label={`Otevřít: ${photo.alt}`}
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={photo.src}
                                        alt={photo.alt}
                                        loading="lazy"
                                        decoding="async"
                                        className="w-full transition-transform duration-300 hover:scale-[1.03]"
                                    />
                                </button>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            <Lightbox
                state={lightbox}
                onClose={closeLightbox}
                onPrev={goPrev}
                onNext={goNext}
            />
        </main>
    );
}
