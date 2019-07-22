import * as React from "react";
import {MuiThemeProvider} from "@material-ui/core/styles";
import {IntlProvider} from 'react-intl';
import theme from 'theme';

const App = () =>
  <IntlProvider locale={navigator.language || 'en-US'}>
    <MuiThemeProvider theme={theme}>
      <h1>Coming soon</h1>
    </MuiThemeProvider>
  </IntlProvider>
;

export default App;