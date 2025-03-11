import { useMemo } from 'react';

/**
 * A custom hook that generates a unique gradient ID by combining a base ID with a random string.
 * This is useful for ensuring unique identifiers for SVG gradient elements.
 *
 * @param id - The base ID to be used in generating the unique gradient ID
 * @returns A string combining the base ID with a random suffix
 *
 * @example
 * ```tsx
 * const gradientId = useGradientId('myGradient');
 * // Returns something like: 'myGradient-x7f2p9'
 * ```
 */
export const useGradientId = (id: string): string => {
  const gradientId = useMemo(
    () => `${id}-${Math.random().toString(36).substring(7)}`,
    [id],
  );
  return gradientId;
};
