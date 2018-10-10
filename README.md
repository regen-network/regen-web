# Getting Started

## Prerequisites

Make sure [NodeJS](https://nodejs.org/en/) v8, [Yarn](https://yarnpkg.com/en/), and [Docker](https://www.docker.com). If you will be doing PostgreSQL schema migrations, you'll also need [Flyway](https://flywaydb.org) are installed on your machine.

For MacOS users [Homebrew](https://brew.sh) is the recommended way to install all of the above (except for Docker).

[NVM](https://github.com/creationix/nvm) is recommended for managing NodeJS installations and we
are intending to stick to the [LTS](https://github.com/creationix/nvm#long-term-support) releases
of NodeJS for this project.

## Starting a development server

1. Install all dependencies with `yarn`
2. Start a development server with `yarn dev`
3. Postgres migrations will run automatically when you start the development server. They can be run manually by running `flyway migrate`.
4. Open your browser to `localhost:3000`
5. Start coding!!

## Production PostgreSQL

We are using the following PostgreSQL/Postgis docker image: `https://github.com/appropriate/docker-postgis`. Due to the fact that
the maintainer may occassionally update the Postgis version without changing the docker image tag, Postgis support may unexpectedly
break and we may need to log into our docker containers in Kubernetes and run `update-postgis.sh` to get things working again. The
long term solution is use a more stable PostgreSQL solution - either something like AWS RDS or build our own docker images with
https://nixos.org/nix/.
