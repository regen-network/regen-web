import userEvent from '@testing-library/user-event';
import { render, screen } from 'web-marketplace/test/test-utils';

import { PAYMENT_OPTIONS } from 'pages/BuyCredits/BuyCredits.constants';
import { CURRENCIES } from 'components/molecules/DenomIconWithCurrency/DenomIconWithCurrency.constants';

import { CreditsAmount } from './CreditsAmount';
import { cardSellOrders, cryptoCurrencies } from './CreditsAmount.mock';

describe('CreditsAmount', () => {
  const formDefaultValues = {
    paymentOption: PAYMENT_OPTIONS.CARD,
    currency: { askDenom: CURRENCIES.usd, askBaseDenom: CURRENCIES.usd },
    setCurrency: () => {},
    spendingCap: 3185,
    setSpendingCap: () => {},
    creditsAvailable: 1125,
    setCreditsAvailable: () => {},
    defaultCryptoCurrency: {
      askDenom: CURRENCIES.uregen,
      askBaseDenom: CURRENCIES.uregen,
    },
    filteredCryptoSellOrders: [],
    cardSellOrders,
    cryptoCurrencies,
  };

  it('renders without crashing', () => {
    render(<CreditsAmount {...formDefaultValues} />, {
      formDefaultValues,
    });

    expect(screen.getByText(/Amount/i)).toBeInTheDocument();
  });

  it('updates credits amount', async () => {
    render(<CreditsAmount {...formDefaultValues} />, {
      formDefaultValues,
    });

    const creditsInput = screen.getByLabelText(/Credits Input/i);
    userEvent.clear(creditsInput);
    await userEvent.type(creditsInput, '10');
    expect(creditsInput).toHaveValue(10);
  });

  it('updates currency amount', async () => {
    render(<CreditsAmount {...formDefaultValues} />, {
      formDefaultValues,
    });

    const currencyInput = screen.getByLabelText(/Currency Input/i);
    userEvent.clear(currencyInput);
    await userEvent.type(currencyInput, '50');
    expect(currencyInput).toHaveValue(50);
  });

  it('updates currency amount when credits amount changes', async () => {
    render(<CreditsAmount {...formDefaultValues} />, {
      formDefaultValues,
    });

    const creditsInput = screen.getByLabelText(/Credits Input/i);
    const currencyInput = screen.getByLabelText(/Currency Input/i);

    userEvent.clear(creditsInput);
    await userEvent.type(creditsInput, '101');

    expect(currencyInput).toHaveValue(102);
  });

  it('updates credits amount when currency amount changes', async () => {
    render(<CreditsAmount {...formDefaultValues} />, {
      formDefaultValues,
    });

    const creditsInput = screen.getByLabelText(/Credits Input/i);
    const currencyInput = screen.getByLabelText(/Currency Input/i);

    userEvent.clear(currencyInput);
    await userEvent.type(currencyInput, '102');

    expect(creditsInput).toHaveValue(101);
  });

  it('updates credits amount and currency amount when max credits is selected', async () => {
    render(<CreditsAmount {...formDefaultValues} />, {
      formDefaultValues,
    });

    const maxCreditsButton = screen.getByRole('button', {
      name: /Max Credits/i,
    });
    const creditsInput = screen.getByLabelText(/Credits Input/i);
    const currencyInput = screen.getByLabelText(/Currency Input/i);

    await userEvent.click(maxCreditsButton);
    screen.debug();

    expect(creditsInput).toHaveValue(1125);
    expect(currencyInput).toHaveValue(3185);
  });
});
