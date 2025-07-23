import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  allowedDenoms,
  cardSellOrders,
  cryptoSellOrders,
} from 'web-marketplace/src/components/molecules/CreditsAmount/CreditsAmount.mock';
import { render, screen, userEvent } from 'web-marketplace/test/test-utils';

import { paymentOptionAtom } from 'pages/BuyCredits/BuyCredits.atoms';

import { ChooseCreditsForm } from './ChooseCreditsForm';
import { ChooseCreditsFormSchemaType } from './ChooseCreditsForm.schema';

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useLocation: vi.fn(() => ({
    state: { from: '/project/test/buy' },
  })),
}));

const queryClient = new QueryClient();

describe('ChooseCreditsForm', () => {
  const props = {
    retiring: true,
    setRetiring: () => {},
    onPrev: () => {},
    onSubmit: async (values: ChooseCreditsFormSchemaType) => {},
    cardSellOrders,
    cryptoSellOrders,
    cardDisabled: false,
    allowedDenoms,
    isConnected: true,
    setupWalletModal: () => {},
    paymentOptionCryptoClicked: false,
    setPaymentOptionCryptoClicked: () => {},
    goToPaymentInfo: () => {},
    card: true,
    userBalance: 1000,
    isUserBalanceLoading: false,
  };
  it('renders without crashing', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ChooseCreditsForm {...props} />
      </QueryClientProvider>,
      {
        jotaiDefaultValues: [[paymentOptionAtom, 'card']],
      },
    );
    const form = await screen.queryByTestId('choose-credits-form');
    expect(form).toBeInTheDocument();
  });

  it('selects card payment option', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ChooseCreditsForm {...props} />
      </QueryClientProvider>,
      {
        jotaiDefaultValues: [[paymentOptionAtom, 'card']],
      },
    );

    const cardOption = screen.getByTestId('choose-credit-card');
    if (cardOption) {
      userEvent.click(cardOption);
    }
    expect(cardOption).toBeChecked();
  });
});
