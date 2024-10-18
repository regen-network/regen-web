# Design

This package processes [design tokens](https://tr.designtokens.org/format/) to generate CSS variables and a Tailwind config. It expects the design tokens exported from our Figma with the [Design Tokens plugin](https://www.figma.com/community/plugin/888356646278934516/design-tokens).

```
bun run build-tokens
```

It parses `tokens/tokens.json` and generates 
- `base-regen.css`: base colors for Regen theme
- `base-terrasos.css`: base colors for Terrasos theme
- `alias-regen.css`: aliased colors that reference theme base colors (e.g. `primary.400` => `green.400`)
- `alias-terrasos.css`: aliased colors that reference theme base colors
- `semantic-regen-dark.css`: semantic colors for elements with a dark theme
- `semantic-regen-light.css`: semantic colors for elements with a light theme
- `semantic-terrasos-dark.css`: semantic colors for elements with a dark theme
- `semantic-terrasos-light.css`: semantic colors for elements with a light theme
- `tailwind.common.js`: a shared js file that can reference the relevant css variables for all theme clients

These files can then be integrated into our app's theming system, by updating 
- `tailwind.common.js`: shared interface
- `tailwind.css`: default theme variables
- `web-marketplace/src/clients/*/*.tailwind.css`: client specific theme variables