/**
 * Úřední deska – sekce na veřejné stránce. Položky přicházejí z CMS.
 */

export type UredniDeskaSection = {
    id: "zpravy" | "dokumenty" | "skolni-rad" | "ostatni";
    title: string;
    description: string;
    note?: string;
};

export const UREDNI_DESKA_SECTIONS: UredniDeskaSection[] = [
    {
        id: "zpravy",
        title: "Zprávy",
        description: "Výroční zprávy a další zveřejňované dokumenty školy.",
    },
    {
        id: "dokumenty",
        title: "Dokumenty ke stažení",
        description:
            "Formuláře a potvrzení pro rodiče, které škola zveřejňuje ke stažení.",
        note: "Potvrzení o výši vynaložených nákladů za umístění dítěte škola podle původního webu vydává vždy začátkem kalendářního roku ve třídách.",
    },
    {
        id: "skolni-rad",
        title: "Školní řád",
        description:
            "Oficiální školní řád zveřejněný ke stažení pro rodiče i zájemce.",
    },
    {
        id: "ostatni",
        title: "Ostatní",
        description: "Další dokumenty, které nepatří do předchozích skupin.",
    },
];
