import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4fb573',
      contrastText: 'white',
    },
    secondary: {
      main: '#ffc433',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

const themeObject: ThemeOptions = {
  ...theme,
  overrides: {},
};

export default createMuiTheme(themeObject);
