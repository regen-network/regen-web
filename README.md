# Regen Website

The website for the [Regen Network](https://regen.network) decentralized infrastructure.

## Table of Contents

- [Regen Website](#regen-website)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
      - [Mac](#mac)
    - [Install dependencies](#install-dependencies)
  - [Environment variables](#environment-variables)
  - [Development](#development)
  - [Deployment](#deployment)
    - [Marketplace](#marketplace)
      - [GraphQL Type generation](#graphql-type-generation)
    - [Storybook](#storybook)
    - [Website](#website)
  - [Testing](#testing)
    - [- Running tests](#--running-tests)
    - [- Writing tests](#--writing-tests)
  - [Code style](#code-style)
  - [i18n](#i18n)
    - [Important notes](#important-notes)
    - [web-components](#web-components)
  - [Typography](#typography)
    - [Sizing guide](#sizing-guide)
  - [Netlify](#netlify)
    - [Debugging Netlify deploys](#debugging-netlify-deploys)

## Installation

This project uses [bun](https://bun.sh/) with [bun workspaces](https://bun.sh/docs/install/workspaces) to manage multiple packages:

- `web-marketplace`: Registry React application
- `web-components`: React components and [material-ui](https://material-ui.com/) custom theme
- `web-storybook`: [Storybook](https://storybook.js.org/) config

[Lerna](https://github.com/lerna/lerna) is also used to bump packages versions and push new releases.

### Prerequisites

#### Mac

If you haven't already, you can set up system dependencies by running the following commands:

```sh
brew install python
sudo ln -s /opt/homebrew/bin/python3 /opt/homebrew/bin/python
brew install vips
```

Note: `python` and `vips` are dependencies via `sharp`.

### Install dependencies

```sh
bun install
```

## Environment variables

Set variables in `.env` files in `web-marketplace/` and `web-storybook/` folders based on provided `.env.example` files.

## Development

To run the marketplace app:

```sh
bun run start
```

To run Storybook:

```sh
bun run storybook
```

To run the website:

```sh
cd web-www && bun run dev
```

## Deployment

### Marketplace

Compile `web-marketplace` to `web-marketplace/build` respectively:

```sh
bun run build
```

#### GraphQL Type generation

To generate Type definitions from our GraphQL Schema, as well as custom react hooks, make sure the [graphQL server is running locally](https://github.com/regen-network/registry-server/blob/5adc07f89c0d4ee74d65779cfad591025c8bebc2/README.md#starting-a-development-server), `cd` into the appropriate sub-folder and run (per repo):

For `/web-marketplace` there are two commands for the separate sources:

1. `bun run graphql:codegen` - for registry server graphql types
2. `bun run graphql:codegen-sanity` - for sanity CMS graphql types

which generates types for any **_named_** GraphQL queries and mutations in `web-marketplace/src/graphql/*.graphql` (note - it does not generate types for unnamed queries)

```sh
bun run graphql:codegen
```

This should be done anytime a `.graphql` file is created or modified.

As part of https://github.com/regen-network/regen-server/pull/186, we've added some additional filtering features to our GraphQL server (using [postgraphile-plugin-connection-filter](https://github.com/graphile-contrib/postgraphile-plugin-connection-filter)), though we restricted the filters to only work on certain fields and operators for now for [performance and security](https://github.com/graphile-contrib/postgraphile-plugin-connection-filter#performance-and-security) reasons:
https://github.com/regen-network/regen-server/blob/aa97096c9a8e88e1af97655586e0222e263b8df5/server/Server.ts#L111-L115

If you try to use a filter that is not allowed yet, you'll get the following error when trying to generate types:
`GraphQLDocumentError: Field "${fieldName}" is not defined by type "${TableName}Filter".`
In this case, you might want to submit a PR on https://github.com/regen-network/regen-server first to allow more filtering options.

Similarly, types can be generated for Sanity GraphQL Schema (from `web-marketplace/src/graphql/sanity/*.graphql`) using:

```sh
bun run graphql:codegen-sanity
```

### Storybook

```sh
bun run build-storybook
```

### Website

```sh
bun run build-www
```

## Testing

#### - Running tests

We are using [Vitest](https://vitest.dev/) as a test runner.

Tests can be run in the terminal with the following commands from the project root:

- To run `web-marketplace` tests

  ```sh
  bun run test-marketplace
  ```

- To run `web-components` tests
  ```sh
  bun run test-components
  ```
  In both cases the test runner is launched in the interactive watch mode.

#### - Writing tests

When writing test in `web-marketplace` remember to import the methods from`'web-marketplace/test/test-utils'`, specially the `render` method, as it is a custom render that wraps components with the necessary providers.

In `web-components`, methods should be imported directly from `'@testing-library/*'`

## Code style

[Prettier](https://prettier.io/) and [ESLint](https://eslint.org/) are used as
code formatter and linter.

Code can be formatted and any auto-fixable errors corrected through the command:

```sh
bun run format-and-fix
```

If you are using VsCode, there are suggested workspace settings in `.vscode/settings.json.suggested` - copy those over to your workspace `settings.json` and things should format automatically.

Note: You'll need the VsCode extensions for [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## i18n

Regen codebase use [lingui](https://lingui.dev/) Internationalization Framework.

**Lingui package usage:**

- static text in JSX: `<Trans>{'static text'}</Trans>`
- attributes: \_(msg\`static text\`)
- constants:
  - const elements = [msg\`some element\`]
  - \_(elements[0])

**Lingui CLI usage:**

Run `i18n:extract` inside `web-marketplace` to update the `.po` files with the newly added translation keys (with `<Trans>` or `_(msg)`).

**Tips**

Here's a vscode snippet to make string translation easier:

```
"Lingui translate": {
  "prefix": "lin",
  "body": [
    "_(msg`$1`)",
  ],
  "description": "Translate text"
}
```

### Important notes

`<Trans>` component should be imported from `@lingui/macro` most of the time. This component is used at compile-time.
There is another `<Trans>` component in `@lingui/react` for [special cases](https://lingui.dev/tutorials/react-patterns#lazy-translations). This component is used at runtime.

### web-components

components in `web-components` should not use any i18n code in order to make them more generic and reusable.

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

| **Px** | **Rem**  | **theme.spacing** |            **Figma Component**            |      **UI Components**       | **MUI Variants** |
| :----: | :------: | ----------------- | :---------------------------------------: | :--------------------------: | :--------------: |
|  48px  |   3rem   | 12                |                    H1                     |            Title             |        H1        |
|  38px  | 2.375rem | 9.5               |                    H2                     |            Title             |        H2        |
|  32px  |   2rem   | 8                 |                    H3                     |            Title             |        H3        |
|  24px  |  1.5rem  | 6                 |                    H4                     |            Title             |        H4        |
|  22px  | 1.375rem | 5.5               |        bodyXLarge, subtitleXLarge         |        Body, Subtitle        |    textXLarge    |
|  21px  | 1.313rem | 5.252             |              H5, ButtonLarge              |         Title, Label         |        H5        |
|  18px  | 1.125rem | 4.5               | H6, subtitleLarge bodyLarge, buttonMedium | Title, Subtitle, Body, Label |  h6, textLarge   |
|  16px  |   1rem   | 4                 |        subtitleMedium, bodyMedium         |       Subtitle, Label        |    textMedium    |
|  14px  | 0.875rem | 3.5               |   subtitleSmall, bodySmall, buttonSmall   |    Subtitle, Body, Label     |    textSmall     |
|  12px  | 0.75rem  | 3                 |  subtitleXSmall bodyXSmall, buttonXSmall  |    Subtitle, Body, Label     |    textXSmall    |

## Netlify

Currently we use netlify to deploy this application.
Please see the `netlify.toml` in the project root for information about the different deployment environments.

### Debugging Netlify deploys

In case you are seeing a build/deploy failure from Netlify, there is a helpful way to debug.
Netlify provides the source code for [their build-image](https://github.com/netlify/build-image).
This docker image can be used to run a netlify build worker on your local machine.
This allows you to test settings and parameters of the build.
Hopefully this allows you to reproduce the error/failure you are dealing with.

```sh
git clone https://github.com/netlify/build-image
cd build-images
docker pull netlify/build:focal
./test-tools/start-image.sh ../regen-web/
```

Make sure that any changes you want to test in the local build are committed.
Uncommited changes are ignored by the Netlify build image.

After running the `start-image.sh` script you will drop into the docker container.
Then you will be able to run any commands, i.e. the build:

```sh
/opt/build-bin/build bun run build
```
