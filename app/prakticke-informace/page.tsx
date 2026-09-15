import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo";
import { NASE_MS_URL } from "@/lib/site-nav";
import { Card, CardContent } from "@/components/ui/card";
import { linkButtonOutlineSm } from "@/lib/button-link-classes";

export const metadata = buildPageMetadata({
    title: "Praktické informace",
    description:
        "Provozní doba, příchod, vyzvedávání, omlouvání, strava, docházka a platby v MŠ Tyršovka.",
    path: "/prakticke-informace",
});

const SECTIONS = [
    {
        id: "provozni-doba",
        title: "Provozní doba a režim dne",
        body: (
            <>
                <p>MŠ je otevřena od 6:30 do 17:30 hodin.</p>
                <ul className="mt-3 list-disc space-y-1 pl-5">
                    <li>6:30–7:00 — v provozu je Citrónová třída (2. pavilon, přízemí)</li>
                    <li>7:00–16:30 — v provozu jsou všechny pavilony</li>
                    <li>16:30–17:30 — provoz zajišťuje opět Citrónová třída</li>
                </ul>
            </>
        ),
    },
    {
        id: "prichod",
        title: "Příchod a předávání dětí",
        body: (
            <ul className="list-disc space-y-1 pl-5">
                <li>od 6:30 do 7:00 funguje pouze Citrónová třída</li>
                <li>od 7:00 jsou otevřené všechny pavilony</li>
                <li>příchod do MŠ je nejpozději do 8:20</li>
                <li>vchody i branky se zavírají v 8:30</li>
            </ul>
        ),
    },
    {
        id: "kde-deti-jsou",
        title: "Kde děti během dne jsou",
        body: (
            <p>
                Dopoledne děti zůstávají ve své třídě, na zahradě nebo na společných akcích. Ranní a pozdní odpolední provoz zajišťuje Citrónová třída. Podrobnosti k pavilonům doplníme sem.
            </p>
        ),
    },
    {
        id: "vyzvedavani",
        title: "Kdy, kde a jak děti vyzvedávat",
        body: (
            <ul className="list-disc space-y-1 pl-5">
                <li>po obědě: 12:15–12:45</li>
                <li>odpoledne: od 14:30</li>
            </ul>
        ),
    },
    {
        id: "omlouvani",
        title: "Omlouvání docházky",
        body: (
            <p>
                Docházku omlouvejte přes aplikaci{" "}
                <a href={NASE_MS_URL} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">
                    Naše MŠ
                </a>
                , výjimečně SMS na třídní telefon. Omluva má být nahlášena do 8:30 v den absence, jinak je účtováno stravné.
            </p>
        ),
    },
    {
        id: "strava",
        title: "Přihlašování a odhlašování stravy",
        body: (
            <p>
                Postup odhlašování obědů doplníme sem. Aktuální jídelníček je na stránce{" "}
                <Link href="/jidelnicek" className="text-primary underline underline-offset-2">
                    Jídelníček
                </Link>
                .
            </p>
        ),
    },
    {
        id: "dochazka",
        title: "Přihlášení a ukončení docházky",
        body: (
            <p>
                Formuláře k docházce jsou na{" "}
                <Link href="/uredni-deska#dokumenty" className="text-primary underline underline-offset-2">
                    úřední desce
                </Link>
                .
            </p>
        ),
    },
    {
        id: "platby",
        title: "Platby a potřebné údaje",
        body: (
            <p>
                Číslo účtu a oficiální údaje školy jsou v{" "}
                <Link href="/kontakty" className="text-primary underline underline-offset-2">
                    kontaktech
                </Link>
                . Sazebník a související dokumenty najdete na úřední desce.
            </p>
        ),
    },
];

export default function PraktickeInformacePage() {
    return (
        <main className="flex-1 text-zinc-900">
            <div className="page-shell section-shell">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div className="max-w-3xl">
                        <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                            Pro rodiče
                        </p>
                        <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
                            Praktické informace
                        </h1>
                        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                            Jedna stránka pro provoz, docházku, stravu a platby. Vyberte oddíl.
                        </p>
                    </div>
                    <Link href="/" className={linkButtonOutlineSm}>
                        ← Zpět
                    </Link>
                </div>

                <nav className="mt-8 flex flex-wrap gap-2">
                    {SECTIONS.map((section) => (
                        <a
                            key={section.id}
                            href={`#${section.id}`}
                            className={linkButtonOutlineSm}
                        >
                            {section.title}
                        </a>
                    ))}
                </nav>

                <div className="mt-10 space-y-6">
                    {SECTIONS.map((section) => (
                        <Card
                            key={section.id}
                            id={section.id}
                            className="content-card scroll-mt-28 overflow-hidden"
                        >
                            <CardContent className="p-6 sm:p-8">
                                <h2 className="text-2xl font-semibold tracking-tight">
                                    {section.title}
                                </h2>
                                <div className="mt-4 text-base leading-relaxed text-muted-foreground">
                                    {section.body}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </main>
    );
}
