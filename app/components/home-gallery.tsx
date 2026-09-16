import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GALLERY_ALBUMS } from "@/app/galerie/content";
import { linkButtonOutlineSm } from "@/lib/button-link-classes";

export function HomeGallery() {
    const photos = GALLERY_ALBUMS.flatMap((album) =>
        album.photos.slice(0, 2).map((photo) => ({ ...photo, album: album.title })),
    ).slice(0, 6);

    return (
        <section className="text-zinc-900">
            <div className="page-shell py-16 sm:py-20">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                            Ze života školy
                        </p>
                        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                            Fotografie
                        </h2>
                    </div>
                    <Link
                        href="/galerie"
                        className={`${linkButtonOutlineSm} gap-2`}
                    >
                        Celá galerie
                        <ArrowRight className="size-4" />
                    </Link>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
                    {photos.map((photo) => (
                        <Link
                            key={photo.src}
                            href="/galerie"
                            className="relative aspect-4/3 overflow-hidden rounded-xl bg-muted"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={photo.src}
                                alt={photo.alt}
                                className="size-full object-cover"
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
