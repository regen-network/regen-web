/**
 * Profile path prefix used for matching profile routes
 */
export const PROFILES_PATH = '/profiles/';

/**
 * Normalizes a path by removing trailing slashes except for the root path.
 * @param path - The path to normalize
 * @returns The normalized path
 */
export const normalizePath = (path: string): string =>
  path !== '/' && path.endsWith('/') ? path.slice(0, -1) : path;
