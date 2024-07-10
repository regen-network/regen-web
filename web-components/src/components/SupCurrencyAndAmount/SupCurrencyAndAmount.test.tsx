import React from 'react';
import { render } from '@testing-library/react';
import { SupCurrencyAndAmount } from 'web-components/src/components/SupCurrencyAndAmount/SupCurrencyAndAmount';

describe('SupCurrencyAndAmount', () => {
  it('renders the currency symbol and amount', () => {
    const currency = 'USD';
    const amount = '100.00';

    const { getByText } = render(
      <SupCurrencyAndAmount currency={currency} amount={amount} />,
    );

    const currencySymbol = getByText('$');
    const amountText = getByText(amount);

    expect(currencySymbol).toBeInTheDocument();
    expect(amountText).toBeInTheDocument();
  });
});
