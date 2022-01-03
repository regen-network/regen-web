import postcss from 'postcss';
import autoprefixer from 'autoprefixer';

export default function (css, pathname) {
  const prefixer = postcss([
    autoprefixer({
      overrideBrowserslist: [`>0.25%`, `not dead`],
    }),
  ]);

  try {
    return prefixer.process(css, { from: null }).css;
  } catch (error) {
    if (error.name === `CssSyntaxError`) {
      throw new Error(`Pathname: ${pathname} ${error.toString()}`);
    }
    throw error;
  }
}
