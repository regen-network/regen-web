#!/bin/bash

# init data directory
initdb -D ${PGDATA}

# start in background
pg_ctl -D ${PGDATA} -l /var/log/postgresql/logfile start

# wait for startup to finish
wait_postgresql() {
  while ! pg_isready -q; do
    echo "Starting postgres..."
    sleep 1
  done
}
wait_postgresql

# create databases
psql postgres://postgres:password@localhost:5432 -c 'CREATE DATABASE server;'
psql postgres://postgres:password@localhost:5432 -c 'CREATE DATABASE indexer;'

# add postgis extension to server database
psql postgres://postgres:password@localhost:5432/server -c 'CREATE EXTENSION postgis;'

# restore server db
pg_restore -d server -h localhost -p 5432 -U postgres dump

# continue running and tail logs
tail -f /var/log/postgresql/logfile
