import auth0 from 'auth0-js';
import store from '../store';

const webAuth = new auth0.WebAuth({
  domain: 'regen-network.auth0.com',
  clientID: 'SabnXOxTOiSbfUHOaSvrsEMSGWr7xabm',
  redirectUri: window.location.protocol + '//' + window.location.host,
  audience: 'https://app.regen.network/graphql',
  responseType: 'token id_token',
  scope: 'openid profile',
});

const login = () => {
  webAuth.authorize();
}

const handleAuthentication = () => {
    new Promise ((resolve, reject) => {
      webAuth.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
            setSession(authResult);
            store.dispatch(loginSuccess(authResult.idTokenPayload));
            fetch('/api/login', {
              headers: {
                Authorization: `Bearer ${authResult.accessToken}`
              },
              method: "POST",
          }).then((res) => {
              resolve(res);
          },
          (err) => {
              store.dispatch(loginError())
              reject(err);
          });
        } else if (err) {
          store.dispatch(loginError());
          reject(err);
          console.error(err);
        }
      });
    });
}

const setSession = (authResult) => {
  // Set the time that the Access Token will expire at
  const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
  localStorage.setItem('access_token', authResult.accessToken);
  localStorage.setItem('id_token', authResult.idToken);
  localStorage.setItem('expires_at', expiresAt);

  // schedule a token renewal
  scheduleRenewal();
}

const logout = () => {
  // Clear Access Token and ID Token from local storage
  localStorage.removeItem('access_token');
  localStorage.removeItem('id_token');
  localStorage.removeItem('expires_at');

  clearTimeout(tokenRenewalTimeout);
  store.dispatch(logoutSuccess);
  window.location.reload();
}

const isAuthenticated = () => {
  // Check whether the current time is past the
  // Access Token's expiry time
  const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
  return new Date().getTime() < expiresAt;
}

const getAccessToken = () => {
  const accessToken = localStorage.getItem('access_token');
  return accessToken;
}

const getValidToken = () => {
  if (isAuthenticated()) {
    getProfile((err, profile) => {
        err ? console.log(err) : store.dispatch(loginSuccess(profile));
    });
    return getAccessToken();
  }
  return null;
}

const getProfile = (cb) => {
  let accessToken = getAccessToken();
  webAuth.client.userInfo(accessToken, (err, profile) => {
    cb(err, profile);
    return profile;
  });
}

const renewToken = () => {
  webAuth.checkSession({}, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      setSession(result);
    }
  });
}

let tokenRenewalTimeout;

const scheduleRenewal = () => {
  const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
  const delay = expiresAt - Date.now();
  if (delay > 0) {
    tokenRenewalTimeout = setTimeout(() => {
      renewToken();
    }, delay);
  }
}

const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const loginSuccess = (profile) => ({ type: LOGIN_SUCCESS, payload: { profile } });

const LOGIN_ERROR = "LOGIN_ERROR";
const loginError = (err) => ({ type: LOGIN_ERROR, payload: { err }});

const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
const logoutSuccess = () => ({ type: LOGOUT_SUCCESS });

const LOGOUT_ERROR = "LOGOUT_ERROR";
const logoutError = () => ({ type: LOGOUT_ERROR });

const constants = { LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT_SUCCESS, LOGOUT_ERROR };
const actions = { handleAuthentication, isAuthenticated, getValidToken, getProfile, login, loginSuccess, loginError, logout, logoutSuccess, logoutError };

export { constants, actions };
