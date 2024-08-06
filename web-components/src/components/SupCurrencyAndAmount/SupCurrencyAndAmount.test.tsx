import { SupCurrencyAndAmount } from 'web-components/src/components/SupCurrencyAndAmount/SupCurrencyAndAmount';
import { render } from 'web-marketplace/test/test-utils';

import { CURRENCIES } from '../DenomIconWithCurrency/DenomIconWithCurrency.constants';

describe('SupCurrencyAndAmount', () => {
  it('renders the currency symbol and amount', () => {
    const currency = CURRENCIES.usd;
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
