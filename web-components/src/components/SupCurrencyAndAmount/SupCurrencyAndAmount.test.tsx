import { render } from '@testing-library/react';
import { SupCurrencyAndAmount } from 'web-components/src/components/SupCurrencyAndAmount/SupCurrencyAndAmount';
import { USD_DENOM } from 'web-marketplace/src/config/allowedBaseDenoms';

describe('SupCurrencyAndAmount', () => {
  it('renders the currency symbol and amount', () => {
    const currency = USD_DENOM;
    const amount = '100.00';

    const { getByText } = render(
      <SupCurrencyAndAmount price={100} currencyCode={currency} />,
    );

    const currencySymbol = getByText('$');
    const amountText = getByText(amount);

    expect(currencySymbol).toBeInTheDocument();
    expect(amountText).toBeInTheDocument();
  });
});
