PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;

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

COMMIT;

CREATE TABLE IF NOT EXISTS notices (
	id TEXT PRIMARY KEY,
	title TEXT NOT NULL,
	category TEXT NOT NULL CHECK (category IN ('zpravy', 'dokumenty', 'skolni-rad', 'ostatni')),
	file_key TEXT,
	href TEXT,
	expires_at TEXT,
	published_at TEXT,
	created_at TEXT NOT NULL,
	updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_notices_category_published
	ON notices (category, published_at DESC);

CREATE TABLE IF NOT EXISTS events (
	id TEXT PRIMARY KEY,
	date_val TEXT NOT NULL,
	date_display TEXT NOT NULL DEFAULT '',
	title TEXT NOT NULL,
	who TEXT NOT NULL DEFAULT '',
	created_at TEXT NOT NULL,
	updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_events_date_val
	ON events (date_val);

CREATE TABLE IF NOT EXISTS menu_days (
	day_date TEXT PRIMARY KEY,
	snack_1 TEXT NOT NULL DEFAULT '',
	soup TEXT NOT NULL DEFAULT '',
	main_meal TEXT NOT NULL DEFAULT '',
	snack_2 TEXT NOT NULL DEFAULT '',
	updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS people (
	id TEXT PRIMARY KEY,
	name TEXT NOT NULL,
	role TEXT NOT NULL DEFAULT '',
	email TEXT NOT NULL DEFAULT '',
	phone TEXT NOT NULL DEFAULT '',
	section TEXT NOT NULL DEFAULT 'vedeni' CHECK (section IN ('vedeni', 'jidelna')),
	position_order INTEGER NOT NULL DEFAULT 0,
	created_at TEXT NOT NULL,
	updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_people_section_order
	ON people (section, position_order);

CREATE TABLE IF NOT EXISTS classroom_contacts (
	slug TEXT PRIMARY KEY,
	email TEXT NOT NULL DEFAULT '',
	phone TEXT
);

CREATE TABLE IF NOT EXISTS settings (
	key TEXT PRIMARY KEY,
	value TEXT NOT NULL DEFAULT ''
);

INSERT OR IGNORE INTO notices (
	id, title, category, file_key, href, expires_at, published_at, created_at, updated_at
) VALUES
	(
		'seed-notice-vz-2024',
		'Výroční zpráva 2024/25',
		'zpravy',
		NULL,
		'https://files.site.site3.eu/f8/3e/f83e2234-030b-4972-8792-fc03e7b481f3.pdf',
		NULL,
		'2025-09-01',
		'2025-09-01T08:00:00.000Z',
		'2025-09-01T08:00:00.000Z'
	),
	(
		'seed-notice-vz-web',
		'Výroční zprávy na původním webu',
		'zpravy',
		NULL,
		'https://www.tyrsovka.cz/o-%C5%A1kole/v%C3%BDro%C4%8Dn%C3%AD-zpr%C3%A1vy',
		NULL,
		'2025-09-01',
		'2025-09-01T08:00:00.000Z',
		'2025-09-01T08:00:00.000Z'
	),
	(
		'seed-notice-csi',
		'Zprávy ČŠI',
		'zpravy',
		NULL,
		'https://www.tyrsovka.cz/o-%C5%A1kole/v%C3%BDro%C4%8Dn%C3%AD-zpr%C3%A1vy',
		NULL,
		'2025-09-01',
		'2025-09-01T08:00:00.000Z',
		'2025-09-01T08:00:00.000Z'
	),
	(
		'seed-notice-zadost',
		'Žádost k předškolnímu vzdělávání',
		'dokumenty',
		NULL,
		'https://www.tyrsovka.cz/informace-pro-rodi%C4%8De/dokumenty-a-potvrzeni',
		NULL,
		'2025-09-01',
		'2025-09-01T08:00:00.000Z',
		'2025-09-01T08:00:00.000Z'
	),
	(
		'seed-notice-kriteria',
		'Kritéria pro přijetí 2025/2026',
		'dokumenty',
		NULL,
		'https://www.tyrsovka.cz/informace-pro-rodi%C4%8De/dokumenty-a-potvrzeni',
		NULL,
		'2025-09-01',
		'2025-09-01T08:00:00.000Z',
		'2025-09-01T08:00:00.000Z'
	),
	(
		'seed-notice-evidencni',
		'Evidenční list a potvrzení lékaře',
		'dokumenty',
		NULL,
		'https://www.tyrsovka.cz/informace-pro-rodi%C4%8De/dokumenty-a-potvrzeni',
		NULL,
		'2025-09-01',
		'2025-09-01T08:00:00.000Z',
		'2025-09-01T08:00:00.000Z'
	),
	(
		'seed-notice-odhlaska',
		'Odhláška z MŠ',
		'dokumenty',
		NULL,
		'https://www.tyrsovka.cz/informace-pro-rodi%C4%8De/dokumenty-a-potvrzeni',
		NULL,
		'2025-09-01',
		'2025-09-01T08:00:00.000Z',
		'2025-09-01T08:00:00.000Z'
	),
	(
		'seed-notice-povereni',
		'Pověření k vyzvedávání dítěte jinou osobou',
		'dokumenty',
		NULL,
		'https://www.tyrsovka.cz/informace-pro-rodi%C4%8De/dokumenty-a-potvrzeni',
		NULL,
		'2025-09-01',
		'2025-09-01T08:00:00.000Z',
		'2025-09-01T08:00:00.000Z'
	),
	(
		'seed-notice-souhlas',
		'Informovaný souhlas se zpracováním osobních údajů',
		'dokumenty',
		NULL,
		'https://www.tyrsovka.cz/informace-pro-rodi%C4%8De/dokumenty-a-potvrzeni',
		NULL,
		'2025-09-01',
		'2025-09-01T08:00:00.000Z',
		'2025-09-01T08:00:00.000Z'
	),
	(
		'seed-notice-sazebnik',
		'Sazebník úhrad za poskytování informací',
		'dokumenty',
		NULL,
		'https://www.tyrsovka.cz/informace-pro-rodi%C4%8De/dokumenty-a-potvrzeni',
		NULL,
		'2025-09-01',
		'2025-09-01T08:00:00.000Z',
		'2025-09-01T08:00:00.000Z'
	),
	(
		'seed-notice-skolni-rad',
		'Školní řád ke stažení',
		'skolni-rad',
		NULL,
		'https://www.tyrsovka.cz/informace-pro-rodi%C4%8De/skolni-rad',
		NULL,
		'2025-09-01',
		'2025-09-01T08:00:00.000Z',
		'2025-09-01T08:00:00.000Z'
	);

INSERT OR IGNORE INTO events (
	id, date_val, date_display, title, who, created_at, updated_at
) VALUES
	(
		'seed-event-01',
		'2026-02-02',
		'2.–6. 2. 2026',
		'Lyžařský výcvik na Šibeničním vrchu',
		'Přihlášené děti',
		'2026-02-02T08:00:00.000Z',
		'2026-02-02T08:00:00.000Z'
	),
	(
		'seed-event-02',
		'2026-02-10',
		'',
		'Masopustní veselice – dopoledne plné her a smíchu ve třídách',
		'Všechny třídy',
		'2026-02-10T08:00:00.000Z',
		'2026-02-10T08:00:00.000Z'
	),
	(
		'seed-event-03',
		'2026-02-13',
		'',
		'Není všechno zlato, co se třpytí – preventivní program',
		'Hrušková, Jablková',
		'2026-02-13T08:00:00.000Z',
		'2026-02-13T08:00:00.000Z'
	),
	(
		'seed-event-04',
		'2026-02-23',
		'',
		'Když ptáčka lapají, pěkně mu zpívají – preventivní program',
		'Hrušková, Jablková',
		'2026-02-23T08:00:00.000Z',
		'2026-02-23T08:00:00.000Z'
	),
	(
		'seed-event-05',
		'2026-02-27',
		'',
		'Polámal se mraveneček – program zaměřený na zdraví, hygienu a bezpečnost',
		'Hrušková, Jablková',
		'2026-02-27T08:00:00.000Z',
		'2026-02-27T08:00:00.000Z'
	),
	(
		'seed-event-06',
		'2026-03-02',
		'2.–6. 3. 2026',
		'Bruslící týden na HC Kobra',
		'Přihlášené děti z Hruškové a Jablkové',
		'2026-03-02T08:00:00.000Z',
		'2026-03-02T08:00:00.000Z'
	),
	(
		'seed-event-07',
		'2026-03-09',
		'',
		'Divadlo Bravo! – Hra o trůn',
		'Hrušková, Jablková, Citrónová, Borůvková',
		'2026-03-09T08:00:00.000Z',
		'2026-03-09T08:00:00.000Z'
	),
	(
		'seed-event-08',
		'2026-03-09',
		'',
		'Divadlo Na Cikorce – Myška Eliška',
		'Meruňková, Jahodová',
		'2026-03-09T08:00:00.000Z',
		'2026-03-09T08:00:00.000Z'
	),
	(
		'seed-event-09',
		'2026-03-12',
		'',
		'Projektový den – Zdravá strava',
		'Všechny třídy',
		'2026-03-12T08:00:00.000Z',
		'2026-03-12T08:00:00.000Z'
	),
	(
		'seed-event-10',
		'2026-03-17',
		'',
		'O Sněhurce – Divadlo Pruhované panenky',
		'Všechny třídy',
		'2026-03-17T08:00:00.000Z',
		'2026-03-17T08:00:00.000Z'
	),
	(
		'seed-event-11',
		'2026-03-19',
		'',
		'Den otevřených dveří',
		'Zájemci o MŠ',
		'2026-03-19T08:00:00.000Z',
		'2026-03-19T08:00:00.000Z'
	),
	(
		'seed-event-12',
		'2026-03-25',
		'',
		'Knihadýlko – Jak si uděláme zeměkouli',
		'Hrušková, Jablková, Citrónová, Borůvková',
		'2026-03-25T08:00:00.000Z',
		'2026-03-25T08:00:00.000Z'
	),
	(
		'seed-event-13',
		'2026-03-25',
		'',
		'Knihadýlko – Dobrodružství pavouka Čendy',
		'Jahodová, Meruňková',
		'2026-03-25T08:00:00.000Z',
		'2026-03-25T08:00:00.000Z'
	),
	(
		'seed-event-14',
		'2026-03-25',
		'',
		'Jarní besídka – náhrada za vánoční představení',
		'Meruňková',
		'2026-03-25T08:00:00.000Z',
		'2026-03-25T08:00:00.000Z'
	),
	(
		'seed-event-15',
		'2026-03-30',
		'',
		'Bubnování – muzikoterapie',
		'Mladší třídy',
		'2026-03-30T08:00:00.000Z',
		'2026-03-30T08:00:00.000Z'
	),
	(
		'seed-event-16',
		'2026-03-31',
		'',
		'Bubnování – muzikoterapie',
		'Starší třídy',
		'2026-03-31T08:00:00.000Z',
		'2026-03-31T08:00:00.000Z'
	),
	(
		'seed-event-17',
		'2026-03-31',
		'',
		'Vítání jara – tvořivé dílny na zahradě',
		'Děti, rodiče a budoucí rodiny',
		'2026-03-31T08:00:00.000Z',
		'2026-03-31T08:00:00.000Z'
	),
	(
		'seed-event-18',
		'2026-04-07',
		'',
		'Planetárium – Hurvínkova vesmírná odysea',
		'Hrušková, Jablková',
		'2026-04-07T08:00:00.000Z',
		'2026-04-07T08:00:00.000Z'
	),
	(
		'seed-event-19',
		'2026-04-07',
		'',
		'Mobilní planetárium v DDM Na Cikorce',
		'Citrónová, Borůvková, Meruňková, Jahodová',
		'2026-04-07T08:00:00.000Z',
		'2026-04-07T08:00:00.000Z'
	),
	(
		'seed-event-20',
		'2026-04-09',
		'',
		'Gábina a Katka – Ztracené souhvězdí',
		'Všechny třídy',
		'2026-04-09T08:00:00.000Z',
		'2026-04-09T08:00:00.000Z'
	),
	(
		'seed-event-21',
		'2026-04-14',
		'',
		'Divadlo Dosvěta – Nej, nej ze/mě',
		'Všechny třídy',
		'2026-04-14T08:00:00.000Z',
		'2026-04-14T08:00:00.000Z'
	),
	(
		'seed-event-22',
		'2026-04-14',
		'',
		'Zápis do MŠ – osobní odevzdání přihlášky',
		'Zájemci o přijetí',
		'2026-04-14T08:00:00.000Z',
		'2026-04-14T08:00:00.000Z'
	),
	(
		'seed-event-23',
		'2026-04-17',
		'',
		'Nemocnice pro medvídky',
		'Mladší třídy',
		'2026-04-17T08:00:00.000Z',
		'2026-04-17T08:00:00.000Z'
	),
	(
		'seed-event-24',
		'2026-04-20',
		'',
		'Nemocnice pro medvídky',
		'Starší třídy',
		'2026-04-20T08:00:00.000Z',
		'2026-04-20T08:00:00.000Z'
	),
	(
		'seed-event-25',
		'2026-04-27',
		'',
		'Včelí království – didaktický workshop',
		'Jahodová, Meruňková',
		'2026-04-27T08:00:00.000Z',
		'2026-04-27T08:00:00.000Z'
	),
	(
		'seed-event-26',
		'2026-04-30',
		'',
		'Čarodějnický rej – dopolední aktivity venku',
		'Všechny třídy',
		'2026-04-30T08:00:00.000Z',
		'2026-04-30T08:00:00.000Z'
	),
	(
		'seed-event-27',
		'2026-05-04',
		'',
		'Hrajeme si na louce – workshop od Lesy Praha',
		'Borůvková, Citrónová',
		'2026-05-04T08:00:00.000Z',
		'2026-05-04T08:00:00.000Z'
	),
	(
		'seed-event-28',
		'2026-05-05',
		'',
		'Luční kvítí – workshop od Lesy Praha',
		'Jablková, Hrušková',
		'2026-05-05T08:00:00.000Z',
		'2026-05-05T08:00:00.000Z'
	),
	(
		'seed-event-29',
		'2026-05-05',
		'',
		'Besídka ke Dni maminek',
		'Meruňková',
		'2026-05-05T08:00:00.000Z',
		'2026-05-05T08:00:00.000Z'
	),
	(
		'seed-event-30',
		'2026-05-05',
		'',
		'Tvoření s představením ke Dni maminek',
		'Citrónová',
		'2026-05-05T08:00:00.000Z',
		'2026-05-05T08:00:00.000Z'
	),
	(
		'seed-event-31',
		'2026-05-06',
		'',
		'Besídka ke Dni maminek',
		'Jahodová',
		'2026-05-06T08:00:00.000Z',
		'2026-05-06T08:00:00.000Z'
	),
	(
		'seed-event-32',
		'2026-05-06',
		'',
		'Tvoření s tatínky – výroba dárku pro maminky',
		'Borůvková, Jablková, Hrušková',
		'2026-05-06T08:00:00.000Z',
		'2026-05-06T08:00:00.000Z'
	),
	(
		'seed-event-33',
		'2026-05-21',
		'',
		'Přespávání předškoláků',
		'Jablková, Hrušková',
		'2026-05-21T08:00:00.000Z',
		'2026-05-21T08:00:00.000Z'
	),
	(
		'seed-event-34',
		'2026-05-29',
		'',
		'Klaun Ferda a jeho parťák – akce k MDD',
		'Všechny třídy',
		'2026-05-29T08:00:00.000Z',
		'2026-05-29T08:00:00.000Z'
	),
	(
		'seed-event-35',
		'2026-06-01',
		'',
		'Sportovní olympiáda MŠ Tyršovka',
		'Všechny třídy',
		'2026-06-01T08:00:00.000Z',
		'2026-06-01T08:00:00.000Z'
	),
	(
		'seed-event-36',
		'2026-06-03',
		'',
		'Sportovní den mateřských škol Prahy 12',
		'Vybrané děti',
		'2026-06-03T08:00:00.000Z',
		'2026-06-03T08:00:00.000Z'
	),
	(
		'seed-event-37',
		'2026-06-11',
		'',
		'Zahradní slavnost a pasování předškoláků',
		'Všechny třídy a rodiče',
		'2026-06-11T08:00:00.000Z',
		'2026-06-11T08:00:00.000Z'
	),
	(
		'seed-event-38',
		'2026-06-15',
		'červen 2026',
		'Den dopravy u Viničního domku',
		'Bude upřesněno',
		'2026-06-15T08:00:00.000Z',
		'2026-06-15T08:00:00.000Z'
	),
	(
		'seed-event-39',
		'2026-06-20',
		'červen 2026',
		'Den zdraví u radnice MČ Praha 12',
		'Bude upřesněno',
		'2026-06-20T08:00:00.000Z',
		'2026-06-20T08:00:00.000Z'
	);

INSERT OR IGNORE INTO people (
	id, name, role, email, phone, section, position_order, created_at, updated_at
) VALUES
	(
		'seed-person-reditelka',
		'Mgr. Monika Všetečková Palubová',
		'Ředitelka MŠ',
		'reditelka@tyrsovka.cz',
		'+420 737 381 935',
		'vedeni',
		1,
		'2026-01-01T08:00:00.000Z',
		'2026-01-01T08:00:00.000Z'
	),
	(
		'seed-person-zastupkyne',
		'Hana Flekalová, DiS.',
		'Zástupkyně ředitelky',
		'',
		'',
		'vedeni',
		2,
		'2026-01-01T08:00:00.000Z',
		'2026-01-01T08:00:00.000Z'
	),
	(
		'seed-person-hospodarka',
		'Dobroslava Perevuzníková',
		'Hospodářka a vedoucí školní jídelny',
		'',
		'',
		'jidelna',
		1,
		'2026-01-01T08:00:00.000Z',
		'2026-01-01T08:00:00.000Z'
	);

INSERT OR IGNORE INTO classroom_contacts (slug, email, phone) VALUES
	('jahodova', 'jahodova@tyrsovka.cz', NULL),
	('merunkova', 'merunkova@tyrsovka.cz', NULL),
	('boruvkova', 'boruvkova@tyrsovka.cz', NULL),
	('citronova', 'citronova@tyrsovka.cz', '+420 731 252 242'),
	('jablkova', 'jablkova@tyrsovka.cz', NULL),
	('hruskova', 'hruskova@tyrsovka.cz', NULL);

INSERT OR IGNORE INTO settings (key, value) VALUES
	('org_name', 'Mateřská škola Tyršovka v Praze 12'),
	('address', 'Lysinská 184/45, 143 00 Praha 4 - Modřany'),
	('email', 'reditelka@tyrsovka.cz'),
	('phone', '+420 737 381 935'),
	('ico', '63109719'),
	('databox', '9u4k2vr'),
	('bank_account', '2000765379/0800'),
	('founder', 'Zřizovatelem školy je Městská část Praha 12, Generála Šišky 2375/6, 143 00 Praha 4 - Modřany.'),
	('current_info', ''),
	('urgent_title', 'Citrónová třída pro provozní situace'),
	('urgent_description', 'V případě brzkého ranního provozu, odpoledního provozu nebo pobytu dětí na zahradě kontaktujte tuto třídu.'),
	('urgent_phone', '+420 731 252 242');
