# Regen Website

The website for the [Regen Network](https://regen.network) decentralized infrastructure.

## Table of Contents

- [Regen Website](#regen-website)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Environment variables](#environment-variables)
  - [Development](#development)
  - [Deployment](#deployment)
    - [Registry](#registry)
    - [Storybook](#storybook)
    - [Website](#website)
    - [Deploying the Custom Login form to Auth0](#deploying-the-custom-login-form-to-auth0)
  - [Testing](#testing)
  - [Code style](#code-style)
  - [Timeout Issue on Slower Connections](#timeout-issue-on-slower-connections)

## Installation

This project uses [lerna](https://github.com/lerna/lerna) with [yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) to manage multiple packages:
- `web-registry`: Registry React application
- `web-components`: React components and [material-ui](https://material-ui.com/) custom theme
- `web-storybook`: [Storybook](https://storybook.js.org/) config
- `web-www`: Regen website based on [Gatsby](https://www.gatsbyjs.org/)
- `web-auth`: React application used for Auth0 Custom Universal Login

Install dependencies using:

```sh
yarn install
yarn bootstrap
```

Prepare some artifacts needed to run in dev mode:

```sh
yarn build
```

## Environment variables

Set variables in `.env` files in `web-registry/` and `web-storybook/` folders based on provided `.env.example` files.

For `web-auth`, follow these [setup instructions](web-auth/README.md#setup).

## Development

First, run:

```sh
yarn watch
```

It will watch for changes in `web-components` and rebuild them in `web-components/lib` directory.

Then, to run the registry app:
```sh
yarn start
```

Then, to run the website (Gatsby):
```sh
yarn start-www
```

To run Storybook:

```sh
yarn storybook
```

To run the auth app:

```sh
yarn start-auth
```

## Deployment

### Registry
Compile `web-components` and `web-registry` to `web-components/lib` and `web-registry/build` respectively:

```sh
yarn build
```

### Storybook
Compile `web-components` and `web-storybook` to `web-components/lib` and `web-storybook/build` respectively:

```sh
yarn build-storybook
```

### Website
Compile `web-components` and `web-www` to `web-components/lib` and `web-www/public` respectively:
```sh
yarn build-www
```

### Deploying the Custom Login form to Auth0

Please, follow [these instructions](web-auth/README.md#setup) and then:
1. Run `yarn build-auth` command.
2. Copy the code from `./build/index.html`.
3. Paste it into the Universal Login HTML form from [Auth dashboard](https://manage.auth0.com/dashboard/us/regen-network-registry/login_page) and save.

This could be automated in the future.

## Testing

```sh
yarn test
```

Launches the test runner in the interactive watch mode.
[Jest](https://jestjs.io/) is used as test runner.

We're using [StoryShots](https://storybook.js.org/docs/testing/structural-testing/#using-storyshots) for snapshots testing.
Update web-components snapshots:
```sh
yarn test-update-snapshot
```

## Code style

[Prettier](https://prettier.io/) and [ESLint](https://eslint.org/) are used as
code formatter and linter respectively:

```sh
yarn format
```

```sh
yarn lint
```

## Timeout Issue on Slower Connections

_some larger packages don't manage to get downloaded in time for yarn's 30 second timeout, you might see an error like this one_

```
info There appears to be trouble with your network connection. Retrying...
error An unexpected error occurred: "https://registry.yarnpkg.com/@material-ui/icons/-/icons-4.5.1.tgz: ESOCKETTIMEDOUT".
info If you think this is a bug, please open a bug report with the information provided in "/Users/jared/Dev/registry/yarn-error.log".
```

a simple workaround via https://github.com/mui-org/material-ui/issues/12432 is to run

```
yarn install --network-timeout 500000
```

instead of `yarn install`
