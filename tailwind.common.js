/* eslint-disable lingui/no-unlocalized-strings */
// This file defines the common tailwind configuration to be used as the basis
// of each project's tailwind.config.js file.

// colors generated from Figma design tokens are under extend.colors as bc (base colors), ac (alias colors), and sc (semantic colors)
// prefer using semantic colors over alias colors, and only use base colors as a last resort

import { IS_TERRASOS } from './web-marketplace/src/lib/env';

const fontFamily = IS_TERRASOS
  ? {
      sans: ['var(--font-montserrat)', '-apple-system', 'sans-serif'],
    }
  : {
      sans: ['var(--font-sans)', '-apple-system', 'sans-serif'],
      muli: ['var(--font-muli)', '-apple-system', 'sans-serif'],
    };

module.exports = {
  theme: {
    fontFamily,
    colors: {
      // Make sure these guidelines are followed when adding new colors: https://tailwindcss.com/docs/customizing-colors#using-css-variables
      // Color variables should be added to tailwind.css.
      brand: {
        500: 'rgb(var(--brand-500) / <alpha-value>)',
        400: 'rgb(var(--brand-400) / <alpha-value>)',
        300: 'rgb(var(--brand-300) / <alpha-value>)',
        200: 'rgb(var(--brand-200) / <alpha-value>)',
        100: 'rgb(var(--brand-100) / <alpha-value>)',
      },
      grey: {
        0: 'rgb(var(--grey-0) / <alpha-value>)',
        100: 'rgb(var(--grey-100) / <alpha-value>)',
        200: 'rgb(var(--grey-200) / <alpha-value>)',
        300: 'rgb(var(--grey-300) / <alpha-value>)',
        400: 'rgb(var(--grey-400) / <alpha-value>)',
        500: 'rgb(var(--grey-500) / <alpha-value>)',
        600: 'rgb(var(--grey-600) / <alpha-value>)',
        700: 'rgb(var(--grey-700) / <alpha-value>)',
      },
      warning: {
        400: 'rgb(var(--warning-400) / <alpha-value>)',
        300: 'rgb(var(--warning-300) / <alpha-value>)',
        200: 'rgb(var(--warning-200) / <alpha-value>)',
        100: 'rgb(var(--warning-100) / <alpha-value>)',
      },
      error: {
        400: 'rgb(var(--error-400) / <alpha-value>)',
        300: 'rgb(var(--error-300) / <alpha-value>)',
        200: 'rgb(var(--error-200) / <alpha-value>)',
        100: 'rgb(var(--error-100) / <alpha-value>)',
      },
      blue: {
        400: 'rgb(var(--blue-400) / <alpha-value>)',
        300: 'rgb(var(--blue-300) / <alpha-value>)',
        200: 'rgb(var(--blue-200) / <alpha-value>)',
        100: 'rgb(var(--blue-100) / <alpha-value>)',
        50: 'rgb(var(--blue-50) / <alpha-value>)',
        0: 'rgb(var(--blue-0) / <alpha-value>)',
      },
      purple: {
        400: 'rgb(var(--purple-400) / <alpha-value>)',
        300: 'rgb(var(--purple-300) / <alpha-value>)',
        200: 'rgb(var(--purple-200) / <alpha-value>)',
        100: 'rgb(var(--purple-100) / <alpha-value>)',
      },
      orange: {
        700: 'rgb(var(--orange-700) / <alpha-value>)',
      },
    },
    spacing: {
      // This spacing scale is based on the actual pixel values converted to REM values.
      // This diverges from tailwind's standard pattern of defining its own spacing numbers
      // but should be easier for developers trying to match spacing to designs in Figma.
      0: '0',
      1: '0.0625rem', // 1px
      3: '0.1875rem', // 3px
      5: '0.3125rem', // 5px
      10: '0.625rem', // 10px
      15: '0.9375rem', // 15px
      20: '1.25rem', // 20px
      25: '1.5625rem', // 25px
      30: '1.875rem', // 30px
      35: '2.1875rem', // 35px
      40: '2.5rem', // 40px
      45: '2.8125rem', // 45px
      50: '3.125rem', // 50px
      60: '3.75rem', // 60px
    },
    extend: {
      backgroundImage: {
        'prefinance-gradient':
          'linear-gradient(24deg, rgba(81, 93, 137, 0.10) 2.82%, rgba(125, 201, 191, 0.10) 23.42%, rgba(250, 235, 209, 0.10) 79.07%)',
        'purple-gradient':
          'linear-gradient(179deg,#515D89 19.77%,#7DC9BF 114.05%,#FAEBD1 200.67%)',
        'blue-green-gradient':
          'linear-gradient(197deg, #7D9AA2 8.02%, #9AD3BE 43.42%, #D1E2C7 78.83%)',
        'prefinance-tag':
          'linear-gradient(179deg, rgba(var(--sc-tag-prefinance-600) / 1) 19.77%, rgba(var(--sc-tag-prefinance-500) / 1) 114.05%, rgba(var(--sc-tag-prefinance-400) / 1) 200.67%)',
        'credit-category':
          'linear-gradient(202deg, rgba(var(--sc-tag-credit-category-300) / 1) 14.67%, rgba(var(--sc-tag-credit-category-500) / 1) 97.14%)',
        'orange-gradient':
          'linear-gradient(102deg, rgba(var(--bc-orange-100) / 1) 5.13%, rgba(var(--bc-orange-200) / 1) 98.63%)',
      },
      boxShadow: {
        sm: '0px 4px 10px 0px rgba(0, 0, 0, 0.05)',
        md: '0px 4px 10px 0px rgba(0, 0, 0, 0.05), 0px 0px 10px 0px rgba(250, 250, 216, 0.80)',
      },
      fontWeight: {
        inherit: 'inherit',
      },
      backgroundColor: {
        transparent: 'transparent',
      },
      colors: {
        bc: {
          neutral: {
            0: 'rgb(var(--bc-neutral-0) / <alpha-value>)',
            100: 'rgb(var(--bc-neutral-100) / <alpha-value>)',
            200: 'rgb(var(--bc-neutral-200) / <alpha-value>)',
            300: 'rgb(var(--bc-neutral-300) / <alpha-value>)',
            400: 'rgb(var(--bc-neutral-400) / <alpha-value>)',
            500: 'rgb(var(--bc-neutral-500) / <alpha-value>)',
            600: 'rgb(var(--bc-neutral-600) / <alpha-value>)',
            700: 'rgb(var(--bc-neutral-700) / <alpha-value>)',
          },
          green: {
            100: 'rgb(var(--bc-green-100) / <alpha-value>)',
            200: 'rgb(var(--bc-green-200) / <alpha-value>)',
            300: 'rgb(var(--bc-green-300) / <alpha-value>)',
            400: 'rgb(var(--bc-green-400) / <alpha-value>)',
            500: 'rgb(var(--bc-green-500) / <alpha-value>)',
            600: 'rgb(var(--bc-green-600) / <alpha-value>)',
            700: 'rgb(var(--bc-green-700) / <alpha-value>)',
          },
          yellow: {
            100: 'rgb(var(--bc-yellow-100) / <alpha-value>)',
            200: 'rgb(var(--bc-yellow-200) / <alpha-value>)',
            300: 'rgb(var(--bc-yellow-300) / <alpha-value>)',
            400: 'rgb(var(--bc-yellow-400) / <alpha-value>)',
            500: 'rgb(var(--bc-yellow-500) / <alpha-value>)',
            600: 'rgb(var(--bc-yellow-600) / <alpha-value>)',
            700: 'rgb(var(--bc-yellow-700) / <alpha-value>)',
          },
          red: {
            100: 'rgb(var(--bc-red-100) / <alpha-value>)',
            200: 'rgb(var(--bc-red-200) / <alpha-value>)',
            300: 'rgb(var(--bc-red-300) / <alpha-value>)',
            400: 'rgb(var(--bc-red-400) / <alpha-value>)',
            500: 'rgb(var(--bc-red-500) / <alpha-value>)',
            600: 'rgb(var(--bc-red-600) / <alpha-value>)',
            700: 'rgb(var(--bc-red-700) / <alpha-value>)',
          },
          blue: {
            100: 'rgb(var(--bc-blue-100) / <alpha-value>)',
            200: 'rgb(var(--bc-blue-200) / <alpha-value>)',
            300: 'rgb(var(--bc-blue-300) / <alpha-value>)',
            400: 'rgb(var(--bc-blue-400) / <alpha-value>)',
            500: 'rgb(var(--bc-blue-500) / <alpha-value>)',
            600: 'rgb(var(--bc-blue-600) / <alpha-value>)',
            700: 'rgb(var(--bc-blue-700) / <alpha-value>)',
          },
          orange: {
            100: 'rgb(var(--bc-orange-100) / <alpha-value>)',
            200: 'rgb(var(--bc-orange-200) / <alpha-value>)',
            300: 'rgb(var(--bc-orange-300) / <alpha-value>)',
            400: 'rgb(var(--bc-orange-400) / <alpha-value>)',
            500: 'rgb(var(--bc-orange-500) / <alpha-value>)',
            600: 'rgb(var(--bc-orange-600) / <alpha-value>)',
            700: 'rgb(var(--bc-orange-700) / <alpha-value>)',
          },
          purple: {
            100: 'rgb(var(--bc-purple-100) / <alpha-value>)',
            200: 'rgb(var(--bc-purple-200) / <alpha-value>)',
            300: 'rgb(var(--bc-purple-300) / <alpha-value>)',
            400: 'rgb(var(--bc-purple-400) / <alpha-value>)',
            500: 'rgb(var(--bc-purple-500) / <alpha-value>)',
            600: 'rgb(var(--bc-purple-600) / <alpha-value>)',
            700: 'rgb(var(--bc-purple-700) / <alpha-value>)',
          },
          gradients: {
            'blue-green': {
              400: 'rgb(var(--bc-gradients-blue-green-400) / <alpha-value>)',
              500: 'rgb(var(--bc-gradients-blue-green-500) / <alpha-value>)',
              600: 'rgb(var(--bc-gradients-blue-green-600) / <alpha-value>)',
            },
            purple: {
              400: 'rgb(var(--bc-gradients-purple-400) / <alpha-value>)',
            },
          },
        },
        ac: {
          primary: {
            100: 'rgb(var(--ac-primary-100) / <alpha-value>)',
            200: 'rgb(var(--ac-primary-200) / <alpha-value>)',
            300: 'rgb(var(--ac-primary-300) / <alpha-value>)',
            400: 'rgb(var(--ac-primary-400) / <alpha-value>)',
            500: 'rgb(var(--ac-primary-500) / <alpha-value>)',
            600: 'rgb(var(--ac-primary-600) / <alpha-value>)',
            700: 'rgb(var(--ac-primary-700) / <alpha-value>)',
          },
          neutral: {
            0: 'rgb(var(--ac-neutral-0) / <alpha-value>)',
            100: 'rgb(var(--ac-neutral-100) / <alpha-value>)',
            200: 'rgb(var(--ac-neutral-200) / <alpha-value>)',
            300: 'rgb(var(--ac-neutral-300) / <alpha-value>)',
            400: 'rgb(var(--ac-neutral-400) / <alpha-value>)',
            500: 'rgb(var(--ac-neutral-500) / <alpha-value>)',
            600: 'rgb(var(--ac-neutral-600) / <alpha-value>)',
            700: 'rgb(var(--ac-neutral-700) / <alpha-value>)',
          },
          gradients: {
            'primary-gradient': {
              400: 'rgb(var(--ac-gradients-primary-gradient-400) / <alpha-value>)',
              500: 'rgb(var(--ac-gradients-primary-gradient-500) / <alpha-value>)',
              600: 'rgb(var(--ac-gradients-primary-gradient-600) / <alpha-value>)',
            },
            'purple-gradient': {
              400: 'rgb(var(--ac-gradients-purple-gradient-400) / <alpha-value>)',
              500: 'rgb(var(--ac-gradients-purple-gradient-500) / <alpha-value>)',
              600: 'rgb(var(--ac-gradients-purple-gradient-600) / <alpha-value>)',
            },
          },
          success: {
            400: 'rgb(var(--ac-success-400) / <alpha-value>)',
            500: 'rgb(var(--ac-success-500) / <alpha-value>)',
          },
          error: {
            400: 'rgb(var(--ac-error-400) / <alpha-value>)',
            500: 'rgb(var(--ac-error-500) / <alpha-value>)',
          },
        },
        sc: {
          text: {
            paragraph: 'rgb(var(--sc-text-paragraph) / <alpha-value>)',
            header: 'rgb(var(--sc-text-header) / <alpha-value>)',
            link: 'rgb(var(--sc-text-link) / <alpha-value>)',
            'sub-header': 'rgb(var(--sc-text-sub-header) / <alpha-value>)',
            disabled: 'rgb(var(--sc-text-disabled) / <alpha-value>)',
            error: 'rgb(var(--sc-text-error) / <alpha-value>)',
            'over-image': 'rgb(var(--sc-text-over-image) / <alpha-value>)',
          },
          surface: {
            'page-background-default':
              'rgb(var(--sc-surface-page-background-default) / <alpha-value>)',
            stroke: 'rgb(var(--sc-surface-stroke) / <alpha-value>)',
            'page-background-light':
              'rgb(var(--sc-surface-page-background-light) / <alpha-value>)',
          },
          card: {
            standard: {
              background:
                'rgb(var(--sc-card-standard-background) / <alpha-value>)',
              stroke: 'rgb(var(--sc-card-standard-stroke) / <alpha-value>)',
              'header-background':
                'rgb(var(--sc-card-standard-header-background) / <alpha-value>)',
            },
            credibility: {
              'diagonal-background':
                'rgb(var(--sc-card-credibility-diagonal-background) / <alpha-value>)',
            },
          },
          icon: {
            standard: {
              dark: 'rgb(var(--sc-icon-standard-dark) / <alpha-value>)',
              light: 'rgb(var(--sc-icon-standard-light) / <alpha-value>)',
              error: 'rgb(var(--sc-icon-standard-error) / <alpha-value>)',
              success: 'rgb(var(--sc-icon-standard-success) / <alpha-value>)',
              background:
                'rgb(var(--sc-icon-standard-background) / <alpha-value>)',
              disabled: 'rgb(var(--sc-icon-standard-disabled) / <alpha-value>)',
              shade: 'rgb(var(--sc-icon-standard-shade) / <alpha-value>)',
            },
            ecosystem: {
              400: 'rgb(var(--sc-icon-ecosystem-400) / <alpha-value>)',
              500: 'rgb(var(--sc-icon-ecosystem-500) / <alpha-value>)',
              600: 'rgb(var(--sc-icon-ecosystem-600) / <alpha-value>)',
            },
            sdg: {
              400: 'rgb(var(--sc-icon-sdg-400) / <alpha-value>)',
              500: 'rgb(var(--sc-icon-sdg-500) / <alpha-value>)',
              600: 'rgb(var(--sc-icon-sdg-600) / <alpha-value>)',
              number: 'rgb(var(--sc-icon-sdg-number) / <alpha-value>)',
              header: 'rgb(var(--sc-icon-sdg-header) / <alpha-value>)',
              'stroke-shadow':
                'rgb(var(--sc-icon-sdg-stroke-shadow) / <alpha-value>)',
              background: 'rgb(var(--sc-icon-sdg-background) / <alpha-value>)',
            },
            credibility: {
              '100-blue-green-gradient': {
                400: 'rgb(var(--sc-icon-credibility-100-blue-green-gradient-400) / <alpha-value>)',
                500: 'rgb(var(--sc-icon-credibility-100-blue-green-gradient-500) / <alpha-value>)',
                600: 'rgb(var(--sc-icon-credibility-100-blue-green-gradient-600) / <alpha-value>)',
              },
              '25-blue-green-gradient': {
                400: 'rgb(var(--sc-icon-credibility-25-blue-green-gradient-400) / <alpha-value>)',
                500: 'rgb(var(--sc-icon-credibility-25-blue-green-gradient-500) / <alpha-value>)',
                600: 'rgb(var(--sc-icon-credibility-25-blue-green-gradient-600) / <alpha-value>)',
              },
              '10-blue-green-gradient': {
                400: 'rgb(var(--sc-icon-credibility-10-blue-green-gradient-400) / <alpha-value>)',
                500: 'rgb(var(--sc-icon-credibility-10-blue-green-gradient-500) / <alpha-value>)',
                600: 'rgb(var(--sc-icon-credibility-10-blue-green-gradient-600) / <alpha-value>)',
              },
              background:
                'rgb(var(--sc-icon-credibility-background) / <alpha-value>)',
            },
          },
          gradient: {
            'lighter-gradient': {
              300: 'rgb(var(--sc-gradient-lighter-gradient-300) / <alpha-value>)',
              500: 'rgb(var(--sc-gradient-lighter-gradient-500) / <alpha-value>)',
            },
            'heavy-gradient': {
              400: 'rgb(var(--sc-gradient-heavy-gradient-400) / <alpha-value>)',
              500: 'rgb(var(--sc-gradient-heavy-gradient-500) / <alpha-value>)',
              600: 'rgb(var(--sc-gradient-heavy-gradient-600) / <alpha-value>)',
            },
          },
          button: {
            'text-icon': {
              light: 'rgb(var(--sc-button-text-icon-light) / <alpha-value>)',
              dark: 'rgb(var(--sc-button-text-icon-dark) / <alpha-value>)',
              disabled:
                'rgb(var(--sc-button-text-icon-disabled) / <alpha-value>)',
              prefinance:
                'rgb(var(--sc-button-text-icon-prefinance) / <alpha-value>)',
            },
            surface: {
              standard: {
                'secondary-hover':
                  'rgb(var(--sc-button-surface-standard-secondary-hover) / <alpha-value>)',
                'primary-disabled':
                  'rgb(var(--sc-button-surface-standard-primary-disabled) / <alpha-value>)',
                'secondary-default':
                  'rgb(var(--sc-button-surface-standard-secondary-default) / <alpha-value>)',
                'secondary-disabled':
                  'rgb(var(--sc-button-surface-standard-secondary-disabled) / <alpha-value>)',
              },
              prefinance: {
                400: 'rgb(var(--sc-button-surface-prefinance-400) / <alpha-value>)',
                500: 'rgb(var(--sc-button-surface-prefinance-500) / <alpha-value>)',
                600: 'rgb(var(--sc-button-surface-prefinance-600) / <alpha-value>)',
              },
            },
            outline: {
              'secondary-disabled':
                'rgb(var(--sc-button-outline-secondary-disabled) / <alpha-value>)',
            },
          },
          tabs: {
            'tab-underline':
              'rgb(var(--sc-tabs-tab-underline) / <alpha-value>)',
          },
          tag: {
            impact: {
              background:
                'rgb(var(--sc-tag-impact-background) / <alpha-value>)',
              'text-icon':
                'rgb(var(--sc-tag-impact-text-icon) / <alpha-value>)',
            },
            prefinance: {
              400: 'rgb(var(--sc-tag-prefinance-400) / <alpha-value>)',
              500: 'rgb(var(--sc-tag-prefinance-500) / <alpha-value>)',
              600: 'rgb(var(--sc-tag-prefinance-600) / <alpha-value>)',
              'text-icon':
                'rgb(var(--sc-tag-prefinance-text-icon) / <alpha-value>)',
            },
            filter: {
              'background-unselected':
                'rgb(var(--sc-tag-filter-background-unselected) / <alpha-value>)',
              'background-selected':
                'rgb(var(--sc-tag-filter-background-selected) / <alpha-value>)',
              'stroke-unselected':
                'rgb(var(--sc-tag-filter-stroke-unselected) / <alpha-value>)',
              'stroke-selected':
                'rgb(var(--sc-tag-filter-stroke-selected) / <alpha-value>)',
              'outer-shadow':
                'rgb(var(--sc-tag-filter-outer-shadow) / <alpha-value>)',
              'inner-shadow':
                'rgb(var(--sc-tag-filter-inner-shadow) / <alpha-value>)',
            },
            'credit-category': {
              300: 'rgb(var(--sc-tag-credit-category-300) / <alpha-value>)',
              500: 'rgb(var(--sc-tag-credit-category-500) / <alpha-value>)',
              'text-icon':
                'rgb(var(--sc-tag-credit-category-text-icon) / <alpha-value>)',
            },
          },
          tooltip: {
            outline: 'rgb(var(--sc-tooltip-outline) / <alpha-value>)',
            fill: 'rgb(var(--sc-tooltip-fill) / <alpha-value>)',
          },
          input: {
            'background-default':
              'rgb(var(--sc-input-background-default) / <alpha-value>)',
            'background-disabled':
              'rgb(var(--sc-input-background-disabled) / <alpha-value>)',
            'triangle-icon-default':
              'rgb(var(--sc-input-triangle-icon-default) / <alpha-value>)',
            'triangle-icon-disabled':
              'rgb(var(--sc-input-triangle-icon-disabled) / <alpha-value>)',
          },
          table: {
            'surface-dark': 'rgb(var(--sc-table-surface-dark) / <alpha-value>)',
            'surface-light':
              'rgb(var(--sc-table-surface-light) / <alpha-value>)',
            stroke: 'rgb(var(--sc-table-stroke) / <alpha-value>)',
          },
          'checkbox-or-radio-selector': {
            'background-default':
              'rgb(var(--sc-checkbox-or-radio-selector-background-default) / <alpha-value>)',
            stroke:
              'rgb(var(--sc-checkbox-or-radio-selector-stroke) / <alpha-value>)',
            'background-selected':
              'rgb(var(--sc-checkbox-or-radio-selector-background-selected) / <alpha-value>)',
          },
        },
      },
      keyframes: {
        menuOpen: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.60)',
            transformOrigin: 'top right',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
            transformOrigin: 'top right',
          },
        },
        menuClose: {
          '0%': {
            opacity: '1',
            transform: 'scale(1)',
            transformOrigin: 'top right',
          },
          '100%': {
            opacity: '0',
            transform: 'scale(0.60)',
            transformOrigin: 'top right',
          },
        },
      },
      animation: {
        menuOpen: 'menuOpen 300ms ease-in-out',
        menuClose: 'menuClose 225ms ease-in-out',
      },
    },
  },
  plugins: [],
  corePlugins: {
    // Preflight needs to be disabled to avoid problems with MUI component styles.
    // This has the side effect that some tailwind styles don't work as expected
    // by default. For instance, in order for borders to show up at all,
    // border-solid is needed whereas it would normally be set by default.
    preflight: false,
  },
  darkMode: 'class',
};
