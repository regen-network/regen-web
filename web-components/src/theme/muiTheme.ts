import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fff',
      contrastText: '#000',
    },
    secondary: {
      main: '#545555',
    },
    info: {
      main: '#4FB573',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    fontFamily: [
      '"Lato"',
      'sans-serif',
    ].join(','),
    body2: {
      fontFamily: [
        '"Muli"',
        'sans-serif',
      ].join(','),
    },
    h1: {
      fontSize: '1.5rem'
    },
    h2: {
      fontSize: '1.3rem'
    }
  },
});

const themeObject: ThemeOptions = {
  ...theme,
  overrides: {},
};

export default createMuiTheme(themeObject);
