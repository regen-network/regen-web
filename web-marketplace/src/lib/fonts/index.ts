// web-marketplace/src/lib/fonts/index.ts
import { NextFontWithVariable } from 'next/dist/compiled/@next/font';

import { IS_TERRASOS } from 'lib/env';

export const fonts = IS_TERRASOS
  ? require('./terrasos').fonts
  : require('./regen').fonts;

export const fontClassNames = fonts
  .map((font: NextFontWithVariable) => font.variable)
  .join(' ');
