import { render, screen } from '@testing-library/react';
import React from 'react';

import App from './App';

test.skip('renders learn react link', () => {
  render(<App />);
  const login = screen.getAllByText(/log in/i);
  expect(login.length).toBeGreaterThan(0);
});
