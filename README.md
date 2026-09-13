# MŠ Tyršovka — vývoj webu

Český informační web: Next.js App Router, React, TypeScript a Tailwind. Obsah je v TS/JSON/Markdown řetězcích. Fonty: Lora a Source Sans 3.

## Spuštění

```sh
rtk pnpm install --frozen-lockfile
rtk pnpm dev
```

Adresu ověřit ve výstupu serveru (výchozí localhost:3000). Build: `rtk pnpm build`, start: `rtk pnpm start`, lint: `rtk pnpm lint`.

## Vývojová dokumentace

- [Architektura, konfigurace, SEO a ověřování](docs/DEVELOPING.md)
- [Všechny stránky, komponenty a interakce](docs/UI.md)
- [Designový směr: minimalismus a pastelové barvy](docs/design.md)
- [Obsah a místa úprav](docs/CONTENT.md)
- [Inventář obrázků](docs/ASSETS.md)
- [Používání a aktualizace grafu](docs/GRAPH.md)
- [Interaktivní Graphify graf](graphify-out/graph.html)
- [Graphify report](graphify-out/GRAPH_REPORT.md)
- [Pokrytí souborů a rout](graphify-out/coverage.json)

Graf mapuje lokální zdroje, nikoliv ověřený stav produkce či obsah externích služeb.
