#!/bin/bash

# initialize
psql postgres://postgres:password@db:5432 -c 'CREATE SCHEMA private;'
psql postgres://postgres:password@db:5432 -c 'CREATE SCHEMA utilities;'
psql postgres://postgres:password@db:5432 -c 'CREATE DATABASE indexer;'

# run migrations
yarn run graphile-migrate migrate

# start server
yarn serve
