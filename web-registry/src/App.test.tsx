import React from 'react';
import ReactDOM from 'react-dom';
import './jest.mock';
import App from './App';
import { useAuth0 } from './react-auth0-spa';

// create a dummy user profile
const user = {
  email: 'johndoe@me.com',
  email_verified: true,
  sub: 'google-oauth2|2147627834623744883746',
};
jest.mock('./react-auth0-spa');
const mockedAuth0 = useAuth0 as jest.Mock;

describe('App - logged in', () => {
  // Mock the Auth0 hook and make it return a logged in state
  mockedAuth0.mockReturnValue({
    isAuthenticated: true,
    user,
    logout: jest.fn(),
    loginWithRedirect: jest.fn(),
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('App - not logged in', () => {
  mockedAuth0.mockReturnValue({
    isAuthenticated: false,
    logout: jest.fn(),
    loginWithRedirect: jest.fn(),
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
