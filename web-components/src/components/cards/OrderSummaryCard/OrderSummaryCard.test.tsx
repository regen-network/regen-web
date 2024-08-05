import { screen } from '@testing-library/dom';
import { fireEvent, render } from '@testing-library/react';
import { CURRENCIES } from 'web-components/src/components/DenomIconWithCurrency/DenomIconWithCurrency.constants';

import { OrderSummaryCard } from './OrderSummaryCard';
import { OrderSummaryProps } from './OrderSummaryCard.types';

describe('OrderSummaryCard', () => {
  const orderSummary: OrderSummaryProps = {
    order: {
      projectName: 'Project Name',
      currency: CURRENCIES.usd,
      pricePerCredit: 10,
      credits: 5,
      image: 'path/to/image',
      prefinanceProject: false,
    },
    paymentMethod: {
      type: 'visa',
      cardNumber: '1234 5678 9012 3456',
    },
    currentBuyingStep: 2,
    onClickEditCard: vi.fn(),
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

  it('updates the number of credits and total price accordingly', () => {
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

  it('displays the payment details', () => {
    render(<OrderSummaryCard {...orderSummary} />);
    const payment = screen.getByTestId('payment-details');
    expect(payment.textContent).toMatch(/visa ending in 3456/i);
  });
});
