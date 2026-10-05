import { listPublicAlbums } from "@/lib/cms/gallery";
import { GalerieView } from "./galerie-view";

export const dynamic = "force-dynamic";

export default async function GaleriePage() {
    const albums = await listPublicAlbums();
    return <GalerieView albums={albums} />;
}
