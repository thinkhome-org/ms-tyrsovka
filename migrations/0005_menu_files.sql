CREATE TABLE IF NOT EXISTS menu_files (
	week_start TEXT PRIMARY KEY,
	file_key TEXT NOT NULL,
	file_name TEXT NOT NULL DEFAULT '',
	updated_at TEXT NOT NULL
);
