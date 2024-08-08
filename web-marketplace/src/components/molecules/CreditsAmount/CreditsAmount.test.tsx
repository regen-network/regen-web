import userEvent from '@testing-library/user-event';
import { PAYMENT_OPTIONS } from 'web-marketplace/src/components/organisms/ChooseCreditsForm/ChooseCreditsForm.constants';
import { render, screen } from 'web-marketplace/test/test-utils';

import { CURRENCIES } from 'web-components/src/components/DenomIconWithCurrency/DenomIconWithCurrency.constants';

import { CreditsAmount } from './CreditsAmount';

describe('CreditsAmount', () => {
  const formDefaultValues = {
    creditsAvailable: 100,
    paymentOption: PAYMENT_OPTIONS.CARD,
    currency: CURRENCIES.usd,
    onCurrencyChange: vi.fn(),
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
    await userEvent.type(creditsInput, '50');

    expect(currencyInput).toHaveValue(50);
  });

  it('updates credits amount when currency amount changes', async () => {
    render(<CreditsAmount {...formDefaultValues} />, {
      formDefaultValues,
    });

    const creditsInput = screen.getByLabelText(/Credits Input/i);
    const currencyInput = screen.getByLabelText(/Currency Input/i);

    userEvent.clear(currencyInput);
    await userEvent.type(currencyInput, '50');

    expect(creditsInput).toHaveValue(50);
  });

  it('updates credits amount when max credits is selected', async () => {
    render(<CreditsAmount {...formDefaultValues} />, {
      formDefaultValues,
    });

    const creditsInput = screen.getByLabelText(/Credits Input/i);
    const maxCreditsButton = screen.getByRole('button', {
      name: /Max Credits/i,
    });

    await userEvent.click(maxCreditsButton);

    expect(creditsInput).toHaveValue(100);
  });

  it('updates currency amount when max credits is selected', async () => {
    render(<CreditsAmount {...formDefaultValues} />, {
      formDefaultValues,
    });

    const currencyInput = screen.getByLabelText(/Currency Input/i);
    const maxCreditsButton = screen.getByRole('button', {
      name: /Max Credits/i,
    });

    await userEvent.click(maxCreditsButton);

    expect(currencyInput).toHaveValue(100);
  });
});
