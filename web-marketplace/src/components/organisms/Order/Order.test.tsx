import { describe, expect, it } from 'vitest';
import { render, screen } from 'web-marketplace/test/test-utils';

import { Order } from './Order';
import { ORDER_STATUS } from './Order.constants';
import {
  blockchainDetails,
  credits,
  paymentInfo,
  retirementInfo,
} from './Order.mock';
import { CreditsData, OrderDataProps } from './Order.types';

describe('Order Component', () => {
  const mockOrderData: OrderDataProps = {
    project: {
      name: 'Test Project',
      imageSrc: 'test-image-src',
      placeName: 'Test Place',
      area: 1000,
      areaUnit: 'hectares',
      date: '2023-10-01',
      prefinance: false,
    },
    order: {
      retirementInfo,
      blockchainDetails,
      credits,
      paymentInfo,
      status: ORDER_STATUS.pending,
    },
  };

  it('renders the Order component with project details', () => {
    render(<Order {...mockOrderData} />);

    expect(screen.getByText(/test project/i)).toBeInTheDocument();
    expect(screen.getByText(/test place/i)).toBeInTheDocument();
    expect(screen.getByText(/1,000 hectares/i)).toBeInTheDocument();
  });

  it('renders the Prefinance Tag if prefinance is true', () => {
    render(
      <Order
        {...{
          ...mockOrderData,
          project: { ...mockOrderData.project, prefinance: true },
        }}
      />,
    );
    expect(screen.getByText(/prefinance/i)).toBeInTheDocument();
  });

  it('renders the `Expected delivery date` and `Credits issuance pending` tag if the issuance is pending', () => {
    render(<Order {...mockOrderData} />);

    expect(
      screen.getByText(/expected delivery date 2023-10-01/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Credits issuance pending/i)).toBeInTheDocument();
  });

  it('renders the date and `credits delivered` tag if the issuance is delivered', () => {
    render(
      <Order
        {...{
          ...mockOrderData,
          order: {
            ...mockOrderData.order,
            status: ORDER_STATUS.delivered,
          },
        }}
      />,
    );

    expect(screen.getByText(/credits delivered/i)).toBeInTheDocument();
    expect(screen.getByText('2023-10-01')).toBeInTheDocument();
  });

  it('renders the OrderSummary component with the correct headings', () => {
    render(<Order {...mockOrderData} />);
    expect(
      screen.getByRole('heading', { name: /retirement info/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /blockchain details/i }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole('heading', { name: /credits/i }).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getByRole('heading', { name: /payment info/i }),
    ).toBeInTheDocument();
  });

  it('renders the Retirement Info section with tradable row only', () => {
    render(
      <Order
        {...{
          ...mockOrderData,
          order: {
            ...mockOrderData.order,
            retirementInfo: {
              ...mockOrderData.order.retirementInfo,
              tradableCredits: 'yes',
            },
          },
        }}
      />,
    );
    expect(screen.getByText(/tradable credits/i)).toBeInTheDocument();
    expect(screen.queryByText(/retirement reason/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/retirement location/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/make anonymous/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/certificate/i)).not.toBeInTheDocument();
  });

  it('renders the RetirementInfo section with `certificate` button and rows except `tradable credits`', () => {
    render(<Order {...mockOrderData} />);
    expect(screen.queryByText(/tradable credits/i)).not.toBeInTheDocument();
    expect(screen.getByText(/retirement reason/i)).toBeInTheDocument();
    expect(screen.getByText(/retirement location/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /certificate/i }),
    ).toBeInTheDocument();
  });

  it('renders the Blockchain Details section with correct data', () => {
    render(<Order {...mockOrderData} />);
    expect(screen.getByText(/dec 15, 2024/i)).toBeInTheDocument();
    expect(screen.getByText(/d6jfk121o54ded6jfk121o54de/i)).toBeInTheDocument();
  });

  it('renders the Blockchain Details section without blockchain record', () => {
    render(
      <Order
        {...{
          ...mockOrderData,
          order: {
            ...mockOrderData.order,
            blockchainDetails: {
              ...mockOrderData.order.blockchainDetails,
              blockchainRecord: '',
            },
          },
        }}
      />,
    );
    expect(screen.getByText(/dec 15, 2024/i)).toBeInTheDocument();
    expect(
      screen.queryByText(/d6jfk121o54ded6jfk121o54de/i),
    ).not.toBeInTheDocument();
  });

  it('renders the Credits section with correct data in USD', () => {
    render(
      <Order
        {...{
          ...mockOrderData,
          order: {
            ...mockOrderData.order,
            credits: {
              ...mockOrderData.order.credits,
              credits: '2000',
              price: '400000',
              askDenom: 'usd',
            },
          },
        }}
      />,
    );
    expect(screen.getByText(/2000/i)).toBeInTheDocument();
    expect(screen.getByText(/400000/i)).toBeInTheDocument();
    expect(screen.getAllByText(/usd/i)).toHaveLength(2);
  });

  it('renders the Credits section with correct data in USDC', () => {
    render(
      <Order
        {...{
          ...mockOrderData,
          order: {
            ...mockOrderData.order,
            credits: {
              ...mockOrderData.order.credits,
              credits: '2000',
              price: '400000',
              askDenom: 'usdc',
            },
          },
        }}
      />,
    );
    expect(screen.getByText(/2000/i)).toBeInTheDocument();
    expect(screen.getByText(/400000/i)).toBeInTheDocument();
    expect(screen.getByText(/usdc/i)).toBeInTheDocument();
  });

  it('renders the Payment Info section with card data', () => {
    render(
      <Order
        {...{
          ...mockOrderData,
          order: {
            ...mockOrderData.order,
            paymentInfo: {
              ...mockOrderData.order.paymentInfo,
              nameOnCard: 'John Doe',
              cardLast4: '1234',
              askDenom: 'usd',
            },
          },
        }}
      />,
    );
    expect(screen.getByText(/name on card/i)).toBeInTheDocument();
    expect(screen.getByText(/card info/i)).toBeInTheDocument();
    expect(screen.getByText(/visa ending in 1234/i)).toBeInTheDocument();
  });

  it('renders the Payment Info section with crypto data', () => {
    render(
      <Order
        {...{
          ...mockOrderData,
          order: {
            ...mockOrderData.order,
            paymentInfo: {
              ...mockOrderData.order.paymentInfo,
              askDenom: 'usdc',
            },
          },
        }}
      />,
    );
    expect(screen.queryByText(/name on card/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/card info/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/visa ending in 1234/i)).not.toBeInTheDocument();
    expect(screen.getAllByText(/usdc/i)).toHaveLength(2);
  });
});
