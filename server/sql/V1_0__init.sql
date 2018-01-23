CREATE TYPE agent_type AS ENUM ('User', 'Org');

CREATE ROLE "guest";

CREATE TABLE agent
(
  id bigserial primary key,
  type agent_type not null,
  balance BIGINT not null default 0
);

CREATE TABLE user_key
(
  user_id BIGINT REFERENCES agent,
  pub_key text not null
);

CREATE TABLE target
(
  id bigserial primary key,
  agent_id BIGINT NOT NULL REFERENCES agent,
  title text NOT NULL,
  description text NOT NULL,
  reward_amount bigint not null
);

CREATE TABLE submission
(
  id bigserial primary key,
  agent_id BIGINT NOT NULL REFERENCES agent,
  target_id BIGINT NOT NULL REFERENCES target
);

CREATE TABLE comment
(
  id bigserial primary key,
  agent_id BIGINT NOT NULL REFERENCES agent,
  submission_id BIGINT NOT NULL REFERENCES agent,
  timestamp TIMESTAMPTZ NOT NULL,
  body text not null
);

CREATE TABLE photo
(
  id bigserial primary key,
  agent_id BIGINT NOT NULL REFERENCES agent,
  submission_id BIGINT NOT NULL REFERENCES agent,
  timestamp TIMESTAMPTZ NOT NULL,
  hash text not null,
  url text not null
);
