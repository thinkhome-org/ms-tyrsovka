# MŠ Tyršovka

Web MŠ Tyršovka postavený na Next.js.

## Vývoj

```bash
pnpm install
cp .dev.vars.example .dev.vars
pnpm db:setup:local
pnpm dev
```

`pnpm db:setup:local` vytvoří lokální D1 a nahraje ukázkové aktuality ze `seed/d1.sql` (stejná data jsou i v `seed/tyrsovka.sqlite`). Redakce je na `/admin`. Heslo nastavte v `.dev.vars` (`ADMIN_PASSWORD` a `AUTH_SECRET`).

## Cloudflare (produkce)

1. Vytvořte D1 databázi a R2 bucket:

```bash
pnpm wrangler d1 create tyrsovka
pnpm wrangler r2 bucket create tyrsovka-media
```

2. Do `wrangler.jsonc` doplňte skutečné `database_id`.
3. Spusťte migrace a nastavte tajemství:

```bash
pnpm db:migrate:remote
pnpm wrangler secret put ADMIN_PASSWORD
pnpm wrangler secret put AUTH_SECRET
pnpm cf-typegen
```

## Kontroly

```bash
pnpm lint
pnpm build
```
