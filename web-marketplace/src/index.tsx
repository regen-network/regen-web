import { createRoot } from 'react-dom/client';
import { ClientProvider } from 'clients/Clients.Provider';

import * as serviceWorker from './serviceWorker';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(<ClientProvider />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
