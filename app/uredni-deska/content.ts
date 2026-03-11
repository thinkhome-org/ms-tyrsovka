/**
 * Úřední deska – odkazy na dokumenty ke stažení.
 * Prozatím statický obsah; později lze nahradit načítáním z CMS.
 */

export type UredniDeskaItem = {
    label: string;
    href: string;
    kind: string;
};

export type UredniDeskaSection = {
    title: string;
    description: string;
    items: UredniDeskaItem[];
    note?: string;
};

export const UREDNI_DESKA_SECTIONS: UredniDeskaSection[] = [
    {
        title: "Zprávy",
        description:
            "Výroční zprávy a další zveřejňované dokumenty školy.",
        items: [
            {
                label: "Výroční zpráva 2024/25",
                href: "http://files.site.site3.eu/f8/3e/f83e2234-030b-4972-8792-fc03e7b481f3.pdf",
                kind: "Přímé stažení PDF",
            },
            {
                label: "Výroční zprávy na původním webu",
                href: "https://www.tyrsovka.cz/o-%C5%A1kole/v%C3%BDro%C4%8Dn%C3%AD-zpr%C3%A1vy",
                kind: "Zdrojová stránka",
            },
            {
                label: "Zprávy ČŠI",
                href: "https://www.tyrsovka.cz/o-%C5%A1kole/v%C3%BDro%C4%8Dn%C3%AD-zpr%C3%A1vy",
                kind: "Připravit další položky",
            },
        ],
    },
    {
        title: "Dokumenty ke stažení",
        description:
            "Formuláře a potvrzení pro rodiče, které škola zveřejňuje ke stažení.",
        items: [
            {
                label: "Žádost k předškolnímu vzdělávání",
                href: "https://www.tyrsovka.cz/informace-pro-rodi%C4%8De/dokumenty-a-potvrzeni",
                kind: "Stáhnout na původním webu",
            },
            {
                label: "Kritéria pro přijetí 2025/2026",
                href: "https://www.tyrsovka.cz/informace-pro-rodi%C4%8De/dokumenty-a-potvrzeni",
                kind: "Stáhnout na původním webu",
            },
            {
                label: "Evidenční list a potvrzení lékaře",
                href: "https://www.tyrsovka.cz/informace-pro-rodi%C4%8De/dokumenty-a-potvrzeni",
                kind: "Stáhnout na původním webu",
            },
            {
                label: "Odhláška z MŠ",
                href: "https://www.tyrsovka.cz/informace-pro-rodi%C4%8De/dokumenty-a-potvrzeni",
                kind: "Stáhnout na původním webu",
            },
            {
                label: "Pověření k vyzvedávání dítěte jinou osobou",
                href: "https://www.tyrsovka.cz/informace-pro-rodi%C4%8De/dokumenty-a-potvrzeni",
                kind: "Stáhnout na původním webu",
            },
            {
                label: "Informovaný souhlas se zpracováním osobních údajů",
                href: "https://www.tyrsovka.cz/informace-pro-rodi%C4%8De/dokumenty-a-potvrzeni",
                kind: "Stáhnout na původním webu",
            },
            {
                label: "Sazebník úhrad za poskytování informací",
                href: "https://www.tyrsovka.cz/informace-pro-rodi%C4%8De/dokumenty-a-potvrzeni",
                kind: "Stáhnout na původním webu",
            },
        ],
        note: "Potvrzení o výši vynaložených nákladů za umístění dítěte škola podle původního webu vydává vždy začátkem kalendářního roku ve třídách.",
    },
    {
        title: "Školní řád",
        description:
            "Oficiální školní řád zveřejněný ke stažení pro rodiče i zájemce.",
        items: [
            {
                label: "Školní řád ke stažení",
                href: "https://www.tyrsovka.cz/informace-pro-rodi%C4%8De/skolni-rad",
                kind: "Stáhnout PDF na původním webu",
            },
        ],
    },
];
