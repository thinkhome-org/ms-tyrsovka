import type { StaticPageContent } from "@/app/components/static-content-page";

export const PRO_ZAJEMCE_PAGE: StaticPageContent = {
    eyebrow: "Informace",
    title: "Pro zájemce",
    description: "Rozcestník pro rodiny, které se s MŠ Tyršovka teprve seznamují. Najdete tu hlavní kroky od prvního zájmu až po nástup dítěte do školky.",
    quickLinks: [
        {
            href: "/zapisy",
            label: "Zápisy 2026/2027",
            description: "Termíny, předzápis, osobní zápis a kritéria přijímání do MŠ.",
        },
        {
            href: "/nove-prijati",
            label: "Nově přijatí",
            description: "Adaptace, co s sebou do MŠ a důležité první informace pro nástup.",
        },
        {
            href: "/rezim-dne-a-provozni-doba",
            label: "Režim dne",
            description: "Příchody, vyzvedávání, omluvenky a provozní doba školky.",
        },
    ],
    buttonLinks: [{ label: "Kontakty", href: "/kontakty" }],
    markdown: `
## Co si projít jako první

Pokud o MŠ Tyršovka teprve uvažujete, začněte stránkou se zápisy – najdete tam termíny, podmínky přijetí a postup podání přihlášky. Na ni navazují praktické informace pro nově přijaté děti a přehled každodenního režimu školky.

## Nejbližší termíny

- **Zápisy do MŠ pro školní rok 2026/2027**
- **Den otevřených dveří – 19. 3. 2026**
- **Vítání jara – 31. 3. 2026**
`.trim(),
};

export const NOVE_PRIJATI_PAGE: StaticPageContent = {
    eyebrow: "Informace",
    title: "Nově přijatí",
    description: "Vše, co potřebujete vědět před nástupem dítěte do MŠ Tyršovka – co si připravit, jak probíhá adaptace a kde najdete průběžné informace.",
    markdown: `
## Setkání pro rodiče nově přijatých dětí

V pondělí **23. 6. 2025** v **16:30** se uskuteční schůzka pro rodiče nově přijatých dětí **ve sborovně – 3. pavilon, suterén**. Setkání je pouze pro rodiče (případně vámi pověřenou osobu) – místnost není uzpůsobena pro volný pohyb dětí. Předáme vám důležité informace o adaptaci, zvyklostech v naší škole, placení, docházce a dalších formalitách a rádi odpovíme na vaše dotazy. Předpokládaný konec v 17:30. Těšíme se na vás.

---
## Důležité informace

Nástupem do naší mateřské školy souhlasíte se **školním řádem**, který je k dispozici v šatnách dětí i na těchto stránkách.

**Všechny potřebné informace, omluvenky, aktuální dění a fotogalerie najdete v aplikaci Naše MŠ.** Přihlašovací údaje obdržíte při nástupu od učitelek.

---
## Co je potřeba do MŠ

- **přezůvky** – obuv s plnou patou, pro děti dobře obouvatelné (ne Crocsy, ne plyšové)
- **oblečení na ven** – přiměřené aktuálnímu počasí
- **náhradní oblečení** – spodní prádlo, ponožky, trička, tepláky nebo legíny (průběžně doplňujte zásoby)
- **oblečení do deště** – holínky, pláštěnka nebo softshellová bunda s impregnací (chodíme ven za každého počasí)

---
## Adaptace na nové prostředí

Vstup do MŠ je pro děti i rodiče velkou životní změnou. Doporučujeme adaptaci neuspěchat a vyčlenit si na ni dostatek času. Trénujte s dětmi samostatnost, volte pohodlné oblečení, mluvte o školce pozitivně a motivujte děti na nové kamarády a zážitky. Pomoci může i některá z knih s tematikou nástupu do školky (např. Flandil ve školce).

### Doporučený průběh adaptace

1. **1. den v MŠ** – společné prohlédnutí prostor, seznámení s učitelkami, odchod domů v 9:00–9:30.
2. **2.–5. den v MŠ** – krátký samostatný pobyt bez rodičů, vyzvedávání po svačině (cca 9:30–10:00).
3. **2. týden v MŠ** – pokud dítě zvládá pobyt dobře, zůstává na dopoledne, odchod po obědě (12:15–12:45).
4. **3. týden v MŠ** – dle dohody s učitelkami lze zkoušet celodenní pobyt, vyzvedávání po odpolední svačině od 14:30.

Vždy je nejlepší individuální domluva s učitelkami podle potřeb vašeho dítěte. Buďte s učitelkami v každodenním kontaktu a nebojte se ptát. Při jakýchkoli změnách (zdravotní stav, změna kontaktů, osoby oprávněné k vyzvedávání) je prosím informujte.

---
## Zaměření a vize MŠ

Jsme mateřská škola zaměřená na výchovu a vzdělávání ke zdravému životnímu stylu. Klademe důraz na sportovní a pohybové aktivity, zdravé stravování, prevenci rizikového chování a rozvoj emoční, sociální inteligence a psychické odolnosti.

**Proto říkáme NE sladkostem při oslavách.** Prosíme o zdravější alternativu nebo drobné dárky (samolepky, kartičky…) pro děti.

---
## Uvítáme každou materiální pomoc

- **Hygienické potřeby** – papírové kapesníky v krabičce, kuchyňské utěrky, tekuté mýdlo, vlhčené ubrousky, toaletní papír
- **Výtvarný materiál** – papíry do tiskárny, lepidla v tyčince, čtvrtky, silné trojhranné pastelky, silné fixy, barevné papíry, zdobící materiál (nejlépe po dohodě s třídními učitelkami)

Těšíme se na vzájemnou spolupráci.
`.trim(),
};

export const REZIM_DNE_PAGE: StaticPageContent = {
    eyebrow: "Informace",
    title: "Režim dne a provozní doba",
    description: "Přehled otevírací doby, příchodů, vyzvedávání dětí a omlouvání docházky.",
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
    description: "Aktuální jídelní lístek.",
    markdown: `
## Aktuální jídelní lístek

![Aktuální jídelní lístek](https://files.site.site3.eu/03/f6/03f6cdea-3f9e-47fb-b705-89d491a38e44.jpg)
`.trim(),
};

export const PLAN_AKCI_PAGE: StaticPageContent = {
    eyebrow: "Informace",
    title: "Plán akcí",
    description: "Akce školy.",
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
    description: "Školní vzdělávací program.",
    buttonLinks: [
        {
            label: "Otevřít ŠVP (PDF)",
            href: "http://files.site.site3.eu/4b/b0/4bb03022-3f21-4c9c-9d24-cdba6f56369b.pdf",
        },
    ],
    markdown: `
`.trim(),
};

export const PROJEKTY_A_VYZVY_PAGE: StaticPageContent = {
    eyebrow: "O škole",
    title: "Projekty a výzvy",
    description: "Přehled projektů, do kterých se MŠ Tyršovka zapojuje.",
    markdown: `
## Aktuálně realizovaný projekt

Od **1. 1. 2025** realizuje škola tento projekt:

![Projekt školy](https://files.site.site3.eu/b6/e1/b6e100e8-9465-480a-ad4c-72b0306595f9.png)

![Vizualizace projektu](https://files.site.site3.eu/0f/15/0f154f96-38f2-47e6-b33c-909784a30c33.webp)

---
## Se Sokolem do života

Každoročně se škola zapojuje do projektu **Se Sokolem do života**, který vede děti k pohybu a podporuje jejich vztah ke zdravému životnímu stylu.

![Se Sokolem do života](https://files.site.site3.eu/f5/8d/f58d7736-3e1a-43a8-ab67-517150cd9b81.jpg)

---
## Recyklohraní

MŠ Tyršovka je zapojena také do projektu **Recyklohraní**, v rámci kterého děti i škola plní různé úkoly a sbírají například baterie, tonery nebo drobná elektrozařízení.
`.trim(),
};

