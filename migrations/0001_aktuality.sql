CREATE TABLE IF NOT EXISTS aktuality (
	id TEXT PRIMARY KEY,
	slug TEXT UNIQUE NOT NULL,
	title TEXT NOT NULL,
	excerpt TEXT NOT NULL DEFAULT '',
	body_html TEXT NOT NULL DEFAULT '',
	cover_key TEXT,
	status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
	published_at TEXT,
	created_at TEXT NOT NULL,
	updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_aktuality_status_published
	ON aktuality (status, published_at DESC);

INSERT OR IGNORE INTO aktuality (
	id, slug, title, excerpt, body_html, cover_key, status, published_at, created_at, updated_at
) VALUES
	(
		'seed-zapis-2026',
		'zapis-do-ms-2026-27',
		'Zápis do MŠ pro školní rok 2026/27',
		'Termíny, postup a důležité informace k zápisu dětí do MŠ Tyršovka.',
		'<p>Připravujeme zápis do mateřské školy pro školní rok 2026/2027. Sledujte tuto stránku pro termíny, potřebné doklady a postup podání přihlášky.</p>',
		'/tridy/jahodova.png',
		'published',
		'2026-02-12',
		'2026-02-12T08:00:00.000Z',
		'2026-02-12T08:00:00.000Z'
	),
	(
		'seed-karneval',
		'karneval-ve-skolce-informace',
		'Karneval ve školce – informace',
		'Kdy se karneval koná, co si vzít s sebou a jak bude probíhat program.',
		'<p>Ve školce chystáme karneval. Děti mohou přijít v kostýmu, který jim dovolí pohodlně si hrát a pohybovat se. Podrobnosti k programu doplníme včas.</p>',
		'/tridy/boruvkova.png',
		'published',
		'2026-02-03',
		'2026-02-03T08:00:00.000Z',
		'2026-02-03T08:00:00.000Z'
	),
	(
		'seed-dod',
		'den-otevrenych-dveri',
		'Den otevřených dveří pro budoucí rodiče',
		'Prohlídka školky a setkání s učitelkami pro rodiny, které se s Tyršovkou teprve seznamují.',
		'<p>Zveme budoucí rodiče na den otevřených dveří. Prohlédnete si třídy, zahradu a popovídáte si s učitelkami o provozu školky i adaptaci.</p>',
		'/tridy/boruvkova.png',
		'published',
		'2026-01-30',
		'2026-01-30T08:00:00.000Z',
		'2026-01-30T08:00:00.000Z'
	),
	(
		'seed-plavani',
		'plavani-predskolaku-terminy',
		'Plavání předškoláků – organizace a termíny',
		'Rozpis plavání, sraz a věci, které mají předškoláci s sebou.',
		'<p>Předškoláci se účastní plaveckého výcviku. Termíny, místo srazu a seznam věcí s sebou najdete v této aktualitě, jakmile bude rozpis potvrzený.</p>',
		'/tridy/boruvkova.png',
		'published',
		'2026-01-29',
		'2026-01-29T08:00:00.000Z',
		'2026-01-29T08:00:00.000Z'
	),
	(
		'seed-prazdniny',
		'jarni-prazdniny-provoz',
		'Jarní prázdniny – provoz a omezení',
		'Jak bude školka v jarních prázdninách otevřená a co nahlásit předem.',
		'<p>O jarních prázdninách může být provoz školky upravený podle zájmu rodin. Prosíme o včasné nahlášení docházky, abychom mohli provoz připravit.</p>',
		'/tridy/jahodova.png',
		'published',
		'2026-01-27',
		'2026-01-27T08:00:00.000Z',
		'2026-01-27T08:00:00.000Z'
	);
