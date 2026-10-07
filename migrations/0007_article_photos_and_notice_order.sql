ALTER TABLE aktuality ADD COLUMN photo_keys TEXT NOT NULL DEFAULT '[]';

ALTER TABLE notices ADD COLUMN position_order INTEGER NOT NULL DEFAULT 0;

UPDATE notices
SET position_order = (
	SELECT COUNT(*)
	FROM notices AS newer
	WHERE newer.category = notices.category
		AND (
			COALESCE(newer.published_at, newer.created_at) > COALESCE(notices.published_at, notices.created_at)
			OR (
				COALESCE(newer.published_at, newer.created_at) = COALESCE(notices.published_at, notices.created_at)
				AND newer.rowid < notices.rowid
			)
		)
);
