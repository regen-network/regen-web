import userEvent from '@testing-library/user-event';
import { USD_DENOM } from 'config/allowedBaseDenoms';
import { render, screen } from 'web-marketplace/test/test-utils';

import { paymentOptionAtom } from 'legacy-pages/BuyCredits/BuyCredits.atoms';
import { PAYMENT_OPTIONS } from 'legacy-pages/BuyCredits/BuyCredits.constants';

import { CreditsAmount } from './CreditsAmount';
import { cardSellOrders, cryptoCurrencies } from './CreditsAmount.mock';

describe('CreditsAmount', () => {
  const formDefaultValues = {
    paymentOption: PAYMENT_OPTIONS.CARD,
    currency: { askDenom: USD_DENOM, askBaseDenom: USD_DENOM },
    spendingCap: 3185,
    setSpendingCap: () => {},
    creditsAvailable: 1125,
    setCreditsAvailable: () => {},
    filteredCryptoSellOrders: [],
    cardSellOrders,
    cryptoCurrencies,
    card: true,
    orderedSellOrders: cardSellOrders.sort((a, b) => a.usdPrice - b.usdPrice),
  };

  it('renders without crashing', () => {
    render(<CreditsAmount {...formDefaultValues} />, {
      formDefaultValues,
      jotaiDefaultValues: [[paymentOptionAtom, 'card']],
    });

    expect(screen.getByText(/Amount/i)).toBeInTheDocument();
  });

  it('updates credits amount', async () => {
    render(<CreditsAmount {...formDefaultValues} />, {
      formDefaultValues,
      jotaiDefaultValues: [[paymentOptionAtom, 'card']],
    });

    const creditsInput = screen.getByLabelText(/Credits Input/i);
    userEvent.clear(creditsInput);
    await userEvent.type(creditsInput, '10');
    expect(creditsInput).toHaveValue(10);
  });

  it('updates currency amount', async () => {
    render(<CreditsAmount {...formDefaultValues} />, {
      formDefaultValues,
      jotaiDefaultValues: [[paymentOptionAtom, 'card']],
    });

    const currencyInput = await screen.findByLabelText(/Currency Input/i);
    if (currencyInput) {
      userEvent.clear(currencyInput);
      await userEvent.type(currencyInput, '50');
      expect(currencyInput).toHaveValue(50);
    }
  });

  it('updates currency amount when credits amount changes', async () => {
    render(<CreditsAmount {...formDefaultValues} />, {
      formDefaultValues,
      jotaiDefaultValues: [[paymentOptionAtom, 'card']],
    });

    const creditsInput = screen.getByLabelText(/Credits Input/i);
    const currencyInput = await screen.findByLabelText(/Currency Input/i);

    userEvent.clear(creditsInput);
    await userEvent.type(creditsInput, '101');

    expect(currencyInput).toHaveValue(102);
  });

  it('updates credits amount when currency amount changes', async () => {
    render(<CreditsAmount {...formDefaultValues} />, {
      formDefaultValues,
      jotaiDefaultValues: [[paymentOptionAtom, 'card']],
    });

    const creditsInput = screen.getByLabelText(/Credits Input/i);
    const currencyInput = await screen.findByLabelText(/Currency Input/i);

    userEvent.clear(currencyInput);
    await userEvent.type(currencyInput, '102');

    expect(creditsInput).toHaveValue(101);
  });

  it('updates credits amount and currency amount when max credits is selected', async () => {
    render(<CreditsAmount {...formDefaultValues} />, {
      formDefaultValues,
      jotaiDefaultValues: [[paymentOptionAtom, 'card']],
    });

    const maxCreditsButton = screen.getByRole('button', {
      name: /Max Credits/i,
    });
    const creditsInput = screen.getByLabelText(/Credits Input/i);
    const currencyInput = await screen.findByLabelText(/Currency Input/i);

    await userEvent.click(maxCreditsButton);

    expect(creditsInput).toHaveValue(1125);
    expect(currencyInput).toHaveValue(3185);
  });
});
