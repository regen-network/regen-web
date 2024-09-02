import {
  creditDetails,
  creditVintages,
} from 'web-marketplace/src/components/molecules/CreditsAmount/CreditsAmount.mock';
import { render, screen, userEvent } from 'web-marketplace/test/test-utils';

import { ChooseCreditsForm } from './ChooseCreditsForm';

describe('ChooseCreditsForm', () => {
  it('renders without crashing', () => {
    render(
      <ChooseCreditsForm
        creditVintages={creditVintages}
        creditDetails={creditDetails}
      />,
    );

    expect(screen.getByTestId('choose-credits-form')).toBeInTheDocument();
  });

  it('opens and closes advanced settings', () => {
    render(
      <ChooseCreditsForm
        creditVintages={creditVintages}
        creditDetails={creditDetails}
      />,
    );

    const advancedSettingsButton = screen.getByRole('button', {
      name: /advanced settings/i,
    });

    userEvent.click(advancedSettingsButton);
    expect(screen.getByText(/advanced settings/i)).toBeInTheDocument();

    userEvent.click(advancedSettingsButton);
    expect(screen.queryByTestId('advanced-settings')).not.toBeInTheDocument();
  });

  it('selects card payment option', () => {
    render(
      <ChooseCreditsForm
        creditVintages={creditVintages}
        creditDetails={creditDetails}
      />,
    );
    const cardOption = screen.getByRole('radio', {
      name: /card/i,
    });
    userEvent.click(cardOption);
    expect(cardOption).toBeChecked();
  });
});
