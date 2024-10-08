import { screen } from '@testing-library/dom';
import { USD_DENOM } from 'config/allowedBaseDenoms';
import { render } from 'web-marketplace/test/test-utils';

import { fireEvent } from 'web-components/test/test-utils';

import { allowedDenoms } from '../CreditsAmount/CreditsAmount.mock';
import { OrderSummaryCard } from './OrderSummaryCard';
import { OrderSummaryProps } from './OrderSummaryCard.types';

describe('OrderSummaryCard', () => {
  const orderSummary: OrderSummaryProps = {
    order: {
      projectName: 'Project Name',
      currency: { askDenom: USD_DENOM, askBaseDenom: USD_DENOM },
      pricePerCredit: 10,
      credits: 5,
      currencyAmount: 50,
      image: 'path/to/image',
      prefinanceProject: false,
    },
    cardDetails: {
      brand: 'visa',
      last4: '3456',
      country: 'US',
    },
    imageAltText: 'imageAltText',
    paymentOption: 'card',
    allowedDenoms,
    onClickEditCard: vi.fn(),
    setCreditsAmount: vi.fn(),
  };

  it('displays the project name', () => {
    render(<OrderSummaryCard {...orderSummary} />);
    const projectName = screen.getByText('Project Name');
    expect(projectName).toBeInTheDocument();
  });

  it('displays the price per credit', () => {
    render(<OrderSummaryCard {...orderSummary} />);
    const pricePerCredit = screen.getByText(/10.00/i);
    expect(pricePerCredit).toBeInTheDocument();
  });

  it('displays the number of credits', () => {
    render(<OrderSummaryCard {...orderSummary} />);

    const numberOfCredits = screen.getByText('5');
    expect(numberOfCredits).toBeInTheDocument();
  });

  // TODO fix as part of APP-364
  it.skip('updates the number of credits and total price accordingly', () => {
    render(<OrderSummaryCard {...orderSummary} />);

    const editButton = screen.getByRole('button', {
      name: 'Edit',
    });
    fireEvent.click(editButton);
    const editInput = screen.getByRole('textbox', {
      name: 'editable-credits',
    });
    fireEvent.change(editInput, { target: { value: 7 } });

    const updateButton = screen.getByRole('button', {
      name: 'update',
    });
    fireEvent.click(updateButton);
    const updatedNumberOfCredits = screen.getByText('7');
    expect(updatedNumberOfCredits).toBeInTheDocument();

    const pricePerCredit = screen.getByText(/70.00/i);
    expect(pricePerCredit).toBeInTheDocument();
  });

  it('displays the total price', () => {
    render(<OrderSummaryCard {...orderSummary} />);
    const totalPrice = screen.getByText(/50.00/i);
    expect(totalPrice).toBeInTheDocument();
  });

  // TODO fix as part of APP-364
  it.skip('displays the payment details', () => {
    render(<OrderSummaryCard {...orderSummary} />);
    const payment = screen.getByTestId('payment-details');
    expect(payment.textContent).toMatch(/visa ending in 3456/i);
  });
});
