ALTER TABLE classroom_contacts ADD COLUMN age TEXT NOT NULL DEFAULT '';
ALTER TABLE classroom_contacts ADD COLUMN location TEXT NOT NULL DEFAULT '';
ALTER TABLE classroom_contacts ADD COLUMN teachers TEXT NOT NULL DEFAULT '';
ALTER TABLE classroom_contacts ADD COLUMN body TEXT NOT NULL DEFAULT '';
ALTER TABLE classroom_contacts ADD COLUMN note TEXT NOT NULL DEFAULT '';
ALTER TABLE classroom_contacts ADD COLUMN day_text TEXT NOT NULL DEFAULT '';
ALTER TABLE classroom_contacts ADD COLUMN image_key TEXT NOT NULL DEFAULT '';

ALTER TABLE gallery_photos ADD COLUMN show_in_hero INTEGER NOT NULL DEFAULT 0;
