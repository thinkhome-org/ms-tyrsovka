# Graph Report - ms-tyrsovka  (2026-09-13)

## Corpus Check
- 78 files · ~87,324 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1707 nodes · 3890 edges · 76 communities (60 shown, 13 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 47 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Fotografie všech alb
- ESLint kompatibilita JavaScriptu
- Markdown a HTML parsery
- Radix a React primitiva
- HTTP serverové nástroje
- Kontakty a provoz školy
- Next build a prohlížeče
- Terminál a procesy
- CLI prostředí a šifrování
- Sharp a nativní obrazy
- Obsah homepage a aktualit
- Detail článku a SEO
- Úřední deska a dokumenty
- Výpis aktualit a odkazy
- Hero a desktop navigace
- Stránky školy a kontakty
- Aktuality data a ilustrace
- Statické stránky a Markdown
- Layout patička a metadata
- shadcn aliasy a registry
- Generování a kontrola grafu
- Manifest a přímé balíčky
- Babel transformace kódu
- Třídy a maskoti
- shadcn CLI nástroje
- ESLint jádro a soubory
- Vyhledávání cest glob
- TypeScript nativní platformy
- Partneři a společné akce
- Běhové přímé závislosti
- Vývojové přímé závislosti
- Archiv aktualit a karty
- Témata školních akcí
- Sourcemapy a generování
- Nepoužívaný pás LogoLoop
- Načítání konfigurací CLI
- Cache lint souborů
- Lightning CSS platformy
- TypeScript ESLint parser
- Galerie lightbox a modalita
- Zápisy a sdílený titulek
- pnpm povolení a výjimky
- Otevírání externího prohlížeče
- Tailwind Oxide platformy
- Model galerií a alb
- Konfigurace Next lint
- ESLint cesty a vzory
- Babel diagnostika kódu
- Parser přepínačů CLI
- TypeScript mapování cest
- Validace JSON schémat
- Resolvery a souborové nástroje
- React Hooks lint
- Hledání souborů asynchronně
- Deployment a kontrolní nástroje
- Babel cílové platformy
- JavaScript AST parsery
- Varianty tříd CSS
- Framer Motion animace
- Nepoužívaná ikona souboru
- Nepoužívaná ikona zeměkoule
- Nepoužívané pozadí navigace
- Výchozí logo Next
- Nepoužívaná fotografie Alamy
- Zástupné logo partnera
- Výchozí logo Vercel
- Nepoužívaná ikona okna
- Floating UI pozicování
- PostCSS a Tailwind
- Manifest clsx
- Manifest TypeScript
- Tabler ikony
- Node TypeScript typy

## God Nodes (most connected - your core abstractions)
1. `react@19.3.0` - 74 edges
2. `es-abstract@1.24.2` - 69 edges
3. `@types/react@19.3.0` - 67 edges
4. `radix-ui@1.6.7` - 60 edges
5. `react-dom@19.3.0` - 50 edges
6. `@radix-ui/react-primitive@2.1.10` - 45 edges
7. `@types/react-dom@19.3.0` - 45 edges
8. `eslint@10.10.0` - 45 edges
9. `call-bound@1.0.4` - 40 edges
10. `shadcn@4.21.0` - 34 edges

## Surprising Connections (you probably didn't know these)
- `Dekorativní div, orientace a aria-hidden, bez role separator` --references--> `OKLCH semantic tokeny, modrá primary, Lora a Source Sans 3`  [EXTRACTED]
  components/ui/separator.tsx → app/globals.css
- `Omluvy v Naše MŠ do 8:30 nebo SMS` --semantically_similar_to--> `Komunikační doporučení a Naše MŠ`  [INFERRED] [semantically similar]
  lib/static-page-content.ts → app/kontakty/content.ts
- `Badge: outline výchozí, default secondary soft` --references--> `OKLCH semantic tokeny, modrá primary, Lora a Source Sans 3`  [EXTRACTED]
  components/ui/badge.tsx → app/globals.css
- `CardTitle je vždy h3; Card není interaktivní` --references--> `OKLCH semantic tokeny, modrá primary, Lora a Source Sans 3`  [EXTRACTED]
  components/ui/card.tsx → app/globals.css
- `Šest variant, čtyři velikosti, disabled a focus styly` --references--> `OKLCH semantic tokeny, modrá primary, Lora a Source Sans 3`  [EXTRACTED]
  components/ui/button.tsx → app/globals.css

## Import Cycles
- 1-file cycle: `scripts/build-graph.py -> scripts/build-graph.py`

## Hyperedges (group relationships)
- **Sedm rout sdílí markdown rendering contract** — app_components_static_content_page_markdown_card_contract, app_jidelnicek_page_route, app_nove_prijati_page_route, app_plan_akci_page_route, app_pro_zajemce_page_route, app_projekty_a_vyzvy_page_route, app_rezim_dne_a_provozni_doba_page_route, app_svp_page_route [EXTRACTED 1.00]
- **Sdílená závislost na hostingu site3** — app_galerie_content_gallery_albums, app_spoluprace_content_spoluprace_content, lib_static_page_content_jidelnicek_page, lib_static_page_content_projekty_a_vyzvy_page, app_uredni_deska_content_vyrocni_pdf, lib_static_page_content_svp_page [INFERRED 0.95]
- **Naše MŠ jako provozní komunikační kanál** — lib_static_page_content_information, lib_static_page_content_absence, app_kontakty_content_intro [INFERRED 0.95]
- **Ruční koordinace termínů a ročníků** — lib_static_page_content_pro_zajemce_page, app_zapisy_content_zapisy_markdown, app_uredni_deska_content_kriteria, lib_static_page_content_plan_akci_page [INFERRED 0.95]
- **Jeden záznam novinky ovlivní homepage, archiv a detail** — app_components_aktuality_latest_five_news, app_aktuality_page_route, app_aktuality__slug__page_route [INFERRED 0.95]
- **Školní identita je udržována v několika nezávislých UI kopiích** — app_page_organization_contact_copy, app_components_footer_school_contact_copy, app_components_dostanete_zapisy_location_map, app_kontakty_page_route [INFERRED 0.95]

## Communities (76 total, 13 thin omitted)

### Community 0 - "Fotografie všech alb"
Cohesion: 0.01
Nodes (210): https://files.site.site3.eu/8d/f2/8df246da-55a4-49f6-bae3-2a98b7f973de.jpeg, https://files.site.site3.eu/c1/99/c199d95b-a35c-4185-ac97-94428271aba0.jpg, https://files.site.site3.eu/bc/bf/bcbf6bfc-3275-403d-b738-fc2ac2e4a577.jpg, https://files.site.site3.eu/66/cc/66cc0fa7-b383-4ba3-b3ba-bc384c1e7cd7.jpg, https://files.site.site3.eu/4c/99/4c99bd7a-5bb9-4b48-9d58-e72709b6cb54.JPG, https://files.site.site3.eu/af/32/af328f24-6f1c-4a11-abf5-d1e144f7dfdb.jpg, https://files.site.site3.eu/0e/ff/0eff7bde-bd25-4a94-8a6e-c3552c88477b.jpg, https://files.site.site3.eu/fc/e0/fce06b77-ba21-481e-80e7-524340ab45cf.jpg (+202 more)

### Community 1 - "ESLint kompatibilita JavaScriptu"
Cohesion: 0.05
Nodes (136): aria-query@5.3.2, array-buffer-byte-length@1.0.2, array-includes@3.1.9, array.prototype.findlast@1.2.5, array.prototype.findlastindex@1.2.6, array.prototype.flat@1.3.3, array.prototype.flatmap@1.3.3, array.prototype.tosorted@1.1.4 (+128 more)

### Community 2 - "Markdown a HTML parsery"
Cohesion: 0.06
Nodes (96): bail@2.0.2, ccount@2.0.1, character-entities@2.0.2, character-entities-html4@2.1.0, character-entities-legacy@3.0.0, character-reference-invalid@2.0.1, comma-separated-tokens@2.0.3, decode-named-character-reference@1.3.0 (+88 more)

### Community 3 - "Radix a React primitiva"
Cohesion: 0.21
Nodes (76): aria-hidden@1.2.6, csstype@3.2.3, detect-node-es@1.1.0, @floating-ui/react-dom@2.1.9, get-nonce@1.0.1, radix-ui@1.6.7, @radix-ui/number@1.1.3, @radix-ui/primitive@1.1.7 (+68 more)

### Community 4 - "HTTP serverové nástroje"
Cohesion: 0.05
Nodes (66): accepts@2.0.0, ajv-formats@3.0.1, ajv@8.20.0, json-schema-traverse@1.0.0, body-parser@2.3.0, content-type@2.1.0, bytes@3.1.2, content-disposition@1.0.1 (+58 more)

### Community 5 - "Kontakty a provoz školy"
Cohesion: 0.06
Nodes (51): Lyžování 2025: 16 fotografií, Borůvková – 1. pavilon patro, Citrónová – 2. pavilon přízemí, ClassroomContact, Šest tříd a učitelské týmy, ContactPerson, Hrušková – 3. pavilon patro, Komunikační doporučení a Naše MŠ (+43 more)

### Community 6 - "Next build a prohlížeče"
Cohesion: 0.06
Nodes (49): baseline-browser-mapping@2.11.23, browserslist@4.28.9, caniuse-lite@1.0.30001810, client-only@0.0.1, electron-to-chromium@1.5.427, next@16.3.5, @next/env@16.3.5, @next/swc-darwin-arm64@16.3.5 (+41 more)

### Community 7 - "Terminál a procesy"
Cohesion: 0.05
Nodes (49): ansi-regex@6.2.2, cli-cursor@5.0.0, cli-spinners@2.9.2, cross-spawn@7.0.6, execa@5.1.1, get-stream@6.0.1, human-signals@2.1.0, is-stream@2.0.1 (+41 more)

### Community 8 - "CLI prostředí a šifrování"
Cohesion: 0.05
Nodes (45): dotenv@17.2.4, @dotenvx/dotenvx@1.52.0, commander@11.1.0, fdir@6.5.0, isexe@3.1.5, picomatch@4.0.7, which@4.0.0, @ecies/ciphers@0.2.5 (+37 more)

### Community 9 - "Sharp a nativní obrazy"
Cohesion: 0.07
Nodes (43): ast-types@0.16.1, @emnapi/core@1.10.0, @emnapi/runtime@1.11.3, @emnapi/wasi-threads@1.2.1, semver@7.8.5, esprima@4.0.1, @img/colour@1.1.0, @img/sharp-darwin-arm64@0.35.4 (+35 more)

### Community 10 - "Obsah homepage a aktualit"
Cohesion: 0.08
Nodes (37): Archiv aktualit (/aktuality), Lexikografické řazení předpokládá ISO YYYY-MM-DD, Pět nejnovějších záznamů podle ISO data, Nepoužívané staré aktuality: čtyři horizontální karty, Homepage zápisy obsahují placeholder a odkaz na plnou stránku, Patička: kontakty, úřední deska, projekty, spolupráce, Thinkhome, Náhodný výběr až po mountu chrání hydrataci, Hero vybírá sedm fotografií všech alb, čtyři na mobilu (+29 more)

### Community 11 - "Detail článku a SEO"
Cohesion: 0.10
Nodes (29): Tělo aktuality je ukázkový text, bez skutečného článku, Detail aktuality podle slugu (/aktuality/[slug]), JSON slug generuje statické parametry i metadata, neznámý vrací notFound, Aktualita, AktualitaDetailPage(), formatDateCs(), generateMetadata(), generateStaticParams() (+21 more)

### Community 12 - "Úřední deska a dokumenty"
Cohesion: 0.09
Nodes (35): Zprávy ČŠI – připravit další položky, Dokumenty ke stažení, Evidenční list a potvrzení lékaře, Kritéria pro přijetí 2025/2026, Odhláška z MŠ, Potvrzení o nákladech vydávané ve třídách, Pověření k vyzvedávání, Školní řád na původním webu (+27 more)

### Community 13 - "Výpis aktualit a odkazy"
Cohesion: 0.10
Nodes (24): /aktuality, Aktualita, Aktuality(), formatDateCs(), Aktualita, Aktuality(), formatDateCs(), DostaneteZapisy() (+16 more)

### Community 14 - "Hero a desktop navigace"
Cohesion: 0.13
Nodes (24): ALL_PHOTOS, BENTO, DESKTOP_GRID, Hero(), MOBILE_GRID, shuffle(), DESKTOP_NAV, DesktopNav() (+16 more)

### Community 15 - "Stránky školy a kontakty"
Cohesion: 0.14
Nodes (21): DetailRow(), KontaktyPage(), metadata, metadata, ONasPage(), OPERATIONS_STAFF, SCHOOL_PILLARS, metadata (+13 more)

### Community 16 - "Aktuality data a ilustrace"
Cohesion: 0.11
Nodes (19): /aktuality/[slug], Aktuality: pět statických záznamů bez těla článku, CMS placeholder – den-otevrenych-dveri, CMS placeholder – jarni-prazdniny-provoz, Edit this with CMS – karneval-ve-skolce-informace, CMS placeholder – plavani-predskolaku-terminy, Test – zapis-do-ms-2026-27, Inventář všech lokálních obrázků (+11 more)

### Community 17 - "Statické stránky a Markdown"
Cohesion: 0.13
Nodes (17): markdownComponents, GFM tabulky v horizontálním scrollu, StaticContentPage(), StaticPageButtonLink, StaticPageContent, StaticPageLink, JidelnicekPage(), metadata (+9 more)

### Community 18 - "Layout patička a metadata"
Cohesion: 0.14
Nodes (18): Footer(), GalerieLayout(), metadata, /galerie, /kontakty, lora, metadata, RootLayout() (+10 more)

### Community 19 - "shadcn aliasy a registry"
Cohesion: 0.12
Nodes (25): aliases, components, hooks, lib, ui, utils, iconLibrary, registries (+17 more)

### Community 20 - "Generování a kontrola grafu"
Cohesion: 0.18
Nodes (20): collections, graphify.analyze, graphify.build, graphify.cluster, graphify.detect, graphify.diagnostics, graphify.export, graphify.extract (+12 more)

### Community 21 - "Manifest a přímé balíčky"
Cohesion: 0.12
Nodes (23): radix-ui, @tabler/icons-react, tailwind-merge, lucide-react@1.45.0, react-icons@5.7.0, tailwind-merge@3.6.0, tw-animate-css@1.4.0, name (+15 more)

### Community 22 - "Babel transformace kódu"
Cohesion: 0.21
Nodes (24): @babel/core@7.29.7, @babel/helper-annotate-as-pure@7.27.3, @babel/helper-create-class-features-plugin@7.28.6, @babel/helper-globals@7.29.7, @babel/helper-member-expression-to-functions@7.28.5, @babel/helper-module-imports@7.29.7, @babel/helper-module-transforms@7.29.7, @babel/helper-optimise-call-expression@7.27.1 (+16 more)

### Community 23 - "Třídy a maskoti"
Cohesion: 0.13
Nodes (16): CLASSROOMS, metadata, TridyPage(), /tridy, Maskot Borůvkové třídy, Ovocná identita tříd, Maskot Citrónové třídy, Ovocná identita tříd (+8 more)

### Community 24 - "shadcn CLI nástroje"
Cohesion: 0.09
Nodes (22): cn@0.2.6, commander@14.0.3, cssesc@3.0.0, dedent@1.7.1, deepmerge@4.3.1, diff@8.0.3, fuzzysort@3.1.0, get-own-enumerable-keys@1.0.0 (+14 more)

### Community 25 - "ESLint jádro a soubory"
Cohesion: 0.12
Nodes (22): escape-string-regexp@4.0.0, eslint@10.10.0, @eslint-community/regexpp@4.12.2, @eslint/config-helpers@0.7.0, @eslint/core@1.2.1, @eslint/plugin-kit@0.7.3, eslint-scope@9.1.2, esquery@1.7.0 (+14 more)

### Community 26 - "Vyhledávání cest glob"
Cohesion: 0.12
Nodes (21): braces@3.0.3, fast-glob@3.3.1, glob-parent@5.1.2, fastq@1.20.1, fill-range@7.1.1, glob-parent@6.0.2, is-extglob@2.1.1, is-glob@4.0.3 (+13 more)

### Community 27 - "TypeScript nativní platformy"
Cohesion: 0.10
Nodes (21): typescript@7.0.2, @typescript/typescript-aix-ppc64@7.0.2, @typescript/typescript-darwin-arm64@7.0.2, @typescript/typescript-darwin-x64@7.0.2, @typescript/typescript-freebsd-arm64@7.0.2, @typescript/typescript-freebsd-x64@7.0.2, @typescript/typescript-linux-arm@7.0.2, @typescript/typescript-linux-arm64@7.0.2 (+13 more)

### Community 28 - "Partneři a společné akce"
Cohesion: 0.15
Nodes (17): Spolupráce s KC Cílkova, Čerti ze ZŠ Wolfram, Vánoční představení ZUŠ Voborského, KC Cílkova, DDM Modřany, ZŠ Mráčkovka, SPOLUPRACE_CONTENT, SpolupraceItem (+9 more)

### Community 29 - "Běhové přímé závislosti"
Cohesion: 0.11
Nodes (19): class-variance-authority, framer-motion, lucide-react, next, dependencies, class-variance-authority, framer-motion, lucide-react (+11 more)

### Community 30 - "Vývojové přímé závislosti"
Cohesion: 0.11
Nodes (19): eslint, eslint-config-next, devDependencies, eslint, eslint-config-next, shadcn, tailwindcss, @tailwindcss/postcss (+11 more)

### Community 31 - "Archiv aktualit a karty"
Cohesion: 0.20
Nodes (11): Aktualita, AktualityPage(), formatDateCs(), metadata, Dark tokeny existují; UI zde nemá theme přepínač, page-shell a section-shell sjednocují šířku a breakpoint padding, OKLCH semantic tokeny, modrá primary, Lora a Source Sans 3, Badge() (+3 more)

### Community 32 - "Témata školních akcí"
Cohesion: 0.12
Nodes (16): Akce: 99 fotografií, Jablíčka na Batůžkovém dni, Projekt Bezpečný pes, Jablka a Hrušky na bruslích, Hrušky v České televizi, Otevření nového hřiště, Kinologický servis, Masopust tříd (+8 more)

### Community 33 - "Sourcemapy a generování"
Cohesion: 0.17
Nodes (16): @alloc/quick-lru@5.2.0, @babel/generator@7.29.8, jiti@2.7.0, @jridgewell/gen-mapping@0.3.13, @jridgewell/remapping@2.3.5, @jridgewell/resolve-uri@3.1.2, @jridgewell/sourcemap-codec@1.5.5, @jridgewell/trace-mapping@0.3.31 (+8 more)

### Community 34 - "Nepoužívaný pás LogoLoop"
Cohesion: 0.31
Nodes (12): Partner řádek je logo, kategorie a popis, bez klikacího cíle, ANIMATION_CONFIG, cx(), LogoItem, LogoLoop, LogoLoopProps, Reduced motion zastaví pás; kopie log jsou aria-hidden, toCssLength() (+4 more)

### Community 35 - "Načítání konfigurací CLI"
Cohesion: 0.15
Nodes (13): argparse@2.0.1, callsites@3.1.0, cosmiconfig@9.0.0, env-paths@2.2.1, error-ex@1.3.4, import-fresh@3.3.1, is-arrayish@0.2.1, js-yaml@4.3.2 (+5 more)

### Community 36 - "Cache lint souborů"
Cohesion: 0.27
Nodes (13): cacheable@2.5.0, @cacheable/memory@2.2.0, @cacheable/utils@2.5.0, file-entry-cache@11.1.5, flat-cache@6.1.23, flatted@3.4.4, hashery@1.5.1, hookified@1.15.1 (+5 more)

### Community 37 - "Lightning CSS platformy"
Cohesion: 0.15
Nodes (13): detect-libc@2.1.2, lightningcss@1.32.0, lightningcss-android-arm64@1.32.0, lightningcss-darwin-arm64@1.32.0, lightningcss-darwin-x64@1.32.0, lightningcss-freebsd-x64@1.32.0, lightningcss-linux-arm64-gnu@1.32.0, lightningcss-linux-arm64-musl@1.32.0 (+5 more)

### Community 38 - "TypeScript ESLint parser"
Cohesion: 0.41
Nodes (13): ignore@7.0.9, typescript-eslint@8.70.0, @typescript-eslint/eslint-plugin@8.70.0, @typescript-eslint/type-utils@8.70.0, @typescript-eslint/parser@8.70.0, @typescript-eslint/typescript-estree@8.70.0, @typescript-eslint/project-service@8.70.0, @typescript-eslint/tsconfig-utils@8.70.0 (+5 more)

### Community 39 - "Galerie lightbox a modalita"
Cohesion: 0.29
Nodes (10): Mobilní menu: portal, akordeon, Escape, scroll lock, počáteční focus, Dialog bez focus trap a bez cílového id aria-controls, Aktivní album akce s fallbackem, lokální stav mimo URL, Lightbox resetuje overflow na prázdné, menu obnovuje původní, GaleriePage(), Lightbox(), Snapshot alba, cyklické šipky, Escape a backdrop, LightboxState (+2 more)

### Community 40 - "Zápisy a sdílený titulek"
Cohesion: 0.27
Nodes (8): MARKDOWN_SECTIONS, markdownComponents, metadata, ZapisyPage(), SITE_PAGES, title a navLabel pro Zápisy, react markdown, remark gfm

### Community 41 - "pnpm povolení a výjimky"
Cohesion: 0.32
Nodes (11): Povolené instalační build skripty, Konfigurace pnpm, eslint-config-next@16.3.5, 12 výjimek stáří vydání pro Next 16.3.5, msw, next@16.3.5, @next/env@16.3.5, @next/eslint-plugin-next@16.3.5 (+3 more)

### Community 42 - "Otevírání externího prohlížeče"
Cohesion: 0.20
Nodes (12): bundle-name@4.1.0, default-browser@5.5.0, default-browser-id@5.0.1, define-lazy-prop@3.0.0, is-docker@3.0.0, is-in-ssh@1.0.0, is-inside-container@1.0.0, is-wsl@3.1.0 (+4 more)

### Community 43 - "Tailwind Oxide platformy"
Cohesion: 0.17
Nodes (12): @tailwindcss/oxide@4.3.3, @tailwindcss/oxide-android-arm64@4.3.3, @tailwindcss/oxide-darwin-arm64@4.3.3, @tailwindcss/oxide-darwin-x64@4.3.3, @tailwindcss/oxide-freebsd-x64@4.3.3, @tailwindcss/oxide-linux-arm64-gnu@4.3.3, @tailwindcss/oxide-linux-arm64-musl@4.3.3, @tailwindcss/oxide-linux-arm-gnueabihf@4.3.3 (+4 more)

### Community 44 - "Model galerií a alb"
Cohesion: 0.18
Nodes (10): GALLERY_ALBUMS, GalleryAlbum, GalleryPhoto, Jablkobraní 2025: 26 fotografií; slug jablkobraní, Z naší kuchyně: 8 fotografií, Vnitřní prostory: 5 fotografií, files.site.site3.eu – host fotografií, Třídy: 25 fotografií (+2 more)

### Community 45 - "Konfigurace Next lint"
Cohesion: 0.24
Nodes (9): eslintConfig, @eslint-community/eslint-utils@4.9.1, eslint-visitor-keys@3.4.3, eslint-config-next@16.3.5, globals@16.4.0, @next/eslint-plugin-next@16.3.5, eslint config, eslint config next core web vitals (+1 more)

### Community 46 - "ESLint cesty a vzory"
Cohesion: 0.22
Nodes (9): balanced-match@4.0.4, brace-expansion@5.0.9, code-block-writer@13.0.3, @eslint/config-array@0.23.5, minimatch@10.2.6, @eslint/object-schema@3.0.5, path-browserify@1.0.1, ts-morph@26.0.0 (+1 more)

### Community 47 - "Babel diagnostika kódu"
Cohesion: 0.29
Nodes (7): @babel/code-frame@7.29.7, @babel/helper-validator-identifier@7.29.7, escalade@3.2.0, js-tokens@4.0.0, loose-envify@1.4.0, picocolors@1.1.1, update-browserslist-db@1.3.3

### Community 48 - "Parser přepínačů CLI"
Cohesion: 0.43
Nodes (7): deep-is@0.1.4, fast-levenshtein@2.0.6, levn@0.4.1, optionator@0.9.4, prelude-ls@1.2.1, type-check@0.4.0, word-wrap@1.2.5

### Community 49 - "TypeScript mapování cest"
Cohesion: 0.38
Nodes (7): json5@2.2.3, minimist@1.2.8, tsconfig-paths@4.2.0, strip-bom@3.0.0, tsconfig-paths@3.15.0, json5@1.0.2, @types/json5@0.0.29

### Community 50 - "Validace JSON schémat"
Cohesion: 0.33
Nodes (6): ajv@6.15.0, fast-deep-equal@3.1.3, fast-json-stable-stringify@2.1.0, json-schema-traverse@0.4.1, punycode@2.3.1, uri-js@4.4.1

### Community 51 - "Resolvery a souborové nástroje"
Cohesion: 0.47
Nodes (6): enhanced-resolve@5.25.0, fs-extra@11.3.3, graceful-fs@4.2.11, jsonfile@6.2.0, tapable@2.3.3, universalify@2.0.1

### Community 52 - "React Hooks lint"
Cohesion: 0.40
Nodes (6): eslint-plugin-react-hooks@7.1.1, hermes-estree@0.25.1, hermes-parser@0.25.1, zod@4.3.6, zod-to-json-schema@3.25.1, zod-validation-error@4.0.2

### Community 53 - "Hledání souborů asynchronně"
Cohesion: 0.33
Nodes (6): find-up@5.0.0, locate-path@6.0.0, p-limit@3.1.0, p-locate@5.0.0, path-exists@4.0.0, yocto-queue@0.1.0

### Community 54 - "Deployment a kontrolní nástroje"
Cohesion: 0.50
Nodes (4): Next Core Web Vitals a TypeScript lint presety, Next React TypeScript ESLint toolchain, installCommand, Vercel instalace pnpm bez frozen lockfile

### Community 55 - "Babel cílové platformy"
Cohesion: 0.40
Nodes (5): @babel/compat-data@7.29.7, @babel/helper-compilation-targets@7.29.7, @babel/helper-validator-option@7.29.7, lru-cache@5.1.1, yallist@3.1.1

### Community 56 - "JavaScript AST parsery"
Cohesion: 0.67
Nodes (4): acorn@8.18.0, acorn-jsx@5.3.2, eslint-visitor-keys@5.0.1, espree@11.2.0

### Community 57 - "Varianty tříd CSS"
Cohesion: 0.50
Nodes (4): class-variance-authority@0.7.1, clsx@2.1.1, class variance authority, clsx

### Community 58 - "Framer Motion animace"
Cohesion: 0.67
Nodes (4): framer-motion@13.2.0, motion-dom@13.2.0, motion-utils@13.0.0, framer motion

### Community 67 - "Floating UI pozicování"
Cohesion: 1.00
Nodes (3): @floating-ui/core@1.8.0, @floating-ui/dom@1.8.0, @floating-ui/utils@0.2.12

## Knowledge Gaps
- **523 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `iconLibrary` (+518 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 528 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next@16.3.5` connect `Next build a prohlížeče` to `Sourcemapy a generování`, `Radix a React primitiva`, `Sharp a nativní obrazy`?**
  _High betweenness centrality (0.002) - this node is a cross-community bridge._
- **Why does `sharp@0.35.4` connect `Sharp a nativní obrazy` to `Lightning CSS platformy`?**
  _High betweenness centrality (0.001) - this node is a cross-community bridge._
- **Why does `react markdown` connect `Zápisy a sdílený titulek` to `Markdown a HTML parsery`?**
  _High betweenness centrality (0.001) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _523 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Fotografie všech alb` be split into smaller, more focused modules?**
  _Cohesion score 0.009478672985781991 - nodes in this community are weakly interconnected._
- **Should `ESLint kompatibilita JavaScriptu` be split into smaller, more focused modules?**
  _Cohesion score 0.050762527233115466 - nodes in this community are weakly interconnected._
- **Should `Markdown a HTML parsery` be split into smaller, more focused modules?**
  _Cohesion score 0.06096491228070176 - nodes in this community are weakly interconnected._
## Evidence limits

Token usage for host-agent semantic extraction is unavailable; zeros are placeholders, not measured free usage. External URLs were indexed from source, not fetched. See health.json for collapsed parallel relations; extraction.json retains the complete evidence.
