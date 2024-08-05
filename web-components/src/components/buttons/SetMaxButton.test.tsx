import { fireEvent, render, screen } from '@testing-library/react';
import { SetMaxButton } from 'web-components/src/components/buttons/SetMaxButton';

describe('SetMaxButton', () => {
  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<SetMaxButton onClick={onClick} />);
    const button = screen.getByLabelText('Set max credits');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
