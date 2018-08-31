GRANT insert ON entry TO app_user;

CREATE POLICY entry_insert ON entry FOR INSERT TO app_user
  WITH CHECK (created_by = current_user);