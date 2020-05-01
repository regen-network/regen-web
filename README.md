# Regen Website

The website for the [Regen Network](https://regen.network) decentralized infrastructure.

## Table of Contents
- [Installation](#installation)
- [Development](#development)
- [Deployment](#deployment)
- [Testing](#testing)
- [Code style](#code-style)

## Installation

This project uses [lerna](https://github.com/lerna/lerna) to manage multiple packages:
- `web`: Main React application
- `web-components`: React components and [material-ui](https://material-ui.com/) custom theme
- `web-storybook`: [Storybook](https://storybook.js.org/) config

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

Set variables in `.env` files in `web/` and `web-storybook/` folders based on provided `.env.example` files.

## Development

First, run:
```sh
yarn watch
```
It will watch for changes in `web-components` and rebuild them in `web-components/lib` directory.

Then, to run the main app:
```sh
yarn start
```

To run Storybook:
```sh
yarn storybook
```

## Deployment

Compile `web-components` and `web` to `web-components/lib` and `web/build` respectively:
```sh
yarn build
```

Compile `web-components` and `web-storybook` to `web-components/lib` and `web-storybook/build` respectively:
```sh
yarn build-storybook
```

## Testing

```sh
yarn test
```
Launches the test runner in the interactive watch mode.
[Jest](https://jestjs.io/) is used as test runner.

## Code style

[Prettier](https://prettier.io/) and [ESLint](https://eslint.org/) are used as
code formatter and linter respectively:
```sh
yarn format
```

```sh
yarn lint
```

## Git
### Branching Strategy
tbd

### Commit Template
The following git commit template is recommended and includes the following
sections


* One Line Summary: replace with short headline about this commit
* Details: replace will bulleted list of notable changes
* Story: use the product story id to link this commit to,
* Test: n | y | local | other notes to describe any testing completed
* Review: include others who reviewed this work

```One line summary

* details
*

[Story] [#storyid]
[Test] n
[Review] na
```

After saving the template above run the following command to set you email and
the commit template for this

```git config user.email username@regen.network
git config commit.template .gitcommit
```

### Timeout Issue on Slower Connections
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
