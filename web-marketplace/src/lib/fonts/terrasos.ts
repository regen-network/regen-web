/* eslint-disable lingui/no-unlocalized-strings */
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-montserrat',
  fallback: [
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
  ],
});

export const fonts = [montserrat];
