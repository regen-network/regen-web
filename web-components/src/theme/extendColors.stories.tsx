import _ from 'lodash';

import { cn } from '../utils/styles/cn';

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

export const BaseColors = {
  render: () => (
    <>
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
    </>
  ),
};

export default {
  title: 'Extend Colors',
  component: BaseColors,
};

function Alias() {
  return (
    <>
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
    </>
  );
}

export const AliasColors = {
  render: () => <Alias />
};

export const SemanticColors = {
  render: () => (
    <>
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
    </>
  ),
};
