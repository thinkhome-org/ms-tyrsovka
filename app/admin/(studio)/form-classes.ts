export const NOTICE_CATEGORY_LABELS: Record<
    "zpravy" | "dokumenty" | "skolni-rad" | "ostatni",
    string
> = {
    zpravy: "Zprávy",
    dokumenty: "Dokumenty ke stažení",
    "skolni-rad": "Školní řád",
    ostatni: "Ostatní",
};

export const textareaClassName =
    "min-h-24 w-full rounded-md border border-input bg-card px-3.5 py-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40";

export const selectClassName =
    "h-11 w-full rounded-md border border-input bg-card px-3.5 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40";
