import { render, screen, userEvent } from 'web-marketplace/test/test-utils';

import { ChooseCreditsForm } from './ChooseCreditsForm';

describe('ChooseCreditsForm', () => {
  const creditVintages = [
    { date: '2022-01-01', credits: '100' },
    { date: '2022-02-01', credits: '200' },
  ];

  it('renders without crashing', () => {
    render(<ChooseCreditsForm creditVintages={creditVintages} />);

    expect(screen.getByTestId('choose-credits-form')).toBeInTheDocument();
  });

  it('opens and closes advanced settings', () => {
    render(<ChooseCreditsForm creditVintages={creditVintages} />);

    const advancedSettingsButton = screen.getByRole('button', {
      name: /advanced settings/i,
    });

    userEvent.click(advancedSettingsButton);
    expect(screen.getByText(/advanced settings/i)).toBeInTheDocument();

    userEvent.click(advancedSettingsButton);
    expect(screen.queryByTestId('advanced-settings')).not.toBeInTheDocument();
  });

  it('selects card payment option', () => {
    render(<ChooseCreditsForm creditVintages={creditVintages} />);
    const cardOption = screen.getByRole('radio', {
      name: /card/i,
    });
    userEvent.click(cardOption);
    expect(cardOption).toBeChecked();
  });
});
