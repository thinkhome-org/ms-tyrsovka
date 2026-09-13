"use client";

import type { ComponentProps } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";

export default function PhotoLightbox(props: ComponentProps<typeof Lightbox>) {
    return (
        <Lightbox
            {...props}
            plugins={[Zoom, Counter]}
            controller={{ aria: true, closeOnBackdropClick: true }}
            labels={{
                Next: "Další",
                Previous: "Předchozí",
                Close: "Zavřít",
                "Zoom in": "Přiblížit",
                "Zoom out": "Oddálit",
            }}
        />
    );
}
