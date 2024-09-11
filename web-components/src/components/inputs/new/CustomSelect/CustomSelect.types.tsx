import { ComponentType } from 'react';

export type OptionWithLabelAndValue = {
  label: string;
  value: string;
  component?: never;
};

export type OptionWithComponent = {
  label?: never;
  value?: never;
  component: {
    label: string;
    element: ComponentType;
  };
};

export type Option = OptionWithLabelAndValue | OptionWithComponent;
