import {
  allowedDenoms,
  cardSellOrders,
  cryptoSellOrders,
} from 'web-marketplace/src/components/molecules/CreditsAmount/CreditsAmount.mock';
import { render, screen, userEvent } from 'web-marketplace/test/test-utils';

import { PAYMENT_OPTIONS } from 'pages/BuyCredits/BuyCredits.constants';

import { ChooseCreditsForm } from './ChooseCreditsForm';
import { ChooseCreditsFormSchemaType } from './ChooseCreditsForm.schema';

describe('ChooseCreditsForm', () => {
  const props = {
    paymentOption: PAYMENT_OPTIONS.CARD,
    setPaymentOption: () => {},
    retiring: true,
    setRetiring: () => {},
    onSubmit: async (values: ChooseCreditsFormSchemaType) => {},
    cardSellOrders,
    cryptoSellOrders,
    cardDisabled: false,
    allowedDenoms,
    projectHref: '/lorem',
  };
  it('renders without crashing', () => {
    render(<ChooseCreditsForm {...props} />);

    expect(screen.getByTestId('choose-credits-form')).toBeInTheDocument();
  });

  it('selects card payment option', () => {
    render(<ChooseCreditsForm {...props} />);
    const cardOption = screen.getByRole('radio', {
      name: /card/i,
    });
    userEvent.click(cardOption);
    expect(cardOption).toBeChecked();
  });
});
