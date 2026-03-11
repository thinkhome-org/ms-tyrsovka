import type { StaticPageContent } from "@/app/components/static-content-page";

export const PRO_ZAJEMCE_PAGE: StaticPageContent = {
    eyebrow: "Informace",
    title: "Pro zájemce",
    description:
        "Rozcestník pro rodiny, které se s MŠ Tyršovka teprve seznamují. Najdete tu hlavní kroky od prvního zájmu až po nástup dítěte do školky.",
    quickLinks: [
        {
            href: "/zapisy",
            label: "Zápisy 2026/2027",
            description:
                "Termíny, předzápis, osobní zápis a kritéria přijímání do MŠ.",
        },
        {
            href: "/nove-prijati",
            label: "Nově přijatí",
            description:
                "Adaptace, co s sebou do MŠ a důležité první informace pro nástup.",
        },
        {
            href: "/rezim-dne-a-provozni-doba",
            label: "Režim dne",
            description:
                "Příchody, vyzvedávání, omluvenky a provozní doba školky.",
        },
    ],
    markdown: `
## Co si projít jako první

Pokud o MŠ Tyršovka teprve uvažujete, začněte stránkou se zápisy, termíny a podmínkami přijetí. Na ni navazují praktické informace pro nově přijaté děti a režim dne.

## Aktuálně zvýrazněné termíny

Na původním webu školy jsou pro zájemce viditelně komunikované zejména tyto události:

- **Zápisy do MŠ**
- **Den otevřených dveří - 19. 3. 2026**
- **Vítání jara - 31. 3. 2026**

## Jak si stránku nově členit

Nová struktura odděluje:

- **první orientaci pro nové rodiny** na této stránce
- **samotný zápis** na stránce \`/zapisy\`
- **nástup a adaptaci** na stránce \`/nove-prijati\`
- **každodenní provoz** na stránce \`/rezim-dne-a-provozni-doba\`

## Kontakt pro dotazy

- **ředitelka:** [reditelka@tyrsovka.cz](mailto:reditelka@tyrsovka.cz)
- **telefon:** +420 737 381 935
`.trim(),
};

export const NOVE_PRIJATI_PAGE: StaticPageContent = {
    eyebrow: "Informace",
    title: "Nově přijatí",
    description:
        "Praktické informace pro rodiče nově přijatých dětí: co připravit, jak zvládnout adaptaci a kde sledovat důležité novinky.",
    markdown: `
## Setkání pro rodiče nově přijatých dětí

Na původním webu škola uvádí setkání pro rodiče nově přijatých dětí před začátkem školního roku. Slouží k předání informací o adaptaci, zvyklostech školy, placení, docházce a dalším formalitám.

---
## Kde najdete průběžné informace

Nástupem do MŠ souhlasíte se školním řádem. Škola zároveň uvádí, že všechny potřebné informace, omluvenky, aktuální dění a fotogalerii najdete v aplikaci **Naše MŠ**. Přihlašovací údaje rodiče obdrží při nástupu od učitelek.

---
## Co je potřeba do MŠ

- přezůvky s plnou patou, dobře obouvatelné
- oblečení na ven podle aktuálního počasí
- náhradní oblečení: spodní prádlo, ponožky, trička, tepláky nebo legíny
- oblečení do deště: holínky, pláštěnka nebo softshellová bunda s impregnací

---
## Adaptace na nové prostředí

Vstup do mateřské školy je pro děti i rodiče velká změna. Škola doporučuje adaptaci neuspěchat, vyčlenit si na ni čas a předem s dětmi trénovat samostatnost. Pomáhá také pohodlné oblečení, pozitivní mluvení o školce a průběžný kontakt s učitelkami.

### Doporučený průběh adaptace

1. **1. den v MŠ** - společné prohlédnutí prostor, seznámení s učitelkami, odchod domů mezi 9:00 a 9:30.
2. **2. až 5. den v MŠ** - krátký samostatný pobyt dítěte bez rodičů, vyzvedávání po svačině kolem 9:30 až 10:00.
3. **2. týden v MŠ** - pokud dítě zvládá pobyt dobře, zůstává na dopoledne a odchází po obědě mezi 12:15 a 12:45.
4. **3. týden v MŠ** - dle dohody s učitelkami lze zkoušet celodenní pobyt s vyzvedáváním po odpolední svačině od 14:30.

Nejlepší je vždy individuální domluva s učitelkami podle potřeb dítěte.

---
## Vize MŠ

Škola se zaměřuje na zdravý životní styl, sportovní a pohybové aktivity, zdravé stravování, prevenci rizikového chování a rozvoj emoční i sociální inteligence. Proto škola na původním webu výslovně žádá, aby se při oslavách nenosily sladkosti a rodiče volili zdravější alternativy nebo drobné dárky.

---
## Materiální pomoc, která se hodí

- hygienické potřeby: papírové kapesníky, kuchyňské utěrky, tekuté mýdlo, vlhčené ubrousky, toaletní papír
- výtvarný materiál: papíry do tiskárny, lepidla, čtvrtky, silné trojhranné pastelky, fixy, barevné papíry a další tvořivý materiál
`.trim(),
};

export const REZIM_DNE_PAGE: StaticPageContent = {
    eyebrow: "Informace",
    title: "Režim dne a provozní doba",
    description:
        "Přehled otevírací doby, příchodů, vyzvedávání dětí a omlouvání docházky v novém přehlednějším formátu.",
    markdown: `
## Provozní doba

**MŠ je otevřena od 6:30 do 17:30 hodin.**

### Otevírací doba tříd pro příchod a vyzvedávání

- **6:30-7:00** - v provozu je Citrónová třída (2. pavilon, přízemí)
- **7:00-16:30** - v provozu jsou všechny pavilony
- **16:30-17:30** - provoz zajišťuje opět Citrónová třída (2. pavilon, přízemí)

---
## Příchod do školky

- od **6:30 do 7:00** funguje pouze Citrónová třída
- od **7:00** jsou otevřené všechny pavilony
- příchod do MŠ je nejpozději do **8:20**
- vchody i branky se zavírají v **8:30**

Škola doporučuje chodit raději dříve, aby mělo dítě čas se rozkoukat a pohrát si před začátkem programu.

---
## Vyzvedávání dětí

- po obědě: **12:15-12:45**
- odpoledne: od **14:30**

---
## Omluva docházky

Docházku je možné omlouvat přes aplikaci **Naše MŠ**, výjimečně pomocí třídního telefonu formou SMS. Omluva má být podle školy nahlášena **do 8:30 v den absence**, jinak je účtováno stravné.
`.trim(),
};

export const JIDELNICEK_PAGE: StaticPageContent = {
    eyebrow: "Informace",
    title: "Jídelníček",
    description:
        "Aktuální jídelní lístek převzatý z původního webu a zasazený do nového rozhraní. Pro rychlý přístup zůstává i přímý odkaz na originál.",
    markdown: `
## Aktuální jídelní lístek

Na původním webu školy je jídelníček zveřejněný jako obrázek. Tady zůstává zachovaný stejný obsah, ale v čistším a přehlednějším rozhraní.

![Aktuální jídelní lístek](https://files.site.site3.eu/03/f6/03f6cdea-3f9e-47fb-b705-89d491a38e44.jpg)

## Přímý odkaz

- [Otevřít originální obrázek jídelníčku](https://files.site.site3.eu/03/f6/03f6cdea-3f9e-47fb-b705-89d491a38e44.jpg)
- [Původní stránka Jídelníček](https://www.tyrsovka.cz/jidelnicek)
`.trim(),
};

export const PLAN_AKCI_PAGE: StaticPageContent = {
    eyebrow: "Informace",
    title: "Plán akcí",
    description:
        "Akce školy převedené z původního webu do nové struktury. Stránka je připravená tak, aby později šla snadno nahradit CMS obsahem.",
    markdown: `
## Plán akcí MŠ Tyršovka na rok 2025/26

Bližší informace škola uvádí ve třídách. Další akce mohou být průběžně doplňovány.

## 2. pololetí

| Kdy | Co | Kdo |
| --- | --- | --- |
| 2.-6.2. | Lyžařský výcvik na Šibeničním vrchu | Přihlášené děti |
| 10.2. | Masopustní veselice - dopoledne plné her a smíchu ve třídách | Všechny třídy |
| 13.2. | Není všechno zlato, co se třpytí - preventivní program | Hrušková, Jablková |
| 23.2. | Když ptáčka lapají, pěkně mu zpívají - preventivní program | Hrušková, Jablková |
| 27.2. | Polámal se mraveneček - program zaměřený na zdraví, hygienu a bezpečnost | Hrušková, Jablková |
| 2.-6.3. | Bruslící týden na HC Kobra | Přihlášené děti z Hruškové a Jablkové |
| 9.3. | Divadlo Bravo! - Hra o trůn | Hrušková, Jablková, Citrónová, Borůvková |
| 9.3. | Divadlo Na Cikorce - Myška Eliška | Meruňková, Jahodová |
| 12.3. | Projektový den - Zdravá strava | Všechny třídy |
| 17.3. | O Sněhurce - Divadlo Pruhované panenky | Všechny třídy |
| 25.3. | Knihadýlko - Jak si uděláme zeměkouli | Hrušková, Jablková, Citrónová, Borůvková |
| 25.3. | Knihadýlko - Dobrodružství pavouka Čendy | Jahodová, Meruňková |
| 25.3. | Jarní besídka - náhrada za vánoční představení | Meruňková |
| 30.3. | Bubnování - muzikoterapie | Mladší třídy |
| 31.3. | Bubnování - muzikoterapie | Starší třídy |
| 31.3. | Vítání jara - tvořivé dílny na zahradě | Všechny děti + rodiče a budoucí děti + rodiče |
| 7.4. | Planetárium - Hurvínkova vesmírná odysea | Hrušková, Jablková |
| 7.4. | Mobilní planetárium v DDM Na Cikorce | Citrónová, Borůvková, Meruňková, Jahodová |
| 9.4. | Gábina a Katka - Ztracené souhvězdí | Všechny třídy |
| 14.4. | Divadlo Dosvěta - Nej, nej ze/mě | Všechny třídy |
| 17.4. | Nemocnice pro medvídky | Mladší třídy |
| 20.4. | Nemocnice pro medvídky | Starší třídy |
| 27.4. | Včelí království - didaktický workshop | Jahodová, Meruňková |
| 30.4. | Čarodějnický rej - dopolední aktivity venku | Všechny třídy |
| 4.5. | Hrajeme si na louce - workshop od Lesy Praha | Borůvková, Citrónová |
| 5.5. | Luční kvítí - workshop od Lesy Praha | Jablková, Hrušková |
| 5.5. | Besídka ke Dni maminek | Meruňková |
| 5.5. | Tvoření s představením ke Dni maminek | Citrónová |
| 6.5. | Besídka ke Dni maminek | Jahodová |
| 6.5. | Tvoření s tatínky - výroba dárku pro maminky | Borůvková, Jablková, Hrušková |
| 21.5. | Přespávání předškoláků | Jablková, Hrušková |
| 29.5. | Klaun Ferda a jeho parťák - akce k MDD | Všechny třídy |
| 1.6. | Sportovní olympiáda MŠ Tyršovka | Všechny třídy |
| 3.6. | Sportovní den mateřských škol Prahy 12 | Vybrané děti |
| 11.6. | Zahradní slavnost a pasování předškoláků | Všechny třídy + rodiče |
| červen | Den dopravy u Viničního domku | Bude upřesněno |
| červen | Den zdraví u radnice MČ Praha 12 | Bude upřesněno |
`.trim(),
};

export const SVP_PAGE: StaticPageContent = {
    eyebrow: "O škole",
    title: "ŠVP",
    description:
        "Školní vzdělávací program je na původním webu zveřejněný jako PDF. V nové struktuře má vlastní stránku a jasný přístup z menu.",
    quickLinks: [
        {
            href: "/o-nas",
            label: "O škole",
            description:
                "Představení školy, zázemí, kontakty a provozní zaměstnanci.",
        },
        {
            href: "/tridy",
            label: "Třídy",
            description:
                "Přehled tříd, věkového rozdělení a základního zaměření jednotlivých skupin.",
        },
    ],
    markdown: `
## ŠVP k nahlédnutí

Původní web MŠ Tyršovka na této stránce zveřejňuje školní vzdělávací program jako samostatný PDF dokument.

- [Otevřít ŠVP (PDF)](http://files.site.site3.eu/4b/b0/4bb03022-3f21-4c9c-9d24-cdba6f56369b.pdf)

## Proč má stránka vlastní místo

V nové navigaci dává samostatná položka **ŠVP** větší smysl než schovat dokument jen do obecného seznamu odkazů. Rodiče i zájemci se k němu dostanou přímo z části **O škole**.
`.trim(),
};
