import styled from '@emotion/styled';
import _ from 'lodash';

import cssText from '../../../web-marketplace/src/clients/terrasos/Terrasos.tailwind.css?raw';
import { cn } from '../utils/styles/cn';

// Define the regex pattern
const regexPattern =
  /^@tailwind\s+base;\n|^@tailwind\s+components;\n|^@tailwind\s+utilities;\n|^@layer\s+base\s+\{\s+:root\s+\{\n/gm;

// TODO: find a better solution than this hack.
// Remove lines that would break import
const cleanedCssText = cssText.replace(regexPattern, '').replace(/}\s*$/gm, '');
const StyledComponent = styled.div`
  ${cleanedCssText}
`;

// TODO: remove, tailwinds doesn't allow dynamic classes
const structure = {
  colors: {
    bc: {
      red: ['100', '200', '300', '400', '500', '600', '700'],
      green: ['100', '200', '300', '400', '500', '600', '700'],
      yellow: ['100', '200', '300', '400', '500', '600', '700'],
      neutral: ['0', '100', '200', '300', '400', '500', '600', '700'],
    },
    ac: {
      error: ['400', '500'],
      success: ['400', '500'],
      gradients: {
        'purple-gradient': ['400', '500', '600'],
        'primary-gradient': ['400', '500', '600'],
      },
      neutral: ['0', '100', '200', '300', '400', '500', '600', '700'],
      primary: ['100', '200', '300', '400', '500', '600', '700'],
    },
    s: {
      tooltip: ['fill', 'outline'],
      text: [
        'paragraph',
        'header',
        'link',
        'sub-header',
        'disabled',
        'error',
        'over-image',
      ],
      card: {
        standard: ['background', 'stroke', 'header-background'],
        credibility: ['diagonal-background'],
      },
      button: {
        'text-icon': ['light', 'dark', 'disabled', 'prefinance'],
        surface: {
          standard: [
            'secondary-hover',
            'primary-disabled',
            'secondary-default',
            'secondary-disabled',
          ],
          prefinance: ['400', '500', '600'],
        },
        outline: ['secondary-disabled'],
      },
      'checkbox-or-radio-selector': [
        'background-default',
        'background-selected',
        'stroke',
      ],
      gradient: {
        'lighter-gradient': ['300', '500'],
        'heavy-gradient': ['400', '500', '600'],
      },
      icon: {
        standard: [
          'background',
          'dark',
          'disabled',
          'error',
          'light',
          'shade',
          'success',
        ],
        credibility: {
          '10-blue-green-gradient': ['400', '500', '600'],
          '25-blue-green-gradient': ['400', '500', '600'],
          '100-blue-green-gradient': ['400', '500', '600'],
          background: 'rgb(var(--icon-credibility-background) / <alpha-value>)',
        },
        ecosystem: ['400', '500', '600'],
        sdg: [
          '400',
          '500',
          '600',
          'background',
          'header',
          'number',
          'stroke-shadow',
        ],
      },
      input: [
        'background-default',
        'background-disabled',
        'triangle-icon-default',
        'triangle-icon-disabled',
      ],
      surface: ['page-background-default', 'page-background-light', 'stroke'],
      table: ['surface-dark', 'surface-light', 'stroke'],
      tabs: ['tab-underline'],
      tag: {
        'credit-category': ['300', '500', 'text-icon'],
        filter: [
          'background-unselected',
          'background-selected',
          'stroke-unselected',
          'stroke-selected',
          'outer-shadow',
          'inner-shadow',
        ],
        impact: ['background', 'text-icon'],
        prefinance: ['400', '500', '600', 'text-icon'],
      },
    },
  },
};

// TODO: remove, tailwinds doesn't allow dynamic classes
const items = [
  [
    'bc.red.100',
    'bc.red.200',
    'bc.red.300',
    'bc.red.400',
    'bc.red.500',
    'bc.red.600',
    'bc.red.700',
    'bc.green.100',
    'bc.green.200',
    'bc.green.300',
    'bc.green.400',
    'bc.green.500',
    'bc.green.600',
    'bc.green.700',
    'bc.yellow.100',
    'bc.yellow.200',
    'bc.yellow.300',
    'bc.yellow.400',
    'bc.yellow.500',
    'bc.yellow.600',
    'bc.yellow.700',
    'bc.neutral.0',
    'bc.neutral.100',
    'bc.neutral.200',
    'bc.neutral.300',
    'bc.neutral.400',
    'bc.neutral.500',
    'bc.neutral.600',
    'bc.neutral.700',
    'ac.error.400',
    'ac.error.500',
    'ac.success.400',
    'ac.success.500',
    'ac.gradients.purple-gradient.400',
    'ac.gradients.purple-gradient.500',
    'ac.gradients.purple-gradient.600',
    'ac.gradients.primary-gradient.400',
    'ac.gradients.primary-gradient.500',
    'ac.gradients.primary-gradient.600',
    'ac.neutral.0',
    'ac.neutral.100',
    'ac.neutral.200',
    'ac.neutral.300',
    'ac.neutral.400',
    'ac.neutral.500',
    'ac.neutral.600',
    'ac.neutral.700',
    'ac.primary.100',
    'ac.primary.200',
    'ac.primary.300',
    'ac.primary.400',
    'ac.primary.500',
    'ac.primary.600',
    'ac.primary.700',
    's.tooltip.fill',
    's.tooltip.outline',
    's.text.paragraph',
    's.text.header',
    's.text.link',
    's.text.sub-header',
    's.text.disabled',
    's.text.error',
    's.text.over-image',
    's.card.standard.background',
    's.card.standard.stroke',
    's.card.standard.header-background',
    's.card.credibility.diagonal-background',
    's.button.text-icon.light',
    's.button.text-icon.dark',
    's.button.text-icon.disabled',
    's.button.text-icon.prefinance',
    's.button.surface.standard.secondary-hover',
    's.button.surface.standard.primary-disabled',
    's.button.surface.standard.secondary-default',
    's.button.surface.standard.secondary-disabled',
    's.button.surface.prefinance.400',
    's.button.surface.prefinance.500',
    's.button.surface.prefinance.600',
    's.button.outline.secondary-disabled',
    's.checkbox-or-radio-selector.background-default',
    's.checkbox-or-radio-selector.background-selected',
    's.checkbox-or-radio-selector.stroke',
    's.gradient.lighter-gradient.300',
    's.gradient.lighter-gradient.500',
    's.gradient.heavy-gradient.400',
    's.gradient.heavy-gradient.500',
    's.gradient.heavy-gradient.600',
    's.icon.standard.background',
    's.icon.standard.dark',
    's.icon.standard.disabled',
    's.icon.standard.error',
    's.icon.standard.light',
    's.icon.standard.shade',
    's.icon.standard.success',
    's.icon.credibility.10-blue-green-gradient.400',
    's.icon.credibility.10-blue-green-gradient.500',
    's.icon.credibility.10-blue-green-gradient.600',
    's.icon.credibility.25-blue-green-gradient.400',
    's.icon.credibility.25-blue-green-gradient.500',
    's.icon.credibility.25-blue-green-gradient.600',
    's.icon.credibility.100-blue-green-gradient.400',
    's.icon.credibility.100-blue-green-gradient.500',
    's.icon.credibility.100-blue-green-gradient.600',
    's.icon.credibility.background',
    's.icon.ecosystem.400',
    's.icon.ecosystem.500',
    's.icon.ecosystem.600',
    's.icon.sdg.400',
    's.icon.sdg.500',
    's.icon.sdg.600',
    's.icon.sdg.background',
    's.icon.sdg.header',
    's.icon.sdg.number',
    's.icon.sdg.stroke-shadow',
    's.input.background-default',
    's.input.background-disabled',
    's.input.triangle-icon-default',
    's.input.triangle-icon-disabled',
    's.surface.page-background-default',
    's.surface.page-background-light',
    's.surface.stroke',
    's.table.surface-dark',
    's.table.surface-light',
    's.table.stroke',
    's.tabs.tab-underline',
    's.tag.credit-category.300',
    's.tag.credit-category.500',
    's.tag.credit-category.text-icon',
    's.tag.filter.background-unselected',
    's.tag.filter.background-selected',
    's.tag.filter.stroke-unselected',
    's.tag.filter.stroke-selected',
    's.tag.filter.outer-shadow',
    's.tag.filter.inner-shadow',
    's.tag.impact.background',
    's.tag.impact.text-icon',
    's.tag.prefinance.400',
    's.tag.prefinance.500',
    's.tag.prefinance.600',
    's.tag.prefinance.text-icon',
  ],
];

const Swatch = ({
  bgColor,
  className,
}: {
  bgColor: string;
  className?: string;
}) => (
  <div className={cn(bgColor, className, 'p-10 rounded-md')}>
    {bgColor.substring(3)}
  </div>
);

const Row = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-row gap-10">{children}</div>
);

// TODO: remove, tailwinds doesn't allow dynamic classes
const generateSwatches = (
  obj: Record<string, any>,
  prefix = '',
): JSX.Element[] => {
  return _.flatMap(_.entries(obj), ([key, value]) => {
    const newPrefix = prefix ? `${prefix}-${key}` : key;
    if (_.isArray(value)) {
      return value.map(shade => (
        <Swatch
          key={`${newPrefix}-${shade}`}
          bgColor={`bg-${newPrefix}-${shade}`}
        />
      ));
    } else if (_.isObject(value)) {
      return generateSwatches(value, newPrefix);
    }
    return [];
  });
};

export const BaseColors = {
  render: () => (
    <StyledComponent>
      <h1>Base Colors</h1>
      <div className="grid flex-col gap-10">
        <Row>
          <Swatch bgColor="bg-bc-red-100" />
          <Swatch bgColor="bg-bc-red-200" />
          <Swatch bgColor="bg-bc-red-300" />
          <Swatch bgColor="bg-bc-red-400" />
          <Swatch bgColor="bg-bc-red-500" />
          <Swatch bgColor="bg-bc-red-600" />
          <Swatch bgColor="bg-bc-red-700" />
        </Row>
        <Row>
          <Swatch bgColor="bg-bc-green-100" />
          <Swatch bgColor="bg-bc-green-200" />
          <Swatch bgColor="bg-bc-green-300" />
          <Swatch bgColor="bg-bc-green-400" />
          <Swatch bgColor="bg-bc-green-500" />
          <Swatch bgColor="bg-bc-green-600" />
          <Swatch bgColor="bg-bc-green-700" />
        </Row>
        <Row>
          <Swatch bgColor="bg-bc-yellow-100" />
          <Swatch bgColor="bg-bc-yellow-200" />
          <Swatch bgColor="bg-bc-yellow-300" />
          <Swatch bgColor="bg-bc-yellow-400" />
          <Swatch bgColor="bg-bc-yellow-500" />
          <Swatch bgColor="bg-bc-yellow-600" />
          <Swatch bgColor="bg-bc-yellow-700" />
        </Row>
        <Row>
          <Swatch bgColor="bg-bc-neutral-0" />
          <Swatch bgColor="bg-bc-neutral-100" />
          <Swatch bgColor="bg-bc-neutral-200" />
          <Swatch bgColor="bg-bc-neutral-300" />
          <Swatch bgColor="bg-bc-neutral-400" />
          <Swatch bgColor="bg-bc-neutral-500" />
          <Swatch bgColor="bg-bc-neutral-600" />
          <Swatch bgColor="bg-bc-neutral-700" />
        </Row>
      </div>
    </StyledComponent>
  ),
};

export default {
  title: 'Extend Colors Terrasos',
  component: BaseColors,
};

export const AliasColors = {
  render: () => (
    <StyledComponent>
      <h1>Alias Colors</h1>
      <div className="grid flex-col gap-10">
        <Row>
          <Swatch bgColor="bg-ac-error-400" />
          <Swatch bgColor="bg-ac-error-500" />
        </Row>
        <Row>
          <Swatch bgColor="bg-ac-success-400" />
          <Swatch bgColor="bg-ac-success-500" />
        </Row>
        <Row>
          <Swatch bgColor="bg-ac-gradients-purple-gradient-400" />
          <Swatch bgColor="bg-ac-gradients-purple-gradient-500" />
          <Swatch bgColor="bg-ac-gradients-purple-gradient-600" />
        </Row>
        <Row>
          <Swatch bgColor="bg-ac-gradients-primary-gradient-400" />
          <Swatch bgColor="bg-ac-gradients-primary-gradient-500" />
          <Swatch bgColor="bg-ac-gradients-primary-gradient-600" />
        </Row>
        <Row>
          <Swatch bgColor="bg-ac-neutral-0" />
          <Swatch bgColor="bg-ac-neutral-100" />
          <Swatch bgColor="bg-ac-neutral-200" />
          <Swatch bgColor="bg-ac-neutral-300" />
          <Swatch bgColor="bg-ac-neutral-400" />
          <Swatch bgColor="bg-ac-neutral-500" />
          <Swatch bgColor="bg-ac-neutral-600" />
          <Swatch bgColor="bg-ac-neutral-700" />
        </Row>
        <Row>
          <Swatch bgColor="bg-ac-primary-100" />
          <Swatch bgColor="bg-ac-primary-200" />
          <Swatch bgColor="bg-ac-primary-300" />
          <Swatch bgColor="bg-ac-primary-400" />
          <Swatch bgColor="bg-ac-primary-500" />
          <Swatch bgColor="bg-ac-primary-600" />
          <Swatch bgColor="bg-ac-primary-700" />
        </Row>
      </div>
    </StyledComponent>
  ),
};

function Semantic() {
  return (
    <StyledComponent>
      <h1>Semantic Colors</h1>
      <div className="grid flex-col gap-10">
        <Row>
          <Swatch bgColor="bg-sc-tooltip-fill" />
          <Swatch bgColor="bg-sc-tooltip-outline" />
        </Row>

        <Row>
          <Swatch bgColor="bg-sc-text-paragraph" />
          <Swatch bgColor="bg-sc-text-header" />
          <Swatch bgColor="bg-sc-text-link" />
          <Swatch bgColor="bg-sc-text-sub-header" />
          <Swatch bgColor="bg-sc-text-disabled" />
          <Swatch bgColor="bg-sc-text-error" />
          <Swatch bgColor="bg-sc-text-over-image" />
        </Row>

        <Row>
          <Swatch bgColor="bg-sc-card-standard-background" />
          <Swatch bgColor="bg-sc-card-standard-stroke" />
          <Swatch bgColor="bg-sc-card-standard-header-background" />
        </Row>

        <Row>
          <Swatch bgColor="bg-sc-card-credibility-diagonal-background" />
        </Row>
        <Row>
          <Swatch bgColor="bg-sc-button-text-icon-light" />
          <Swatch bgColor="bg-sc-button-text-icon-dark" />
          <Swatch bgColor="bg-sc-button-text-icon-disabled" />
          <Swatch bgColor="bg-sc-button-text-icon-prefinance" />
        </Row>

        <Row>
          <Swatch bgColor="bg-sc-button-surface-standard-secondary-hover" />
          <Swatch bgColor="bg-sc-button-surface-standard-primary-disabled" />
          <Swatch bgColor="bg-sc-button-surface-standard-secondary-default" />
          <Swatch bgColor="bg-sc-button-surface-standard-secondary-disabled" />
        </Row>

        <Row>
          <Swatch bgColor="bg-sc-button-surface-prefinance-400" />
          <Swatch bgColor="bg-sc-button-surface-prefinance-500" />
          <Swatch bgColor="bg-sc-button-surface-prefinance-600" />
        </Row>

        <Row>
          <Swatch bgColor="bg-sc-button-outline-secondary-disabled" />
        </Row>

        <Row>
          <Swatch bgColor="bg-sc-checkbox-or-radio-selector-background-default" />
          <Swatch bgColor="bg-sc-checkbox-or-radio-selector-background-selected" />
          <Swatch bgColor="bg-sc-checkbox-or-radio-selector-stroke" />
        </Row>

        <Row>
          <Swatch bgColor="bg-sc-gradient-lighter-gradient-300" />
          <Swatch bgColor="bg-sc-gradient-lighter-gradient-500" />
        </Row>

        <Row>
          <Swatch bgColor="bg-sc-gradient-heavy-gradient-400" />
          <Swatch bgColor="bg-sc-gradient-heavy-gradient-500" />
          <Swatch bgColor="bg-sc-gradient-heavy-gradient-600" />
        </Row>

        <Row>
          <Swatch bgColor="bg-sc-icon-standard-background" />
          <Swatch bgColor="bg-sc-icon-standard-dark" />
          <Swatch bgColor="bg-sc-icon-standard-disabled" />
          <Swatch bgColor="bg-sc-icon-standard-error" />
          <Swatch bgColor="bg-sc-icon-standard-light" />
          <Swatch bgColor="bg-sc-icon-standard-shade" />
          <Swatch bgColor="bg-sc-icon-standard-success" />
        </Row>

        <Row>
          <Swatch bgColor="bg-sc-icon-credibility-10-blue-green-gradient-400" />
          <Swatch bgColor="bg-sc-icon-credibility-10-blue-green-gradient-500" />
          <Swatch bgColor="bg-sc-icon-credibility-10-blue-green-gradient-600" />
        </Row>

        <Row>
          <Swatch bgColor="bg-sc-icon-credibility-25-blue-green-gradient-400" />
          <Swatch bgColor="bg-sc-icon-credibility-25-blue-green-gradient-500" />
          <Swatch bgColor="bg-sc-icon-credibility-25-blue-green-gradient-600" />
        </Row>

        <Row>
          <Swatch bgColor="bg-sc-icon-credibility-100-blue-green-gradient-400" />
          <Swatch bgColor="bg-sc-icon-credibility-100-blue-green-gradient-500" />
          <Swatch bgColor="bg-sc-icon-credibility-100-blue-green-gradient-600" />
        </Row>

        <Row>
          <Swatch bgColor="bg-sc-icon-credibility-background" />
        </Row>

        <Row>
          <Swatch bgColor="bg-sc-icon-ecosystem-400" />
          <Swatch bgColor="bg-sc-icon-ecosystem-500" />
          <Swatch bgColor="bg-sc-icon-ecosystem-600" />
        </Row>

        <Row>
          <Swatch bgColor="bg-sc-icon-sdg-400" />
          <Swatch bgColor="bg-sc-icon-sdg-500" />
          <Swatch bgColor="bg-sc-icon-sdg-600" />
        </Row>

        <Row>
          <Swatch bgColor="bg-sc-icon-sdg-background" />
          <Swatch bgColor="bg-sc-icon-sdg-header" />
          <Swatch bgColor="bg-sc-icon-sdg-number" />
          <Swatch bgColor="bg-sc-icon-sdg-stroke-shadow" />
        </Row>

        <Row>
          <Swatch bgColor="bg-sc-input-background-default" />
          <Swatch bgColor="bg-sc-input-background-disabled" />
          <Swatch bgColor="bg-sc-input-triangle-icon-default" />
          <Swatch bgColor="bg-sc-input-triangle-icon-disabled" />
        </Row>

        <Row>
          <Swatch bgColor="bg-sc-surface-page-background-default" />
          <Swatch bgColor="bg-sc-surface-page-background-light" />
          <Swatch bgColor="bg-sc-surface-stroke" />
        </Row>

        <Row>
          <Swatch bgColor="bg-sc-table-surface-dark" />
          <Swatch bgColor="bg-sc-table-surface-light" />
          <Swatch bgColor="bg-sc-table-stroke" />
        </Row>

        <Row>
          <Swatch bgColor="bg-sc-tabs-tab-underline" />
        </Row>

        <Row>
          <Swatch bgColor="bg-sc-tag-credit-category-300" />
          <Swatch bgColor="bg-sc-tag-credit-category-500" />
          <Swatch bgColor="bg-sc-tag-credit-category-text-icon" />
        </Row>

        <Row>
          <Swatch bgColor="bg-sc-tag-filter-background-unselected" />
          <Swatch bgColor="bg-sc-tag-filter-background-selected" />
          <Swatch bgColor="bg-sc-tag-filter-stroke-unselected" />
          <Swatch bgColor="bg-sc-tag-filter-stroke-selected" />
          <Swatch bgColor="bg-sc-tag-filter-outer-shadow" />
          <Swatch bgColor="bg-sc-tag-filter-inner-shadow" />
        </Row>

        <Row>
          <Swatch bgColor="bg-sc-tag-impact-background" />
          <Swatch bgColor="bg-sc-tag-impact-text-icon" />
        </Row>

        <Row>
          <Swatch bgColor="bg-sc-tag-prefinance-400" />
          <Swatch bgColor="bg-sc-tag-prefinance-500" />
          <Swatch bgColor="bg-sc-tag-prefinance-600" />
          <Swatch bgColor="bg-sc-tag-prefinance-text-icon" />
        </Row>
      </div>
    </StyledComponent>
  );
}

export const SemanticColors = {
  render: () => <Semantic />,
};

export const SemanticColorsDark = {
  render: () => (
    <div className="dark">
      <Semantic />
    </div>
  ),
};
