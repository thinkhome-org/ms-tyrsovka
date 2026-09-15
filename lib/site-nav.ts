export const NASE_MS_URL = "https://nasems.cz/";

export type NavLink = {
    label: string;
    href: string;
    external?: boolean;
};

export type NavItem = {
    label: string;
    href?: string;
    sub?: NavLink[];
};

export const MAIN_NAV: NavItem[] = [
    { label: "Aktuality", href: "/aktuality" },
    {
        label: "Pro zájemce",
        sub: [
            { label: "Pro mladší děti", href: "/pro-zajemce/mladsi-deti" },
            { label: "Pro předškoláky", href: "/pro-zajemce/predskolaci" },
            { label: "Zápis a přijetí", href: "/zapisy" },
        ],
    },
    {
        label: "Pro rodiče",
        sub: [
            { label: "Nově přijatí", href: "/nove-prijati" },
            { label: "Praktické informace", href: "/prakticke-informace" },
            { label: "Naše MŠ", href: NASE_MS_URL, external: true },
        ],
    },
    { label: "Jídelníček", href: "/jidelnicek" },
    {
        label: "O škole",
        sub: [
            { label: "Představení školy", href: "/o-nas" },
            { label: "Třídy", href: "/tridy" },
            { label: "Fotogalerie", href: "/galerie" },
            { label: "Zpráva ČŠI", href: "/zprava-csi" },
        ],
    },
    { label: "Kontakty", href: "/kontakty" },
];

export const FOOTER_COLUMNS: { title: string; links: NavLink[] }[] = [
    {
        title: "Pro rodiče",
        links: [
            { label: "Praktické informace", href: "/prakticke-informace" },
            { label: "Jídelníček", href: "/jidelnicek" },
            { label: "Naše MŠ", href: NASE_MS_URL, external: true },
            { label: "Kontakty", href: "/kontakty" },
        ],
    },
    {
        title: "Dokumenty",
        links: [
            { label: "Úřední deska a dokumenty", href: "/uredni-deska" },
            { label: "ŠVP", href: "/svp" },
            { label: "Školní řád", href: "/uredni-deska#skolni-rad" },
            { label: "Informační memorandum", href: "/informacni-memorandum" },
        ],
    },
    {
        title: "Další informace",
        links: [
            { label: "Pracovní příležitosti", href: "/pracovni-prilezitosti" },
            { label: "Zpráva ČŠI", href: "/zprava-csi" },
            { label: "Ochrana osobních údajů", href: "/ochrana-osobnich-udaju" },
            { label: "Prohlášení o přístupnosti", href: "/prohlaseni-o-pristupnosti" },
        ],
    },
];

export const SCHOOL_CONTACT = {
    name: "MŠ Tyršovka",
    address: "Lysinská 184/45, 143 00 Praha 4 – Modřany",
    phone: "+420 737 381 935",
    phoneHref: "tel:+420737381935",
    email: "reditelka@tyrsovka.cz",
};
