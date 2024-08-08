import { render, screen, userEvent } from 'web-marketplace/test/test-utils';

import { CURRENCIES } from 'web-components/src/components/DenomIconWithCurrency/DenomIconWithCurrency.constants';

import { ChooseCreditsForm } from './ChooseCreditsForm';

describe('ChooseCreditsForm', () => {
  const creditVintages = [
    { date: '2022-01-01', credits: '100', batchDenom: '1' },
    { date: '2022-02-01', credits: '200', batchDenom: '2' },
  ];

  const creditAvailability = [
    {
      credits: 1000,
      currency: CURRENCIES.usd,
    },
    {
      credits: 2000,
      currency: CURRENCIES.uregen,
    },
    {
      credits: 3000,
      currency: CURRENCIES.usdc,
    },
    {
      credits: 4000,
      currency: CURRENCIES.usdcaxl,
    },
  ];

  it('renders without crashing', () => {
    render(
      <ChooseCreditsForm
        creditVintages={creditVintages}
        creditsAvailable={creditAvailability}
      />,
    );

    expect(screen.getByTestId('choose-credits-form')).toBeInTheDocument();
  });

  it('opens and closes advanced settings', () => {
    render(
      <ChooseCreditsForm
        creditVintages={creditVintages}
        creditsAvailable={creditAvailability}
      />,
    );

    const advancedSettingsButton = screen.getByRole('button', {
      name: /advanced settings/i,
    });

    userEvent.click(advancedSettingsButton);
    expect(screen.getByText(/advanced settings/i)).toBeInTheDocument();

    userEvent.click(advancedSettingsButton);
    expect(screen.queryByTestId('advanced-settings')).not.toBeInTheDocument();
  });

  it('selects card payment option', () => {
    render(
      <ChooseCreditsForm
        creditVintages={creditVintages}
        creditsAvailable={creditAvailability}
      />,
    );
    const cardOption = screen.getByRole('radio', {
      name: /card/i,
    });
    userEvent.click(cardOption);
    expect(cardOption).toBeChecked();
  });
});
