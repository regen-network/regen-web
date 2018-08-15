CREATE TABLE entry
(
  id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_by text NOT NULL DEFAULT current_user,
  created_at timestamptz NOT NULL DEFAULT current_timestamp,
  type text NOT NULL,
  "when" timestamptz NOT NULL,
  comment text,
  polygon geometry('POLYGON'),
  point geometry('POINT'),
  species text,
  unit text,
  numeric_value numeric
);

COMMENT ON TABLE entry IS 'The table where all events and observations are logged';

COMMENT ON COLUMN entry.created_by IS 'The role of the user that logged the event';

COMMENT ON COLUMN entry.created_at IS 'The time when the user logged the event';

COMMENT ON COLUMN entry.type IS 'The type of log entry. Should represent the general concept for what actually happened based on a controlled vocabulary such as GACS';

COMMENT ON COLUMN entry.when IS 'When entry creator is claiming that the event actually happened, different from created_at which indicates when they logged the entry';

COMMENT ON COLUMN entry.comment IS 'Any additional comment text the user wishes to provide (optional)';

COMMENT ON COLUMN entry.polygon IS 'The geographic polygon over which the user is claiming the event took place (optional)';

COMMENT ON COLUMN entry.point IS 'The geographic point at which the user is claiming the event took place (optional)';

COMMENT ON COLUMN entry.species IS 'A species from a controlled vocabulary (such as GACS) that is the direct object of events involving species (such as planting and harvesting). Required for species related events, optional otherwise';

COMMENT ON COLUMN entry.unit IS 'The unit of measurement for measurement related events (like soil testing)';

COMMENT ON COLUMN entry.numeric_value IS 'The measured value for measurement related events (like soil testing)';

ALTER TABLE entry ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON entry TO app_user;

CREATE POLICY entry_creator_access ON entry FOR SELECT TO app_user
  USING (created_by = current_user);

COMMENT ON POLICY entry_creator_access ON entry IS 'Allows users that created events to view them, does not allow them to insert, update or delete them. That is handled elsewhere.'
