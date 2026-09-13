# Obsah MŠ Tyršovka: mapa pro vývoj

Ověřeno ze zdrojových souborů 13. 9. 2026. Tato mapa popisuje uložený obsah, ne aktuální správnost školních údajů ani dostupnost externích URL. Routy a vykreslování doplňuje [UI.md](UI.md), konfiguraci [DEVELOPING.md](DEVELOPING.md).

## Kde upravovat obsah

| Oblast | Zdroj a řádek | Datový kontrakt / obsah |
| --- | --- | --- |
| Text názvu a navigace Zápisů | [lib/site-content.ts:6](../lib/site-content.ts#L6) | `SITE_PAGES.zapisy.title`, `navLabel`; komentář výslovně určuje společný zdroj pro stránku a navigaci. |
| Informační stránky | [lib/static-page-content.ts:3](../lib/static-page-content.ts#L3) | Sedm konstant typu `StaticPageContent`: `eyebrow`, `title`, `description`, `markdown`; volitelné `quickLinks` (`href,label,description`) a `buttonLinks` (`label,href`). |
| Zápisy | [app/zapisy/content.ts:7](../app/zapisy/content.ts#L7) | `ZAPISY_HEADER_IMAGES`: pole `src,alt`, nyní prázdné. `ZAPISY_MARKDOWN` od ř. 13: celý text zápisu. |
| Aktuality | [app/data/aktuality.json:1](../app/data/aktuality.json#L1) | 5 záznamů `title,slug,publishedAt,image`; data jsou ISO datumové řetězce, obrázky lokální URL. Obsah článku zde není. |
| Galerie | [app/galerie/content.ts:1](../app/galerie/content.ts#L1) | `GalleryPhoto {src,alt}`, `GalleryAlbum {slug,title,photos}`, pole `GALLERY_ALBUMS` od ř. 14. |
| Kontakty | [app/kontakty/content.ts:15](../app/kontakty/content.ts#L15) | `KONTAKTY_CONTENT`: nadpisy, úvod, quickLinks, school, managementContacts, urgentClassPhone, classroomContacts. |
| Spolupráce | [app/spoluprace/content.ts:10](../app/spoluprace/content.ts#L10) | Nadpisy a `items`; položka `title,category,description,logo` (`SpolupraceItem`, ř. 3). |
| Úřední deska | [app/uredni-deska/content.ts:19](../app/uredni-deska/content.ts#L19) | `UREDNI_DESKA_SECTIONS`: `title,description,items,note?`; položka `label,href,kind`. |

## Informační stránky a sekce

| Konstanta / začátek | Sekce a vazby |
| --- | --- |
| `PRO_ZAJEMCE_PAGE`, ř. 3 | Rozcestník na /zapisy, /nove-prijati, /rezim-dne-a-provozni-doba, tlačítko /kontakty (ř. 7–24). Markdown: co si projít, nejbližší termíny, školní rok 2026/2027, 19. a 31. březen 2026 (ř. 25–35). |
| `NOVE_PRIJATI_PAGE`, ř. 38 | Schůzka rodičů 23. 6. 2025 (ř. 43), školní řád a Naše MŠ (48), výbava (55), adaptace a čtyřkrokový průběh (63), zdravý životní styl a odmítnutí sladkostí (77), materiální pomoc (84). |
| `REZIM_DNE_PAGE`, ř. 93 | Provoz 6:30–17:30 (98), ranní/odpolední Citrónová třída, příchod do 8:20 a zavření branek v 8:30 (109), vyzvedávání 12:15–12:45 / od 14:30 (119), omluva přes Naše MŠ do 8:30, výjimečně SMS (125). |
| `JIDELNICEK_PAGE`, ř. 131 | Pouze externí obrázek aktuálního jídelního lístku (138), bez strukturovaného jídelníčku nebo data platnosti. |
| `PLAN_AKCI_PAGE`, ř. 142 | Školní rok 2025/26, druhé pololetí, Markdown tabulka `Kdy / Co / Kdo` (153): 37 řádků akcí únor–červen včetně dvou červnových položek bez přesného dne (190–191). Sport, divadlo, prevence, zdraví, workshopy, besídky a rodičovské akce. |
| `SVP_PAGE`, ř. 195 | Jedno tlačítko na vzdálený PDF ŠVP (202); Markdown je prázdný. |
| `PROJEKTY_A_VYZVY_PAGE`, ř. 209 | Projekt od 1. 1. 2025 reprezentovaný dvěma obrázky (214–220), Se Sokolem do života + obrázek (223–227), Recyklohraní (230–232). Text neuvádí název prvního projektu; nelze jej určit bez čtení obrázků. |

Všechny řádky v této tabulce odkazují na [lib/static-page-content.ts](../lib/static-page-content.ts). Změny ročníků a termínů je nutné promítnout do Zápisů, rozcestníku a případně úřední desky; nejsou odvozené ze společného kalendáře.

## Zápisy

[app/zapisy/content.ts:13](../app/zapisy/content.ts#L13) obsahuje předzápis 15. 3.–13. 4. 2026 (18), den otevřených dveří 19. 3. 2026 a Vítání jara 31. 3. 2026 (26), osobní zápis 14.–15. 4. 2026 (41), seznam dokladů (47), čtyři kroky zápisu (57), kritéria spádovosti a věku (64), výsledky koncem dubna a schůzku v červnu (69), dva kontaktní e-maily (75), dva názvy dokumentů (80). Dokumenty na ř. 82–83 jsou pouze text, nejsou odkazy. Výzva k online rezervaci na ř. 30 nemá rezervační URL. Jediný registrační odkaz je elektronickypredzapis.cz na ř. 22.

## Galerie: všechna alba

| Slug (uchovat přesně) | Titulek | Fotografií | Zdrojové řádky |
| --- | --- | ---: | --- |
| tridy | Třídy | 25 | 15–45 |
| zahrada | Zahrada | 13 | 46–64 |
| prostory | Vnitřní prostory | 5 | 65–75 |
| kuchyne | Z naší kuchyně | 8 | 76–89 |
| akce | Akce | 99 | 90–194 |
| vyroci | 40 let MŠ + Jablkobraní | 18 | 195–218 |
| lyzovani | Lyžování 2025 | 16 | 219–240 |
| jablkobraní | Jablkobraní 2025 | 26 | 241–272 |

Celkem 210 fotografií; zdroj [app/galerie/content.ts](../app/galerie/content.ts). Poslední slug obsahuje diakritiku, URL proto nesmí být svévolně normalizována. Všechny fotografie používají základ `F = https://files.site.site3.eu` (ř. 12); URL mají i velká `.JPG`, uchovávat velikost znaků.

Album Třídy rozlišuje šest tříd. Album Akce zachycuje mimo jiné ZŠ Wolfram (96), KC Cílkova (99), nové hřiště (101), zážitkové učení (105), Bezpečný pes (114), Vítání jara 2025 (120), zdravé stravování (128), projektové dny ovoce (132), masopust (136), soutěž obrázků (141), interaktivní tabuli (145), ZUŠ Voborského (149), bruslení (153), Českou televizi (154), sokolníka (155), kynologii (180), plavání (184) a Batůžkový den (188). Jde o popisky ze zdroje, nikoli o vizuální ověření fotografií.

## Kontaktní model a třídy

[app/kontakty/content.ts:41](../app/kontakty/content.ts#L41): objekt `school` má `name,founder,address[],email,phone,ico,databox,bankAccount`. Vedení (52) má role, jméno a volitelný e-mail/telefon (`ContactPerson`, 1); všechny tři osoby nemají kompletní kontaktní pole. Samostatný provozní kontakt Citrónové má `title,description,phone` (68). Třídní záznam má `title,teachers[],location,note?` (`ClassroomContact`, 8), nikoli vlastní telefon.

| Třída | Umístění | Zdroj |
| --- | --- | --- |
| Jahodová | 3. pavilon, přízemí | ř. 75 |
| Meruňková | 1. pavilon, přízemí | ř. 80 |
| Borůvková | 1. pavilon, patro | ř. 85 |
| Citrónová | 2. pavilon, přízemí; ranní/odpolední kontakt školy | ř. 90 |
| Jablková | 2. pavilon, patro | ř. 100 |
| Hrušková | 3. pavilon, patro | ř. 105 |

Jména učitelů jsou přímo v těchto záznamech. Naše MŠ se opakuje v kontaktním úvodu (22), režimu a informacích pro nové děti; nejedná se zde o API integraci.

## Partneři a dokumenty

[app/spoluprace/content.ts:15](../app/spoluprace/content.ts#L15) uvádí šest partnerů: DDM Modřany (16), ZUŠ Adolfa Voborského (23), KC Cílkova (30), ZŠ TGM (37), ZŠ Mráčkovka (44), ZŠ Wolfram (51). Každý má logo ze site3, ale žádné pole pro webový odkaz. Kategorie pokrývají volnočasové centrum, uměleckou školu, komunitní centrum a základní školy.

[app/uredni-deska/content.ts:19](../app/uredni-deska/content.ts#L19) má tři sekce, celkem 11 položek: Zprávy (3: výroční PDF 2024/25, přehled výročních zpráv, ČŠI), Dokumenty ke stažení (7: žádost, kritéria 2025/26, evidenční list/lékař, odhláška, pověření, souhlas s osobními údaji, sazebník), Školní řád (1). Sedm dokumentů vede na stejnou obecnou stránku původního webu (49–79), nikoli na konkrétní soubory. ČŠI má označení „Připravit další položky“ (38). Poznámka k potvrzení nákladů je na ř. 83.

## Externí závislosti obsahu

| Poskytovatel | Použití / důkaz | Co ověřit při změně |
| --- | --- | --- |
| files.site.site3.eu | Galerie ř. 12; spolupráce ř. 1; static-page-content ř. 138, 202, 218, 220, 227; úřední deska ř. 27 | Dostupnost obrázků/PDF a povolení vzdálených obrázků ve vykreslování. Dva PDF odkazy jsou HTTP, ne HTTPS. |
| www.tyrsovka.cz | Kontakty ř. 34,38; úřední deska ř. 32–92 | Odkazy na původní stránky se mohou po změně domény stát vlastními neexistujícími cestami. |
| elektronickypredzapis.cz | Zápisy ř. 22 | Externí registrace, nikoli formulář tohoto repozitáře. |
| Naše MŠ | Kontakty ř. 22, static-page-content ř. 52,127 | Pouze zmíněná aplikace pro docházku, zprávy a soukromou galerii; v těchto datech není URL ani přihlašování. |
| mailto / tel | Kontakty ř. 26,30 | Přímá akce e-mailového / telefonního klienta. |

## Známé obsahové nedodělky

Ke dni 13. 9. 2026 jsou všechny uvedené konkrétní termíny zápisu na jaře 2026 a schůzka v červnu 2025 minulostí. Plán je stále pro 2025/26, kritéria na úřední desce pro 2025/26, zápisy pro 2026/27. To je časový nesoulad uloženého obsahu, nikoli potvrzení, že škola vyhlásila jiné termíny.

Aktuality mají titulky „Test“, „Edit this with CMS“, „Should be replaced with CMS“ ([app/data/aktuality.json:3](../app/data/aktuality.json#L3)). Komentáře u Zápisů (1–4) a úřední desky (1–4) zmiňují budoucí CMS; samy nepředstavují hotovou integraci. Jídelníček nemá textovou alternativu obsahu ani datum platnosti. Partnerské fráze „v letošním roce“ nemají rok.

## Vývojové dokumenty a instalace

[README.md](../README.md) je vstupní rozcestník vývojové dokumentace.

[pnpm-workspace.yaml:1](../pnpm-workspace.yaml#L1) povoluje build skripty balíčkům msw, sharp a unrs-resolver. `minimumReleaseAgeExclude` (5–17) obsahuje 12 přesných výjimek pro Next 16.3.5: next, eslint-config-next, @next/env, @next/eslint-plugin-next a osm platformních SWC balíčků. Tento seznam upravovat společně s verzí Next; není zde deklarovaný balíčkový monorepo seznam `packages`. Soubor popisuje konfiguraci pnpm, ne obsah pro rodiče.
