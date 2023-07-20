import { WebAuth } from 'auth0-js';

const auth0 = new WebAuth({
  domain: import.meta.env.VITE_AUTH0_DOMAIN || 'regen-network-registry.auth0.com',
  clientID:
    import.meta.env.VITE_AUTH0_CLIENT_ID || 'rEuc1WLPAQVXZ7gJrWg4AL9EhWMHmLu8',
  audience: 'https://regen-registry-server.herokuapp.com/',
});

export default auth0;
