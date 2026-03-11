export type ContactPerson = {
    role: string;
    name: string;
    email?: string;
    phone?: string;
};

export type ClassroomContact = {
    title: string;
    teachers: string[];
    location: string;
    note?: string;
};

export const KONTAKTY_CONTENT = {
    eyebrow: "Kontakty",
    title: "Kontakty",
    description:
        "Přehled kontaktů na vedení školy, provoz i jednotlivé třídy v novém přehledném rozložení. Obsah vychází z původních kontaktních stránek MŠ Tyršovka.",
    introTitle: "Jak nás nejlépe kontaktovat",
    introText:
        "Omluvenky zadávejte do aplikace Naše MŠ. Do tříd volejte nebo pište jen v naléhavých případech. Při ranním provozu, odpoledním provozu nebo pobytu na zahradě škola doporučuje kontaktovat Citrónovou třídu.",
    quickLinks: [
        {
            label: "Napsat ředitelce",
            href: "mailto:reditelka@tyrsovka.cz",
        },
        {
            label: "Zavolat do MŠ",
            href: "tel:+420737381935",
        },
        {
            label: "Původní kontakt na provoz",
            href: "https://www.tyrsovka.cz/kontakty/provoz-skolky",
        },
        {
            label: "Původní kontakt na třídy",
            href: "https://www.tyrsovka.cz/kontakty/tridy",
        },
    ],
    school: {
        name: "Mateřská škola Tyršovka v Praze 12",
        founder:
            "Zřizovatelem školy je Městská část Praha 12, Generála Šišky 2375/6, 143 00 Praha 4 - Modřany.",
        address: ["Lysinská 184/45", "143 00 Praha 4 - Modřany"],
        email: "reditelka@tyrsovka.cz",
        phone: "+420 737 381 935",
        ico: "63109719",
        databox: "9u4k2vr",
        bankAccount: "2000765379/0800",
    },
    managementContacts: [
        {
            role: "Ředitelka MŠ",
            name: "Mgr. Monika Všetečková Palubová",
            email: "reditelka@tyrsovka.cz",
            phone: "+420 737 381 935",
        },
        {
            role: "Zástupkyně ředitelky",
            name: "Hana Flekalová, DiS.",
        },
        {
            role: "Hospodářka a vedoucí školní jídelny",
            name: "Dobroslava Perevuzníková",
        },
    ] satisfies ContactPerson[],
    urgentClassPhone: {
        title: "Citrónová třída pro provozní situace",
        description:
            "V případě brzkého ranního provozu, odpoledního provozu nebo pobytu dětí na zahradě kontaktujte tuto třídu.",
        phone: "+420 731 252 242",
    },
    classroomContacts: [
        {
            title: "Jahodová třída",
            teachers: ["Romana Novotná", "Iveta Masopustová"],
            location: "3. pavilon, přízemí",
        },
        {
            title: "Meruňková třída",
            teachers: ["Gabriela Chajruševová", "Michaela Hartmannová"],
            location: "1. pavilon, přízemí",
        },
        {
            title: "Borůvková třída",
            teachers: ["Kateřina Kovandová", "Julie Langová"],
            location: "1. pavilon, patro",
        },
        {
            title: "Citrónová třída",
            teachers: [
                "Kateřina Kroutilová",
                "Karolína Rotmanová, DiS.",
                "Karolína Nováková",
            ],
            location: "2. pavilon, přízemí",
            note: "Během ranního a odpoledního provozu zajišťuje kontakt pro celou školku.",
        },
        {
            title: "Jablková třída",
            teachers: ["Mgr. Kateřina Novotná", "Jakub Mach, DiS."],
            location: "2. pavilon, patro",
        },
        {
            title: "Hrušková třída",
            teachers: ["Petra Skružná", "Hana Flekalová, DiS."],
            location: "3. pavilon, patro",
        },
    ] satisfies ClassroomContact[],
} as const;
