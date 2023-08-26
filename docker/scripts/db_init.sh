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

# add database roles (required for database restore)
psql postgres://postgres:password@localhost:5432 -c 'CREATE ROLE app_user;'
psql postgres://postgres:password@localhost:5432 -c 'CREATE ROLE auth_user;'
psql postgres://postgres:password@localhost:5432 -c 'CREATE ROLE rdsadmin;'

# restore databases
pg_restore -d server -h localhost -p 5432 -U postgres dump-server-production

# stop background process
pg_ctl -D ${PGDATA} stop
