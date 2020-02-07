import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

const defaultTheme = createMuiTheme();

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fff',
      contrastText: '#000',
      light: '#202020',
    },
    secondary: {
      main: '#4FB573',
      light: '#DCF0E3',
    },
    info: {
      dark: '#545555',
      main: '#8f8f8f',
      light: '#EFEFEF',
    },
    // contrastThreshold: 3,
    // tonalOffset: 0.2,
  },
  spacing: factor => `${0.25 * factor}rem`,
  typography: {
    fontFamily: ['"Lato"', '-apple-system', 'sans-serif'].join(','),
    h1: {
      [defaultTheme.breakpoints.up('sm')]: {
        fontSize: '3rem',
      },
      [defaultTheme.breakpoints.down('xs')]: {
        fontSize: '2rem',
      },
      fontFamily: ['"Muli"', '-apple-system', 'sans-serif'].join(','),
    },
    h2: {
      [defaultTheme.breakpoints.up('sm')]: {
        fontSize: '2rem',
      },
      [defaultTheme.breakpoints.down('xs')]: {
        fontSize: '1.5rem',
      },
    },
    h3: {
      [defaultTheme.breakpoints.up('sm')]: {
        fontSize: '1.5rem',
      },
      [defaultTheme.breakpoints.down('xs')]: {
        fontSize: '1.125rem',
      },
    },
    h4: {
      [defaultTheme.breakpoints.up('sm')]: {
        fontSize: '1.3125rem',
      },
      [defaultTheme.breakpoints.down('xs')]: {
        fontSize: '1.125rem',
      },
    },
    h5: {
      fontSize: '1.125rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1400,
    },
  },
  shadows: [
    defaultTheme.shadows[0],
    '0px 4px 10px rgba(0, 0, 0, 0.05)',
    defaultTheme.shadows[2],
    defaultTheme.shadows[3],
    defaultTheme.shadows[4],
    defaultTheme.shadows[5],
    defaultTheme.shadows[6],
    defaultTheme.shadows[7],
    defaultTheme.shadows[8],
    defaultTheme.shadows[9],
    defaultTheme.shadows[10],
    defaultTheme.shadows[11],
    defaultTheme.shadows[12],
    defaultTheme.shadows[13],
    defaultTheme.shadows[14],
    defaultTheme.shadows[15],
    defaultTheme.shadows[16],
    defaultTheme.shadows[17],
    defaultTheme.shadows[18],
    defaultTheme.shadows[19],
    defaultTheme.shadows[20],
    defaultTheme.shadows[21],
    defaultTheme.shadows[22],
    defaultTheme.shadows[23],
    defaultTheme.shadows[24],
  ],
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
    // MuiAvatar: {
    //   img: {
    //     objectFit: 'scale-down',
    //   },
    // },
  },
});

const themeObject: ThemeOptions = {
  ...theme,
  overrides: {},
};

export default createMuiTheme(themeObject);
