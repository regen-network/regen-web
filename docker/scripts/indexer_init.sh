#!/bin/bash

# run migrations
(cd sql && ./run_all_migrations.sh)

# workaround for indexer starting on block 0
psql postgres://postgres:password@localhost:5432/indexer -c "INSERT INTO chain (
  num,
  chain_id
) VALUES (
  1,
  'regen-local'
)"
psql postgres://postgres:password@localhost:5432/indexer -c "INSERT INTO block (
  chain_num,
  height,
  data,
  time
) VALUES (
  1,
  0,
  '{}',
  now()
)"

# seed indexer database with class issuers from regen ledger genesis file
psql postgres://postgres:password@localhost:5432/indexer -c "INSERT INTO tx (
  chain_num,
  block_height,
  tx_idx,
  hash,
  data
) VALUES (
  1,
  0,
  0,
  convert_to('', 'LATIN1'),
  '{}'
)"
psql postgres://postgres:password@localhost:5432/indexer -c "INSERT INTO msg (
  chain_num,
  block_height,
  tx_idx,
  msg_idx,
  data
) VALUES (
  1,
  0,
  0,
  0,
  '{}'
)"
psql postgres://postgres:password@localhost:5432/indexer -c "INSERT INTO msg_event (
  chain_num,
  block_height,
  tx_idx,
  msg_idx,
  type
) VALUES (
  1,
  0,
  0,
  0,
  'regen.ecocredit.v1.EventCreateClass'
)"
psql postgres://postgres:password@localhost:5432/indexer -c "INSERT INTO class_issuers (
  type,
  block_height,
  tx_idx,
  msg_idx,
  chain_num,
  timestamp,
  tx_hash,
  class_id,
  issuer
) VALUES (
  'regen.ecocredit.v1.EventCreateClass',
  0,
  0,
  0,
  1,
  now(),
  0,
  'C01',
  'regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk'
)"
psql postgres://postgres:password@localhost:5432/indexer -c "INSERT INTO msg (
  chain_num,
  block_height,
  tx_idx,
  msg_idx,
  data
) VALUES (
  1,
  0,
  0,
  1,
  '{}'
)"
psql postgres://postgres:password@localhost:5432/indexer -c "INSERT INTO msg_event (
  chain_num,
  block_height,
  tx_idx,
  msg_idx,
  type
) VALUES (
  1,
  0,
  0,
  1,
  'regen.ecocredit.v1.EventCreateClass'
)"
psql postgres://postgres:password@localhost:5432/indexer -c "INSERT INTO class_issuers (
  type,
  block_height,
  tx_idx,
  msg_idx,
  chain_num,
  timestamp,
  tx_hash,
  class_id,
  issuer
) VALUES (
  'regen.ecocredit.v1.EventCreateClass',
  0,
  0,
  1,
  1,
  now(),
  0,
  'C02',
  'regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk'
)"
psql postgres://postgres:password@localhost:5432/indexer -c "INSERT INTO msg (
  chain_num,
  block_height,
  tx_idx,
  msg_idx,
  data
) VALUES (
  1,
  0,
  0,
  2,
  '{}'
)"
psql postgres://postgres:password@localhost:5432/indexer -c "INSERT INTO msg_event (
  chain_num,
  block_height,
  tx_idx,
  msg_idx,
  type
) VALUES (
  1,
  0,
  0,
  2,
  'regen.ecocredit.v1.EventCreateClass'
)"
psql postgres://postgres:password@localhost:5432/indexer -c "INSERT INTO class_issuers (
  type,
  block_height,
  tx_idx,
  msg_idx,
  chain_num,
  timestamp,
  tx_hash,
  class_id,
  issuer
) VALUES (
  'regen.ecocredit.v1.EventCreateClass',
  0,
  0,
  2,
  1,
  now(),
  0,
  'C03',
  'regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk'
)"
psql postgres://postgres:password@localhost:5432/indexer -c "INSERT INTO msg (
  chain_num,
  block_height,
  tx_idx,
  msg_idx,
  data
) VALUES (
  1,
  0,
  0,
  3,
  '{}'
)"
psql postgres://postgres:password@localhost:5432/indexer -c "INSERT INTO msg_event (
  chain_num,
  block_height,
  tx_idx,
  msg_idx,
  type
) VALUES (
  1,
  0,
  0,
  3,
  'regen.ecocredit.v1.EventCreateClass'
)"
psql postgres://postgres:password@localhost:5432/indexer -c "INSERT INTO class_issuers (
  type,
  block_height,
  tx_idx,
  msg_idx,
  chain_num,
  timestamp,
  tx_hash,
  class_id,
  issuer
) VALUES (
  'regen.ecocredit.v1.EventCreateClass',
  0,
  0,
  3,
  1,
  now(),
  0,
  'C04',
  'regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk'
)"
