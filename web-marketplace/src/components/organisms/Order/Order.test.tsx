import { USD_DENOM, USDC_DENOM } from 'config/allowedBaseDenoms';
import { render, screen } from 'web-marketplace/test/test-utils';

import { ProjectPrefinancing } from 'web-components/src/components/cards/ProjectCard/ProjectCard.types';

import { Order } from './Order';
import { ORDER_STATUS } from './Order.constants';
import {
  allowedDenoms,
  blockchainDetails,
  credits,
  paymentInfo,
  retirementInfo,
} from './Order.mock';
import { OrderData } from './Order.types';

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'), // Preserve other exports
  Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
    <a href={to}>{children}</a>
  ), // Mock the Link component
}));

describe('Order Component', () => {
  const mockOrderData: OrderData = {
    project: {
      id: 'C01-001',
      slug: 'project-name',
      name: 'Test Project',
      imgSrc: 'test-image-src',
      place: 'Test Place',
      area: 1000,
      areaUnit: 'hectares',
      deliveryDate: '2023-10-01',
      projectPrefinancing: {
        isPrefinanceProject: false,
      } as ProjectPrefinancing,
    },
    order: {
      retirementInfo,
      blockchainDetails,
      credits,
      paymentInfo,
      status: ORDER_STATUS.pending,
      receiptUrl: 'http://lorem.ipsum',
    },
  };

  it('renders the Order component with project details', () => {
    render(<Order orderData={mockOrderData} allowedDenoms={allowedDenoms} />);

    expect(screen.getByText(/test project/i)).toBeInTheDocument();
    expect(screen.getByText(/test place/i)).toBeInTheDocument();
    expect(screen.getByText(/1,000 hectares/i)).toBeInTheDocument();
  });

  it('renders the Prefinance Tag if prefinance is true', () => {
    render(
      <Order
        orderData={{
          ...mockOrderData,
          project: {
            ...mockOrderData.project,
            projectPrefinancing: {
              isPrefinanceProject: true,
            } as ProjectPrefinancing,
          },
        }}
        allowedDenoms={allowedDenoms}
      />,
    );
    expect(screen.getByText(/prefinance/i)).toBeInTheDocument();
  });

  it('renders the `Expected delivery date` and `Credit issuance pending` tag if the issuance is pending', () => {
    render(<Order orderData={mockOrderData} allowedDenoms={allowedDenoms} />);

    expect(
      screen.getByText(/expected delivery date 2023-10-01/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Credit issuance pending/i)).toBeInTheDocument();
  });

  it('renders the date and `credits delivered` tag if the issuance is delivered', () => {
    render(
      <Order
        orderData={{
          ...mockOrderData,
          order: {
            ...mockOrderData.order,
            status: ORDER_STATUS.delivered,
          },
        }}
        allowedDenoms={allowedDenoms}
      />,
    );

    expect(screen.getByText(/credits delivered/i)).toBeInTheDocument();
    expect(screen.getByText('2023-10-01')).toBeInTheDocument();
  });

  it('renders the OrderSummary component with the correct headings', () => {
    render(<Order orderData={mockOrderData} allowedDenoms={allowedDenoms} />);
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
        orderData={{
          ...mockOrderData,
          order: {
            ...mockOrderData.order,
            retirementInfo: {
              ...mockOrderData.order.retirementInfo,
              retiredCredits: false,
            },
          },
        }}
        allowedDenoms={allowedDenoms}
      />,
    );
    expect(screen.getByText(/tradable credits/i)).toBeInTheDocument();
    expect(screen.queryByText(/retirement reason/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/retirement location/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/make anonymous/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/certificate/i)).not.toBeInTheDocument();
  });

  it('renders the RetirementInfo section with `certificate` button and rows except `tradable credits`', () => {
    render(<Order orderData={mockOrderData} allowedDenoms={allowedDenoms} />);
    expect(screen.queryByText(/tradable credits/i)).not.toBeInTheDocument();
    expect(screen.getByText(/retirement reason/i)).toBeInTheDocument();
    expect(screen.getByText(/retirement location/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /certificate/i }),
    ).toBeInTheDocument();
  });

  it('renders the Blockchain Details section with correct data', () => {
    render(<Order orderData={mockOrderData} allowedDenoms={allowedDenoms} />);
    expect(screen.getByText(/dec 15, 2024/i)).toBeInTheDocument();
    expect(screen.getByText(/d6jfk121o54ded6jfk121o54de/i)).toBeInTheDocument();
  });

  it('renders the Blockchain Details section without blockchain record', () => {
    render(
      <Order
        orderData={{
          ...mockOrderData,
          order: {
            ...mockOrderData.order,
            blockchainDetails: {
              ...mockOrderData.order.blockchainDetails,
              blockchainRecord: '',
            },
          },
        }}
        allowedDenoms={allowedDenoms}
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
        orderData={{
          ...mockOrderData,
          order: {
            ...mockOrderData.order,
            credits: {
              ...mockOrderData.order.credits,
              credits: '2000',
              totalPrice: '400000',
            },
          },
        }}
        allowedDenoms={allowedDenoms}
      />,
    );
    expect(screen.getByText(/2000/i)).toBeInTheDocument();
    expect(screen.getByText(/400000/i)).toBeInTheDocument();
    expect(screen.getAllByText(/usd/i)).toHaveLength(2);
  });

  it('renders the Credits section with correct data in USDC', () => {
    render(
      <Order
        orderData={{
          ...mockOrderData,
          order: {
            ...mockOrderData.order,
            credits: {
              ...mockOrderData.order.credits,
              credits: '2000',
              totalPrice: '123',
              askDenom: USDC_DENOM,
              askBaseDenom: USDC_DENOM,
            },
            paymentInfo: {
              ...mockOrderData.order.paymentInfo,
              askDenom: USDC_DENOM,
              askBaseDenom: USDC_DENOM,
            },
          },
        }}
        allowedDenoms={allowedDenoms}
      />,
    );

    expect(screen.getAllByText(/2000/i)).toHaveLength(1);
    expect(screen.getAllByText(/123/i)).toHaveLength(1);
    expect(screen.getAllByText(/usdc/i)).toHaveLength(3);
  });

  it('renders the Payment Info section with card data', () => {
    render(
      <Order
        orderData={{
          ...mockOrderData,
          order: {
            ...mockOrderData.order,
            credits: {
              ...mockOrderData.order.credits,
              askDenom: USDC_DENOM,
              askBaseDenom: USDC_DENOM,
            },
            paymentInfo: {
              ...mockOrderData.order.paymentInfo,
              cardLast4: '1234',
              askDenom: USD_DENOM,
              askBaseDenom: USD_DENOM,
            },
          },
        }}
        allowedDenoms={allowedDenoms}
      />,
    );
    expect(screen.getByText(/card info/i)).toBeInTheDocument();
    expect(screen.getByText(/visa/i)).toBeInTheDocument();
    expect(screen.getByText(/ending in 1234/i)).toBeInTheDocument();
  });

  it('renders the Payment Info section with crypto data', () => {
    render(
      <Order
        orderData={{
          ...mockOrderData,
          order: {
            ...mockOrderData.order,
            paymentInfo: {
              ...mockOrderData.order.paymentInfo,
              askDenom: USDC_DENOM,
              askBaseDenom: USDC_DENOM,
            },
          },
        }}
        allowedDenoms={allowedDenoms}
      />,
    );
    expect(screen.queryByText(/card info/i)).not.toBeInTheDocument();
    expect(screen.getAllByText(/usdc/i)).toHaveLength(3);
  });
});
