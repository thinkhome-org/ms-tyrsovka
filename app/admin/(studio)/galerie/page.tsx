import { listGalleryAlbums } from "@/lib/cms/gallery";
import { GalleryStudio } from "./gallery-studio";

export const dynamic = "force-dynamic";

export default async function AdminGaleriePage() {
    let albums: Awaited<ReturnType<typeof listGalleryAlbums>> = [];
    let loadError = "";
    try {
        albums = await listGalleryAlbums();
    } catch (error) {
        loadError =
            error instanceof Error
                ? error.message
                : "Galerii se nepodařilo načíst.";
    }

    return (
        <main className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                Fotografie
            </p>
            <h1 className="mt-2 font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
                Galerie
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Alba a fotky se ukážou na stránce galerie, na úvodní fotografii
                a v náhledu na homepage. Nové snímky nahrajte přímo sem.
            </p>
            {loadError ? (
                <p className="mt-8 text-sm text-destructive" role="alert">
                    {loadError}
                </p>
            ) : (
                <GalleryStudio albums={albums} />
            )}
        </main>
    );
}
