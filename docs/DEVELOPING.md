# Vývoj MŠ Tyršovka

Zdrojový stav zdokumentován 2026-09-13. Popis lokální implementace, ne ověřeného produkčního deploymentu.

## Architektura

Next.js App Router má 16 statických cest a šablonu `/aktuality/[slug]`. Layout přidává navigaci, patičku, češtinu a fonty. Serverové stránky čtou obsah importem; interaktivní části mají `use client`. Aplikační zdroje neobsahují vlastní API route, databázového klienta, přihlášení ani CMS. Úprava obsahu vyžaduje změnu zdrojů a nový build/deployment.

```mermaid
flowchart LR
    layout[app/layout.tsx] --> nav[Navigace]
    layout --> pages[Stránky]
    layout --> footer[Patička]
    data[TS obsah a JSON aktuality] --> pages
    static[lib/static-page-content.ts] --> renderer[StaticContentPage]
    renderer --> pages
    albums[app/galerie/content.ts] --> gallery[Galerie a lightbox]
    albums --> hero[Hero koláž]
    seo[lib/seo.ts] --> pages
    seo --> sitemap[Sitemap a robots]
    css[app/globals.css] --> layout
```

Routy a kompozice: [UI.md](UI.md). Texty: [CONTENT.md](CONTENT.md). Obrázky: [ASSETS.md](ASSETS.md).

## Konfigurace

| Soubor | Úloha |
|---|---|
| `package.json` | Dev/build/start/lint; manifest Next 16.3.5, React 19.3.0, TS ^7.0.2, ESLint ^10.10.0. Nejde o nové ověření npm latest. |
| `pnpm-lock.yaml` | Zamčené řešení pnpm, které používá Vercel. |
| `package-lock.json` | Zamčené řešení npm; historický a nyní neaktuální. Vývoj a graf používají pnpm-lock.yaml. |
| `pnpm-workspace.yaml` | allowBuilds: msw, sharp, unrs-resolver; 12 minimumReleaseAgeExclude výjimek pro Next 16.3.5. Při zahájení dokumentace untracked; přítomnost v deploymentu nedoložena. |
| `vercel.json:2` | `pnpm install --no-frozen-lockfile` může přepočítat lockfile; není důkazem deploymentu. |
| `next.config.ts:4` | HTTPS obrázky files.site.site3.eu a raw.githubusercontent.com. |
| `tsconfig.json` | Strict TS, bundler resolution, JSON importy, alias @/*, Next plugin. |
| `eslint.config.mjs` | Next Core Web Vitals/TypeScript presety, ignorování buildů. |
| `postcss.config.mjs` | Tailwind PostCSS plugin. |
| `components.json` | shadcn new-york, RSC/TSX, CSS variables, lucide, registry Aceternity/React Bits. |
| `.gitignore` | Vyloučení instalací, buildů, environment souborů a generovaných typů. |

`cn()` (`lib/utils.ts`) spojuje clsx a tailwind-merge. `lib/button-link-classes.ts` odvozuje třídy ze serverově bezpečného `buttonVariants`; není druhým zdrojem stylů. Autoritativní je pnpm-lock.yaml. Synchronizaci historického npm lockfilu zastavila lokální politika EALLOWREMOTE; nepoužívat jej pro reprodukci aktuálního buildu. Graphify/Python není závislost webu.

## SEO a prostředí

`lib/seo.ts:11`: NEXT_PUBLIC_SITE_URL bez koncového lomítka → https + VERCEL_URL → localhost:3000. Produkční hodnoty dodává prostředí; graf environment soubory nečte. Chybějící doména ovlivňuje canonical, Open Graph i sitemap.

`buildPageMetadata()` (`lib/seo.ts:27`) sestavuje canonical/OG/Twitter. Layout přidává title template a favicon. Homepage obsahuje JSON-LD školy, detail JSON-LD článku. Sitemap ručně vypisuje 16 cest a přidává JSON slugs; lastModified je čas generování, nikoli editace. Robots povoluje celý web. Nová stránka vyžaduje kontrolu navigace, metadata a sitemap. Při změně domény kontrolovat i natvrdo zapsané odkazy.

## Místa změn

| Změna | Začátek | Dopady |
|---|---|---|
| Informační text | lib/static-page-content.ts | Markdown, přílohy, routa |
| Aktualita | app/data/aktuality.json | Slug, úvod, seznam, detail, sitemap |
| Album | app/galerie/content.ts | Galerie, lightbox, hero |
| Kontakty/zápisy | app/*/content.ts | Metadata, navigace, duplicity |
| Nová routa | app/<cesta>/page.tsx | Layout, canonical, navigace, sitemap |
| Vzhled | globals.css, layout.tsx | Kontrast, focus, sdílené UI |
| Balíček | Manifest + pnpm-lock.yaml | Build, lint, interakce |

## Ověřování

```sh
rtk pnpm lint
rtk pnpm build
rtk pnpm exec next build --webpack
rtk git diff --check
```

Webpack je diagnostická alternativa k Turbopacku, který zde v sandboxu selhává při práci s portem. Dne 2026-09-13 prošel produkční webpack build. Po odstranění nepoužívaného LogoLoop prošel ESLint 10 bez chyb i upozornění. Kompilátor zůstává TypeScript 7; alias `typescript` poskytuje kompatibilní TypeScript 6 API pro lintovací nástroje. `@eslint/compat` dočasně přizpůsobuje Next presety ESLintu 10.

Pokud pnpm při spuštění skriptu hlásí `ERR_PNPM_ABORTED_REMOVE_MODULES_DIR_NO_TTY`, porovnat `pnpm store path` s `storeDir` v `node_modules/.modules.yaml`. V tomto prostředí sandbox volí projektové `.pnpm-store/v11`, zatímco instalace používá uživatelské `Library/pnpm/store/v11`. Ověřený `pnpm run lint` mimo sandbox funguje. Kvůli tomuto rozdílu nepotvrzovat odstranění `node_modules` ani nevypínat bezpečnostní kontrolu; spouštět příkazy se stejným přístupem k úložišti jako instalaci.

Po buildu lze spustit `node scripts/check-built-metadata.mjs`: ověřuje neprázdné titulky vygenerovaných HTML stránek a přesný titulek homepage. Neověřuje interakce ani dostupnost externích obrázků.

Po změně UI ověřit routy, mobilní menu, klávesnici, lightbox, neexistující slug, odkazy, externí obrázky a doménu metadata/sitemap. Návod netvrdí, že tyto kontroly byly právě provedeny. Před změnou hledat spotřebitele v grafu, potom číst skutečné řádky. Obnova: [GRAPH.md](GRAPH.md).
