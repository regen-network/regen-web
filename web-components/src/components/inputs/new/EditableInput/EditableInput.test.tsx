import { render } from '@testing-library/react';
import { fireEvent, screen } from 'web-components/test/test-utils';

import { EditableInput } from './EditableInput';

describe('EditableInput', () => {
  it('renders the amount and edit button', async () => {
    const onChangeMock = vi.fn();
    render(
      <EditableInput
        value={100}
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
        value={100}
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
        value={100}
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
});
