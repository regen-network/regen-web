import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { EditableInput } from './EditableInput';

describe('EditableInput', () => {
  it('renders the amount and edit button', () => {
    const onChangeMock = vi.fn();
    render(
      <EditableInput
        value={100}
        onChange={onChangeMock}
        ariaLabel="testEditableInput"
      />,
    );
    const amount = screen.getByText('100');
    expect(amount).toBeInTheDocument();
    const editButton = screen.getByRole('button', {
      name: 'Edit',
    });

    expect(editButton).toBeInTheDocument();
  });

  it('renders the input field and update button when when click edit', () => {
    const onChangeMock = vi.fn();
    render(
      <EditableInput
        value={100}
        onChange={onChangeMock}
        ariaLabel="testEditableInput"
      />,
    );
    const editButton = screen.getByRole('button', {
      name: 'Edit',
    });
    fireEvent.click(editButton);
    const input = screen.getByRole('textbox', {
      name: 'testEditableInput',
    });
    expect(input).toBeInTheDocument();

    const updateButton = screen.getByRole('button', {
      name: 'update',
    });
    expect(updateButton).toBeInTheDocument();
  });

  it('calls the onChange callback with the updated amount when click update', () => {
    const onChangeMock = vi.fn();
    render(
      <EditableInput
        value={100}
        onChange={onChangeMock}
        ariaLabel="testEditableInput"
      />,
    );

    const editButton = screen.getByRole('button', {
      name: 'Edit',
    });
    fireEvent.click(editButton);

    const input = screen.getByRole('textbox', {
      name: 'testEditableInput',
    });
    fireEvent.change(input, { target: { value: '200' } });

    const updateButton = screen.getByRole('button', {
      name: 'update',
    });
    fireEvent.click(updateButton);

    expect(onChangeMock).toHaveBeenCalledWith(200);
  });
});
