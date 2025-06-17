// Normalize the error to an Error object when possible
export const normalizeError = (err: unknown): Error => {
  if (err instanceof Error) {
    return err;
  } else if (typeof err === 'string') {
    return new Error(err);
  } else if (err !== null && err !== undefined) {
    return new Error(JSON.stringify(err));
  }
  // eslint-disable-next-line lingui/no-unlocalized-strings
  return new Error('Unknown error');
};
