#!/bin/bash

# run migrations
yarn migrate

# TODO: investigate and resolve issue with local permission setup and then remove the following
psql postgres://postgres:password@localhost:5432/server -c 'GRANT ALL PRIVILEGES ON TABLE credit_class TO auth_user;'
psql postgres://postgres:password@localhost:5432/server -c 'GRANT ALL PRIVILEGES ON TABLE credit_class_version TO auth_user;'
psql postgres://postgres:password@localhost:5432/server -c 'GRANT ALL PRIVILEGES ON TABLE project TO auth_user;'
psql postgres://postgres:password@localhost:5432/server -c 'GRANT ALL PRIVILEGES ON TABLE organization TO auth_user;'
