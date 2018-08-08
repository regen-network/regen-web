CREATE TYPE agent_type AS ENUM ('User', 'Org');

CREATE TABLE agent
(
  id uuid DEFAULT uuid_generate_v4() primary key,
  name text NOT NULL,
  type agent_type NOT NULL
);

