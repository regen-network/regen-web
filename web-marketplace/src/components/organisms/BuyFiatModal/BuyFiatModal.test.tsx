// import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from 'web-marketplace/test/test-utils';

import { BuyFiatModal } from './BuyFiatModal';

describe('BuyFiatModal', () => {
  const defaultProps = {
    title: 'Test Title',
    content: <div>Test Content</div>,
    button: { text: 'Click Me', href: null },
    userCanPurchaseCredits: { openModal: true, amountAvailable: 10 },
    onClose: vi.fn(),
    handleClick: vi.fn(),
  };

  it('should render the modal with the correct title and content', () => {
    render(<BuyFiatModal {...defaultProps} />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('should call onClose when the modal is closed', () => {
    render(<BuyFiatModal {...defaultProps} />);

    fireEvent.click(screen.getByTestId(/buy-fiat-modal-close/i));
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('should call handleClick when the button is clicked', () => {
    render(<BuyFiatModal {...defaultProps} />);

    fireEvent.click(screen.getByText('Click Me'));
    expect(defaultProps.handleClick).toHaveBeenCalled();
  });
});
