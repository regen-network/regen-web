import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { BuyCreditsForm } from './BuyCreditsForm';

describe('BuyCreditsForm', () => {
  const creditVintages = [
    { date: '2022-01-01', credits: '100' },
    { date: '2022-02-01', credits: '200' },
  ];
  const cryptoOptions = [
    { label: 'Option 1', linkTo: '/option1' },
    { label: 'Option 2', linkTo: '/option2' },
  ];

  it('renders without crashing', () => {
    render(
      <BuyCreditsForm
        creditVintages={creditVintages}
        cryptoOptions={cryptoOptions}
      />,
    );

    expect(screen.getByTestId('buy-credits-form')).toBeInTheDocument();
  });

  it('opens and closes advanced settings', () => {
    render(
      <BuyCreditsForm
        creditVintages={creditVintages}
        cryptoOptions={cryptoOptions}
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
      <BuyCreditsForm
        creditVintages={creditVintages}
        cryptoOptions={cryptoOptions}
      />,
    );

    const cardOption = screen.getByRole('radio', {
      name: /card/i,
    });

    userEvent.click(cardOption);
    expect(cardOption).toBeChecked();
  });
});
