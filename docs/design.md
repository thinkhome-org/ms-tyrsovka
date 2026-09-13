# Design MŠ Tyršovka

Designový směr · 13. 9. 2026 · **jemné pastelové akcenty implementovány na žádost uživatele; schválení školou zatím nedoloženo**.

## Implementovaná varianta

Šest proměnných `--section-*` v globals.css odpovídá paletě níže. Neutrální pozadí je `#FAFAF8`. Konkrétní navigační odkazy mají tenkou pastelovou spodní linku, obsahové h1 krátkou linku pod nadpisem a aktivní album modrý podklad s tmavým textem. Sdílené obsahové stránky přijímají explicitní `section`; Jídelníček používá menu, ŠVP school, rodičovské stránky parents. Fotografie, hlavní CTA, layout a typografie zůstaly zachovány. Následující pravidla popisují i další možné použití, nikoli tvrzení, že je každý příklad realizován.

## Zadání a hlavní rozhodnutí

Školce se líbí minimalismus současného webu, ale chce vrátit barvy z původní navigace v pastelové podobě. Zachovat tedy strukturu, vzdušnost, typografii a fotografie; přidat jemnou barevnou orientaci. Nejde o nový layout ani návrat k velkým sytým dlaždicím.

Reference: uživatelem dodaný „Screenshot 2026-09-13 at 4.19.55 AM.png“. Zobrazuje žluté Aktuality, oranžové Informace pro rodiče, červené O škole, fialový Jídelníček, modrou Fotogalerii a zelené Kontakty. Screenshot je vizuální reference, nikoli specifikace chování. Níže uvedené HEX hodnoty jsou nově navržené pastely, ne přesně odebrané původní barvy ani školou schválená paleta.

**Výsledek má působit jako klidný, přívětivý web skutečné školky pro rodiče — nikoli dětská hra nebo administrativní dashboard.**

## Co zachovat

- Lora v nadpisech a Source Sans 3 v běžném textu; nepřidávat další font.
- Světlé neutrální pozadí, tmavý čitelný text, dostatek volného prostoru.
- Současnou hierarchii stránek, navigaci, fotografickou mřížku a responzivní rozvržení.
- Skutečné fotografie školy jako hlavní zdroj života a barev; bez pastelových filtrů přes fotografie.
- Střídmé rámečky, zaoblení a stíny. Neobalovat každý odstavec novou kartou.

## Paleta a význam

Pastely jsou **podklad**, ne barva drobného textu. Text a funkční ikony na všech šesti podkladech: `#20242B`.

| Oblast | Barevná rodina reference | Navržený podklad | Název budoucího tokenu | Použití |
| --- | --- | --- | --- | --- |
| Aktuality | Žlutá | `#FFF2B8` | `--section-news` | Štítek novinky, drobný akcent záhlaví |
| Informace pro rodiče | Oranžová | `#FFE0CC` | `--section-parents` | Rodičovské informace a přijímání |
| O škole | Červená → růžová | `#F8D6DC` | `--section-school` | O nás, ŠVP, doprovodné prvky tříd |
| Jídelníček | Fialová | `#E8DCF2` | `--section-menu` | Hlavička jídelníčku, jeho odkaz v menu |
| Fotogalerie | Modrá | `#D8EBFA` | `--section-gallery` | Aktivní filtr alba, záhlaví galerie |
| Kontakty | Zelená | `#DCEEDD` | `--section-contact` | Kontaktní úvod nebo zvýraznění kontaktu |

Navržené společné neutrály: pozadí `#FAFAF8`, karta `#FFFFFF`, hlavní text `#20242B`, vedlejší text `#59616D`, jemný dekorativní rámeček `#DFE2E5`. Rámeček není sám dostatečné označení ovladače. Současný `--primary` zatím zachovat pro jednotné hlavní akce a odkazy; šest sekčních barev ho nenahrazuje.

### Dávkování

- Většina plochy zůstává neutrální. Na jedné obsahové sekci používat jednu barevnou rodinu.
- Barvu použít na štítek, malé pozadí ikony, aktivní položku nebo jeden úvodní panel. Nekombinovat všechny tyto akcenty automaticky.
- Šest barev může být společně v přehledu kategorií, nikoli jako šest obřích bloků přes celou hlavičku.
- Dlouhé texty, tabulky a dokumentové seznamy zůstávají na bílém nebo neutrálním podkladu.
- Barva označuje téma, nikoli důležitost. Růžová „O škole“ není chyba; žluté „Aktuality“ nejsou varování. Chybové a úspěchové stavy mají vlastní sémantiku.

## Navigace: barvy nesmějí měnit informační strukturu

Aktuální menu není shodné se screenshotem. „Život ve školce“ sdružuje Aktuality i Galerii; „Informace“ obsahují mimo jiné Jídelníček. Zachovat toto seskupení, dokud neexistuje samostatný důvod ho změnit.

- Smíšené skupiny „Život ve školce“ a „Informace“ ponechat neutrální; barevný akcent dát až konkrétním pododkazům.
- „O škole“ může dostat růžový akcent, „Kontakty“ zelený a „Pro zájemce“ oranžový.
- Externí „Správa MŠ“ zůstává neutrální nástrojový odkaz. Nepřidělovat jí uměle sedmou barvu.
- Na desktopu drobný podklad nebo značka u položky, na mobilu stejný význam u řádku. Nepřebírat rozměry dlaždic ze screenshotu.
- Aktivní stránka musí být rozpoznatelná také jinak než barvou: textovým stylem či podtržením a `aria-current="page"` na příslušném odkazu.

## Pravidla pro komponenty

| Prvek | Cílové zacházení |
| --- | --- |
| Hero | Zachovat kompozici a fotografie. Nanejvýš jeden pastelový akcent; žádný duhový podklad ani další dekorativní ilustrace. |
| Hlavní CTA | Jednotný kontrastní styl. Pastelové téma stránky nesmí změnit každé tlačítko na jinou hlavní akci. |
| Vedlejší CTA | Současný outline/ghost styl; pastel lze použít na hover nebo vybraný stav, ne jako jedinou indikaci interaktivity. |
| Aktuality | Žlutý štítek nebo jemný akcent u data; ne celá řada žlutých karet. |
| Obsahové stránky | Barevný eyebrow či úvodní panel; textové karty neutrální. Zápisy a Pro zájemce patří do oranžové rodiny. |
| Galerie | Modře označený aktivní filtr s tmavým textem a programovým stavem. Fotografie bez barevného tónování. |
| Kontakty | Zelený úvodní akcent; telefonní a e-mailové odkazy zůstávají snadno rozpoznatelné. |
| Třídy | Zachovat vlastní obrázky a názvy tříd. Sekční růžová nesmí přebarvit ovoce ani nahradit identitu jednotlivých tříd. |
| Patička | Zachovat současnou samostatnou neutrální/tmavou kompozici; bez opakování celé duhové palety. |

## Typografie, prostor a pohyb

Vycházet ze současných `page-shell`, `section-shell`, `section-title`, `section-copy` a `content-card`. Základní radius je nyní `0.875rem`; nerozšiřovat systém o náhodná další zaoblení. Zachovat existující velikostní hierarchii, neroztahovat dlouhé odstavce na plnou šířku obrazovky; pro souvislé čtení cílit přibližně na 60–75 znaků na řádek.

Krátké názvy a věcná čeština: „Jídelníček“, „Termín zápisu“, „Kontaktovat školku“. Běžné nadpisy nepsat všechny verzálkami podle screenshotu. Minimalismus znamená jasnou hierarchii, ne schované informace nebo drobný text.

Nepřidávat nové animace kvůli změně barev. Hover nemění rozměry prvku. Pro omezený pohyb respektovat `prefers-reduced-motion`, včetně existujících fotografických přechodů a smooth scrollu.

## Čitelnost a přístupnost — podmínky implementace

- Pro běžný text požadovat kontrast alespoň 4,5 : 1; pro velký text a významné netextové ovládací prvky alespoň 3 : 1 vůči relevantnímu okolí.
- Na pastel nedávat bílé popisky ani bílé šipky ze screenshotu. Použít tmavý text a ikony.
- Kontrast zkontrolovat i pro hover, focus, aktivní a disabled stav; průhlednost mění výslednou barvu.
- Focus musí zůstat jasný na neutrálním i pastelovém podkladu. Dekorativní pastelová linka focus nenahrazuje.
- Kategorie mají vždy textový název. Vybraný filtr musí mít také programově dostupný stav.
- Pro dotykové ovladače cílit na alespoň 44 × 44 CSS px. Zkontrolovat 320px šířku, dlouhé české popisky a 200% zoom bez ztráty obsahu.
- Existující nedostatky dialogů a menu jsou v [UI.md](UI.md#přístupnost-a-hranice-ověření). Barevná úprava je neřeší a nesmí je prohloubit.

Tyto body jsou akceptační cíle návrhu, ne tvrzení o provedeném auditu nebo celkové shodě webu s normou. Světlá paleta také není automaticky paletou pro dark mode; současná existence `.dark` tokenů neznamená ověřený tmavý režim.

## Kam změny později patří

- [app/globals.css](../app/globals.css): společné tokeny a jejich napojení do Tailwind `@theme inline`. Sekční barvy přidat zde, nekopírovat HEX po jednotlivých stránkách.
- [app/layout.tsx](../app/layout.tsx): existující fonty ponechat.
- [app/components/nav.tsx](../app/components/nav.tsx): barevná identita desktopových a mobilních odkazů; neměnit cíle a seskupení.
- [components/ui/button.tsx](../components/ui/button.tsx) a [lib/button-link-classes.ts](../lib/button-link-classes.ts): zachovat shodu klientských i serverových tlačítek. Vlastní CTA styly má také [proc-my.tsx](../app/components/proc-my.tsx).
- [static-content-page.tsx](../app/components/static-content-page.tsx): sdílený vzhled sedmi obsahových stránek; případné téma předat explicitně, ne odhadovat z textu titulku. [Zápisy](../app/zapisy/page.tsx) mají samostatný renderer.
- [Hero](../app/components/hero.tsx), [Aktuality](../app/components/aktuality.tsx), [Galerie](../app/galerie/page.tsx) a [Kontakty](../app/kontakty/page.tsx): lokální aplikace pravidel výše.

Nepřidávat knihovnu, theme engine, nový komponentový framework ani konfigurátor palet. Existující CSS proměnné a komponenty tento rozsah pokryjí.

## Doporučený postup a schválení

1. Ukázat škole současnou kompozici homepage s jemnými akcenty a jednu vnitřní stránku, například Jídelníček; desktop i mobil.
2. Potvrdit intenzitu pastelů a jejich přiřazení. Tento dokument obsahuje konkrétní výchozí návrh, nikoli toto potvrzení.
3. Aplikovat schválené tokeny a pravidla konzistentně na všechny stránky bez přestavby layoutu.
4. Ověřit kontrast skutečně vykreslených stavů, klávesnici, dotykové ovládání, zoom a dlouhé texty. Zkontrolovat homepage, dropdowny, mobilní menu, obsahovou stránku, Zápisy, galerii a Kontakty; následně zbývající routy.
5. Spustit projektový lint a build; aktualizovat [UI.md](UI.md) a [Graphify](GRAPH.md) tak, aby rozlišovaly návrh od implementace.

Hotovo znamená: původní minimalistický charakter je zachovaný, všech šest barevných rodin má konzistentní význam, informace zůstávají čitelné bez barev a škola odsouhlasila ukázku. Samotná změna tokenů není dokončený vizuální test.

## Rozsah tohoto dokumentu

Podkladem jsou dodaný screenshot, CSS a komponenty a [mapa UI](UI.md). Pastelová implementace neřeší obsahové placeholdery, redesign navigace ani schválení školou. Graphify se obnovuje společně se zdroji.
