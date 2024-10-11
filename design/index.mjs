import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import StyleDictionary from 'style-dictionary';
import { outputReferencesFilter } from 'style-dictionary/utils';
import Color from 'tinycolor2';

const referenceFixes = [
  { pattern: /regen base colors\.regen\./g, replacement: 'regen base colors.' },
  {
    pattern: /terrasos base colors\.terrasos\./g,
    replacement: 'terrasos base colors.',
  },
  {
    pattern: /regen base colors\.terrasos\./g,
    replacement: 'regen base colors.',
  },
  { pattern: /{alias\.regen light\.color/g, replacement: '{alias.regen.color' },
  { pattern: /{alias\.regen dark\.color/g, replacement: '{alias.regen.color' },
  {
    pattern: /{alias\.terrasos light\.color/g,
    replacement: '{alias.terrasos.color',
  },
  {
    pattern: /{alias\.terrasos dark\.color/g,
    replacement: '{alias.terrasos.color',
  },
  {
    pattern: /{regen base colors\.regen light\./g,
    replacement: '{regen base colors.',
  },
  {
    pattern: /{regen base colors\.regen dark\./g,
    replacement: '{regen base colors.',
  },
  {
    pattern: /{terrasos base colors\.regen dark\./g,
    replacement: '{terrasos base colors.',
  },
];

const pathTransforms = [
  { pattern: /alias.regen.color/g, replacement: 'ac' },
  { pattern: /alias.terrasos.color/g, replacement: 'ac' },
  { pattern: /regen base colors/g, replacement: 'bc' },
  { pattern: /terrasos base colors/g, replacement: 'bc' },
  { pattern: /mapped.regen light/g, replacement: 's' },
  { pattern: /mapped.regen dark/g, replacement: 's' },
  { pattern: /mapped.terrasos light/g, replacement: 's' },
  { pattern: /mapped.terrasos dark/g, replacement: 's' },
];

// Function to update the value field based on the specified rules
const updateValue = value => {
  let originalValue = value;
  for (const { pattern, replacement } of referenceFixes) {
    value = value.replace(pattern, replacement);
  }
  if (originalValue !== value) {
    console.log(`Transformed: ${originalValue} -> ${value}`);
  }
  return value;
};

const updateJsonValues = obj => {
  _.forOwn(obj, (value, key) => {
    if (_.isObject(value)) {
      updateJsonValues(value);
    } else if (key === 'value') {
      obj[key] = updateValue(value);
    }
  });
};

// Register custom parser
StyleDictionary.registerParser({
  name: 'custom-json',
  pattern: /\.json$/,
  parser: ({ filePath, contents }) => {
    console.log('Parsing file:', filePath);
    const jsonData = JSON.parse(contents);
    updateJsonValues(jsonData);
    return jsonData;
  },
});

// Register custom transform for Modern RGB color values
StyleDictionary.registerTransform({
  name: 'color/rgb-modern',
  type: 'value',
  matcher: token => token.type === 'color',
  transform: function (token, _, options) {
    const legacyFmt = Color(
      options.usesDtcg ? token.$value : token.value,
    ).toRgbString();
    return legacyFmt.replace(
      /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*\d+(\.\d+)?)?\)/,
      '$1 $2 $3',
    );
  },
});

// Register custom transform to remove prefix from variable names
StyleDictionary.registerTransform({
  name: 'name/cti/kebab-remove-prefix',
  type: 'name',
  transform: prop => {
    let transformedName = prop.name;

    for (const { pattern, replacement } of pathTransforms) {
      transformedName = transformedName.replace(pattern, `${replacement}-`);
    }

    return transformedName;
  },
});

StyleDictionary.registerTransform({
  name: 'value/cti/kebab-remove-prefix',
  type: 'value',
  transform: prop => {
    let transformedValue = prop.value;

    for (const { pattern, replacement } of pathTransforms) {
      transformedValue = transformedValue.replace(pattern, `${replacement}-`);
    }

    return transformedValue;
  },
});

// Register custom format for Tailwind CSS with nested variables
StyleDictionary.registerFormat({
  name: 'tailwind/colors',
  format: ({ dictionary }) => {
    const tokens = {};
    dictionary.allTokens.forEach(y =>
      _.setWith(tokens, y.path, y.value, Object),
    );
    return `module.exports = {
      theme: {
        extend: {
          colors: ${JSON.stringify(tokens, null, 2)}
        }
      }
    }`;
  },
});

// Register custom format for Tailwind CSS with nested variables and shared variables
StyleDictionary.registerFormat({
  name: 'tailwind/colors-shared',
  format: ({ dictionary }) => {
    const tokens = {};
    dictionary.allTokens.forEach(y => {
      const path = y.path.join('.');

      const isReference = str => str.startsWith('{') && str.endsWith('}');
      const wrapRgbVar = str => `rgb(var(--${str}) / <alpha-value>)`;
      let newPath = path;
      let newValue = path;

      for (const { pattern, replacement } of pathTransforms) {
        newPath = newPath
          .replace(pattern, replacement)
          .replace(/\&/g, '-')
          .replace(/\%/g, '');
      }

      if (isReference(y.original.value)) {
        newValue = y.original.value.slice(1, -1);
        for (const { pattern, replacement } of pathTransforms) {
          newValue = newValue.replace(pattern, replacement);
        }
      } else {
        newValue = newPath.replace(/\./g, '-');
      }

      _.setWith(
        tokens,
        newPath,
        wrapRgbVar(newValue.replace(/\./g, '-')),
        Object,
      );
    });

    return `module.exports = {
      theme: {
        extend: {
          colors: ${JSON.stringify(tokens, null, 2)}
        }
      }
    }`;
  },
});

const cssFiles = [
  {
    name: 'semantic-regen-light',
    tokenPath: 'mapped.regen light',
  },
  {
    name: 'semantic-regen-dark',
    tokenPath: 'mapped.regen dark',
  },
  {
    name: 'semantic-terrasos-light',
    tokenPath: 'mapped.terrasos light',
  },
  {
    name: 'semantic-terrasos-dark',
    tokenPath: 'mapped.terrasos dark',
  },
  {
    name: 'base-regen',
    tokenPath: 'regen base colors.',
  },
  {
    name: 'base-terrasos',
    tokenPath: 'terrasos base colors.',
  },
  {
    name: 'alias-regen',
    tokenPath: 'alias.regen.color',
  },
  {
    name: 'alias-terrasos',
    tokenPath: 'alias.terrasos.color',
  },
];

// Define the configuration
const config = {
  log: {
    verbosity: 'verbose',
  },
  source: ['tokens/tokens.json'],
  parsers: ['custom-json'],
  platforms: {
    tailwind: {
      transformGroup: 'js',
      transforms: [
        'name/kebab',
        'color/rgb-modern',
        'name/cti/kebab-remove-prefix',
        'value/cti/kebab-remove-prefix',
      ],
      buildPath: 'build/',
      files: [
        // {
        //   destination: 'tailwind.config2.js',
        //   format: 'tailwind/colors',
        // },
        {
          destination: 'tailwind.common.js',
          format: 'tailwind/colors-shared',
          options: {
            outputReferences: true,
          },
        },
        ...cssFiles.map(({ name, tokenPath }) => ({
          destination: `${name}.css`,
          format: 'css/variables',
          options: {
            outputReferences: outputReferencesFilter,
          },
          filter: function (token) {
            return token.path.join('.').includes(tokenPath);
          },
        })),
      ],
    },
  },
};

// Apply the configuration and build
const styleDictionary = new StyleDictionary(config);
//const styleDictionary = StyleDictionary.extend(config);
styleDictionary.buildAllPlatforms();

// Optionally, log the output paths
console.log('Build completed. Output files:');
config.platforms.tailwind.files.forEach(file => {
  console.log(`${config.platforms.tailwind.buildPath}${file.destination}`);
});
