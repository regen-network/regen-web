import { createTheme, adaptV4Theme } from '@mui/material/styles';
// import { DeprecatedThemeOptions } from '@mui/material/styles/createTheme';
// import { MuiPickersOverrides } from '@mui/lab/typings/overrides';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    tablet: true; // adds the `tablet` breakpoint
    md: true;
    lg: true;
    xl: true;
  }
}

const defaultTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      tablet: 834,
      md: 1064,
      lg: 1280,
      xl: 1400,
    },
  },
});

const theme = createTheme(
  adaptV4Theme({
    palette: {
      primary: {
        main: '#fff',
        contrastText: '#000',
        light: '#202020',
      },
      secondary: {
        main: '#4FB573',
        light: '#DCF0E3',
        dark: '#7BC796',
        contrastText: '#B9E1C7',
      },
      info: {
        dark: '#545555',
        main: '#8f8f8f',
        light: '#EFEFEF',
        contrastText: '#b0ddc0',
      },
      grey: {
        50: '#FAFAFA',
        100: '#D2D5D9',
        200: '#F9F9F9',
        300: '#cccfd4',
        400: '#C0C5C4',
        500: '#848484',
        600: '#C4C4C4',
      },
      error: {
        main: '#DE4526',
        light: '#E6735C',
      },
      // contrastThreshold: 3,
      // tonalOffset: 0.2,
    },
    spacing: (factor: number) => `${0.25 * factor}rem`,
    typography: {
      fontFamily: ['"Lato"', '-apple-system', 'sans-serif'].join(','),
      h1: {
        [defaultTheme.breakpoints.up('sm')]: {
          fontSize: '3rem',
        },
        [defaultTheme.breakpoints.down('sm')]: {
          fontSize: '2rem',
        },
        fontFamily: ['"Muli"', '-apple-system', 'sans-serif'].join(','),
      },
      h2: {
        [defaultTheme.breakpoints.up('sm')]: {
          fontSize: '2.375rem',
        },
        [defaultTheme.breakpoints.down('sm')]: {
          fontSize: '1.5rem',
        },
      },
      h3: {
        [defaultTheme.breakpoints.up('sm')]: {
          fontSize: '2rem',
        },
        [defaultTheme.breakpoints.down('sm')]: {
          fontSize: '1.5rem', // possible override: 1.3125rem
        },
      },
      h4: {
        [defaultTheme.breakpoints.up('sm')]: {
          fontSize: '1.5rem',
        },
        [defaultTheme.breakpoints.down('sm')]: {
          fontSize: '1.3125rem', // possible override: 1.125rem
        },
      },
      h5: {
        [defaultTheme.breakpoints.up('sm')]: {
          fontSize: '1.3125rem',
        },
        [defaultTheme.breakpoints.down('sm')]: {
          fontSize: '1.125rem',
        },
      },
      h6: {
        fontSize: '1.125rem',
      },
      subtitle2: {
        [defaultTheme.breakpoints.up('sm')]: {
          fontSize: '2.375rem',
        },
        [defaultTheme.breakpoints.down('sm')]: {
          fontSize: '2rem',
        },
      },
      body1: {
        [defaultTheme.breakpoints.up('sm')]: {
          fontSize: '1rem',
        },
        [defaultTheme.breakpoints.down('sm')]: {
          fontSize: '0.875rem',
        },
      },
      body2: {
        fontSize: '0.875rem',
      },
      overline: {
        fontFamily: ['PT Mono', '"Lato"', '-apple-system', 'sans-serif'].join(
          ',',
        ),
      },
    },
    breakpoints: defaultTheme.breakpoints,
    shadows: [
      defaultTheme.shadows[0],
      '0px 4px 10px rgba(0, 0, 0, 0.05)',
      '-4px 0px 10px rgba(0, 0, 0, 0.25)',
      '0px 0px 20px rgba(0, 0, 0, 0.25)',
      '0px 4px 10px rgba(0, 0, 0, 0.1)',
      '0px 0px 4px rgba(0, 0, 0, 0.05)',
      '0px 4px 10px rgba(0, 0, 0, 0.1)',
      '0px -4px 10px rgba(0, 0, 0, 0.1)',
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
    },
  }),
);

const muiPickersOverrides = {
  // see: https://github1s.com/mui-org/material-ui-pickers/blob/HEAD/lib/src/typings/overrides.ts
  MuiPickersDatePickerRoot: {
    toolbar: {
      backgroundColor: theme.palette.secondary.main,
      '& .MuiPickersToolbarText-toolbarTxt': {
        color: theme.palette.secondary.contrastText,
      },
      '& .MuiPickersToolbarText-toolbarBtnSelected': {
        color: theme.palette.primary.main,
      },
    },
  },
  MuiPickersToolbar: {
    toolbar: {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  MuiPickersYear: {
    yearSelected: {
      color: theme.palette.secondary.main,
      fontSize: theme.spacing(7),
    },
  },
  MuiPickersMonth: {
    root: {
      '&:focus': {
        color: theme.palette.secondary.main,
      },
    },
    monthSelected: {
      color: theme.palette.secondary.main,
      fontSize: theme.spacing(7),
    },
  },
};

const themeObject = {
  ...theme,
  overrides: {
    ...muiPickersOverrides,
  },
};

const regenTheme = createTheme(adaptV4Theme(themeObject));
type Theme = typeof regenTheme;

export { Theme }; // avoid having to do manual type definitions for added breakpoint values by importing here instead of MUI
export default regenTheme;
