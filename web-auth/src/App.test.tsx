import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const login = screen.getAllByText(/log in/i);
  expect(login.length).toBeGreaterThan(0);
});
