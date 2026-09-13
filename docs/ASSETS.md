# Obrazové podklady MŠ Tyršovka

Ověřeno ve zdrojích a lokálních souborech 2026-09-13. Inventář zahrnuje všech 17 obrázků v `public/`: 11 rastrů vizuálně prohlédnutých a 6 SVG ověřených čtením vektorového zdroje. Vzdálené obrázky nebyly staženy ani vizuálně ověřeny. „Bez reference“ znamená bez nalezeného odkazu v aplikačních zdrojích; soubor je stále veřejně dostupný svou cestou.

## Lokální inventář

| Soubor v public/ | Skutečný obsah | Použití |
|---|---|---|
| `logo.png` | Usměvavé žluté slunce, tyrkysové vlny a barevný nápis MŠ Tyršovka. | app/components/nav.tsx; app/components/footer.tsx; app/layout.tsx; app/page.tsx; app/aktuality/[slug]/page.tsx; lib/seo.ts |
| `nav-bg.png` | Široký pás oblohy s růžově nasvícenými mraky. | Bez reference v aplikačním zdrojovém kódu |
| `proc-my.png` | Usmívající se dítě v bílém tričku se symbolem recyklace mezi slunečnicemi; opakované vodoznaky Alamy. | Bez reference; komponenta app/components/proc-my.tsx tento obrázek nepoužívá |
| `tyrsovka-1.jpg` | Venkovní hřiště s hnízdovou houpačkou, kolotočem, lavičkou a přístřeškem vedle budovy. | app/data/aktuality.json → app/components/aktuality.tsx; app/aktuality/page.tsx; app/aktuality/[slug]/page.tsx |
| `tyrsovka-2.jpg` | Dřevěná prolézačka se dvěma skluzavkami a lanovým mostem, pružinová houpačka, trávník a budova. | app/data/aktuality.json → app/components/aktuality.tsx; app/aktuality/page.tsx; app/aktuality/[slug]/page.tsx |
| `tridy/hruskova.png` | Zelená usměvavá hruška s listem, rukama a červenými botami. | app/tridy/page.tsx CLASSROOMS |
| `tridy/merunkova.png` | Oranžový usměvavý plod s listem, červenými rukavicemi a zelenými botami. | app/tridy/page.tsx CLASSROOMS |
| `tridy/jahodova.png` | Červená jahoda s usměvavou tváří, zelenou korunou a pruhovanými nohama. | app/tridy/page.tsx CLASSROOMS |
| `tridy/jablkova.png` | Červené usměvavé jablko s listem, žlutými rukavicemi a oranžovými botami. | app/tridy/page.tsx CLASSROOMS |
| `tridy/boruvkova.png` | Fialová kulatá bobule s usměvavou tváří, modrými rukavicemi a pruhovanými nohama. | app/tridy/page.tsx CLASSROOMS |
| `tridy/citronova.png` | Žlutý usměvavý citrón s rukama, článkovanými nohama a červenými botami. | app/tridy/page.tsx CLASSROOMS |
| `file.svg` | Šedý obrys listu se zahnutým rohem a řádky textu. | Bez reference v aplikačním zdrojovém kódu |
| `globe.svg` | Šedá koule se stylizovanými poledníky a rovnoběžkami. | Bez reference v aplikačním zdrojovém kódu |
| `window.svg` | Šedý obrys okna se třemi tečkami v horní části. | Bez reference v aplikačním zdrojovém kódu |
| `next.svg` | Černá vektorová typografie NEXT.js. | Bez reference v aplikačním zdrojovém kódu |
| `vercel.svg` | Bílý plný trojúhelník. | Bez reference v aplikačním zdrojovém kódu |
| `spoluprace/placeholder.svg` | Šedý rámeček, kruh a lomená čára na světlém pozadí; text obsahuje poškozený znak v Obr�zek partnera. | Bez reference; app/spoluprace/content.ts používá šest vzdálených log |

## Vazby a správa

- Logo propojuje navigaci, patičku, favicon, Open Graph a strukturovaná data. Změna obrázku ovlivní více než viditelnou hlavičku. Samotný soubor má 185 × 150 px, zatímco metadata deklarují jiné rozměry; při výměně zkontrolovat i metadata.
- Šest maskotů tvoří jednu vizuální rodinu a přiřazení ke třídám řídí `CLASSROOMS` v `app/tridy/page.tsx`. Alternativní text se bere z názvu třídy; renderování používá `next/image`, `fill`, `object-cover` a `sizes="220px"`.
- Dvě fotografie hřiště se opakují v pěti záznamech `app/data/aktuality.json`; spotřebuje je úvodní výpis, stránka aktualit, detail i metadata detailu. Fotografie samy nedokládají obsah konkrétního článku.
- `proc-my.png` má viditelné vodoznaky Alamy. Zdrojový kód jej nepoužívá a inventář nedokládá licenci. `nav-bg.png` se rovněž aktuálně neodkazuje.
- `file.svg`, `globe.svg`, `window.svg`, `next.svg` a `vercel.svg` vypadají jako výchozí podklady šablony; jejich původ je inference, nepoužití je výsledek hledání odkazů. Zástupný obrázek spolupráce obsahuje poškozený znak; nynější stránka používá vzdálená loga.

## Vzdálené obrázky a závislosti

`next.config.ts` povoluje pro optimalizaci `next/image` HTTPS hostitele `files.site.site3.eu` a `raw.githubusercontent.com`, bez omezení cesty. Toto nastavení neřídí obyčejné HTML `img`.

| Zdroj | Data a spotřebitelé | Dopad změny |
|---|---|---|
| `https://files.site.site3.eu` | `app/galerie/content.ts` obsahuje alba a jejich fotografie. `app/galerie/page.tsx` vykresluje náhledy a lightbox přes `img`. | Změna URL nebo dostupnosti zasáhne galerii. |
| Stejná alba | `app/components/hero.tsx` slučuje fotografie všech alb, po mountu vybere 7 náhodných; mobil ukáže 4, desktop 7. | Galerie je zároveň zdrojem úvodní koláže; není zde nezávislý seznam hero fotografií. |
| `https://files.site.site3.eu` | Šest log v `app/spoluprace/content.ts`, renderovaných přes `next/image` v `app/spoluprace/page.tsx`. | Závislost na vzdálených souborech partnerů. |
| `https://files.site.site3.eu` | Markdown obrázky jídelníčku a projektů v `lib/static-page-content.ts`. | Při změně obsahu kontrolovat URL i alternativní text. |
| `https://raw.githubusercontent.com` | Thinkhome SVG v `app/components/footer.tsx`, cesta v repozitáři `thinkhome-org/web-new` na větvi `master`. | Patička závisí na souboru v cizím repozitáři a na pohyblivé větvi. |

Zakomentované `/zapisy-1.jpg` a `/zapisy-2.jpg` v `app/zapisy/content.ts` nejsou přítomné soubory ani aktivní obrázky. Inventář je nepočítá do 17.

## Aktualizace grafu

Každý lokální obrázek má vlastní sémantický fragment sloučený do `graphify-out/semantic.json`. Uzly uchovávají cestu zdroje, vizuální popis a zjištěné použití. Inference propojují maskoty a fotografie hřiště. Po změně souboru nebo jeho použití obnovit graf podle [GRAPH.md](GRAPH.md). Inventář nenahrazuje test vykreslení webu.
