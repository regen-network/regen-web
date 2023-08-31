#!/bin/bash

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

# continue running and tail logs
tail -f /var/log/postgresql/logfile
