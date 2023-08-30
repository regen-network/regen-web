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

# create postgis extensions
psql postgres://postgres:password@localhost:5432/server -c 'CREATE EXTENSION postgis;'

# stop background process
pg_ctl -D ${PGDATA} stop
