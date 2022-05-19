import { createTheme } from '@mui/material/styles';

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

const { pxToRem } = defaultTheme.typography;

const headerFontFamily = ['"Muli"', '-apple-system', 'sans-serif'].join(',');
const defaultFontFamily = ['"Lato"', '-apple-system', 'sans-serif'].join(',');

const headerDefaults = {
  fontWeight: 900,
  fontFamily: headerFontFamily,
};

const regenTheme = createTheme({
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
  },
  spacing: (factor: number) => `${0.25 * factor}rem`,
  typography: {
    fontFamily: defaultFontFamily,
    h1: {
      ...headerDefaults,
      fontSize: pxToRem(48),
      lineHeight: '130%',
    },
    h2: {
      ...headerDefaults,
      fontSize: pxToRem(38),
      lineHeight: '130%',
    },
    h3: {
      ...headerDefaults,
      fontSize: pxToRem(32),
      lineHeight: '140%',
    },
    h4: {
      ...headerDefaults,
      fontSize: pxToRem(24),
      lineHeight: '145%',
    },
    h5: {
      ...headerDefaults,
      fontSize: pxToRem(21),
      lineHeight: '150%',
    },
    h6: {
      ...headerDefaults,
      fontSize: pxToRem(18),
      lineHeight: '150%',
    },
    textXLarge: {
      fontSize: pxToRem(22),
    },
    textLarge: {
      fontSize: pxToRem(18),
    },
    textMedium: {
      fontSize: pxToRem(16),
    },
    // MUI defaults to 'body1' for Typography text and I can't figure out how to
    // override - this is a duplicate of `textMedium`
    body1: {
      fontSize: pxToRem(16),
    },
    textSmall: {
      fontSize: pxToRem(14),
    },
    textXSmall: {
      fontSize: pxToRem(12),
    },
    // not the same as overline in Figma mockups (which isn't really used) - using for code font instead
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
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          letterSpacing: '1px',
          textAlign: 'center',
          boxShadow: 'none',
          fontWeight: 800,
          fontFamily: headerFontFamily,
          borderRadius: '2px',
          border: '2px solid',
          whiteSpace: 'nowrap',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        sizeSmall: {
          [defaultTheme.breakpoints.up('sm')]: {
            padding: defaultTheme.spacing(1.125, 2.25),
            fontSize: '0.875rem',
            lineHeight: pxToRem(17.47),
          },
          [defaultTheme.breakpoints.down('sm')]: {
            padding: defaultTheme.spacing(1, 2),
            fontSize: '0.75rem',
            lineHeight: pxToRem(13.81),
          },
        },
        sizeMedium: {
          [defaultTheme.breakpoints.up('sm')]: {
            padding: defaultTheme.spacing(1.5, 3),
            fontSize: '1.125rem',
            lineHeight: pxToRem(22.49),
          },
          [defaultTheme.breakpoints.down('sm')]: {
            padding: defaultTheme.spacing(1.25, 2.5),
            fontSize: '0.875rem',
            lineHeight: '17.47px',
          },
        },
        sizeLarge: {
          [defaultTheme.breakpoints.up('sm')]: {
            padding: defaultTheme.spacing(1.85, 6),
            fontSize: '1.313rem',
            lineHeight: pxToRem(26.36),
          },
          [defaultTheme.breakpoints.down('sm')]: {
            padding: defaultTheme.spacing(1.5, 3),
            fontSize: '1.125rem',
            lineHeight: '22.49px',
          },
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: 'h1',
          h2: 'h2',
          h3: 'h3',
          h4: 'h4',
          h5: 'h5',
          h6: 'h6',
          textXLarge: 'p',
          textLarge: 'p',
          textMedium: 'p',
          body1: 'p',
          textSmall: 'p',
          textXSmall: 'p',
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: 'none',
      },
    },
  },
});

declare module '@mui/material/styles' {
  interface TypographyVariants {
    textXLarge: React.CSSProperties;
    textLarge: React.CSSProperties;
    textMedium: React.CSSProperties;
    textSmall: React.CSSProperties;
    textXSmall: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    textXLarge?: React.CSSProperties;
    textLarge?: React.CSSProperties;
    textMedium?: React.CSSProperties;
    textSmall?: React.CSSProperties;
    textXSmall?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    textXLarge: true;
    textLarge: true;
    textMedium: true;
    textSmall: true;
    textXSmall: true;
  }
}

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

type Theme = typeof regenTheme;

export type { Theme }; // avoid having to do manual type definitions for added breakpoint values by importing here instead of MUI
export default regenTheme;
