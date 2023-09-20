#!/bin/bash

# Originally from https://github.com/codeship-library/healthcheck-images/blob/master/postgres/docker-healthcheck

set -eo pipefail

host="127.0.0.1"
user="${POSTGRES_USER:-postgres}"
db="${POSTGRES_DB:-$user}"
export PGPASSWORD="${POSTGRES_PASSWORD:-}"

args=(
	# force postgres to not use the local unix socket (test "external" connectibility)
	--host "$host"
	--username "$user"
	--dbname "$db"
	--quiet --no-align --tuples-only
)

if select="$(echo 'SELECT PostGIS_full_version();' | psql "${args[@]}")" && [[ "$select" = *"POSTGIS"* ]]; then
  echo "PostGIS successfully installed"
  echo "$select"
	exit 0
fi

echo "Unexpected result, no PostGIS support found:"
echo "$select"

exit 1
