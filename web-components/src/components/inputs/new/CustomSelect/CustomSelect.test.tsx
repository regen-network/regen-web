import { render } from '@testing-library/react';
import { fireEvent, screen } from 'web-components/test/test-utils';

import CustomSelect from './CustomSelect';

describe('CustomSelect', () => {
  const defaultOption = 'usd';
  const onSelect = vi.fn();
  const options = [
    { label: 'USD', value: 'usd' },
    { label: 'REGEN', value: 'uregen' },
    { label: 'USDC', value: 'usdc' },
  ];

  const Component1 = () => <div>Component1</div>;
  const Component2 = () => <div>Component2</div>;
  const componentOption = [
    { component: { label: 'Component1', element: Component1 } },
    { component: { label: 'Component2', element: Component2 } },
  ];

  it('renders the default option', () => {
    render(
      <CustomSelect
        options={options}
        onSelect={onSelect}
        defaultOption={defaultOption}
      />,
    );

    const defaultOptionElement = screen.getByText(/usd/i);
    expect(defaultOptionElement).toBeInTheDocument();
  });

  it('opens the dropdown when clicked', () => {
    render(
      <CustomSelect
        options={options}
        onSelect={onSelect}
        defaultOption={defaultOption}
      />,
    );

    const dropdownButton = screen.getByRole('button');
    fireEvent.click(dropdownButton);

    const dropdownMenu = screen.getByRole('menu');
    expect(dropdownMenu).toBeInTheDocument();
  });

  it('calls onSelect when an option is selected', () => {
    render(
      <CustomSelect
        options={options}
        onSelect={onSelect}
        defaultOption={defaultOption}
      />,
    );

    const dropdownButton = screen.getByRole('button');
    fireEvent.click(dropdownButton);

    const optionButton = screen.getByText(/uregen/i);
    fireEvent.click(optionButton);

    expect(onSelect).toHaveBeenCalledWith('uregen');
  });

  it('renders a component option', async () => {
    render(
      <CustomSelect
        options={componentOption}
        onSelect={onSelect}
        defaultOption={defaultOption}
      />,
    );

    const dropdownButton = screen.getByLabelText('Select options');
    fireEvent.click(dropdownButton);
    const optionButton = screen.getAllByLabelText('Select option')[0];
    expect(optionButton).toBeInTheDocument();
  });

  it('renders the selected option in the placeholder', () => {
    render(
      <CustomSelect
        options={componentOption}
        onSelect={onSelect}
        defaultOption={defaultOption}
      />,
    );

    const dropdownButton = screen.getByLabelText('Select options');
    fireEvent.click(dropdownButton);
    const optionButton = screen.getAllByLabelText('Select option')[0];
    fireEvent.click(optionButton);

    const selectedOption = screen.getByText(/Component1/i);
    expect(selectedOption).toBeInTheDocument();
  });

  it('closes the dropdown when an option is selected', () => {
    render(
      <CustomSelect
        options={componentOption}
        onSelect={onSelect}
        defaultOption={defaultOption}
      />,
    );

    const dropdownButton = screen.getByLabelText('Select options');
    fireEvent.click(dropdownButton);
    const optionButton = screen.getAllByLabelText('Select option')[0];
    fireEvent.click(optionButton);

    const dropdownMenu = screen.queryByRole('menu');
    expect(dropdownMenu).not.toBeInTheDocument();
  });
});
