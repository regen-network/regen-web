import React from 'react';
import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';

import { OrderSummaryCard } from './OrderSummaryCard';
import { OrderSummaryProps } from './OrderSummaryCard.types';

describe('OrderSummaryCard', () => {
  const orderSummary: OrderSummaryProps = {
    order: {
      projectName: 'Project Name',
      currency: 'USD',
      pricePerCredit: 10,
      credits: 5,
      image: 'path/to/image',
    },
    paymentMethod: {
      type: 'visa',
      cardNumber: '1234 5678 9012 3456',
    },
    currentBuyingStep: 2,
  };

  it('displays the project name', () => {
    const { getByText } = render(<OrderSummaryCard {...orderSummary} />);
    const projectName = getByText('Project Name');
    expect(projectName).toBeInTheDocument();
  });

  it('displays the price per credit', () => {
    const { getByText } = render(<OrderSummaryCard {...orderSummary} />);
    const pricePerCredit = getByText('10.00');
    expect(pricePerCredit).toBeInTheDocument();
  });

  it('displays the number of credits', () => {
    const { getByText } = render(<OrderSummaryCard {...orderSummary} />);
    const numberOfCredits = getByText('5');
    expect(numberOfCredits).toBeInTheDocument();
  });

  it('displays the total price', () => {
    const { getByText } = render(<OrderSummaryCard {...orderSummary} />);
    const totalPrice = getByText('50.00');
    expect(totalPrice).toBeInTheDocument();
  });

  it('displays the payment details', () => {
    render(<OrderSummaryCard {...orderSummary} />);
    const payment = screen.getByTestId('payment-details');
    expect(payment.textContent).toMatch(/visa ending in 3456/i);
  });
});
