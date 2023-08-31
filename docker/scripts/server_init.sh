#!/bin/bash

# run migrations
yarn run graphile-migrate reset --erase

# restore production database
pg_restore -d server -h localhost -p 5432 -U postgres dump-server-production
