import { render } from '@testing-library/react';
import { fireEvent, screen } from 'web-components/test/test-utils';

import { EditableInput } from './EditableInput';

describe('EditableInput', () => {
  it('renders the amount and edit button', async () => {
    const onChangeMock = vi.fn();
    render(
      <EditableInput
        value={'100'}
        maxValue={1000}
        onChange={onChangeMock}
        inputAriaLabel="testEditableInput"
        editButtonAriaLabel="Edit"
        updateButtonText="Update"
        cancelButtonText="Cancel"
        isEditable
      />,
    );
    const amount = screen.getByText('100');
    expect(amount).toBeInTheDocument();
    const editButton = await screen.queryByRole('button', {
      name: 'Edit',
    });

    expect(editButton).toBeInTheDocument();
  });

  it('renders the input field and update button when click edit', async () => {
    const onChangeMock = vi.fn();
    render(
      <EditableInput
        value={'100'}
        maxValue={1000}
        onChange={onChangeMock}
        inputAriaLabel="testEditableInput"
        editButtonAriaLabel="Edit"
        updateButtonText="Update"
        cancelButtonText="Cancel"
        isEditable
      />,
    );
    const editButton = await screen.queryByRole('button', {
      name: 'Edit',
    });
    if (editButton) {
      fireEvent.click(editButton);
    }
    const input = screen.getByTestId('editable-input');
    expect(input).toBeInTheDocument();

    const updateButton = screen.getByRole('button', {
      name: /update/i,
    });
    expect(updateButton).toBeInTheDocument();
  });

  it('calls the onChange callback with the updated amount when click update', async () => {
    const onChangeMock = vi.fn();
    render(
      <EditableInput
        value={'100'}
        maxValue={1000}
        onChange={onChangeMock}
        inputAriaLabel="testEditableInput"
        editButtonAriaLabel="Edit"
        updateButtonText="Update"
        cancelButtonText="Cancel"
        isEditable
      />,
    );

    const editButton = await screen.queryByRole('button', {
      name: 'Edit',
    });
    if (editButton) {
      fireEvent.click(editButton);
    }

    const input = screen.getByTestId('editable-input');
    fireEvent.change(input, { target: { value: '200' } });

    const updateButton = screen.getByRole('button', {
      name: /update/i,
    });
    fireEvent.click(updateButton);

    expect(onChangeMock).toHaveBeenCalledWith(200);
  });

  it('calls onInvalidValue when input exceeds maxValue', async () => {
    const onChangeMock = vi.fn();
    const onInvalidValueMock = vi.fn();
    render(
      <EditableInput
        value={'100'}
        maxValue={1000}
        onChange={onChangeMock}
        inputAriaLabel="testEditableInput"
        editButtonAriaLabel="Edit"
        updateButtonText="Update"
        cancelButtonText="Cancel"
        isEditable
        onInvalidValue={onInvalidValueMock}
      />,
    );

    const editButton = await screen.queryByRole('button', {
      name: 'Edit',
    });
    if (editButton) {
      fireEvent.click(editButton);
    }

    const input = screen.getByTestId('editable-input');
    fireEvent.change(input, { target: { value: '2000' } });

    expect(onInvalidValueMock).toHaveBeenCalled();
  });

  it('resets value and exits edit mode when cancel is clicked', async () => {
    const onChangeMock = vi.fn();
    render(
      <EditableInput
        value={'100'}
        maxValue={1000}
        onChange={onChangeMock}
        inputAriaLabel="testEditableInput"
        editButtonAriaLabel="Edit"
        updateButtonText="Update"
        cancelButtonText="Cancel"
        isEditable
      />,
    );

    const editButton = await screen.queryByRole('button', {
      name: 'Edit',
    });
    if (editButton) {
      fireEvent.click(editButton);
    }

    const input = screen.getByTestId('editable-input');
    fireEvent.change(input, { target: { value: '200' } });

    const cancelButton = screen.getByRole('button', {
      name: /cancel/i,
    });
    fireEvent.click(cancelButton);

    const amount = screen.getByText('100');
    expect(amount).toBeInTheDocument();
    expect(input).not.toBeInTheDocument();
  });

  it('updates value on Enter key press and cancels on Escape key press', async () => {
    const onChangeMock = vi.fn();
    render(
      <EditableInput
        value={'100'}
        maxValue={1000}
        onChange={onChangeMock}
        inputAriaLabel="testEditableInput"
        editButtonAriaLabel="Edit"
        updateButtonText="Update"
        cancelButtonText="Cancel"
        isEditable
      />,
    );

    const editButton = await screen.queryByRole('button', {
      name: 'Edit',
    });
    if (editButton) {
      fireEvent.click(editButton);
    }

    const input = screen.getByTestId('editable-input');
    fireEvent.change(input, { target: { value: '200' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(onChangeMock).toHaveBeenCalledWith(200);

    fireEvent.change(input, { target: { value: '300' } });
    fireEvent.keyDown(input, { key: 'Escape', code: 'Escape' });

    const amount = screen.getByText('200');
    expect(amount).toBeInTheDocument();
    expect(input).not.toBeInTheDocument();
  });
});
