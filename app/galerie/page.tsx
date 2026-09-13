"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { linkButtonOutlineSm } from "@/lib/button-link-classes";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { GALLERY_ALBUMS } from "./content";

const PhotoLightbox = dynamic(() => import("./photo-lightbox"), { ssr: false });

export default function GaleriePage() {
    const [activeSlug, setActiveSlug] = useState<string>("akce");
    const [photoIndex, setPhotoIndex] = useState(-1);

    const activeAlbum = GALLERY_ALBUMS.find((a) => a.slug === activeSlug) ?? GALLERY_ALBUMS[0];
    const photos = activeAlbum.photos;

    return (
        <main data-section="gallery" className="flex-1 text-zinc-900">
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

                    <Tabs value={activeSlug} onValueChange={setActiveSlug} className="mt-10">
                        <TabsList aria-label="Fotoalba" className="h-auto max-w-full flex-wrap justify-start group-data-[orientation=horizontal]/tabs:h-auto">
                            {GALLERY_ALBUMS.map((album) => (
                                <TabsTrigger key={album.slug} value={album.slug} className="min-h-11 flex-none">
                                    {album.title} ({album.photos.length})
                                </TabsTrigger>
                            ))}
                        </TabsList>
                        <TabsContent key={activeSlug} value={activeSlug}
                            className="mt-8 columns-2 gap-3 sm:columns-3 lg:columns-4 xl:columns-5 motion-safe:animate-in motion-safe:fade-in-0">
                            {photos.map((photo, i) => (
                                <button
                                    key={photo.src}
                                    type="button"
                                    onClick={() => setPhotoIndex(i)}
                                    className="mb-3 block min-h-11 w-full overflow-hidden rounded-lg focus-visible:outline focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                                    aria-label={`Otevřít: ${photo.alt}`}
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={photo.src}
                                        alt={photo.alt}
                                        loading="lazy"
                                        decoding="async"
                                        className="w-full transition-transform duration-300 motion-safe:hover:scale-[1.03] motion-reduce:transition-none"
                                    />
                                </button>
                            ))}
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

            {photoIndex >= 0 && (
                <PhotoLightbox
                    open
                    index={photoIndex}
                    slides={photos}
                    close={() => setPhotoIndex(-1)}
                />
            )}
        </main>
    );
}
