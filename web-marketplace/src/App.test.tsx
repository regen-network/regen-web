import { Suspense } from 'react';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
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

describe('App', () => {
  beforeAll(() => {
    // @ts-ignore
    window.matchMedia = createMatchMedia(window.innerWidth);
  });

  describe('App', () => {
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
