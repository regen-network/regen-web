import { ComponentType, lazy, ReactNode } from 'react';

import ErrorPage from 'legacy-pages/ErrorPage';

type SafeLazyOptions = {
  retries?: number;
  retryDelay?: number;
  onError?: (error: Error) => void;
  fallback?: ReactNode;
};

/**
 * Wraps React.lazy() to catch errors in dynamically imported modules.
 * If an error occurs, it retries the import before returning a fallback component.
 *
 * @template T The component type being lazily loaded
 * @param factory A function that imports the component
 * @param options Configuration options for error handling and retries
 * @returns A lazy-loaded component with error handling
 */
export function safeLazy<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
  options: SafeLazyOptions = {},
) {
  const {
    retries = 2,
    retryDelay = 1000,
    fallback,
    // eslint-disable-next-line no-console, lingui/no-unlocalized-strings
    onError = error => console.error('Lazy import failed:', error),
  } = options;

  return lazy(async (): Promise<{ default: T | ComponentType<any> }> => {
    let lastError: Error;

    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        return await factory();
      } catch (error) {
        lastError = error as Error;

        if (attempt < retries) {
          // Create a delay before retrying the import agasin
          await new Promise(resolve => setTimeout(resolve, retryDelay));
        }
      }
    }

    onError(lastError!);
    return {
      // React's lazy() function expects the Promise to resolve to an object
      // with a 'default' property that contains the component.
      default: () =>
        fallback ? fallback : <ErrorPage importError={lastError} />,
    };
  });
}
