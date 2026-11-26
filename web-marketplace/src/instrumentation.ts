// Runs once when the Next.js server starts (never in the browser).
export async function register() {
  // eslint-disable-next-line lingui/no-unlocalized-strings
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { installServerRequestHeader } = await import(
      'lib/serverApiHeader/serverApiHeader'
    );
    installServerRequestHeader();
  }
}
