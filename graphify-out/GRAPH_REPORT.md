# Graph Report - ms-tyrsovka  (2026-09-13)

## Corpus Check
- 83 files · ~87,426 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1777 nodes · 4071 edges · 72 communities (59 shown, 10 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 43 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Fotografie všech alb
- Balíčky a závislosti
- Balíčky a závislosti
- Balíčky a závislosti
- components/ui/navigation-menu.tsx
- lib/static-page-content.ts
- package.json
- Balíčky a závislosti
- app/spoluprace/content.ts
- Balíčky a závislosti
- Balíčky a závislosti
- Balíčky a závislosti
- app/components/nav.tsx
- Úřední deska a dokumenty
- app/components/static-content-page.tsx
- app/layout.tsx
- tsconfig.json
- components/ui/card.tsx
- app/kontakty/page.tsx
- Balíčky a závislosti
- scripts/build-graph.py
- lib/seo.ts
- shadcn aliasy a registry
- app/page.tsx
- Balíčky a závislosti
- app/aktuality/[slug]/page.tsx
- package.json
- app/tridy/page.tsx
- Balíčky a závislosti
- Balíčky a závislosti
- Balíčky a závislosti
- Balíčky a závislosti
- Balíčky a závislosti
- app/galerie/content.ts
- Balíčky a závislosti
- app/globals.css
- Balíčky a závislosti
- package.json
- Balíčky a závislosti
- Balíčky a závislosti
- pnpm povolení a výjimky
- Balíčky a závislosti
- Balíčky a závislosti
- Model galerií a alb
- package.json
- Balíčky a závislosti
- Balíčky a závislosti
- Balíčky a závislosti
- Balíčky a závislosti
- scripts/check-built-metadata.mjs
- Balíčky a závislosti
- Balíčky a závislosti
- Balíčky a závislosti
- Balíčky a závislosti
- Balíčky a závislosti
- Balíčky a závislosti
- lib/site-content.ts
- Balíčky a závislosti
- Balíčky a závislosti
- Nepoužívaná ikona souboru
- Nepoužívaná ikona zeměkoule
- Nepoužívané pozadí navigace
- Výchozí logo Next
- Nepoužívaná fotografie Alamy
- Zástupné logo partnera
- Výchozí logo Vercel
- Nepoužívaná ikona okna
- Balíčky a závislosti
- PostCSS a Tailwind

## God Nodes (most connected - your core abstractions)
1. `react@19.3.0` - 75 edges
2. `es-abstract@1.24.1` - 69 edges
3. `@types/react@19.3.0` - 68 edges
4. `radix-ui@1.6.7(@types/react-dom@19.3.0(@types/react@19.3.0))(@types/react@19.3.0)(react-dom@19.3.0(react@19.3.0))(react@19.3.0)` - 61 edges
5. `react-dom@19.3.0(react@19.3.0)` - 50 edges
6. `eslint@10.10.0(jiti@2.7.0)` - 47 edges
7. `@types/react-dom@19.3.0(@types/react@19.3.0)` - 46 edges
8. `@radix-ui/react-primitive@2.1.10(@types/react-dom@19.3.0(@types/react@19.3.0))(@types/react@19.3.0)(react-dom@19.3.0(react@19.3.0))(react@19.3.0)` - 45 edges
9. `cn()` - 43 edges
10. `call-bound@1.0.4` - 40 edges

## Surprising Connections (you probably didn't know these)
- `Serverově bezpečné varianty tlačítek, React 19 ref přes props, disabled a focus styly` --references--> `Semantic tokeny: neutrální #FAFAF8, modrá primary, šest pastelových sekčních akcentů`  [EXTRACTED]
  components/ui/button.tsx → app/globals.css
- `next-env.d.ts` --provided_by--> `next@16.3.5(@babel/core@7.29.0)(@types/node@22.20.2)(react-dom@19.3.0(react@19.3.0))(react@19.3.0)`  [EXTRACTED]
  tsconfig.json → pnpm-lock.yaml
- `.next/types/**/*.ts` --provided_by--> `next@16.3.5(@babel/core@7.29.0)(@types/node@22.20.2)(react-dom@19.3.0(react@19.3.0))(react@19.3.0)`  [EXTRACTED]
  tsconfig.json → pnpm-lock.yaml
- `.next/dev/types/**/*.ts` --provided_by--> `next@16.3.5(@babel/core@7.29.0)(@types/node@22.20.2)(react-dom@19.3.0(react@19.3.0))(react@19.3.0)`  [EXTRACTED]
  tsconfig.json → pnpm-lock.yaml
- `Omluvy v Naše MŠ do 8:30 nebo SMS` --semantically_similar_to--> `Komunikační doporučení a Naše MŠ`  [INFERRED] [semantically similar]
  lib/static-page-content.ts → app/kontakty/content.ts

## Import Cycles
- 1-file cycle: `scripts/build-graph.py -> scripts/build-graph.py`

## Hyperedges (group relationships)
- **Sedm rout sdílí markdown rendering contract** — app_components_static_content_page_markdown_card_contract, app_jidelnicek_page_route, app_nove_prijati_page_route, app_plan_akci_page_route, app_pro_zajemce_page_route, app_projekty_a_vyzvy_page_route, app_rezim_dne_a_provozni_doba_page_route, app_svp_page_route [EXTRACTED 1.00]
- **Sdílená závislost na hostingu site3** — app_galerie_content_gallery_albums, app_spoluprace_content_spoluprace_content, lib_static_page_content_jidelnicek_page, lib_static_page_content_projekty_a_vyzvy_page, app_uredni_deska_content_vyrocni_pdf, lib_static_page_content_svp_page [INFERRED 0.95]
- **Naše MŠ jako provozní komunikační kanál** — lib_static_page_content_information, lib_static_page_content_absence, app_kontakty_content_intro [INFERRED 0.95]
- **Ruční koordinace termínů a ročníků** — lib_static_page_content_pro_zajemce_page, app_zapisy_content_zapisy_markdown, app_uredni_deska_content_kriteria, lib_static_page_content_plan_akci_page [INFERRED 0.95]
- **Jeden záznam novinky ovlivní homepage, archiv a detail** — app_components_aktuality_latest_five_news, app_aktuality_page_route, app_aktuality__slug__page_route [INFERRED 0.95]
- **Školní identita je udržována v několika nezávislých UI kopiích** — app_page_organization_contact_copy, app_components_footer_school_contact_copy, app_components_dostanete_zapisy_location_map, app_kontakty_page_route [INFERRED 0.95]

## Communities (72 total, 10 thin omitted)

### Community 0 - "Fotografie všech alb"
Cohesion: 0.01
Nodes (210): https://files.site.site3.eu/8d/f2/8df246da-55a4-49f6-bae3-2a98b7f973de.jpeg, https://files.site.site3.eu/c1/99/c199d95b-a35c-4185-ac97-94428271aba0.jpg, https://files.site.site3.eu/bc/bf/bcbf6bfc-3275-403d-b738-fc2ac2e4a577.jpg, https://files.site.site3.eu/66/cc/66cc0fa7-b383-4ba3-b3ba-bc384c1e7cd7.jpg, https://files.site.site3.eu/4c/99/4c99bd7a-5bb9-4b48-9d58-e72709b6cb54.JPG, https://files.site.site3.eu/af/32/af328f24-6f1c-4a11-abf5-d1e144f7dfdb.jpg, https://files.site.site3.eu/0e/ff/0eff7bde-bd25-4a94-8a6e-c3552c88477b.jpg, https://files.site.site3.eu/fc/e0/fce06b77-ba21-481e-80e7-524340ab45cf.jpg (+202 more)

### Community 1 - "Balíčky a závislosti"
Cohesion: 0.05
Nodes (133): eslint-plugin-react@7.37.5(eslint@10.10.0(jiti@2.7.0)), generator-function@2.0.1, object.groupby@1.0.3, axe-core@4.11.1, supports-preserve-symlinks-flag@1.0.0, is-typed-array@1.1.15, string.prototype.trimstart@1.0.8, aria-query@5.3.2 (+125 more)

### Community 2 - "Balíčky a závislosti"
Cohesion: 0.06
Nodes (97): decode-named-character-reference@1.3.0, remark-gfm@4.0.1, zwitch@2.0.4, micromark-util-classify-character@2.0.1, @ungap/structured-clone@1.3.0, remark-parse@11.0.0, @types/ms@2.1.0, hast-util-to-jsx-runtime@2.3.6 (+89 more)

### Community 3 - "Balíčky a závislosti"
Cohesion: 0.17
Nodes (86): @radix-ui/react-accordion@1.2.20(@types/react-dom@19.3.0(@types/react@19.3.0))(@types/react@19.3.0)(react-dom@19.3.0(react@19.3.0))(react@19.3.0), @radix-ui/react-focus-scope@1.1.16(@types/react-dom@19.3.0(@types/react@19.3.0))(@types/react@19.3.0)(react-dom@19.3.0(react@19.3.0))(react@19.3.0), @types/react@19.3.0, @radix-ui/react-focus-guards@1.1.6(@types/react@19.3.0)(react@19.3.0), @radix-ui/react-tabs@1.1.21(@types/react-dom@19.3.0(@types/react@19.3.0))(@types/react@19.3.0)(react-dom@19.3.0(react@19.3.0))(react@19.3.0), @radix-ui/react-toolbar@1.1.19(@types/react-dom@19.3.0(@types/react@19.3.0))(@types/react@19.3.0)(react-dom@19.3.0(react@19.3.0))(react@19.3.0), @radix-ui/react-dialog@1.1.23(@types/react-dom@19.3.0(@types/react@19.3.0))(@types/react@19.3.0)(react-dom@19.3.0(react@19.3.0))(react@19.3.0), @radix-ui/react-use-escape-keydown@1.1.5(@types/react@19.3.0)(react@19.3.0) (+78 more)

### Community 4 - "components/ui/navigation-menu.tsx"
Cohesion: 0.06
Nodes (62): ALL_PHOTOS, BENTO, CSS stagger fade a hover zoom pouze motion-safe, DESKTOP_GRID, Hero(), MOBILE_GRID, shuffle(), DesktopNav() (+54 more)

### Community 5 - "lib/static-page-content.ts"
Cohesion: 0.06
Nodes (49): Lyžování 2025: 16 fotografií, Přednáška o zdravém stravování, Borůvková – 1. pavilon patro, Citrónová – 2. pavilon přízemí, ClassroomContact, Šest tříd a učitelské týmy, ContactPerson, Hrušková – 3. pavilon patro (+41 more)

### Community 6 - "package.json"
Cohesion: 0.06
Nodes (51): eslint, @eslint/compat, eslint-config-next, lucide-react, next, lucide-react, next, react-icons (+43 more)

### Community 7 - "Balíčky a závislosti"
Cohesion: 0.05
Nodes (49): cli-spinners@2.9.2, signal-exit@4.1.0, human-signals@8.0.1, chalk@5.6.2, is-stream@2.0.1, emoji-regex@10.6.0, isexe@2.0.0, is-unicode-supported@1.3.0 (+41 more)

### Community 8 - "app/spoluprace/content.ts"
Cohesion: 0.06
Nodes (37): /aktuality/[slug], Aktuality: pět statických záznamů bez těla článku, CMS placeholder – den-otevrenych-dveri, CMS placeholder – jarni-prazdniny-provoz, Edit this with CMS – karneval-ve-skolce-informace, CMS placeholder – plavani-predskolaku-terminy, Test – zapis-do-ms-2026-27, Vánoční představení ZUŠ Voborského (+29 more)

### Community 9 - "Balíčky a závislosti"
Cohesion: 0.05
Nodes (46): @tailwindcss/oxide-linux-arm64-musl@4.3.3, universalify@2.0.1, @tailwindcss/oxide-win32-x64-msvc@4.3.3, tailwindcss@4.3.3, @tailwindcss/oxide-freebsd-x64@4.3.3, @tailwindcss/oxide-linux-x64-gnu@4.3.3, lightningcss-linux-x64-musl@1.32.0, jsonfile@6.2.0 (+38 more)

### Community 10 - "Balíčky a závislosti"
Cohesion: 0.08
Nodes (46): iconv-lite@0.7.2, wrappy@1.0.2, path-to-regexp@8.3.0, encodeurl@2.0.0, router@2.2.0, toidentifier@1.0.1, ms@2.1.3, send@1.2.1 (+38 more)

### Community 11 - "Balíčky a závislosti"
Cohesion: 0.05
Nodes (42): @unrs/resolver-binding-linux-riscv64-gnu@1.11.1, @unrs/resolver-binding-linux-arm-gnueabihf@1.11.1, @unrs/resolver-binding-android-arm64@1.11.1, @unrs/resolver-binding-darwin-x64@1.11.1, unrs-resolver@1.11.1, semver@7.7.4, @unrs/resolver-binding-linux-x64-musl@1.11.1, resolve-pkg-maps@1.0.0 (+34 more)

### Community 12 - "app/components/nav.tsx"
Cohesion: 0.08
Nodes (27): Desktop shadcn NavigationMenu mapuje podmenu přes asChild na Next odkazy, DESKTOP_NAV, NAV_ITEMS, Výběr odkazu a resize od 1024 px zavře řízený mobilní Sheet, SUB_ITEMS, StaticContentPage(), StaticPageContent, JidelnicekPage() (+19 more)

### Community 13 - "Úřední deska a dokumenty"
Cohesion: 0.09
Nodes (35): Zprávy ČŠI – připravit další položky, Dokumenty ke stažení, Evidenční list a potvrzení lékaře, Kritéria pro přijetí 2025/2026, Odhláška z MŠ, Potvrzení o nákladech vydávané ve třídách, Pověření k vyzvedávání, Školní řád na původním webu (+27 more)

### Community 14 - "app/components/static-content-page.tsx"
Cohesion: 0.10
Nodes (33): Archiv aktualit (/aktuality), Homepage zápisy obsahují placeholder a odkaz na plnou stránku, Patička: kontakty, úřední deska, projekty, spolupráce, Thinkhome, Náhodný výběr až po mountu chrání hydrataci, Hero vybírá sedm fotografií všech alb, čtyři na mobilu, Správa MŠ je externí nasems.cz, nikoli lokální administrace, Cesty menu: školka, informace, škola, správa, kontakty, HTTP markdown/button odkazy do nové karty s noopener noreferrer (+25 more)

### Community 15 - "app/layout.tsx"
Cohesion: 0.11
Nodes (21): Footer(), lora, metadata, RootLayout(), sourceSans3, metadata, ProjektyAVyzvyPage(), /projekty-a-vyzvy (+13 more)

### Community 16 - "tsconfig.json"
Cohesion: 0.13
Nodes (29): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+21 more)

### Community 17 - "components/ui/card.tsx"
Cohesion: 0.26
Nodes (15): generateMetadata(), markdownTextComponents, Card(), CardContent(), CardDescription(), CardFooter(), CardHeader(), CardTitle() (+7 more)

### Community 18 - "app/kontakty/page.tsx"
Cohesion: 0.07
Nodes (25): Sekční téma news pro pastelový akcent bez změny obsahu či layoutu, Explicitní section parents | school | menu; výchozí parents předáno do main data-section, Šest pastelových témat: news #FFF2B8, parents #FFE0CC, school #F8D6DC, menu #E8DCF2, gallery #D8EBFA, contact #DCEEDD, Sekční téma menu pro pastelový akcent bez změny obsahu či layoutu, Telefon odstraní whitespace pro tel; mailto; bez formuláře, DetailRow(), KontaktyPage(), metadata (+17 more)

### Community 19 - "Balíčky a závislosti"
Cohesion: 0.10
Nodes (28): @img/sharp-libvips-linux-arm64@1.3.3, @img/sharp-libvips-linux-riscv64@1.3.3, @types/node@22.20.2, @img/sharp-libvips-darwin-arm64@1.3.3, undici-types@6.21.0, @img/sharp-linuxmusl-arm64@0.35.4, @img/sharp-linux-s390x@0.35.4, @img/sharp-darwin-arm64@0.35.4 (+20 more)

### Community 20 - "scripts/build-graph.py"
Cohesion: 0.16
Nodes (23): collections, graphify.analyze, graphify.build, graphify.cluster, graphify.detect, graphify.diagnostics, graphify.export, graphify.extract (+15 more)

### Community 21 - "lib/seo.ts"
Cohesion: 0.13
Nodes (19): Čeština, Lora, Source Sans 3, Nav a Footer, Robots povoluje celý web, robots(), /robots.txt, Aktualita, 16 základních cest + slugs aktualit, sitemap(), /sitemap.xml (+11 more)

### Community 22 - "shadcn aliasy a registry"
Cohesion: 0.12
Nodes (25): aliases, components, hooks, lib, ui, utils, iconLibrary, registries (+17 more)

### Community 23 - "app/page.tsx"
Cohesion: 0.12
Nodes (19): DostaneteZapisy(), Mapa dotazuje Prahu, text obsahuje Lysinskou adresu, ZAPISY_ITEMS, Samostatná kopie identity a kontaktů v patičce, Čtyři hodnoty: pohyb, bezpečí, rodiče, program, ProcMy(), CTA O nás používá sdílené odkazové varianty, VALUES (+11 more)

### Community 24 - "Balíčky a závislosti"
Cohesion: 0.08
Nodes (24): kleur@3.0.3, deepmerge@4.3.1, prompts@2.4.2, commander@14.0.3, ip-address@10.7.0, sisteransi@1.0.5, get-own-enumerable-keys@1.0.0, shadcn@4.21.0(@typescript/typescript6@6.0.2) (+16 more)

### Community 25 - "app/aktuality/[slug]/page.tsx"
Cohesion: 0.13
Nodes (19): Tělo aktuality je ukázkový text, bez skutečného článku, Detail aktuality podle slugu (/aktuality/[slug]), JSON slug generuje statické parametry i metadata, neznámý vrací notFound, Sekční téma news pro pastelový akcent bez změny obsahu či layoutu, Aktualita, AktualityPage(), formatDateCs(), metadata (+11 more)

### Community 26 - "package.json"
Cohesion: 0.09
Nodes (23): class-variance-authority, clsx, framer-motion, dependencies, class-variance-authority, clsx, framer-motion, radix-ui (+15 more)

### Community 27 - "app/tridy/page.tsx"
Cohesion: 0.14
Nodes (15): CLASSROOMS, metadata, TridyPage(), Maskot Borůvkové třídy, Ovocná identita tříd, Maskot Citrónové třídy, Ovocná identita tříd, Maskot Hruškové třídy (+7 more)

### Community 28 - "Balíčky a závislosti"
Cohesion: 0.10
Nodes (21): @typescript/typescript-aix-ppc64@7.0.2, @typescript/typescript-netbsd-arm64@7.0.2, @typescript/typescript-freebsd-arm64@7.0.2, @typescript/typescript-linux-riscv64@7.0.2, @typescript/typescript-darwin-x64@7.0.2, @typescript/typescript-darwin-arm64@7.0.2, @typescript/typescript-linux-mips64el@7.0.2, @typescript/typescript-win32-arm64@7.0.2 (+13 more)

### Community 29 - "Balíčky a závislosti"
Cohesion: 0.23
Nodes (21): @babel/helper-optimise-call-expression@7.27.1, @babel/helper-module-imports@7.28.6, @babel/helper-validator-identifier@7.28.5, @babel/traverse@7.29.0, @babel/helper-replace-supers@7.28.6(@babel/core@7.29.0), @babel/helper-skip-transparent-expression-wrappers@7.27.1, convert-source-map@2.0.0, @babel/helper-create-class-features-plugin@7.28.6(@babel/core@7.29.0) (+13 more)

### Community 30 - "Balíčky a závislosti"
Cohesion: 0.13
Nodes (20): @humanfs/node@0.16.7, json-stable-stringify-without-jsonify@1.0.1, acorn-jsx@5.3.2(acorn@8.16.0), @eslint-community/regexpp@4.12.2, @humanwhocodes/module-importer@1.0.1, espree@11.2.0, @eslint/plugin-kit@0.7.3, acorn@8.16.0 (+12 more)

### Community 31 - "Balíčky a závislosti"
Cohesion: 0.11
Nodes (20): client-only@0.0.1, @next/swc-linux-x64-musl@16.3.5, caniuse-lite@1.0.30001774, @next/swc-linux-arm64-gnu@16.3.5, @next/swc-win32-arm64-msvc@16.3.5, @next/swc-linux-arm64-musl@16.3.5, baseline-browser-mapping@2.10.0, @next/env@16.3.5 (+12 more)

### Community 32 - "Balíčky a závislosti"
Cohesion: 0.13
Nodes (19): run-parallel@1.2.0, @eslint-community/eslint-utils@4.9.1(eslint@10.10.0(jiti@2.7.0)), glob-parent@5.1.2, queue-microtask@1.2.3, reusify@1.1.0, glob-parent@6.0.2, @nodelib/fs.walk@1.2.8, @nodelib/fs.stat@2.0.5 (+11 more)

### Community 33 - "app/galerie/content.ts"
Cohesion: 0.12
Nodes (17): Akce: 99 fotografií, Jablíčka na Batůžkovém dni, Projekt Bezpečný pes, Jablka a Hrušky na bruslích, Spolupráce s KC Cílkova, Hrušky v České televizi, Otevření nového hřiště, Kinologický servis (+9 more)

### Community 34 - "Balíčky a závislosti"
Cohesion: 0.15
Nodes (17): zod@3.25.76, eventsource@3.0.7, zod-to-json-schema@3.25.1(zod@3.25.76), hono@4.12.2, fast-uri@3.1.0, pkce-challenge@5.0.1, @modelcontextprotocol/sdk@1.27.1(zod@3.25.76), ajv-formats@3.0.1(ajv@8.18.0) (+9 more)

### Community 35 - "app/globals.css"
Cohesion: 0.16
Nodes (12): GalerieLayout(), metadata, /galerie, Dark tokeny existují; UI zde nemá theme přepínač, Plynulý scroll pouze při povoleném pohybu, data-section vybírá krátkou linku h1; konkrétní header/dialog nav odkazy spodní linku; aktivní gallery tab lokální background a tmavý foreground, page-shell a section-shell sjednocují šířku a breakpoint padding, Semantic tokeny: neutrální #FAFAF8, modrá primary, šest pastelových sekčních akcentů (+4 more)

### Community 36 - "Balíčky a závislosti"
Cohesion: 0.40
Nodes (15): @typescript-eslint/eslint-plugin@8.56.1(@typescript-eslint/parser@8.56.1(@typescript/typescript6@6.0.2)(eslint@10.10.0(jiti@2.7.0)))(@typescript/typescript6@6.0.2)(eslint@10.10.0(jiti@2.7.0)), @typescript-eslint/scope-manager@8.56.1, ignore@7.0.5, @typescript-eslint/visitor-keys@8.56.1, @typescript-eslint/type-utils@8.56.1(@typescript/typescript6@6.0.2)(eslint@10.10.0(jiti@2.7.0)), @typescript-eslint/typescript-estree@8.56.1(@typescript/typescript6@6.0.2), ts-api-utils@2.4.0(@typescript/typescript6@6.0.2), @typescript-eslint/project-service@8.56.1(@typescript/typescript6@6.0.2) (+7 more)

### Community 37 - "package.json"
Cohesion: 0.18
Nodes (12): eslintConfig, Next lint presety obalené fixupConfigRules pro ESLint 10, eslint-config-next@16.3.5(@typescript-eslint/parser@8.56.1(@typescript/typescript6@6.0.2)(eslint@10.10.0(jiti@2.7.0)))(@typescript/typescript6@6.0.2)(eslint@10.10.0(jiti@2.7.0)), globals@16.4.0, Next 16.3.5, React 19.3.0, ESLint 10.10.0; TS7 kompilátor a TS6 API alias, @typescript/native alias na TS7; typescript alias na @typescript/typescript6 pro nástroje, eslint compat, eslint config (+4 more)

### Community 38 - "Balíčky a závislosti"
Cohesion: 0.27
Nodes (13): cacheable@2.5.0, @cacheable/utils@2.5.0, hookified@2.2.0, flat-cache@6.1.23, flatted@3.4.4, @keyv/serialize@1.1.1, file-entry-cache@11.1.5, qified@0.10.1 (+5 more)

### Community 39 - "Balíčky a závislosti"
Cohesion: 0.15
Nodes (13): error-ex@1.3.4, import-fresh@3.3.1, lines-and-columns@1.2.4, is-arrayish@0.2.1, callsites@3.1.0, parse-json@5.2.0, cosmiconfig@9.0.0(@typescript/typescript6@6.0.2), parent-module@1.0.1 (+5 more)

### Community 40 - "pnpm povolení a výjimky"
Cohesion: 0.32
Nodes (11): Povolené instalační build skripty, Konfigurace pnpm, eslint-config-next@16.3.5, 12 výjimek stáří vydání pro Next 16.3.5, msw, next@16.3.5, @next/env@16.3.5, @next/eslint-plugin-next@16.3.5 (+3 more)

### Community 41 - "Balíčky a závislosti"
Cohesion: 0.23
Nodes (12): @babel/preset-typescript@7.28.5(@babel/core@7.29.0), @babel/helper-annotate-as-pure@7.27.3, @babel/plugin-transform-modules-commonjs@7.28.6(@babel/core@7.29.0), @babel/helper-validator-option@7.27.1, @babel/plugin-transform-typescript@7.28.6(@babel/core@7.29.0), @babel/plugin-syntax-jsx@7.28.6(@babel/core@7.29.0), yallist@3.1.1, @babel/compat-data@7.29.0 (+4 more)

### Community 42 - "Balíčky a závislosti"
Cohesion: 0.20
Nodes (12): open@11.0.0, is-inside-container@1.0.0, powershell-utils@0.1.0, is-in-ssh@1.0.0, define-lazy-prop@3.0.0, bundle-name@4.1.0, is-wsl@3.1.1, is-docker@3.0.0 (+4 more)

### Community 43 - "Model galerií a alb"
Cohesion: 0.18
Nodes (10): GALLERY_ALBUMS, GalleryAlbum, GalleryPhoto, Jablkobraní 2025: 26 fotografií; slug jablkobraní, Z naší kuchyně: 8 fotografií, Vnitřní prostory: 5 fotografií, files.site.site3.eu – host fotografií, Třídy: 25 fotografií (+2 more)

### Community 44 - "package.json"
Cohesion: 0.31
Nodes (8): PhotoLightbox, PhotoLightbox(), yet-another-react-lightbox@3.32.2(@types/react-dom@19.3.0(@types/react@19.3.0))(@types/react@19.3.0)(react-dom@19.3.0(react@19.3.0))(react@19.3.0), yet another react lightbox, yet another react lightbox plugins counter, yet another react lightbox plugins counter css, yet another react lightbox plugins zoom, yet another react lightbox styles css

### Community 45 - "Balíčky a závislosti"
Cohesion: 0.22
Nodes (9): code-block-writer@13.0.3, balanced-match@4.0.4, ts-morph@26.0.0, minimatch@10.2.6, brace-expansion@5.0.9, path-browserify@1.0.1, @ts-morph/common@0.27.0, @eslint/object-schema@3.0.5 (+1 more)

### Community 46 - "Balíčky a závislosti"
Cohesion: 0.38
Nodes (7): json5@2.2.3, json5@1.0.2, strip-bom@3.0.0, tsconfig-paths@4.2.0, @types/json5@0.0.29, minimist@1.2.8, tsconfig-paths@3.15.0

### Community 47 - "Balíčky a závislosti"
Cohesion: 0.43
Nodes (7): fast-levenshtein@2.0.6, prelude-ls@1.2.1, type-check@0.4.0, optionator@0.9.4, word-wrap@1.2.5, levn@0.4.1, deep-is@0.1.4

### Community 48 - "Balíčky a závislosti"
Cohesion: 0.29
Nodes (7): object-assign@4.1.1, react-is@16.13.1, loose-envify@1.4.0, cors@2.8.6, vary@1.1.2, prop-types@15.8.1, js-tokens@4.0.0

### Community 49 - "scripts/check-built-metadata.mjs"
Cohesion: 0.40
Nodes (4): node assert strict, node fs, node path, pages

### Community 50 - "Balíčky a závislosti"
Cohesion: 0.33
Nodes (6): yocto-queue@0.1.0, find-up@5.0.0, path-exists@4.0.0, p-locate@5.0.0, locate-path@6.0.0, p-limit@3.1.0

### Community 51 - "Balíčky a závislosti"
Cohesion: 0.33
Nodes (6): json-schema-traverse@0.4.1, punycode@2.3.1, fast-deep-equal@3.1.3, uri-js@4.4.1, ajv@6.14.0, fast-json-stable-stringify@2.1.0

### Community 52 - "Balíčky a závislosti"
Cohesion: 0.50
Nodes (5): esquery@1.7.0, eslint-scope@9.1.2, esrecurse@4.3.0, estraverse@5.3.0, @types/esrecurse@4.3.1

### Community 53 - "Balíčky a závislosti"
Cohesion: 0.50
Nodes (5): hermes-estree@0.25.1, hermes-parser@0.25.1, zod@4.3.6, zod-validation-error@4.0.2(zod@4.3.6), eslint-plugin-react-hooks@7.0.1(eslint@10.10.0(jiti@2.7.0))

### Community 54 - "Balíčky a závislosti"
Cohesion: 0.60
Nodes (5): @jridgewell/gen-mapping@0.3.13, @jridgewell/resolve-uri@3.1.2, @jridgewell/remapping@2.3.5, @jridgewell/sourcemap-codec@1.5.5, @jridgewell/trace-mapping@0.3.31

### Community 55 - "Balíčky a závislosti"
Cohesion: 0.40
Nodes (5): recast@0.23.11, ast-types@0.16.1, esprima@4.0.1, source-map@0.6.1, tiny-invariant@1.3.3

### Community 57 - "Balíčky a závislosti"
Cohesion: 0.50
Nodes (4): is-number@7.0.0, fill-range@7.1.1, to-regex-range@5.0.1, braces@3.0.3

### Community 58 - "Balíčky a závislosti"
Cohesion: 0.50
Nodes (4): @emnapi/runtime@1.11.3, @img/sharp-webcontainers-wasm32@0.35.4, @img/sharp-freebsd-wasm32@0.35.4, @img/sharp-wasm32@0.35.4

### Community 67 - "Balíčky a závislosti"
Cohesion: 1.00
Nodes (3): @floating-ui/dom@1.7.5, @floating-ui/utils@0.2.10, @floating-ui/core@1.7.4

## Knowledge Gaps
- **533 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `iconLibrary` (+528 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 536 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next@16.3.5(@babel/core@7.29.0)(@types/node@22.20.2)(react-dom@19.3.0(react@19.3.0))(react@19.3.0)` connect `Balíčky a závislosti` to `Balíčky a závislosti`, `Balíčky a závislosti`, `Balíčky a závislosti`?**
  _High betweenness centrality (0.003) - this node is a cross-community bridge._
- **Why does `radix ui` connect `components/ui/navigation-menu.tsx` to `Balíčky a závislosti`?**
  _High betweenness centrality (0.002) - this node is a cross-community bridge._
- **Why does `/aktuality/[slug]` connect `app/spoluprace/content.ts` to `app/aktuality/[slug]/page.tsx`, `app/layout.tsx`?**
  _High betweenness centrality (0.002) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _533 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Fotografie všech alb` be split into smaller, more focused modules?**
  _Cohesion score 0.009478672985781991 - nodes in this community are weakly interconnected._
- **Should `Balíčky a závislosti` be split into smaller, more focused modules?**
  _Cohesion score 0.05285942128047391 - nodes in this community are weakly interconnected._
- **Should `Balíčky a závislosti` be split into smaller, more focused modules?**
  _Cohesion score 0.06013745704467354 - nodes in this community are weakly interconnected._
## Evidence limits

Token usage for host-agent semantic extraction is unavailable; zeros are placeholders, not measured free usage. External URLs were indexed from source, not fetched. See health.json for collapsed parallel relations; extraction.json retains the complete evidence.
