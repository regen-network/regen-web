import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fff',
      contrastText: '#000',
      light: '#202020',
    },
    secondary: {
      main: '#545555',
      light: '#EFEFEF'
    },
    info: {
      main: '#4FB573',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  spacing: factor => `${0.25 * factor}rem`,
  typography: {
    fontFamily: [
      '"Lato"',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '1.5rem',
      fontFamily: [
        '"Muli"',
        'sans-serif',
      ].join(','),
    },
    h2: {
      fontSize: '1.3125rem'
    },
    h3: {
      fontSize: '1.125rem'
    },
    body2: {
      fontSize: '0.875rem'
    }
  },
  props: {
    MuiTypography: {
      variantMapping: {
        h1: 'h1',
        h2: 'h2',
        h3: 'h3',
        h4: 'h4',
        h5: 'h5',
        h6: 'h6',
        subtitle1: 'h2',
        subtitle2: 'h2',
        body1: 'p',
        body2: 'p',
      },
    },
  },
});

const themeObject: ThemeOptions = {
  ...theme,
  overrides: {},
};

export default createMuiTheme(themeObject);
