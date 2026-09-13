# Graphify pro vývoj webu

## Pokrytí a výstupy

AST zachycuje symboly, importy a volání. Ověřená sémantika doplňuje stránky, interakce, data a obsah obrázků. Skript přidává souborový inventář, routy včetně článků, literální odkazy a npm lockfile. Přesné pokrytí je v coverage.json. Vyloučené jsou .git, node_modules, .next, environment soubory a obsah vzdálených webů/PDF. Tranzitivní topologie pochází z npm lockfilu, ne fyzického stromu pnpm.

| Soubor v graphify-out/ | Účel |
|---|---|
| graph.html | Interaktivní graf |
| graph.json | Směrovaný graf pro dotazy |
| extraction.json | Všechny vztahy před slučováním DiGraph |
| semantic.json | Ověřené fragmenty + SHA-256 zdrojů |
| GRAPH_REPORT.md | Huby, komunity, koheze, otázky |
| health.json | Chybějící konce, smyčky a slučování |
| coverage.json | Inventář, routy, počty, zastaralé zdroje |
| cost.json | Nedostupné měření host-agent tokenů |

EXTRACTED je doložený vztah, INFERRED označená inference. URL v komentáři je reference, ne aktivní síťový požadavek. Centralita není automatické doporučení refaktoringu.

## Dotazy

```sh
rtk proxy graphify query "GALLERY_ALBUMS Hero galerie" --budget 2500
rtk proxy graphify query "StaticContentPage STATIC_PAGES" --budget 2500
rtk proxy graphify query "getBaseUrl metadata sitemap robots" --budget 2500
rtk proxy graphify affected "GALLERY_ALBUMS" --depth 3
rtk proxy graphify explain "getBaseUrl"
```

Začít přesným symbolem/cestou. affected závisí na orientaci druhů hran; chybějící cesta nedokazuje neexistující vztah v aplikaci.

## Obnova

```sh
rtk proxy uv run --with graphifyy python scripts/build-graph.py
rtk proxy graphify export html
rtk proxy uv run --with graphifyy python scripts/check-graph.py
rtk proxy graphify benchmark
rtk git diff --check
```

První příkaz může instalovat nástroj. S již instalovaným Graphify lze použít Python z jeho shebangu; zde `/Users/samuel/.local/share/uv/tools/graphifyy/bin/python`. Web na této cestě nezávisí.

Skript obnoví AST a inventář. Sémantiku kontroluje hashem: změněné/odstraněné zdroje vynechá a vypíše SEMANTIC REFRESH REQUIRED. Potom nechat agenta přečíst dotčené soubory podle Graphify extraction-spec a obnovit fragmenty i source_hashes v semantic.json. Pouhé přepsání hashe není kontrola. Nový obsahový soubor také potřebuje sémantickou extrakci.

Pro plný graf používat projektový skript; samotné graphify update neprovádí doplněk lockfilu/rout ani vizuální čtení. Při odmítnutí menšího grafu ověřit důvod, neobcházet ochranu automaticky.

DiGraph může sloučit vztahy se stejnými konci. Počet je v health.json, úplná evidence v extraction.json. Nulové tokeny standardního reportu jsou nedostupné měření, ne naměřená nula. Graf se automaticky nesleduje na pozadí ani nepublikuje.

HTML export načítá vis-network 9.1.6 z unpkg, takže k prvnímu zobrazení potřebuje síť. Data grafu jsou vložená přímo v HTML. Datová kontrola a CLI dotaz prošly; vizuální kontrolu v této relaci zablokovala bezpečnostní politika vestavěného prohlížeče pro lokální file adresy.
