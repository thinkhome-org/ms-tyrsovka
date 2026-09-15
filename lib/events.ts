export type SchoolEvent = {
    date: string;
    dateLabel?: string;
    title: string;
    who: string;
};

export const SCHOOL_EVENTS: SchoolEvent[] = [
    { date: "2026-02-02", dateLabel: "2.–6. 2. 2026", title: "Lyžařský výcvik na Šibeničním vrchu", who: "Přihlášené děti" },
    { date: "2026-02-10", title: "Masopustní veselice – dopoledne plné her a smíchu ve třídách", who: "Všechny třídy" },
    { date: "2026-02-13", title: "Není všechno zlato, co se třpytí – preventivní program", who: "Hrušková, Jablková" },
    { date: "2026-02-23", title: "Když ptáčka lapají, pěkně mu zpívají – preventivní program", who: "Hrušková, Jablková" },
    { date: "2026-02-27", title: "Polámal se mraveneček – program zaměřený na zdraví, hygienu a bezpečnost", who: "Hrušková, Jablková" },
    { date: "2026-03-02", dateLabel: "2.–6. 3. 2026", title: "Bruslící týden na HC Kobra", who: "Přihlášené děti z Hruškové a Jablkové" },
    { date: "2026-03-09", title: "Divadlo Bravo! – Hra o trůn", who: "Hrušková, Jablková, Citrónová, Borůvková" },
    { date: "2026-03-09", title: "Divadlo Na Cikorce – Myška Eliška", who: "Meruňková, Jahodová" },
    { date: "2026-03-12", title: "Projektový den – Zdravá strava", who: "Všechny třídy" },
    { date: "2026-03-17", title: "O Sněhurce – Divadlo Pruhované panenky", who: "Všechny třídy" },
    { date: "2026-03-19", title: "Den otevřených dveří", who: "Zájemci o MŠ" },
    { date: "2026-03-25", title: "Knihadýlko – Jak si uděláme zeměkouli", who: "Hrušková, Jablková, Citrónová, Borůvková" },
    { date: "2026-03-25", title: "Knihadýlko – Dobrodružství pavouka Čendy", who: "Jahodová, Meruňková" },
    { date: "2026-03-25", title: "Jarní besídka – náhrada za vánoční představení", who: "Meruňková" },
    { date: "2026-03-30", title: "Bubnování – muzikoterapie", who: "Mladší třídy" },
    { date: "2026-03-31", title: "Bubnování – muzikoterapie", who: "Starší třídy" },
    { date: "2026-03-31", title: "Vítání jara – tvořivé dílny na zahradě", who: "Děti, rodiče a budoucí rodiny" },
    { date: "2026-04-07", title: "Planetárium – Hurvínkova vesmírná odysea", who: "Hrušková, Jablková" },
    { date: "2026-04-07", title: "Mobilní planetárium v DDM Na Cikorce", who: "Citrónová, Borůvková, Meruňková, Jahodová" },
    { date: "2026-04-09", title: "Gábina a Katka – Ztracené souhvězdí", who: "Všechny třídy" },
    { date: "2026-04-14", title: "Divadlo Dosvěta – Nej, nej ze/mě", who: "Všechny třídy" },
    { date: "2026-04-14", title: "Zápis do MŠ – osobní odevzdání přihlášky", who: "Zájemci o přijetí" },
    { date: "2026-04-17", title: "Nemocnice pro medvídky", who: "Mladší třídy" },
    { date: "2026-04-20", title: "Nemocnice pro medvídky", who: "Starší třídy" },
    { date: "2026-04-27", title: "Včelí království – didaktický workshop", who: "Jahodová, Meruňková" },
    { date: "2026-04-30", title: "Čarodějnický rej – dopolední aktivity venku", who: "Všechny třídy" },
    { date: "2026-05-04", title: "Hrajeme si na louce – workshop od Lesy Praha", who: "Borůvková, Citrónová" },
    { date: "2026-05-05", title: "Luční kvítí – workshop od Lesy Praha", who: "Jablková, Hrušková" },
    { date: "2026-05-05", title: "Besídka ke Dni maminek", who: "Meruňková" },
    { date: "2026-05-05", title: "Tvoření s představením ke Dni maminek", who: "Citrónová" },
    { date: "2026-05-06", title: "Besídka ke Dni maminek", who: "Jahodová" },
    { date: "2026-05-06", title: "Tvoření s tatínky – výroba dárku pro maminky", who: "Borůvková, Jablková, Hrušková" },
    { date: "2026-05-21", title: "Přespávání předškoláků", who: "Jablková, Hrušková" },
    { date: "2026-05-29", title: "Klaun Ferda a jeho parťák – akce k MDD", who: "Všechny třídy" },
    { date: "2026-06-01", title: "Sportovní olympiáda MŠ Tyršovka", who: "Všechny třídy" },
    { date: "2026-06-03", title: "Sportovní den mateřských škol Prahy 12", who: "Vybrané děti" },
    { date: "2026-06-11", title: "Zahradní slavnost a pasování předškoláků", who: "Všechny třídy a rodiče" },
    { date: "2026-06-15", dateLabel: "červen 2026", title: "Den dopravy u Viničního domku", who: "Bude upřesněno" },
    { date: "2026-06-20", dateLabel: "červen 2026", title: "Den zdraví u radnice MČ Praha 12", who: "Bude upřesněno" },
];

export function eventDateLabel(event: SchoolEvent): string {
    if (event.dateLabel) return event.dateLabel;
    return new Intl.DateTimeFormat("cs-CZ", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
    }).format(new Date(`${event.date}T12:00:00`));
}

export function upcomingEvents(now = new Date()): SchoolEvent[] {
    const today = now.toISOString().slice(0, 10);
    return SCHOOL_EVENTS.filter((event) => event.date >= today).sort((a, b) =>
        a.date.localeCompare(b.date),
    );
}

export function pastEvents(now = new Date()): SchoolEvent[] {
    const today = now.toISOString().slice(0, 10);
    return SCHOOL_EVENTS.filter((event) => event.date < today).sort((a, b) =>
        b.date.localeCompare(a.date),
    );
}
