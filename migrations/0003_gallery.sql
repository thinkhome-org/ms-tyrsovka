CREATE TABLE IF NOT EXISTS gallery_albums (
	id TEXT PRIMARY KEY,
	slug TEXT NOT NULL UNIQUE,
	title TEXT NOT NULL,
	position_order INTEGER NOT NULL DEFAULT 0,
	created_at TEXT NOT NULL,
	updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_gallery_albums_order
	ON gallery_albums (position_order, title);

CREATE TABLE IF NOT EXISTS gallery_photos (
	id TEXT PRIMARY KEY,
	album_id TEXT NOT NULL,
	src TEXT NOT NULL,
	alt TEXT NOT NULL DEFAULT '',
	position_order INTEGER NOT NULL DEFAULT 0,
	created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_gallery_photos_album
	ON gallery_photos (album_id, position_order);


INSERT OR IGNORE INTO gallery_albums (
	id, slug, title, position_order, created_at, updated_at
) VALUES (
	'seed-album-tridy',
	'tridy',
	'Třídy',
	0,
	'2026-01-01T08:00:00.000Z',
	'2026-01-01T08:00:00.000Z'
);

INSERT OR IGNORE INTO gallery_photos (
	id, album_id, src, alt, position_order, created_at
) VALUES
	('seed-photo-tridy-000', 'seed-album-tridy', 'https://files.site.site3.eu/80/d1/80d19d26-5eec-4696-800e-78db372b6214.jpg', 'Jahodová třída', 0, '2026-01-01T08:00:00.000Z'),
	('seed-photo-tridy-001', 'seed-album-tridy', 'https://files.site.site3.eu/15/0e/150e5ef6-965a-4afd-bd2b-7805ab877a2b.jpg', 'Jahodová třída', 1, '2026-01-01T08:00:00.000Z'),
	('seed-photo-tridy-002', 'seed-album-tridy', 'https://files.site.site3.eu/19/4e/194e8e5f-ac4b-453e-878d-2d396480ac77.jpg', 'Jahodová třída', 2, '2026-01-01T08:00:00.000Z'),
	('seed-photo-tridy-003', 'seed-album-tridy', 'https://files.site.site3.eu/2e/d3/2ed370f6-e9cb-4d52-bbec-118fbab83bce.jpg', 'Jahodová třída', 3, '2026-01-01T08:00:00.000Z'),
	('seed-photo-tridy-004', 'seed-album-tridy', 'https://files.site.site3.eu/b0/46/b0467663-98b5-4f16-9f68-562b2a2bbd88.jpg', 'Meruňková třída', 4, '2026-01-01T08:00:00.000Z'),
	('seed-photo-tridy-005', 'seed-album-tridy', 'https://files.site.site3.eu/20/09/20093ea8-80d4-4384-94d2-b54034747fb6.jpg', 'Meruňková třída', 5, '2026-01-01T08:00:00.000Z'),
	('seed-photo-tridy-006', 'seed-album-tridy', 'https://files.site.site3.eu/e7/ed/e7ed9451-34c1-4b72-9ad1-831a7dbaa799.jpg', 'Meruňková třída', 6, '2026-01-01T08:00:00.000Z'),
	('seed-photo-tridy-007', 'seed-album-tridy', 'https://files.site.site3.eu/0d/a3/0da3d3fd-f9ce-4b65-a112-38dda6378bc9.jpg', 'Meruňková třída', 7, '2026-01-01T08:00:00.000Z'),
	('seed-photo-tridy-008', 'seed-album-tridy', 'https://files.site.site3.eu/d6/90/d690a617-38a1-4d55-9ae1-6448fa105a4d.jpg', 'Borůvková třída', 8, '2026-01-01T08:00:00.000Z'),
	('seed-photo-tridy-009', 'seed-album-tridy', 'https://files.site.site3.eu/4b/b4/4bb4978b-d5a7-44d9-8612-f15e49a2738d.jpg', 'Borůvková třída', 9, '2026-01-01T08:00:00.000Z'),
	('seed-photo-tridy-010', 'seed-album-tridy', 'https://files.site.site3.eu/ed/fe/edfea34d-7734-4748-bcd0-746b74bbab39.jpg', 'Borůvková třída', 10, '2026-01-01T08:00:00.000Z'),
	('seed-photo-tridy-011', 'seed-album-tridy', 'https://files.site.site3.eu/6f/75/6f75e4e7-30fc-441a-b201-7a40ff8afa28.jpg', 'Borůvková třída', 11, '2026-01-01T08:00:00.000Z'),
	('seed-photo-tridy-012', 'seed-album-tridy', 'https://files.site.site3.eu/4c/99/4c99bd7a-5bb9-4b48-9d58-e72709b6cb54.JPG', 'Citrónová třída', 12, '2026-01-01T08:00:00.000Z'),
	('seed-photo-tridy-013', 'seed-album-tridy', 'https://files.site.site3.eu/ff/6c/ff6c39ce-877f-44dc-8329-4703b069a036.JPG', 'Citrónová třída', 13, '2026-01-01T08:00:00.000Z'),
	('seed-photo-tridy-014', 'seed-album-tridy', 'https://files.site.site3.eu/41/39/413973e2-be35-4d65-bb45-dd2edd99a147.JPG', 'Citrónová třída', 14, '2026-01-01T08:00:00.000Z'),
	('seed-photo-tridy-015', 'seed-album-tridy', 'https://files.site.site3.eu/03/51/0351b9ec-ca60-48ff-8a62-7e7b58d34918.JPG', 'Citrónová třída', 15, '2026-01-01T08:00:00.000Z'),
	('seed-photo-tridy-016', 'seed-album-tridy', 'https://files.site.site3.eu/b0/45/b045a11c-abb7-4535-82b2-000a63652c32.JPG', 'Citrónová třída', 16, '2026-01-01T08:00:00.000Z'),
	('seed-photo-tridy-017', 'seed-album-tridy', 'https://files.site.site3.eu/25/39/2539da82-67ff-46f3-865b-fb2c144034ec.JPG', 'Jablková třída', 17, '2026-01-01T08:00:00.000Z'),
	('seed-photo-tridy-018', 'seed-album-tridy', 'https://files.site.site3.eu/42/fd/42fd3f83-a3ca-454a-88ce-53ab33f4e459.JPG', 'Jablková třída', 18, '2026-01-01T08:00:00.000Z'),
	('seed-photo-tridy-019', 'seed-album-tridy', 'https://files.site.site3.eu/74/fa/74fafae1-5f03-4bfb-b02c-efc179065231.jpg', 'Jablková třída', 19, '2026-01-01T08:00:00.000Z'),
	('seed-photo-tridy-020', 'seed-album-tridy', 'https://files.site.site3.eu/28/b8/28b8a1fd-899f-4c15-8c56-9896bd8ed9ec.jpg', 'Jablková třída', 20, '2026-01-01T08:00:00.000Z'),
	('seed-photo-tridy-021', 'seed-album-tridy', 'https://files.site.site3.eu/86/ec/86ec4e2b-c068-4d27-801d-30ea97ba9059.jpg', 'Hrušková třída', 21, '2026-01-01T08:00:00.000Z'),
	('seed-photo-tridy-022', 'seed-album-tridy', 'https://files.site.site3.eu/c2/49/c249540c-bb60-4d01-b284-5f33efdd9c94.jpg', 'Hrušková třída', 22, '2026-01-01T08:00:00.000Z'),
	('seed-photo-tridy-023', 'seed-album-tridy', 'https://files.site.site3.eu/9a/b1/9ab15a09-b0fb-4946-9df5-3520ad2e8949.jpg', 'Hrušková třída', 23, '2026-01-01T08:00:00.000Z'),
	('seed-photo-tridy-024', 'seed-album-tridy', 'https://files.site.site3.eu/15/04/15041e6e-dc49-44ad-90b9-b8f24a2879f8.jpg', 'Hrušková třída', 24, '2026-01-01T08:00:00.000Z');

INSERT OR IGNORE INTO gallery_albums (
	id, slug, title, position_order, created_at, updated_at
) VALUES (
	'seed-album-zahrada',
	'zahrada',
	'Zahrada',
	1,
	'2026-01-01T08:00:00.000Z',
	'2026-01-01T08:00:00.000Z'
);

INSERT OR IGNORE INTO gallery_photos (
	id, album_id, src, alt, position_order, created_at
) VALUES
	('seed-photo-zahrada-000', 'seed-album-zahrada', 'https://files.site.site3.eu/c7/0a/c70af411-c755-481b-bd4b-0a99315bc2bd.JPG', 'Již osazené záhony', 0, '2026-01-01T08:00:00.000Z'),
	('seed-photo-zahrada-001', 'seed-album-zahrada', 'https://files.site.site3.eu/6c/92/6c92a403-e636-4cd0-8623-9b9e25dd1dde.JPG', 'Již osazené záhony', 1, '2026-01-01T08:00:00.000Z'),
	('seed-photo-zahrada-002', 'seed-album-zahrada', 'https://files.site.site3.eu/c3/40/c34058a3-e13d-4158-967d-b47cb48129ac.jpg', 'Nové záhony', 2, '2026-01-01T08:00:00.000Z'),
	('seed-photo-zahrada-003', 'seed-album-zahrada', 'https://files.site.site3.eu/35/93/35938948-8f47-43b2-94c7-c2696a974c59.jpg', 'Nové záhony', 3, '2026-01-01T08:00:00.000Z'),
	('seed-photo-zahrada-004', 'seed-album-zahrada', 'https://files.site.site3.eu/e7/88/e788a670-29be-4585-b6f1-8ea5a84f64f5.jpg', 'Posezení pod stromem', 4, '2026-01-01T08:00:00.000Z'),
	('seed-photo-zahrada-005', 'seed-album-zahrada', 'https://files.site.site3.eu/05/4c/054cbfde-e1ef-4fee-b7b8-2e0bf66297ea.jpg', 'Hnízdo', 5, '2026-01-01T08:00:00.000Z'),
	('seed-photo-zahrada-006', 'seed-album-zahrada', 'https://files.site.site3.eu/c1/99/c199d95b-a35c-4185-ac97-94428271aba0.jpg', 'Dřevěné dvojkolo', 6, '2026-01-01T08:00:00.000Z'),
	('seed-photo-zahrada-007', 'seed-album-zahrada', 'https://files.site.site3.eu/ce/bf/cebfb7a3-6694-4d36-9a57-d83a6539dfd5.jpg', 'Balanční prvek u stromu', 7, '2026-01-01T08:00:00.000Z'),
	('seed-photo-zahrada-008', 'seed-album-zahrada', 'https://files.site.site3.eu/dd/92/dd92ceca-3955-4344-b4ce-aba880ee1dbe.jpg', 'Balanční klády', 8, '2026-01-01T08:00:00.000Z'),
	('seed-photo-zahrada-009', 'seed-album-zahrada', 'https://files.site.site3.eu/43/29/4329dab7-11e5-4e1d-827c-2047a239908e.jpg', 'Zahrada Jahody', 9, '2026-01-01T08:00:00.000Z'),
	('seed-photo-zahrada-010', 'seed-album-zahrada', 'https://files.site.site3.eu/8b/0c/8b0c670d-4821-4dff-a79b-8db7c3ddc869.jpg', 'Zahrada Jahody', 10, '2026-01-01T08:00:00.000Z'),
	('seed-photo-zahrada-011', 'seed-album-zahrada', 'https://files.site.site3.eu/0c/51/0c511627-bd1e-4e86-8e2d-0abab3818bf9.jpg', 'Zahrada Jahody', 11, '2026-01-01T08:00:00.000Z'),
	('seed-photo-zahrada-012', 'seed-album-zahrada', 'https://files.site.site3.eu/f2/a1/f2a1298f-2c3c-4eca-a35d-ce2bfc902f79.jpg', 'Zahrada Jahody', 12, '2026-01-01T08:00:00.000Z');

INSERT OR IGNORE INTO gallery_albums (
	id, slug, title, position_order, created_at, updated_at
) VALUES (
	'seed-album-prostory',
	'prostory',
	'Vnitřní prostory',
	2,
	'2026-01-01T08:00:00.000Z',
	'2026-01-01T08:00:00.000Z'
);

INSERT OR IGNORE INTO gallery_photos (
	id, album_id, src, alt, position_order, created_at
) VALUES
	('seed-photo-prostory-000', 'seed-album-prostory', 'https://files.site.site3.eu/a9/64/a96452b0-292e-4008-8120-0e4a5736e30f.jpg', 'Učebna', 0, '2026-01-01T08:00:00.000Z'),
	('seed-photo-prostory-001', 'seed-album-prostory', 'https://files.site.site3.eu/9f/93/9f93e2a1-a870-4c1c-8788-74843b190eb6.jpg', 'Keramika', 1, '2026-01-01T08:00:00.000Z'),
	('seed-photo-prostory-002', 'seed-album-prostory', 'https://files.site.site3.eu/79/64/79645413-6f66-4507-ae35-f7b9a369cae9.jpg', 'Výtvarný ateliér', 2, '2026-01-01T08:00:00.000Z'),
	('seed-photo-prostory-003', 'seed-album-prostory', 'https://files.site.site3.eu/e0/32/e032093c-f97d-4162-a667-d836f71911a9.jpg', 'Tělocvična', 3, '2026-01-01T08:00:00.000Z'),
	('seed-photo-prostory-004', 'seed-album-prostory', 'https://files.site.site3.eu/40/e8/40e844a2-9126-4897-a6ee-00e6b3183015.jpg', 'Tělocvična', 4, '2026-01-01T08:00:00.000Z');

INSERT OR IGNORE INTO gallery_albums (
	id, slug, title, position_order, created_at, updated_at
) VALUES (
	'seed-album-kuchyne',
	'kuchyne',
	'Z naší kuchyně',
	3,
	'2026-01-01T08:00:00.000Z',
	'2026-01-01T08:00:00.000Z'
);

INSERT OR IGNORE INTO gallery_photos (
	id, album_id, src, alt, position_order, created_at
) VALUES
	('seed-photo-kuchyne-000', 'seed-album-kuchyne', 'https://files.site.site3.eu/cc/b7/ccb7095f-c901-4199-8acd-868bdb3bca51.JPG', 'Školní jídelna', 0, '2026-01-01T08:00:00.000Z'),
	('seed-photo-kuchyne-001', 'seed-album-kuchyne', 'https://files.site.site3.eu/10/f9/10f99dbb-5d9b-4faf-871e-b23e579a9546.JPG', 'Školní jídelna', 1, '2026-01-01T08:00:00.000Z'),
	('seed-photo-kuchyne-002', 'seed-album-kuchyne', 'https://files.site.site3.eu/98/b6/98b6211e-4647-454e-a091-6bfd5823fc35.JPG', 'Školní jídelna', 2, '2026-01-01T08:00:00.000Z'),
	('seed-photo-kuchyne-003', 'seed-album-kuchyne', 'https://files.site.site3.eu/17/1c/171c4e7f-7455-4a94-a2bc-33d1a9d86258.JPG', 'Školní jídelna', 3, '2026-01-01T08:00:00.000Z'),
	('seed-photo-kuchyne-004', 'seed-album-kuchyne', 'https://files.site.site3.eu/7d/68/7d68132c-8342-4459-8c21-06bd6439f522.JPG', 'Školní jídelna', 4, '2026-01-01T08:00:00.000Z'),
	('seed-photo-kuchyne-005', 'seed-album-kuchyne', 'https://files.site.site3.eu/8c/8a/8c8aef16-c8a5-421d-ad4e-7148a0b430e7.JPG', 'Školní jídelna', 5, '2026-01-01T08:00:00.000Z'),
	('seed-photo-kuchyne-006', 'seed-album-kuchyne', 'https://files.site.site3.eu/dc/50/dc5021a5-ec7c-4ad6-a9fd-c523bad4bb9d.JPG', 'Školní jídelna', 6, '2026-01-01T08:00:00.000Z'),
	('seed-photo-kuchyne-007', 'seed-album-kuchyne', 'https://files.site.site3.eu/30/9d/309d34eb-6d78-452c-b5ef-4a9871bcc004.JPG', 'Školní jídelna', 7, '2026-01-01T08:00:00.000Z');

INSERT OR IGNORE INTO gallery_albums (
	id, slug, title, position_order, created_at, updated_at
) VALUES (
	'seed-album-akce',
	'akce',
	'Akce',
	4,
	'2026-01-01T08:00:00.000Z',
	'2026-01-01T08:00:00.000Z'
);

INSERT OR IGNORE INTO gallery_photos (
	id, album_id, src, alt, position_order, created_at
) VALUES
	('seed-photo-akce-000', 'seed-album-akce', 'https://files.site.site3.eu/81/fc/81fccb09-3acc-49e5-8a9b-eba0566fdeab.JPG', 'Akce MŠ', 0, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-001', 'seed-album-akce', 'https://files.site.site3.eu/71/b8/71b81cf3-e2fe-4747-8f1f-b9cd26a53bb0.jpg', 'Akce MŠ', 1, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-002', 'seed-album-akce', 'https://files.site.site3.eu/e3/ad/e3ad59db-add2-40ad-8706-b829cd5ce0f9.jpg', 'Čerti ze ZŠ Wolfram', 2, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-003', 'seed-album-akce', 'https://files.site.site3.eu/c0/ae/c0aee2df-e6b3-453f-a36c-aa6b312aedb4.jpg', 'Akce MŠ', 3, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-004', 'seed-album-akce', 'https://files.site.site3.eu/d0/60/d060520e-8111-4a1a-bd31-c77ca8442dbc.jpg', 'Akce MŠ', 4, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-005', 'seed-album-akce', 'https://files.site.site3.eu/8c/ba/8cbac6a4-cbc7-4e4d-94c1-f97263f295d8.JPG', 'Spolupráce s KC Cílkova', 5, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-006', 'seed-album-akce', 'https://files.site.site3.eu/bd/78/bd7869e0-480a-48dd-be93-bf3bc3fc43ff.JPG', 'Akce MŠ', 6, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-007', 'seed-album-akce', 'https://files.site.site3.eu/71/6b/716b01a0-23e7-4846-971d-5a63e0370e9e.jpg', 'Otevření nového hřiště', 7, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-008', 'seed-album-akce', 'https://files.site.site3.eu/d0/d1/d0d15950-8ac6-4fc8-a90d-9b7ab495bd37.jpg', 'Otevření nového hřiště', 8, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-009', 'seed-album-akce', 'https://files.site.site3.eu/cb/d8/cbd8b74d-01ea-4f80-b719-9f36c9fe135e.jpg', 'Otevření nového hřiště', 9, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-010', 'seed-album-akce', 'https://files.site.site3.eu/24/81/2481138a-24e6-4773-a5d6-3e5e6976944e.jpg', 'Otevření nového hřiště', 10, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-011', 'seed-album-akce', 'https://files.site.site3.eu/80/f1/80f12f32-8a99-4d5c-b390-42926f22c79b.jpg', 'Zážitkové učení', 11, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-012', 'seed-album-akce', 'https://files.site.site3.eu/3e/6e/3e6e0716-9c07-4937-b019-f1d339ff1b2c.jpg', 'Zážitkové učení', 12, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-013', 'seed-album-akce', 'https://files.site.site3.eu/e2/c1/e2c1ea5e-0723-4ae2-b6a9-7c466e28b50c.jpg', 'Zážitkové učení', 13, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-014', 'seed-album-akce', 'https://files.site.site3.eu/22/e5/22e50f78-8b71-49c0-bb0b-170b97141319.jpg', 'Zážitkové učení', 14, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-015', 'seed-album-akce', 'https://files.site.site3.eu/b2/eb/b2eb421f-17b7-449d-a278-f4adbb3f9ea7.jpg', 'Zážitkové učení', 15, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-016', 'seed-album-akce', 'https://files.site.site3.eu/9d/a3/9da38c84-4494-466f-976c-9f0e5282c440.jpg', 'Zážitkové učení', 16, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-017', 'seed-album-akce', 'https://files.site.site3.eu/ac/8b/ac8ba66f-bf53-4187-8685-7b5e6820a9de.jpg', 'Zážitkové učení', 17, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-018', 'seed-album-akce', 'https://files.site.site3.eu/8c/16/8c164491-43ed-4e98-94b5-461ab3dc90e3.jpg', 'Zážitkové učení', 18, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-019', 'seed-album-akce', 'https://files.site.site3.eu/61/3f/613fd6ea-8bcc-43f9-ba00-595fad65242d.jpg', 'Zážitkové učení – Hrušková', 19, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-020', 'seed-album-akce', 'https://files.site.site3.eu/ea/e4/eae497b1-481f-4de7-a8e1-b8004e344092.jpg', 'Projekt Bezpečný pes', 20, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-021', 'seed-album-akce', 'https://files.site.site3.eu/a1/c5/a1c5b2d7-0571-48e6-b8a1-e975c928e0d3.jpg', 'Projekt Bezpečný pes', 21, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-022', 'seed-album-akce', 'https://files.site.site3.eu/39/af/39affa74-d1fd-44b6-9e29-574d7908e417.jpg', 'Projekt Bezpečný pes', 22, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-023', 'seed-album-akce', 'https://files.site.site3.eu/cd/f3/cdf36223-4625-4609-9b58-3efaaf4e6e3b.jpg', 'Projekt Bezpečný pes', 23, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-024', 'seed-album-akce', 'https://files.site.site3.eu/d6/76/d676776f-800d-401b-b510-f6c248b8bc38.jpg', 'Projekt Bezpečný pes', 24, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-025', 'seed-album-akce', 'https://files.site.site3.eu/f0/e5/f0e5494a-3ee7-4a99-b0c3-1f48b0084080.jpg', 'Projekt Bezpečný pes', 25, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-026', 'seed-album-akce', 'https://files.site.site3.eu/29/4a/294a860d-16c5-4a5b-977d-32a1f9b3f2d9.jpeg', 'Vítání jara 2025', 26, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-027', 'seed-album-akce', 'https://files.site.site3.eu/50/bd/50bd834b-b5f1-4a71-b042-ecee3ba500dc.jpeg', 'Vítání jara 2025', 27, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-028', 'seed-album-akce', 'https://files.site.site3.eu/8d/f2/8df246da-55a4-49f6-bae3-2a98b7f973de.jpeg', 'Vítání jara 2025', 28, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-029', 'seed-album-akce', 'https://files.site.site3.eu/a6/3a/a63aa400-2a24-48fa-8c1b-9b3a9a4edef3.jpeg', 'Vítání jara 2025', 29, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-030', 'seed-album-akce', 'https://files.site.site3.eu/f6/af/f6afc551-52d8-4c48-b073-8e41f6271c61.jpeg', 'Vítání jara 2025', 30, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-031', 'seed-album-akce', 'https://files.site.site3.eu/fb/55/fb5582bf-ad12-4723-8965-88b9fa90d6a0.jpeg', 'Vítání jara 2025', 31, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-032', 'seed-album-akce', 'https://files.site.site3.eu/94/0a/940a8da1-b993-4122-92f5-c367627aa29f.jpeg', 'Vítání jara 2025', 32, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-033', 'seed-album-akce', 'https://files.site.site3.eu/bb/c8/bbc83a48-b8b1-45a4-97aa-a0985dee25c6.jpeg', 'Vítání jara 2025', 33, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-034', 'seed-album-akce', 'https://files.site.site3.eu/09/cb/09cb1af8-df86-4ff6-8299-8b079a5493dd.jpg', 'Přednáška o zdravém stravování', 34, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-035', 'seed-album-akce', 'https://files.site.site3.eu/76/9f/769f2cbe-51f3-4c99-adb2-a93ee1b81215.jpg', 'Přednáška o zdravém stravování', 35, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-036', 'seed-album-akce', 'https://files.site.site3.eu/e5/82/e582dfc7-7014-40a3-b9a3-978b1de010c5.jpg', 'Přednáška o zdravém stravování', 36, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-037', 'seed-album-akce', 'https://files.site.site3.eu/39/a8/39a8eb6d-961b-476b-93a2-d338740cfdb6.jpg', 'Přednáška o zdravém stravování', 37, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-038', 'seed-album-akce', 'https://files.site.site3.eu/1a/01/1a019bc2-4ab0-4c9c-ad7f-804777887051.jpg', 'Projektový den – jablka', 38, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-039', 'seed-album-akce', 'https://files.site.site3.eu/3d/84/3d841940-b77d-48cf-a409-64db8e971e03.jpg', 'Projektový den – jablka', 39, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-040', 'seed-album-akce', 'https://files.site.site3.eu/56/a4/56a40683-05b6-4c86-818b-3a8695321674.jpg', 'Projektový den – hrušky', 40, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-041', 'seed-album-akce', 'https://files.site.site3.eu/d2/15/d215634a-02ed-436c-a803-4acd255b39cf.jpg', 'Projektový den – hrušky', 41, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-042', 'seed-album-akce', 'https://files.site.site3.eu/ef/27/ef271a80-bd2a-43e6-8058-d26ccd78ba1f.JPG', 'Masopust – Jablková', 42, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-043', 'seed-album-akce', 'https://files.site.site3.eu/f0/42/f0422386-4163-4957-9cd4-d9434ec8af02.JPG', 'Masopust – Meruňková', 43, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-044', 'seed-album-akce', 'https://files.site.site3.eu/8a/59/8a59550e-2c2d-4bd1-a2d7-32ed5fd3101c.JPG', 'Masopust – Hrušková', 44, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-045', 'seed-album-akce', 'https://files.site.site3.eu/1c/56/1c562aec-c92c-4e68-a28d-2c74724b56ef.JPG', 'Masopust – Borůvková', 45, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-046', 'seed-album-akce', 'https://files.site.site3.eu/d1/7a/d17a7ccc-0bd0-44bd-80e2-b3e68d0ca75c.JPG', 'Masopust – Jahodová', 46, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-047', 'seed-album-akce', 'https://files.site.site3.eu/0b/39/0b3973f6-9612-47de-85d2-cfe5ea7ebac2.JPG', 'Vyhodnocení soutěže s obrázky', 47, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-048', 'seed-album-akce', 'https://files.site.site3.eu/2a/ec/2aec1624-9bad-43dc-8768-82d2f96530d9.JPG', 'Akce MŠ', 48, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-049', 'seed-album-akce', 'https://files.site.site3.eu/a9/c8/a9c84c30-f0aa-46a9-a77a-b93bae95cb4f.JPG', 'Akce MŠ', 49, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-050', 'seed-album-akce', 'https://files.site.site3.eu/00/fe/00fe666a-fb97-405c-b0e1-f48d529565ed.JPG', 'Akce MŠ', 50, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-051', 'seed-album-akce', 'https://files.site.site3.eu/66/cc/66cc0fa7-b383-4ba3-b3ba-bc384c1e7cd7.jpg', 'Nová interaktivní tabule – Jablíčka', 51, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-052', 'seed-album-akce', 'https://files.site.site3.eu/c2/dd/c2dd47ef-f908-4a20-bbb5-4e6d3a73aabe.jpg', 'Nová interaktivní tabule – Jablíčka', 52, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-053', 'seed-album-akce', 'https://files.site.site3.eu/4b/01/4b0172c7-8f2c-41a0-9742-845fe499e649.jpg', 'Nová interaktivní tabule – Jablíčka', 53, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-054', 'seed-album-akce', 'https://files.site.site3.eu/c7/ee/c7ee0b33-047a-4fa7-ab1a-da66b5ad36ab.jpg', 'Nová interaktivní tabule – Jablíčka', 54, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-055', 'seed-album-akce', 'https://files.site.site3.eu/53/94/53941fe3-1da1-4774-88f4-f7f005ca9565.JPG', 'Vánoční představení v ZUŠ Voborského', 55, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-056', 'seed-album-akce', 'https://files.site.site3.eu/b6/3c/b63cee6b-228f-4e7d-a835-2beafe02eb3a.JPG', 'Vánoční představení v ZUŠ Voborského', 56, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-057', 'seed-album-akce', 'https://files.site.site3.eu/4b/19/4b19173c-3516-4ba5-b238-ae3603012f05.JPG', 'Vánoční představení v ZUŠ Voborského', 57, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-058', 'seed-album-akce', 'https://files.site.site3.eu/f3/70/f3705e03-d809-43dc-b395-ce53f379e4f8.JPG', 'Vánoční představení v ZUŠ Voborského', 58, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-059', 'seed-album-akce', 'https://files.site.site3.eu/fa/de/fade8aee-5b91-40a8-a8e7-434e00538444.jpg', 'Jablka a Hrušky na bruslích', 59, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-060', 'seed-album-akce', 'https://files.site.site3.eu/72/c0/72c0ff0e-7386-44cc-8972-efe0a0435aea.jpg', 'Hrušky v České televizi', 60, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-061', 'seed-album-akce', 'https://files.site.site3.eu/63/a7/63a7003b-7307-49df-a630-3085361f6fd3.jpg', 'Sokolník Ondra', 61, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-062', 'seed-album-akce', 'https://files.site.site3.eu/8b/ec/8bec7f75-a063-4fbf-80d1-c8c36cd73128.jpg', 'Sokolník Ondra', 62, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-063', 'seed-album-akce', 'https://files.site.site3.eu/40/c4/40c4b4c4-3137-41e0-9a5c-2832bae7326e.jpg', 'Sokolník Ondra', 63, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-064', 'seed-album-akce', 'https://files.site.site3.eu/cf/50/cf50a563-2822-478e-97ec-2211e7278863.jpg', 'Sokolník Ondra', 64, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-065', 'seed-album-akce', 'https://files.site.site3.eu/85/33/8533c0cd-cd41-41cc-b916-0614928b4180.jpg', 'Sokolník Ondra', 65, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-066', 'seed-album-akce', 'https://files.site.site3.eu/f7/b4/f7b4d307-4851-4778-8ab0-d8cd92ad4bf3.jpg', 'Sokolník Ondra', 66, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-067', 'seed-album-akce', 'https://files.site.site3.eu/b5/05/b505c425-df02-414c-b365-9501057add22.jpg', 'Sokolník Ondra', 67, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-068', 'seed-album-akce', 'https://files.site.site3.eu/d1/bf/d1bfc743-591f-4acc-adb2-a8304802c78c.jpg', 'Sokolník Ondra', 68, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-069', 'seed-album-akce', 'https://files.site.site3.eu/d9/7e/d97e291a-8b6f-47a0-bfdc-d01695b5966a.jpg', 'Borůvky – zážitkové učení', 69, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-070', 'seed-album-akce', 'https://files.site.site3.eu/70/64/7064bd7f-c2d4-45dd-8c37-ecd8836affba.jpg', 'Borůvky – zážitkové učení', 70, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-071', 'seed-album-akce', 'https://files.site.site3.eu/33/6e/336e5a8f-2128-4ee7-ac95-38c6614afbee.jpg', 'Borůvky – zážitkové učení', 71, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-072', 'seed-album-akce', 'https://files.site.site3.eu/b5/31/b531038d-42bd-4e30-97a0-ef31cbfa1ef2.jpg', 'Borůvky – zážitkové učení', 72, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-073', 'seed-album-akce', 'https://files.site.site3.eu/0f/f2/0ff249dc-5dd6-468b-86d4-73628bde50ef.jpg', 'Borůvky – zážitkové učení', 73, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-074', 'seed-album-akce', 'https://files.site.site3.eu/14/db/14dbbbf7-9e17-4f0e-899c-dc456cddbf30.jpg', 'Borůvky – zážitkové učení', 74, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-075', 'seed-album-akce', 'https://files.site.site3.eu/7d/f6/7df674b7-c8d1-411c-95f0-6fa028e1af17.jpg', 'Borůvky – zážitkové učení', 75, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-076', 'seed-album-akce', 'https://files.site.site3.eu/05/e5/05e520b0-0b29-4d7e-94c1-43423100cb31.jpg', 'Hrušky – zážitkové učení', 76, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-077', 'seed-album-akce', 'https://files.site.site3.eu/7b/c1/7bc1aa7c-d6d8-4a68-901e-f40b32edcd83.jpg', 'Hrušky – zážitkové učení', 77, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-078', 'seed-album-akce', 'https://files.site.site3.eu/55/2c/552c1eaa-17d9-423c-88c8-14b4b7a2be87.jpg', 'Hrušky – zážitkové učení', 78, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-079', 'seed-album-akce', 'https://files.site.site3.eu/9d/c9/9dc96285-7c82-4546-a3a7-5469c8c0fb23.jpg', 'Hrušky – zážitkové učení', 79, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-080', 'seed-album-akce', 'https://files.site.site3.eu/f7/7a/f77aeccf-40db-4a05-ab84-956c22799cc3.jpeg', 'Borůvková třída', 80, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-081', 'seed-album-akce', 'https://files.site.site3.eu/d6/23/d623d2b6-52c9-4c1e-91bd-67dd25d8cd04.jpeg', 'Meruňková třída', 81, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-082', 'seed-album-akce', 'https://files.site.site3.eu/a3/f6/a3f61d68-12c5-47d6-aff4-e700299d46d1.jpeg', 'Jahodová třída', 82, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-083', 'seed-album-akce', 'https://files.site.site3.eu/c4/cc/c4ccee80-958f-45f3-8f27-1d9b746bbe36.jpeg', 'Hrušková třída', 83, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-084', 'seed-album-akce', 'https://files.site.site3.eu/91/d8/91d87270-46e5-40fa-a61c-9e13e7123bea.jpeg', 'Citrónová třída', 84, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-085', 'seed-album-akce', 'https://files.site.site3.eu/12/2d/122de5db-1d11-4c4b-8a76-4530bb5228ba.jpeg', 'Jablková třída', 85, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-086', 'seed-album-akce', 'https://files.site.site3.eu/0e/ff/0eff7bde-bd25-4a94-8a6e-c3552c88477b.jpg', 'Kinologický servis', 86, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-087', 'seed-album-akce', 'https://files.site.site3.eu/6a/89/6a898b72-67dc-4b4d-a7b8-bbc4e922f1d1.jpg', 'Kinologický servis', 87, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-088', 'seed-album-akce', 'https://files.site.site3.eu/67/8d/678d3f86-3b2d-492b-961b-5cfb29b3ab4c.jpg', 'Kinologický servis', 88, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-089', 'seed-album-akce', 'https://files.site.site3.eu/fe/41/fe4148cc-67d8-4a03-9ea9-0c650bf940c1.jpg', 'Kinologický servis', 89, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-090', 'seed-album-akce', 'https://files.site.site3.eu/06/5d/065d8665-6072-4348-8e7f-150ae7beb0c2.jpg', 'První lekce plavání', 90, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-091', 'seed-album-akce', 'https://files.site.site3.eu/fa/fe/fafe6e0d-f834-4e45-93a7-5be6079e7304.jpg', 'První lekce plavání', 91, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-092', 'seed-album-akce', 'https://files.site.site3.eu/21/dc/21dc2777-1f4e-4731-97c1-144f5bdcbf44.jpg', 'První lekce plavání', 92, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-093', 'seed-album-akce', 'https://files.site.site3.eu/d1/b4/d1b4f836-d9e6-497e-8b2d-5ed49896e15d.jpg', 'První lekce plavání', 93, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-094', 'seed-album-akce', 'https://files.site.site3.eu/23/74/23744603-0b34-469c-830b-761468c65745.jpg', 'Jablíčka na Batůžkovém dni', 94, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-095', 'seed-album-akce', 'https://files.site.site3.eu/1a/d0/1ad0a9ed-79e1-4052-988e-9228e6d97609.jpg', 'Jablíčka na Batůžkovém dni', 95, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-096', 'seed-album-akce', 'https://files.site.site3.eu/a3/26/a326e7a8-877c-4f82-b482-972e6b3a2baa.jpg', 'Jablíčka na Batůžkovém dni', 96, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-097', 'seed-album-akce', 'https://files.site.site3.eu/f7/2c/f72c805a-2e7b-44e6-aa33-a98119f49b2f.jpg', 'Jablíčka na Batůžkovém dni', 97, '2026-01-01T08:00:00.000Z'),
	('seed-photo-akce-098', 'seed-album-akce', 'https://files.site.site3.eu/5c/86/5c86b876-0350-46b0-b204-da26e006cae7.jpg', 'Jablíčka na Batůžkovém dni', 98, '2026-01-01T08:00:00.000Z');

INSERT OR IGNORE INTO gallery_albums (
	id, slug, title, position_order, created_at, updated_at
) VALUES (
	'seed-album-vyroci',
	'vyroci',
	'40 let MŠ + Jablkobraní',
	5,
	'2026-01-01T08:00:00.000Z',
	'2026-01-01T08:00:00.000Z'
);

INSERT OR IGNORE INTO gallery_photos (
	id, album_id, src, alt, position_order, created_at
) VALUES
	('seed-photo-vyroci-000', 'seed-album-vyroci', 'https://files.site.site3.eu/27/18/2718573c-c695-432b-b167-36a459b62633.jpg', '40 let výročí MŠ', 0, '2026-01-01T08:00:00.000Z'),
	('seed-photo-vyroci-001', 'seed-album-vyroci', 'https://files.site.site3.eu/cd/23/cd235666-95ca-4c57-8831-d1dab0763e4a.jpg', '40 let výročí MŠ', 1, '2026-01-01T08:00:00.000Z'),
	('seed-photo-vyroci-002', 'seed-album-vyroci', 'https://files.site.site3.eu/4a/e9/4ae9a1f3-7462-42b2-98e5-d07181de9a9e.jpg', '40 let výročí MŠ', 2, '2026-01-01T08:00:00.000Z'),
	('seed-photo-vyroci-003', 'seed-album-vyroci', 'https://files.site.site3.eu/86/ef/86efcbc5-835e-4e02-a974-e6a8357f4e2d.jpg', '40 let výročí MŠ', 3, '2026-01-01T08:00:00.000Z'),
	('seed-photo-vyroci-004', 'seed-album-vyroci', 'https://files.site.site3.eu/d0/66/d06606fb-4737-41ee-965a-1f16dac20eeb.jpg', '40 let výročí MŠ', 4, '2026-01-01T08:00:00.000Z'),
	('seed-photo-vyroci-005', 'seed-album-vyroci', 'https://files.site.site3.eu/fb/cb/fbcbef9d-7f99-4627-a008-5466684650e5.jpg', '40 let výročí MŠ', 5, '2026-01-01T08:00:00.000Z'),
	('seed-photo-vyroci-006', 'seed-album-vyroci', 'https://files.site.site3.eu/8b/cf/8bcf4908-14a5-4086-9838-f31ce721adf5.jpg', '40 let výročí MŠ', 6, '2026-01-01T08:00:00.000Z'),
	('seed-photo-vyroci-007', 'seed-album-vyroci', 'https://files.site.site3.eu/af/5e/af5e9959-caa3-41a1-9384-f26b7a077782.jpg', '40 let výročí MŠ', 7, '2026-01-01T08:00:00.000Z'),
	('seed-photo-vyroci-008', 'seed-album-vyroci', 'https://files.site.site3.eu/cc/19/cc199541-3f65-48bf-9ccb-96184c16438d.jpg', '40 let výročí MŠ', 8, '2026-01-01T08:00:00.000Z'),
	('seed-photo-vyroci-009', 'seed-album-vyroci', 'https://files.site.site3.eu/45/c7/45c73443-832b-40e4-bf7b-9bce9637c585.jpg', '40 let výročí MŠ', 9, '2026-01-01T08:00:00.000Z'),
	('seed-photo-vyroci-010', 'seed-album-vyroci', 'https://files.site.site3.eu/89/f8/89f85b29-a82c-4d2c-b5e9-398facd71fc6.jpg', '40 let výročí MŠ', 10, '2026-01-01T08:00:00.000Z'),
	('seed-photo-vyroci-011', 'seed-album-vyroci', 'https://files.site.site3.eu/40/28/40280a77-e355-4a09-b1ab-4b16f82c5437.jpg', '40 let výročí MŠ', 11, '2026-01-01T08:00:00.000Z'),
	('seed-photo-vyroci-012', 'seed-album-vyroci', 'https://files.site.site3.eu/24/83/24831c47-aac3-4a57-bf8e-476671d4f78c.jpg', '40 let výročí MŠ', 12, '2026-01-01T08:00:00.000Z'),
	('seed-photo-vyroci-013', 'seed-album-vyroci', 'https://files.site.site3.eu/1c/cd/1ccd2cea-528a-4234-8934-0ef46f571b7f.jpg', '40 let výročí MŠ', 13, '2026-01-01T08:00:00.000Z'),
	('seed-photo-vyroci-014', 'seed-album-vyroci', 'https://files.site.site3.eu/aa/70/aa704fdc-1e17-40ed-81a0-860f8fe39267.jpg', '40 let výročí MŠ', 14, '2026-01-01T08:00:00.000Z'),
	('seed-photo-vyroci-015', 'seed-album-vyroci', 'https://files.site.site3.eu/14/85/1485f9d3-7d4b-46f3-a7e1-ea0d5d397330.jpg', '40 let výročí MŠ', 15, '2026-01-01T08:00:00.000Z'),
	('seed-photo-vyroci-016', 'seed-album-vyroci', 'https://files.site.site3.eu/0d/f5/0df5934a-5e21-4bdb-a79d-cd7065e4c45a.jpg', '40 let výročí MŠ', 16, '2026-01-01T08:00:00.000Z'),
	('seed-photo-vyroci-017', 'seed-album-vyroci', 'https://files.site.site3.eu/14/a1/14a1dc61-ea7f-448b-bae1-4509c99ea8f3.jpg', '40 let výročí MŠ', 17, '2026-01-01T08:00:00.000Z');

INSERT OR IGNORE INTO gallery_albums (
	id, slug, title, position_order, created_at, updated_at
) VALUES (
	'seed-album-lyzovani',
	'lyzovani',
	'Lyžování 2025',
	6,
	'2026-01-01T08:00:00.000Z',
	'2026-01-01T08:00:00.000Z'
);

INSERT OR IGNORE INTO gallery_photos (
	id, album_id, src, alt, position_order, created_at
) VALUES
	('seed-photo-lyzovani-000', 'seed-album-lyzovani', 'https://files.site.site3.eu/ee/a5/eea54f30-baf1-46c2-9580-76108e9669e0.jpg', 'Lyžování 2025', 0, '2026-01-01T08:00:00.000Z'),
	('seed-photo-lyzovani-001', 'seed-album-lyzovani', 'https://files.site.site3.eu/28/be/28be9876-7993-4a5c-bdf9-5c70908e9d51.jpg', 'Lyžování 2025', 1, '2026-01-01T08:00:00.000Z'),
	('seed-photo-lyzovani-002', 'seed-album-lyzovani', 'https://files.site.site3.eu/d5/1a/d51a14a0-8779-4c6e-8c9c-b4c3af58519c.jpg', 'Lyžování 2025', 2, '2026-01-01T08:00:00.000Z'),
	('seed-photo-lyzovani-003', 'seed-album-lyzovani', 'https://files.site.site3.eu/20/94/20945ffc-6f33-4211-ae76-658fa73a9a10.jpg', 'Lyžování 2025', 3, '2026-01-01T08:00:00.000Z'),
	('seed-photo-lyzovani-004', 'seed-album-lyzovani', 'https://files.site.site3.eu/ab/5b/ab5bc602-46eb-4e44-a9ab-e943cc41f533.jpg', 'Lyžování 2025', 4, '2026-01-01T08:00:00.000Z'),
	('seed-photo-lyzovani-005', 'seed-album-lyzovani', 'https://files.site.site3.eu/f7/eb/f7eb7ba2-d549-40d9-8962-2fc3cdb6d638.jpg', 'Lyžování 2025', 5, '2026-01-01T08:00:00.000Z'),
	('seed-photo-lyzovani-006', 'seed-album-lyzovani', 'https://files.site.site3.eu/c6/44/c644b13f-ea42-4768-9bb1-b605f2305628.jpg', 'Lyžování 2025', 6, '2026-01-01T08:00:00.000Z'),
	('seed-photo-lyzovani-007', 'seed-album-lyzovani', 'https://files.site.site3.eu/88/42/8842bb9e-1a93-422a-9f6b-71f2cc688133.jpg', 'Lyžování 2025', 7, '2026-01-01T08:00:00.000Z'),
	('seed-photo-lyzovani-008', 'seed-album-lyzovani', 'https://files.site.site3.eu/16/6a/166a06dd-ff88-4624-a69f-c7cdb0471f0d.jpg', 'Lyžování 2025', 8, '2026-01-01T08:00:00.000Z'),
	('seed-photo-lyzovani-009', 'seed-album-lyzovani', 'https://files.site.site3.eu/58/e2/58e2c1f4-59e1-453e-aec5-0b6e022d1f32.jpg', 'Lyžování 2025', 9, '2026-01-01T08:00:00.000Z'),
	('seed-photo-lyzovani-010', 'seed-album-lyzovani', 'https://files.site.site3.eu/b7/68/b768a709-fe57-454c-babc-fd73cb32958a.jpg', 'Lyžování 2025', 10, '2026-01-01T08:00:00.000Z'),
	('seed-photo-lyzovani-011', 'seed-album-lyzovani', 'https://files.site.site3.eu/1e/ad/1ead0413-72af-404c-abe2-5f82a01ca555.jpg', 'Lyžování 2025', 11, '2026-01-01T08:00:00.000Z'),
	('seed-photo-lyzovani-012', 'seed-album-lyzovani', 'https://files.site.site3.eu/41/3e/413ef5d9-b5d1-45a2-929a-e413d9e557a3.jpg', 'Lyžování 2025', 12, '2026-01-01T08:00:00.000Z'),
	('seed-photo-lyzovani-013', 'seed-album-lyzovani', 'https://files.site.site3.eu/23/a5/23a5d556-aa4c-4063-8a57-9367a1ade4aa.jpg', 'Lyžování 2025', 13, '2026-01-01T08:00:00.000Z'),
	('seed-photo-lyzovani-014', 'seed-album-lyzovani', 'https://files.site.site3.eu/f3/0b/f30b9ab8-c185-46b4-81df-34a15e46cba4.jpg', 'Lyžování 2025', 14, '2026-01-01T08:00:00.000Z'),
	('seed-photo-lyzovani-015', 'seed-album-lyzovani', 'https://files.site.site3.eu/9f/6e/9f6e359b-962d-43ab-b893-9b6c561bf88b.jpg', 'Lyžování 2025', 15, '2026-01-01T08:00:00.000Z');

INSERT OR IGNORE INTO gallery_albums (
	id, slug, title, position_order, created_at, updated_at
) VALUES (
	'seed-album-jablkobraní',
	'jablkobraní',
	'Jablkobraní 2025',
	7,
	'2026-01-01T08:00:00.000Z',
	'2026-01-01T08:00:00.000Z'
);

INSERT OR IGNORE INTO gallery_photos (
	id, album_id, src, alt, position_order, created_at
) VALUES
	('seed-photo-jablkobraní-000', 'seed-album-jablkobraní', 'https://files.site.site3.eu/63/71/63710091-4c6c-43fc-abd2-e73c6b982f3e.jpg', 'Jablkobraní 2025', 0, '2026-01-01T08:00:00.000Z'),
	('seed-photo-jablkobraní-001', 'seed-album-jablkobraní', 'https://files.site.site3.eu/00/8f/008f1b6a-c69b-4859-81bc-66d4081bc92a.jpg', 'Jablkobraní 2025', 1, '2026-01-01T08:00:00.000Z'),
	('seed-photo-jablkobraní-002', 'seed-album-jablkobraní', 'https://files.site.site3.eu/96/98/9698bd0b-2cd8-4849-a91a-0aff2192db2b.jpg', 'Jablkobraní 2025', 2, '2026-01-01T08:00:00.000Z'),
	('seed-photo-jablkobraní-003', 'seed-album-jablkobraní', 'https://files.site.site3.eu/17/cb/17cbeebe-2642-4238-923c-20ee4d17ee35.jpg', 'Jablkobraní 2025', 3, '2026-01-01T08:00:00.000Z'),
	('seed-photo-jablkobraní-004', 'seed-album-jablkobraní', 'https://files.site.site3.eu/0a/6d/0a6d7bfa-37e1-4d6f-86cc-3690e6138df6.jpg', 'Jablkobraní 2025', 4, '2026-01-01T08:00:00.000Z'),
	('seed-photo-jablkobraní-005', 'seed-album-jablkobraní', 'https://files.site.site3.eu/7a/22/7a22bc6c-c3ac-492f-95fe-beaa8e274db7.jpg', 'Jablkobraní 2025', 5, '2026-01-01T08:00:00.000Z'),
	('seed-photo-jablkobraní-006', 'seed-album-jablkobraní', 'https://files.site.site3.eu/10/da/10da5dd7-63d7-4f0f-b2f9-f8722eb43eeb.jpg', 'Jablkobraní 2025', 6, '2026-01-01T08:00:00.000Z'),
	('seed-photo-jablkobraní-007', 'seed-album-jablkobraní', 'https://files.site.site3.eu/e6/fb/e6fb7771-ceca-4f74-aaf6-23d925f4aaea.jpg', 'Jablkobraní 2025', 7, '2026-01-01T08:00:00.000Z'),
	('seed-photo-jablkobraní-008', 'seed-album-jablkobraní', 'https://files.site.site3.eu/56/62/56626a11-8492-4a3b-bc0e-a8ba02bb4f2c.jpg', 'Jablkobraní 2025', 8, '2026-01-01T08:00:00.000Z'),
	('seed-photo-jablkobraní-009', 'seed-album-jablkobraní', 'https://files.site.site3.eu/9b/fc/9bfc73a9-7ee9-49ef-885e-007cf563dfb2.jpg', 'Jablkobraní 2025', 9, '2026-01-01T08:00:00.000Z'),
	('seed-photo-jablkobraní-010', 'seed-album-jablkobraní', 'https://files.site.site3.eu/7f/59/7f595e33-949f-4048-8fb7-84a57da528a9.jpg', 'Jablkobraní 2025', 10, '2026-01-01T08:00:00.000Z'),
	('seed-photo-jablkobraní-011', 'seed-album-jablkobraní', 'https://files.site.site3.eu/af/32/af328f24-6f1c-4a11-abf5-d1e144f7dfdb.jpg', 'Jablkobraní 2025', 11, '2026-01-01T08:00:00.000Z'),
	('seed-photo-jablkobraní-012', 'seed-album-jablkobraní', 'https://files.site.site3.eu/e5/16/e516fd95-7f16-40b3-9a7d-3d23f5295983.jpg', 'Jablkobraní 2025', 12, '2026-01-01T08:00:00.000Z'),
	('seed-photo-jablkobraní-013', 'seed-album-jablkobraní', 'https://files.site.site3.eu/4d/4e/4d4e3b46-6d10-47ef-9402-752062a9642d.jpg', 'Jablkobraní 2025', 13, '2026-01-01T08:00:00.000Z'),
	('seed-photo-jablkobraní-014', 'seed-album-jablkobraní', 'https://files.site.site3.eu/14/8f/148f9a6e-0ffe-4b43-a1ae-08e888eeb70c.jpg', 'Jablkobraní 2025', 14, '2026-01-01T08:00:00.000Z'),
	('seed-photo-jablkobraní-015', 'seed-album-jablkobraní', 'https://files.site.site3.eu/1c/0a/1c0a12c7-8ec9-4bbb-8072-6138ea6db8e4.jpg', 'Jablkobraní 2025', 15, '2026-01-01T08:00:00.000Z'),
	('seed-photo-jablkobraní-016', 'seed-album-jablkobraní', 'https://files.site.site3.eu/12/f1/12f161d4-f617-4c89-998a-5146c069678f.jpg', 'Jablkobraní 2025', 16, '2026-01-01T08:00:00.000Z'),
	('seed-photo-jablkobraní-017', 'seed-album-jablkobraní', 'https://files.site.site3.eu/42/56/42560e0d-fa34-4d0d-94b0-d14ac5c1a096.jpg', 'Jablkobraní 2025', 17, '2026-01-01T08:00:00.000Z'),
	('seed-photo-jablkobraní-018', 'seed-album-jablkobraní', 'https://files.site.site3.eu/90/1b/901b774d-1c58-4d4e-b395-0c722e866294.jpg', 'Jablkobraní 2025', 18, '2026-01-01T08:00:00.000Z'),
	('seed-photo-jablkobraní-019', 'seed-album-jablkobraní', 'https://files.site.site3.eu/b0/ee/b0ee0f40-efc6-491b-b8e5-eb5321cf8a15.jpg', 'Jablkobraní 2025', 19, '2026-01-01T08:00:00.000Z'),
	('seed-photo-jablkobraní-020', 'seed-album-jablkobraní', 'https://files.site.site3.eu/02/5a/025a3f20-5f8a-4d22-91b7-78183ad48f54.jpg', 'Jablkobraní 2025', 20, '2026-01-01T08:00:00.000Z'),
	('seed-photo-jablkobraní-021', 'seed-album-jablkobraní', 'https://files.site.site3.eu/f3/05/f305c195-657a-47c1-8f59-61a28e22d35d.jpg', 'Jablkobraní 2025', 21, '2026-01-01T08:00:00.000Z'),
	('seed-photo-jablkobraní-022', 'seed-album-jablkobraní', 'https://files.site.site3.eu/bc/bf/bcbf6bfc-3275-403d-b738-fc2ac2e4a577.jpg', 'Jablkobraní 2025', 22, '2026-01-01T08:00:00.000Z'),
	('seed-photo-jablkobraní-023', 'seed-album-jablkobraní', 'https://files.site.site3.eu/c2/3e/c23ef4ea-c72a-479c-a18d-168a3d9fac55.jpg', 'Jablkobraní 2025', 23, '2026-01-01T08:00:00.000Z'),
	('seed-photo-jablkobraní-024', 'seed-album-jablkobraní', 'https://files.site.site3.eu/ff/bc/ffbc1017-bedd-4edd-8016-8a181df4da24.jpg', 'Jablkobraní 2025', 24, '2026-01-01T08:00:00.000Z'),
	('seed-photo-jablkobraní-025', 'seed-album-jablkobraní', 'https://files.site.site3.eu/fc/e0/fce06b77-ba21-481e-80e7-524340ab45cf.jpg', 'Jablkobraní 2025', 25, '2026-01-01T08:00:00.000Z');
