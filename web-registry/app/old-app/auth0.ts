import { WebAuth } from 'auth0-js';

const auth0 = new WebAuth({
  domain:
    process.env.REACT_APP_AUTH0_DOMAIN || 'regen-network-registry.auth0.com',
  clientID:
    process.env.REACT_APP_AUTH0_CLIENT_ID || 'rEuc1WLPAQVXZ7gJrWg4AL9EhWMHmLu8',
  audience: 'https://regen-registry-server.herokuapp.com/',
});

export default auth0;
