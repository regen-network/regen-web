import { MuiPickersOverrides } from '@mui/lab/typings/overrides';

type overridesNameToClassKey = {
  [P in keyof MuiPickersOverrides]: keyof MuiPickersOverrides[P];
};

declare module '@mui/material/styles/overrides' {
  export interface ComponentNameToClassKey extends overridesNameToClassKey {}
}
