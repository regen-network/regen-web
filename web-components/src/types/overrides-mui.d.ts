import { MuiPickersOverrides } from '@mui/lab/typings/overrides';

type overridesNameToClassKey = {
  [P in keyof MuiPickersOverrides]: keyof MuiPickersOverrides[P];
};

declare module '@mui/material/styles/overrides' {
  export interface ComponentNameToClassKey extends overridesNameToClassKey {}
}

declare module '@mui/material/styles' {
  interface Palette {
    orange: {
      light?: string;
      main?: string;
      dark?: string;
      contrastText: string;
    };
    green?: {
      light?: string;
      main?: string;
      dark?: string;
      contrastText?: string;
    };
  }

  interface PaletteOptions {
    orange: {
      light?: string;
      main?: string;
      dark?: string;
      contrastText: string;
    };
    green?: {
      light?: string;
      main?: string;
      dark?: string;
      contrastText?: string;
    };
  }
}
