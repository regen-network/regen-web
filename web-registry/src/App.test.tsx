import React from 'react';
import ReactDOM from 'react-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { MockedProvider } from '@apollo/client/testing';
import mediaQuery from 'css-mediaquery';
import ThemeProvider from 'web-components/lib/theme/RegenThemeProvider';

import './jest.mock';
import App from './App';

function createMatchMedia(width: unknown) {
  return (query: string) => ({
    matches: mediaQuery.match(query, {
      width,
    }),
    addListener: () => {},
    removeListener: () => {},
    // media: '',
    // onchange: () => {},
    // addEventListener: () => {},
    // removeEventListener: () => {},
    // dispatchEvent: () => {},
  });
}

// create a dummy user profile
const user = {
  email: 'johndoe@me.com',
  email_verified: true,
  sub: 'google-oauth2|2147627834623744883746',
};
jest.mock('@auth0/auth0-react');
const mockedAuth0 = useAuth0 as jest.Mock;

describe('App', () => {
  // beforeAll(() => {
  //   window.matchMedia = createMatchMedia(window.innerWidth);
  // });

  describe('App - logged in', () => {
    beforeEach(() => {
      // Mock the Auth0 hook and make it return a logged in state
      mockedAuth0.mockReturnValue({
        isAuthenticated: true,
        user,
        logout: jest.fn(),
        loginWithRedirect: jest.fn(),
      });
    });

    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(
        <MockedProvider mocks={[]}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </MockedProvider>,
        div,
      );
      ReactDOM.unmountComponentAtNode(div);
    });
  });
});

// describe('App - not logged in', () => {
//   mockedAuth0.mockReturnValue({
//     isAuthenticated: false,
//     logout: jest.fn(),
//     loginWithRedirect: jest.fn(),
//   });

//   it('renders without crashing', () => {
//     const div = document.createElement('div');
//     ReactDOM.render(
//       <MockedProvider mocks={[]}>
//         <App />
//       </MockedProvider>,
//       div,
//     );
//     ReactDOM.unmountComponentAtNode(div);
//   });
// });
