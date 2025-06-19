/* eslint-disable lingui/no-unlocalized-strings */
import { Lato, Mulish } from 'next/font/google';

const fallbackFonts = [
  '-apple-system', // macOS, iOS
  'BlinkMacSystemFont', // Chrome on macOS
  'Segoe UI', // Windows
  'Roboto', // Android, ChromeOS
  'Oxygen', // KDE
  'Ubuntu', // Ubuntu
  'Cantarell', // GNOME
  'Fira Sans', // Firefox OS
  'Droid Sans', // Older Android
  'Helvetica Neue', // Older macOS
  'sans-serif', // Generic fallback
];

export const lato = Lato({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '300', '400', '700'],
  variable: '--font-sans',
  fallback: fallbackFonts,
});

export const muli = Mulish({
  subsets: ['latin'],
  display: 'swap',
  weight: ['500', '800', '900'],
  variable: '--font-muli',
  fallback: fallbackFonts,
});
