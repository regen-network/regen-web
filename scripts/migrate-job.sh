yarn add flywaydb-cli
./node_modules/.bin/flyway -url=""jdbc:postgresql://$POSTGRES_HOST:5432/$POSTGRES_DATABASE -user=$POSTGRES_USER -password=$POSTGRES_PASSWORD
