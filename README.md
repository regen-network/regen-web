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
      - [GraphQL Type generation](#graphql-type-generation)
    - [Storybook](#storybook)
    - [Website](#website)
    - [Deploying the Custom Login form to Auth0](#deploying-the-custom-login-form-to-auth0)
  - [Testing](#testing)
  - [Code style](#code-style)
  - [Typography](#typography)
    - [Sizing guide](#sizing-guide)
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
Set variables in `.env.development` and `.env.production` in `web-www/` based on `.env.development.example` and `.env.production.example` respectively.

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

#### GraphQL Type generation

To generate Type definitions from our GraphQL Schema, as well as custom react hooks, make sure the [graphQL server is running locally](https://github.com/regen-network/registry-server/blob/5adc07f89c0d4ee74d65779cfad591025c8bebc2/README.md#starting-a-development-server), `cd` into the appropriate sub-folder and run (per repo):

For `/web-registry` there are two commands for the separate sources:

1. `yarn graphql:codegen` - for registry server graphql types
2. `yarn graphql:codegen-sanity` - for sanity CMS graphql types

`/web-www` only has one commmand

1.  `yarn graphql:codegen`

which generates types for both the Sanity items + any **_named_** GraphQL queries that live in the codebase (note - it does not generate types for unnamed queries)

```sh
yarn graphql:codegen
```

This should be done anytime a `.graphql` file is created or modified.

Similarly, types can be generated for Sanity GraphQL Schema using:

```sh
yarn graphql:codegen-sanity
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

## Typography

This repo utilizes custom MUI Typography components to normalize styles with the mockups based on the typography in [figma](<https://www.figma.com/file/MuSpCtCdU2ns4cFAsPfvsx/Text-Styles-%26-Components-(current)?node-id=0:1>):

1. `<Title />` corresponds to "Header" text in the mockups
2. `<Label />` corresponds to "Button Text" in the mockups
3. `<Subtitle />`
4. `<Body />`

Responsive styles are generally normalized (e.g. an `H1` on desktop translates to an `H3` on mobile in most cases), however these can be overridden with `variant` / `mobileVariant` (for Titles) and `size` / `mobileSize` (for the others). For example:

```tsx
<Title /> // renders an h1 (default) on desktop, h3 on mobile
<Title variant="h3" /> // renders an h3 on desktop, h4 on mobile
<Title variant="h3" mobileVariant="h3" /> // renders an h3 on desktop & mobile
<Subtitle size="xl" mobileSize="sm" />
<Body mobileSize="md" /> // keep default `md` size on mobile
```

One small gotcha: due to how `styled` components and the `sx` prop function together, if you want to use a custom `fontSize` through `sx`, you have to pass responsive values:

```tsx
<Title sx={{ fontSize: 12 }}> // does not work as expected
<Title sx={{ fontSize: [12] }}> // works
<Title sx={{ fontSize: [12, 18] }}> // works
<Title sx={{ fontSize: { xs: 12 } }}> // works
```

All of these components also accept MUI's [SX Prop](https://mui.com/system/the-sx-prop/).

The `<Body>` component by default will add styles to child `Link` and `ul/ol` elements, which can be overridden through props:

```tsx
<Body>
  <Link>text</Link> // will render as green w/ bold text
  <ol>
    <li>list text</li> // will render with a green dot and custom positioning
  </ol>
</Body>
<Body styleLinks={false} styleLists={false}>
  <Link>text</Link> // will render as default text
  <ol>
    <li>list text</li> // will render with default list styles
  </ol>
</Body>
```

### Sizing guide

| **Px** | **Rem**  | **theme.spacing** |              **Components**               |
| :----: | :------: | :---------------: | :---------------------------------------: |
|  48px  |   3rem   |        12         |                    H1                     |
|  38px  | 2.375rem |        9.5        |                    H2                     |
|  32px  |   2rem   |         8         |                    H3                     |
|  24px  |  1.5rem  |         6         |                    H4                     |
|  21px  | 1.313rem |       5.25        |              H5, ButtonLarge              |
|  18px  | 1.125rem |        4.5        | H6, subtitleLarge bodyLarge, buttonMedium |
|  16px  |   1rem   |         4         |        subtitleMedium, bodyMedium         |
|  14px  | 0.875rem |        3.5        |   subtitleSmall, bodySmall, buttonSmall   |
|  12px  | 0.75rem  |         3         |  subtitleXSmall bodyXSmall, buttonXSmall  |

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
