# Using docker to spin up a local dev environment

The [docker directory](../docker) stores docker files and scripts for spinning up a local development environment. The docker setup includes the following:

- `db` - a postgres database used for `server` and `indexer`
- `ledger` - an instance of [regen-ledger](https://github.com/regen-network/regen-ledger)
- `server` - an instance of [regen-server](https://github.com/regen-network/regen-server)
- `indexer` - an instance of [indexer](https://github.com/regen-network/indexer)

## Prerequisites

*Note: The following prerequisites are in addition to the prerequisites listed in [README](../README.md).*

- Docker
- Access to the production database

## Development

Dump production database:

```
pg_dump [DATABASE_URL] --file dump-server-production -F c
```

*Note: If you do not have access to the production database, or you are working on changes that do not require seeded data, you can comment out the step within [server_init.sh](../docker/scripts/server_init.sh) that restores the database.*

Build docker containers:

```
docker-compose build
```

*Note: This only needs to be run once or after making changes to the docker files.*

Run docker containers:

```
docker-compose up
```

Stop and remove containers:

```
docker-compose down
```

*Note: This can be used to clean up the local environment and restart with seed data.*
