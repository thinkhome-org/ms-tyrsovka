export type Classroom = {
    slug: string;
    name: string;
    fullName: string;
    symbol: string;
    age: string;
    group: "mladsi" | "stredni" | "predskolaci";
    barClass: string;
    image: string;
    email: string;
    phone?: string;
    location: string;
    teachers: string[];
    paragraphs: string[];
    note?: string;
};

export const CLASSROOMS: Classroom[] = [
    {
        slug: "jahodova",
        name: "Jahodová",
        fullName: "Jahodová třída",
        symbol: "🍓",
        age: "2,5–4 let",
        group: "mladsi",
        barClass: "bg-[oklch(0.62_0.18_22)] text-white",
        image: "/tridy/jahodova.png",
        email: "jahodova@tyrsovka.cz",
        location: "3. pavilon, přízemí",
        teachers: ["Romana Novotná", "Iveta Masopustová"],
        paragraphs: [
            "Jahodovou třídu navštěvují děti, které školku navštěvují prvním rokem. Třída má i oddělené hřiště, které pomáhá s pozvolnou a klidnou adaptací na nové prostředí.",
            "Hlavním cílem je vytvořit bezpečné a podnětné prostředí, ve kterém si děti zvykají na režim dne, nové vztahy i odloučení od rodičů. Důraz je na hru, rozvoj samostatnosti, sebeobsluhy a základních sociálních dovedností.",
        ],
    },
    {
        slug: "merunkova",
        name: "Meruňková",
        fullName: "Meruňková třída",
        symbol: "🍑",
        age: "2,5–4 let",
        group: "mladsi",
        barClass: "bg-[oklch(0.72_0.14_55)] text-[oklch(0.28_0.06_50)]",
        image: "/tridy/merunkova.png",
        email: "merunkova@tyrsovka.cz",
        location: "1. pavilon, přízemí",
        teachers: ["Gabriela Chajruševová", "Michaela Hartmannová"],
        paragraphs: [
            "Meruňková třída se soustředí na seznámení s mateřskou školou, orientaci v režimu dne a postupné osvojení hygienických a stravovacích návyků.",
            "Učitelky pracují s individualitou každého dítěte a jako hlavní prostředek rozvoje zůstává hra, která přirozeně provází celý den. Cílem je, aby děti zvládly odloučení od rodičů a těšily se na školku i své kamarády.",
        ],
    },
    {
        slug: "boruvkova",
        name: "Borůvková",
        fullName: "Borůvková třída",
        symbol: "🫐",
        age: "3–5 let",
        group: "stredni",
        barClass: "bg-[oklch(0.42_0.14_275)] text-white",
        image: "/tridy/boruvkova.png",
        email: "boruvkova@tyrsovka.cz",
        location: "1. pavilon, patro",
        teachers: ["Kateřina Kovandová", "Julie Langová"],
        paragraphs: [
            "Borůvková třída podporuje větší samostatnost dětí, rozvoj pohybových dovedností, komunikačních schopností a zdravých sociálních vztahů. Děti se učí pracovat s chybou a nebát se neúspěchu.",
            "Součástí vzdělávání je práce s emocemi, bezpečné řešení rizikových situací a zážitkové učení. Pravidelně se vyráží do přírody, kde se propojují vzdělávací aktivity s pohybem a posilováním sebevědomí.",
        ],
    },
    {
        slug: "citronova",
        name: "Citrónová",
        fullName: "Citrónová třída",
        symbol: "🍋",
        age: "3–5 let",
        group: "stredni",
        barClass: "bg-[oklch(0.86_0.14_100)] text-[oklch(0.32_0.06_95)]",
        image: "/tridy/citronova.png",
        email: "citronova@tyrsovka.cz",
        phone: "+420 731 252 242",
        location: "2. pavilon, přízemí",
        teachers: [
            "Kateřina Kroutilová",
            "Karolína Rotmanová, DiS.",
            "Karolína Nováková",
        ],
        paragraphs: [
            "Ve třídě se klade důraz na komplexní rozvoj osobnosti dítěte s ohledem na jeho individuální potřeby, tempo a schopnosti. Děti jsou vedeny k sebedůvěře, komunikaci a zdravému prosazení vlastního názoru.",
            "Práce s chybou je vnímána jako přirozená součást učení. Třídu provází projekty zaměřené na emoční rozvoj i pohybovou zdatnost a důležitou roli hraje také otevřená spolupráce s rodinou.",
        ],
        note: "Během ranního a odpoledního provozu zajišťuje kontakt pro celou školku.",
    },
    {
        slug: "jablkova",
        name: "Jablková",
        fullName: "Jablková třída",
        symbol: "🍎",
        age: "4–6 let",
        group: "predskolaci",
        barClass: "bg-[oklch(0.55_0.16_145)] text-white",
        image: "/tridy/jablkova.png",
        email: "jablkova@tyrsovka.cz",
        location: "2. pavilon, patro",
        teachers: ["Mgr. Kateřina Novotná", "Jakub Mach, DiS."],
        paragraphs: [
            "Jablková třída se zaměřuje na samostatnost, sebeobsluhu, divergentní myšlení a přípravu předškolních dětí na vstup do základní školy. Děti se učí rozhodovat, jednat a v případě potřeby si říct o pomoc.",
            "Po celý rok třídu provázejí programy zaměřené na zdravý životní styl, emoční inteligenci i zážitkové učení v přírodě. Předškoláci mají možnost účastnit se například plaveckého nebo lyžařského kurzu.",
        ],
    },
    {
        slug: "hruskova",
        name: "Hrušková",
        fullName: "Hrušková třída",
        symbol: "🍐",
        age: "5–7 let",
        group: "predskolaci",
        barClass: "bg-[oklch(0.72_0.12_125)] text-[oklch(0.28_0.05_130)]",
        image: "/tridy/hruskova.png",
        email: "hruskova@tyrsovka.cz",
        location: "3. pavilon, patro",
        teachers: ["Petra Skružná", "Hana Flekalová, DiS."],
        paragraphs: [
            "Poslední rok v mateřské škole je zaměřený na posílení sebedůvěry, schopnosti prosadit se, komunikačních dovedností a přípravy na vstup do základní školy. Děti jsou vedeny k samostatnému řešení problémů a k bádání.",
            "Třídu provází předškolní příprava, práce s emocemi, zážitkové učení v přírodě i řada školních akcí. Cílem je, aby si děti poslední rok ve školce užily a odcházely s radostí a jistotou.",
        ],
    },
];

export function getClassroom(slug: string): Classroom | undefined {
    return CLASSROOMS.find((classroom) => classroom.slug === slug);
}

export function classroomsByGroup(group: Classroom["group"]): Classroom[] {
    return CLASSROOMS.filter((classroom) => classroom.group === group);
}
