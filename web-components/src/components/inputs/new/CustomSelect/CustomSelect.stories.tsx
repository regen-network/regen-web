import { lazy } from 'react';
import { Meta, StoryObj } from '@storybook/react';

const CustomSelect = lazy(() => import('./CustomSelect'));

export default {
  title: 'Inputs/CustomSelect',
  component: CustomSelect,
} as Meta<typeof CustomSelect>;

type Story = StoryObj<typeof CustomSelect>;

const options = [
  { label: 'USD', value: 'usd' },
  { label: 'UREGEN', value: 'uregen' },
  { label: 'USDC', value: 'usdc' },
];

const Component1 = () => <div>🌲 Component 1</div>;
const Component2 = () => <div>🌴 Component 2</div>;
const Component3 = () => <div>🌻 Component 3</div>;
const componentOptions = [
  { component: { label: 'Component1', element: Component1 } },
  { component: { label: 'Component2', element: Component2 } },
  { component: { label: 'Component3', element: Component3 } },
];

export const WithText: Story = {
  render: args => <CustomSelect {...args} />,
};

WithText.args = {
  options: options,
  onSelect: () => {},
  defaultOption: 'usd',
  placeholderAriaLabel: 'Select options',
};

export const WithComponent: Story = {
  render: args => <CustomSelect {...args} />,
};

WithComponent.args = {
  options: componentOptions,
  onSelect: () => {},
  defaultOption: 'Component1',
  placeholderAriaLabel: 'Select options',
  selectAriaLabel: 'Select option',
};
