import { Suspense } from 'react';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { useAuth0 } from '@auth0/auth0-react';
import mediaQuery from 'css-mediaquery';
import { useAnalytics } from 'use-analytics';

import ThemeProvider from 'web-components/src/theme/RegenThemeProvider';

import { apolloClientFactory } from 'lib/clients/apolloClientFactory';
import { reactQueryClient } from 'lib/clients/reactQueryClient';

import { getRoutes } from './routes';

import './jest.mock';

function createMatchMedia(width: unknown) {
  return (query: string) => ({
    matches: mediaQuery.match(query, {
      width,
    }),
    addListener: () => {},
    removeListener: () => {},
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
jest.mock('use-analytics');
const mockedAnalytics = useAnalytics as jest.Mock;

describe('App', () => {
  beforeAll(() => {
    // @ts-ignore
    window.matchMedia = createMatchMedia(window.innerWidth);
  });

  describe('App - logged in', () => {
    beforeEach(() => {
      // Mock the Auth0 hook and make it return a logged in state
      mockedAuth0.mockReturnValue({
        isAuthenticated: true,
        user,
        logout: jest.fn(),
        loginWithRedirect: jest.fn(),
      });
      mockedAnalytics.mockReturnValue({
        plugins: {
          enable: async () => {
            jest.fn();
          },
        },
        page: jest.fn(),
      });
    });

    it('renders without crashing', () => {
      const router = createMemoryRouter(
        getRoutes({ reactQueryClient, apolloClientFactory }),
      );
      const container = document.createElement('div');
      document.body.appendChild(container);
      ReactDOM.render(
        <MockedProvider mocks={[]}>
          <ThemeProvider>
            <Suspense fallback={null}>
              <RouterProvider router={router} />
            </Suspense>
          </ThemeProvider>
        </MockedProvider>,
        container,
      );
      unmountComponentAtNode(container);
    });
  });

  describe('App - not logged in', () => {
    mockedAuth0.mockReturnValue({
      isAuthenticated: false,
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
    });

    it('renders without crashing', () => {
      const router = createMemoryRouter(
        getRoutes({ reactQueryClient, apolloClientFactory }),
      );
      const container = document.createElement('div');
      document.body.appendChild(container);
      ReactDOM.render(
        <MockedProvider mocks={[]}>
          <ThemeProvider>
            <Suspense fallback={null}>
              <RouterProvider router={router} />
            </Suspense>
          </ThemeProvider>
          ,
        </MockedProvider>,
        container,
      );
      unmountComponentAtNode(container);
    });
  });
});
