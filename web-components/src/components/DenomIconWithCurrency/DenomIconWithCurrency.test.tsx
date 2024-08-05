import { fireEvent, render, screen } from '@testing-library/react';
import { USD_DENOM } from 'web-marketplace/src/config/allowedBaseDenoms';

import { DenomIconWithCurrency } from './DenomIconWithCurrency';

describe('DenomIconWithCurrency', () => {
  const currency = USD_DENOM;

  it('renders the denom icon and currency code', () => {
    render(<DenomIconWithCurrency currency={currency} />);

    const flagIcon = screen.getByTestId('USFlagIcon');
    const currencyCode = screen.getByText(currency.toUpperCase());

    expect(flagIcon).toBeInTheDocument();
    expect(currencyCode).toBeInTheDocument();
  });

  it('renders info icon and tooltip', async () => {
    render(
      <DenomIconWithCurrency currency={currency} tooltipText="tooltip text" />,
    );

    const tooltipIcon = screen.getByTestId('info-tooltip');
    expect(tooltipIcon).toBeInTheDocument();

    fireEvent.mouseEnter(tooltipIcon);
    const currencyCode = await screen.findByText(/tooltip text/i);
    expect(currencyCode).toBeInTheDocument();
  });
});
