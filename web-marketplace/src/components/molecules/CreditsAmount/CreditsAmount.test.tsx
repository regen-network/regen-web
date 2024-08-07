import userEvent from '@testing-library/user-event';
import { PAYMENT_OPTIONS } from 'web-marketplace/src/components/organisms/ChooseCreditsForm/ChooseCreditsForm.constants';
import {
  FormContextProvider,
  render,
  screen,
} from 'web-marketplace/test/test-utils';

import { CreditsAmount } from './CreditsAmount';

describe('CreditsAmount', () => {
  const defaultValues = {
    creditsAvailable: 100,
    paymentOption: PAYMENT_OPTIONS.CARD,
  };

  it('renders without crashing', () => {
    render(
      <FormContextProvider defaultValues={defaultValues}>
        <CreditsAmount {...defaultValues} />
      </FormContextProvider>,
    );

    expect(screen.getByText(/Amount/i)).toBeInTheDocument();
  });

  it('updates credits amount', async () => {
    render(
      <FormContextProvider defaultValues={defaultValues}>
        <CreditsAmount {...defaultValues} />
      </FormContextProvider>,
    );

    const creditsInput = screen.getByLabelText(/Credits Input/i);
    userEvent.clear(creditsInput);
    await userEvent.type(creditsInput, '10');
    expect(creditsInput).toHaveValue(10);
  });

  it('updates currency amount', async () => {
    render(
      <FormContextProvider defaultValues={defaultValues}>
        <CreditsAmount {...defaultValues} />
      </FormContextProvider>,
    );

    const currencyInput = screen.getByLabelText(/Currency Input/i);
    userEvent.clear(currencyInput);
    await userEvent.type(currencyInput, '50');
    expect(currencyInput).toHaveValue(50);
  });

  it('updates currency amount when credits amount changes', async () => {
    render(
      <FormContextProvider defaultValues={defaultValues}>
        <CreditsAmount {...defaultValues} />
      </FormContextProvider>,
    );

    const creditsInput = screen.getByLabelText(/Credits Input/i);
    const currencyInput = screen.getByLabelText(/Currency Input/i);

    userEvent.clear(creditsInput);
    await userEvent.type(creditsInput, '50');

    expect(currencyInput).toHaveValue(50);
  });

  it('updates credits amount when currency amount changes', async () => {
    render(
      <FormContextProvider defaultValues={defaultValues}>
        <CreditsAmount {...defaultValues} />
      </FormContextProvider>,
    );

    const creditsInput = screen.getByLabelText(/Credits Input/i);
    const currencyInput = screen.getByLabelText(/Currency Input/i);

    userEvent.clear(currencyInput);
    await userEvent.type(currencyInput, '50');

    expect(creditsInput).toHaveValue(50);
  });

  it('updates credits amount when max credits is selected', async () => {
    render(
      <FormContextProvider defaultValues={defaultValues}>
        <CreditsAmount {...defaultValues} />
      </FormContextProvider>,
    );

    const creditsInput = screen.getByLabelText(/Credits Input/i);
    const maxCreditsButton = screen.getByRole('button', {
      name: /Max Credits/i,
    });

    await userEvent.click(maxCreditsButton);

    expect(creditsInput).toHaveValue(100);
  });

  it('updates currency amount when max credits is selected', async () => {
    render(
      <FormContextProvider defaultValues={defaultValues}>
        <CreditsAmount {...defaultValues} />
      </FormContextProvider>,
    );

    const currencyInput = screen.getByLabelText(/Currency Input/i);
    const maxCreditsButton = screen.getByRole('button', {
      name: /Max Credits/i,
    });

    await userEvent.click(maxCreditsButton);

    expect(currencyInput).toHaveValue(100);
  });
});
