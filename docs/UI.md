# Uživatelské rozhraní a mapa stránek MŠ Tyršovka

Stav podle úplného čtení zdrojů 13. 9. 2026. Jde o dokumentaci implementace, nikoli potvrzení obsahu školy nebo audit vykresleného webu. Odkazy míří na soubory relativně k této dokumentaci; čísla řádků jsou výchozí body pro dohledání.

## Společná kostra

[RootLayout](../app/layout.tsx), ř. 42–58, obaluje všechny stránky: český dokument `lang="cs"`, sticky navigace, obsah stránky a patička. Serverový layout načítá Lora pro nadpisy a Source Sans 3 pro běžný text přes `next/font/google` (ř. 8–16). Tělo je flex sloupec s minimální výškou obrazovky. Každá stránka má vlastní `main`; layout nepřidává druhý. Metadata zahrnují šablonu titulku, favicon `/logo.png`, Open Graph a Twitter (ř. 18–40). Galerie má vlastní serverový layout pro metadata, protože její stránka je klientská.

Serverové komponenty tvoří všechny stránky kromě galerie. Klientské hranice jsou `Nav`, `Hero`, `GaleriePage`, modul tlačítek a nepoužívaný `LogoLoop`. Klientská komponenta neznamená absenci počátečního serverového HTML; konkrétně Hero však fotografie vloží až po mountu. V UI není implementace přihlášení, CMS editoru, databázového formuláře ani odesílání kontaktního formuláře; Správa MŠ je odkaz na externí službu.

## Všechny routy

| URL | Zdroj a vstupní řádek | Složení a obsah | Vazby / režim |
| --- | --- | --- | --- |
| `/` | [app/page.tsx](../app/page.tsx), 42 | Hero → Proč my → Aktuality → Jak se k nám dostanete / Zápisy; Organization JSON-LD | Server s klientským Hero; kontakt pro JSON-LD je zde natvrdo |
| `/aktuality` | [app/aktuality/page.tsx](../app/aktuality/page.tsx), 33 | Všechny novinky sestupně podle ISO data; obrázek, datum, titulek; karty detailů | `app/data/aktuality.json`; server; zpět `/` |
| `/aktuality/[slug]` | [app/aktuality/[slug]/page.tsx](../app/aktuality/[slug]/page.tsx), 28, 49 | Statické parametry ze slugů, metadata článku, NewsArticle JSON-LD, obrázek a datum | Stejný JSON; `notFound()` pro nenalezený slug; text článku je ukázkový; zpět `/aktuality` |
| `/galerie` | [app/galerie/page.tsx](../app/galerie/page.tsx), 116 | Přepínače alb s počty, masonry fotografie, lightbox | Klient; `GALLERY_ALBUMS` v `app/galerie/content.ts`; metadata [layout](../app/galerie/layout.tsx), 3; zpět `/` |
| `/jidelnicek` | [app/jidelnicek/page.tsx](../app/jidelnicek/page.tsx), 11 | `StaticContentPage` | `JIDELNICEK_PAGE` z `lib/static-page-content.ts`; server |
| `/nove-prijati` | [app/nove-prijati/page.tsx](../app/nove-prijati/page.tsx), 11 | `StaticContentPage` | `NOVE_PRIJATI_PAGE`; server |
| `/plan-akci` | [app/plan-akci/page.tsx](../app/plan-akci/page.tsx), 11 | `StaticContentPage` | `PLAN_AKCI_PAGE`; server |
| `/pro-zajemce` | [app/pro-zajemce/page.tsx](../app/pro-zajemce/page.tsx), 11 | `StaticContentPage` | `PRO_ZAJEMCE_PAGE`; server |
| `/projekty-a-vyzvy` | [app/projekty-a-vyzvy/page.tsx](../app/projekty-a-vyzvy/page.tsx), 11 | `StaticContentPage` | `PROJEKTY_A_VYZVY_PAGE`; server |
| `/rezim-dne-a-provozni-doba` | [app/rezim-dne-a-provozni-doba/page.tsx](../app/rezim-dne-a-provozni-doba/page.tsx), 11 | `StaticContentPage` | `REZIM_DNE_PAGE`; server |
| `/svp` | [app/svp/page.tsx](../app/svp/page.tsx), 11 | `StaticContentPage`, podporuje tlačítka dokumentů | `SVP_PAGE`; server |
| `/kontakty` | [app/kontakty/page.tsx](../app/kontakty/page.tsx), 54 | Úvod, urgentní telefon, hlavní údaje, vedení a kontakty tříd | `KONTAKTY_CONTENT` ze sousedního `content.ts`; server; zpět `/` |
| `/o-nas` | [app/o-nas/page.tsx](../app/o-nas/page.tsx), 50 | Popis areálu a provozu, tři pilíře školy, odkaz na třídy, provozní zaměstnanci | Pole `SCHOOL_PILLARS` a `OPERATIONS_STAFF` přímo ve stránce, ř. 16 a 31; server |
| `/tridy` | [app/tridy/page.tsx](../app/tridy/page.tsx), 83 | Šest tříd: Jahodová a Meruňková 2,5–4; Borůvková a Citrónová 3–5; Jablková 4–6; Hrušková 5–7 let | Lokální `CLASSROOMS` ř. 14; obrázky `/tridy/*.png`; e-mail/telefon jako prostý text; zpět `/o-nas` |
| `/spoluprace` | [app/spoluprace/page.tsx](../app/spoluprace/page.tsx), 13 | Číslovaný seznam partnerů, logo, kategorie, popis | `SPOLUPRACE_CONTENT` ze sousedního `content.ts`; partner není v rendereru odkaz; server |
| `/uredni-deska` | [app/uredni-deska/page.tsx](../app/uredni-deska/page.tsx), 15 | Sekce dokumentů s druhem souboru a poznámkou | `UREDNI_DESKA_SECTIONS` ze sousedního `content.ts`; odkazy do nové karty; server |
| `/zapisy` | [app/zapisy/page.tsx](../app/zapisy/page.tsx), 94 | Nadpis, volitelné hlavičkové obrázky, markdown karty | Titulek `SITE_PAGES.zapisy`; tělo `ZAPISY_MARKDOWN`, obrázky `ZAPISY_HEADER_IMAGES`; vlastní renderer; server |

Sedm tenkých statických stránek odvozuje titulek i popis metadat ze stejné obsahové konstanty jako viditelný obsah (vždy ř. 5–12). Změna `StaticContentPage` proto zasáhne všech sedm rout. `/zapisy` má podobné, ale oddělené vykreslování a vyžaduje samostatnou kontrolu.

## Navigace a uživatelské cesty

[nav.tsx](../app/components/nav.tsx), ř. 14–44, je skutečný zdroj menu. Život ve školce otevírá Aktuality a Galerii. Informace obsahují Jídelníček, Nově přijatí, Režim dne a provozní dobu, Plán akcí. O škole obsahuje O nás, Třídy a ŠVP. Samostatné CTA vedou na Pro zájemce, `https://nasems.cz/` a Kontakty. `/zapisy` vede z homepage a obsahových stránek, nikoli přímo z hlavního seznamu navigace. Úřední deska, Projekty a výzvy a Spolupráce jsou v patičce.

Desktopové dropdowny (`DesktopNav`, ř. 254–338) se přepínají kliknutím, zavřou se po výběru odkazu nebo kliknutí mimo kontejner. V jednom okamžiku může být otevřena pouze jedna sekce. Odkaz O škole ve skutečnosti slouží jako tlačítko dropdownu; `/o-nas` se volí uvnitř.

Mobilní menu (`MobileMenu`, ř. 48–251) se portálem vykreslí přímo do `document.body` (ř. 427–432), má fullscreen vrstvu z-index 9999, vlastní scroll a akordeon s jednou otevřenou sekcí. Otevření uzamkne scroll stránky a zaměří zavírací tlačítko, Escape a výběr odkazu menu zavřou. Cleanup obnoví předchozí hodnotu `body.style.overflow`. Přechod na šířku alespoň 1024 px menu zavře (ř. 347–355). Desktop je od `lg`, do té doby hamburger; drobný popis značky se zobrazuje od `sm`.

Patička [footer.tsx](../app/components/footer.tsx), ř. 7–85, obsahuje identitu, IČ, datovou schránku a kontaktní údaje natvrdo, čtyři interní CTA a externí kredit `https://new.thinkhome.org`. Logo kreditu pochází z `raw.githubusercontent.com` (ř. 74). Telefon/e-mail v patičce nejsou `tel:`/`mailto:` odkazy. Na `md` se footer mění na sloupce s dekorativním vertikálním oddělovačem.

## Homepage a sdílená data

Hero [hero.tsx](../app/components/hero.tsx), ř. 10–49, spojuje fotografie všech alb a po mountu provede Fisher–Yates shuffle, z něhož vezme sedm fotografií. Počáteční stav je prázdný; komentář výslovně vysvětluje ochranu před hydration mismatch. Mobil vykreslí první čtyři do mřížky 3:5 × 5:3; desktop sedm do pěti sloupců 2:3:5:3:2 a dvou řádků 3:5 (ř. 21–40, 96–143). Framer Motion postupně mění opacity. Jde o běžné `img`, nikoli Next Image. Změna galerie automaticky mění kandidáty na úvodní fotografii; výběr není stabilní mezi návštěvami. CTA vedou na Aktuality a Pro zájemce.

Proč my [proc-my.tsx](../app/components/proc-my.tsx), ř. 6–27, má čtyři lokální hodnoty: pohyb a zdraví, bezpečné prostředí, spolupráce s rodiči, bohatý program. Počet sloupců je 1 / 2 na `sm` / 4 na `lg` (ř. 55); CTA vede `/o-nas`. Texty jsou nezávislé na pilířích stránky O nás.

Aktuality [aktuality.tsx](../app/components/aktuality.tsx), ř. 23–27, kopírují JSON, řadí jej sestupně přes `publishedAt.localeCompare` a berou pět záznamů. ISO formát `YYYY-MM-DD` je předpoklad správného řazení. Homepage používá datum s názvem měsíce; archiv a detail číselné datum. Všechny varianty mají fallback na vstup při neplatném datu. Na mobilu je datum napravo a CTA pod seznamem; od `lg` datum vlevo, CTA v záhlaví je od `sm`. Obrázky mají alt titulku. Archiv používá 1 / 2 sloupce na `lg` a uvnitř karty obrázek vedle textu od `sm`.

Detail aktuality [page.tsx](../app/aktuality/[slug]/page.tsx), ř. 28–70, generuje parametry, metadata a strukturovaná data ze stejných čtyř polí jako seznam. Není zde tělo článku v datech ani CMS fetch: ř. 113–123 zobrazují vývojářský placeholder. Obrázek má responzivní výšku `h-64 / sm:h-80 / lg:h-112`.

Jak se k nám dostanete / Zápisy [dostanete-zapisy.tsx](../app/components/dostanete-zapisy.tsx), ř. 14–85, je od `lg` dvousloupcové. Mapa má title, lazy loading a poměr 16:10, ale URL dotazuje pouze `Praha`, přestože text uvádí přesnou adresu (ř. 28 a 42). Text zápisu je výslovně placeholder (ř. 56–59), zatímco tři odrážky pouze popisují očekávané informace. CTA vede na skutečnou `/zapisy`.

Kontaktní identita existuje nezávisle v homepage JSON-LD, patičce, homepage mapové sekci a `KONTAKTY_CONTENT`. Třídy jsou nezávisle v `CLASSROOMS` a `KONTAKTY_CONTENT.classroomContacts`. Při změně kontaktu nebo názvu třídy zkontrolovat všechny spotřebitele; společná entita školy neznamená společný datový objekt.

## Galerie a modalita

[GaleriePage](../app/galerie/page.tsx), ř. 116–139: počáteční slug `akce`; při nenalezení fallback na první album. Prázdné `GALLERY_ALBUMS` není ošetřeno před přístupem k `.photos`. Kliknutí na miniaturu uloží snapshot aktuálního pole fotografií a index. Předchozí/další se cyklicky počítají modulo délka alba. Filtr alb není uložen do URL a nemá samostatné routy.

Masonry používá CSS columns 2 / 3 (`sm`) / 4 (`lg`) / 5 (`xl`), fotografie jsou `img loading="lazy" decoding="async"`, přístupné přes tlačítka s `aria-label` a focus ringem (ř. 164–213). Přepínání alba animuje opacity a vertikální posun; počty pocházejí ze skutečné délky alba.

Lightbox (ř. 13–114) používá fullscreen tmavý overlay, Framer Motion, titulek z alt a čítač. Escape zavírá, šipky listují, kliknutí na backdrop zavírá a kliknutí uvnitř obrázku zastaví propagaci. Zamyká scroll, ale cleanup nastaví overflow na prázdný řetězec místo obnovy původní hodnoty. Tlačítka mají české popisky. Obrázek je limitován 90dvh / 90vw.

## Markdown a dokumenty

[StaticContentPage](../app/components/static-content-page.tsx), ř. 20–30, definuje smlouvu `eyebrow`, `title`, `description`, `markdown`, volitelné zpět odkazy, quickLinks a buttonLinks. Markdown dělí přes přesný oddělovač `\n---\n` do samostatných karet (ř. 126–129). Podporuje GFM; vlastní styly mají h2/h3, odstavce, seznamy, zvýraznění, odkazy, citace, obrázky i tabulky. Tabulky jsou v horizontálně scrollovatelném kontejneru; markdown obrázky používají Next Image 1600×1200 a fluidní šířku.

Externí markdown odkazy a buttonLinks, jejichž href začíná `http`, otevírají novou kartu s `noopener noreferrer`. QuickLinks jsou karty 1 / 2 (`sm`) / 3 (`lg`) se dvěma odkazy na stejný cíl; jejich renderer zvláštní externí target nepřidává. Zpět je standardně `/`, nikoli browser history. Obsahová šířka je `max-w-5xl`.

Zápisy [page.tsx](../app/zapisy/page.tsx), ř. 19–92, mají vlastní podobný GFM renderer a stejný oddělovač sekcí. Nemají vlastní styly tabulek. Jejich markdown obrázky používají 800×500. Hlavičkové obrázky mají mobilní horizontální overflow, na `sm` mřížku a na `md` sloupec. Stránka je omezena `max-w-4xl`. Změny markdown vzhledu je nutné posoudit v obou implementacích.

Úřední deska [page.tsx](../app/uredni-deska/page.tsx), ř. 55–83, podle přesného textu `kind === "Přímé stažení PDF"` pouze volí Download versus ExternalLink ikonu. Ani PDF odkaz nemá atribut `download`; všechny položky se otevírají v nové kartě. Změna textu `kind` tedy může změnit ikonu.

Kontakty [page.tsx](../app/kontakty/page.tsx), ř. 21–51, mají `DetailRow` pro prostý údaj či odkaz. Telefony normalizují odstraněním whitespace při konstrukci `tel:` a e-maily používají `mailto:`. Hlavní karty mají od `lg` poměr 1,4:0,9; vedení od `md` tři sloupce, třídy 1 / 2 (`md`) / 3 (`xl`). Seznam učitelek a podmíněná poznámka pocházejí z obsahu. Fotografie pracovníků ani formulář zde nejsou.

## Design systém a primitiva

[globals.css](../app/globals.css), ř. 1–48, propojuje Tailwind, tw-animate-css, shadcn styl a semantic tokeny přes `@theme inline`. `:root` (ř. 65–98) obsahuje světlé OKLCH barvy: téměř bílé pozadí, bílou kartu, tmavý text, modrou primární barvu; radius je 0,875 rem. `.dark` (ř. 100–132) má samostatné tokeny, ale ve čteném UI není theme provider ani přepínač, který ji aplikuje. Některé stránky používají pevné `text-zinc-900` a footer černou/bílou; samotné dark tokeny proto nejsou důkazem hotového dark režimu.

Globálně: sans text, serif nadpisy h1–h6, stabilní scrollbar gutter, smooth scroll, barva označení textu. Utility `page-shell` omezuje šířku na `max-w-7xl` a padding 6 / md:10 / xl:14; `section-shell` vertikální padding 16 / sm:20 / lg:24; `content-card` sjednocuje rounded-xl, border, background a shadow-sm (ř. 150–170). Breakpointy jsou standardní Tailwind utility; konkrétní mobilní menu navíc explicitně používá 1024 px.

| Primitivum | Zdroj | Smlouva / použití |
| --- | --- | --- |
| Badge | [badge.tsx](../components/ui/badge.tsx), 5–33 | `div`, varianty default/secondary/outline/soft; výchozí outline; aktuality |
| Button a buttonVariants | [button.tsx](../components/ui/button.tsx), 7–53 | Client modul; varianty default/secondary/outline/ghost/soft/dark; velikosti default/sm/lg/icon; forwardRef, disabled a focus-visible styly; runtime UI používá `buttonVariants` pro odkazy, nikoli nalezené `<Button>` |
| Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter | [card.tsx](../components/ui/card.tsx), 4–74 | Stylované HTML kontejnery; CardTitle je h3; padding 6 / sm:8, content/footer pt-0; nejsou samy interaktivní |
| Separator | [separator.tsx](../components/ui/separator.tsx), 4–26 | Horizontální nebo vertikální div; výchozí decorative=true a aria-hidden; nepřidává role separator; používá footer |

Serverové stránky používají server-safe řetězce z `lib/button-link-classes.ts`; Hero a Nav klientské `buttonVariants`. Proč my má navíc vlastní primární třídy. Při úpravě vzhledu tlačítek je tedy více zdrojů stylů.

## Přístupnost a hranice ověření

Ve zdrojích jsou český jazyk dokumentu, main landmarky, skutečné odkazy/tlačítka, alt u obrázků, time/dateTime a title mapy. Karty jsou interaktivní pouze tam, kde jsou obalené odkazem nebo obsahují odkaz. Většina ovladačů má focus styly; není zde přesun focusu na navigovanou stránku ani skip link.

Konkrétní nehotové detaily pro další vývoj, zjištěné statickým čtením:

- Hamburger `aria-controls="mobile-nav-dialog"` (nav ř. 411) nemá odpovídající id na dialogu (ř. 76). Mobilní dialog nemá focus trap, inert pozadí ani obnovu focusu na spouštěč; počáteční fokus a Escape implementovány jsou.
- Desktop dropdown tlačítko (nav ř. 277) nemá `aria-expanded` a neřeší Escape/šipkové ovládání; běžný Tab a aktivace nativního button fungují.
- Lightbox nemá `role="dialog"`, `aria-modal`, focus trap, počáteční fokus ani návrat focusu. Přepínače alb nemají `aria-pressed` nebo tab semantics. Čítač není live region.
- Hero a galerie nemají explicitní reduced-motion větev; globální smooth scroll ji také nevypíná. U nepoužívaného LogoLoop taková větev existuje.
- CardTitle vždy h3; stránky jej někdy používají rovnou pod h1. Po změně rozvržení je třeba kontrolovat hierarchii nadpisů.
- Telefonní čísla tříd na `/tridy` obsahují `XXX` (ř. 20 a další záznamy), homepage zápisy a těla aktualit jsou placeholdery. Nejde o ověřené produkční údaje.

Dokumentace tyto body neopravuje; runtime klávesnicové ovládání, kontrast, malé displeje, síťové načítání a obrázky vyžadují browser test.

## Nepoužívané a historické UI

[aktuality-puvodni.tsx](../app/components/aktuality-puvodni.tsx), ř. 22–93, nemá nalezeného konzumenta v `app`, `components` ani `lib`. Je to stará serverová varianta: čtyři novinky, horizontálně scrollované karty, číselné datum, pevná bílá/modrá paleta. Není aktuální homepage komponentou; změna pouze tohoto souboru aktuální homepage neupraví.

[LogoLoop.tsx](../components/LogoLoop.tsx), 1–502, také nemá nalezeného konzumenta. Klientská memo komponenta pro nekonečný pás obrazových nebo React-node log: rychlost 120, směr left/right/up/down, mezera 32, výška 28, vlastní renderItem, fade, scale-on-hover, hoverSpeed/pauseOnHover. Měří sekvenci přes ResizeObserver (fallback resize), čeká na load/error obrázků, dopočítá počet kopií (nejméně dvě) a animuje requestAnimationFrame s exponenciálním vyhlazením a modulo posunem. Reduced motion zastaví transformaci; kopie nad první jsou aria-hidden; odkazy se otevírají bezpečně do nové karty. Cleanup odpojuje listenery/observery a ruší RAF. Tato schopnost není aktivní funkcí stránky Spolupráce, která používá statický seznam.

## Kontrola při dalším vývoji

Při změně menu zkontrolovat desktop i mobil a dostupnost všech 17 routních šablon. Při změně fotografie zkontrolovat galerii i náhodné Hero; při změně aktuality homepage, archiv, detail i metadata; při změně kontaktů homepage JSON-LD, footer, mapovou sekci, kontakty a třídy. Při změně markdown stylu kontrolovat všech sedm statických stránek a samostatné Zápisy. Změna společných CSS tokenů nebo Card se projeví napříč webem; změna nepoužívaných legacy komponent nikoli.
