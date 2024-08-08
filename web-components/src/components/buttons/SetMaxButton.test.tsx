import { SetMaxButton } from 'web-components/src/components/buttons/SetMaxButton';
import { fireEvent, render, screen } from 'web-components/test/test-utils';

describe('SetMaxButton', () => {
  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<SetMaxButton onClick={onClick} />);
    const button = screen.getByLabelText('Set max credits');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
