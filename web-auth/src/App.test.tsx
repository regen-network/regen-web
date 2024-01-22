import { MockedProvider } from '@apollo/client/testing';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import ThemeProvider from 'web-components/src/theme/RegenThemeProvider';

import App from './App';

it('renders without crashing', () => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  ReactDOM.render(
    <MockedProvider mocks={[]}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
      ,
    </MockedProvider>,
    container,
  );
  unmountComponentAtNode(container);
});
