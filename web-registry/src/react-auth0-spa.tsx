import React, { useState, useEffect, useContext } from 'react';
import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';

interface Auth0Context {
  isAuthenticated: boolean;
  user: any;
  loading: boolean;
  popupOpen: boolean;
  loginWithPopup(options: PopupLoginOptions): Promise<void>;
  handleRedirectCallback(): Promise<RedirectLoginResult>;
  getIdTokenClaims(o?: getIdTokenClaimsOptions): Promise<IdToken>;
  loginWithRedirect(o: RedirectLoginOptions): Promise<void>;
  getTokenSilently(o?: GetTokenSilentlyOptions): Promise<string | undefined>;
  getTokenWithPopup(o?: GetTokenWithPopupOptions): Promise<string | undefined>;
  logout(o?: LogoutOptions): void;
}
interface Auth0ProviderOptions {
  children: React.ReactElement;
  onRedirectCallback?(result: RedirectLoginResult, verifyEmail?: string): void;
}

const DEFAULT_REDIRECT_CALLBACK = (): void =>
  window.history.replaceState({}, document.title, window.location.pathname);

export const Auth0Context = React.createContext<Auth0Context | null>(null);
export const useAuth0 = (): Auth0Context => useContext(Auth0Context)!;
export const Auth0Provider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  handleAuthentication,
  handleSignup,
  ...initOptions
}: Auth0ProviderOptions & Auth0ClientOptions): any => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState();
  const [auth0Client, setAuth0] = useState<Auth0Client>();
  const [loading, setLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const initAuth0 = async (): Promise<void> => {
      try {
        const auth0FromHook = await createAuth0Client(initOptions);
        setAuth0(auth0FromHook);

        if (
          window.location.search.includes('error=unauthorized') &&
          window.location.search.includes('error_description=email_not_verified')
        ) {
          const search = new URLSearchParams(window.location.search);
          const errorDescription: string | null = search.get('error_description');
          if (errorDescription) {
            onRedirectCallback({}, errorDescription.split(':')[1]);
          }
        }

        if (window.location.search.includes('code=')) {
          const { appState } = await auth0FromHook.handleRedirectCallback();
          onRedirectCallback(appState);
        }

        const isAuthenticated = await auth0FromHook.isAuthenticated();
        setIsAuthenticated(isAuthenticated);
        if (isAuthenticated) {
          const user = await auth0FromHook.getUser();
          const token = await auth0FromHook.getTokenSilently();
          if (user) {
            const apiUri = process.env.REACT_APP_API_URI || 'http://localhost:5000';
            try {
              await fetch(`${apiUri}/api/login`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
                method: 'POST',
              });
              setUser(user);
            } catch (e) {}
          }
        }

        setLoading(false);
      } catch (e) {
        if (e.error === 'unauthorized' && e['error_description'].indexOf('email_not_verified:') > -1) {
          onRedirectCallback({}, e['error_description'].split(':')[1]);
        }
        setLoading(false);
      }
    };
    initAuth0();
    // eslint-disable-next-line
  }, []);

  const loginWithPopup = async (o: PopupLoginOptions): Promise<void> => {
    setPopupOpen(true);
    try {
      await auth0Client!.loginWithPopup(o);
    } catch (error) {
    } finally {
      setPopupOpen(false);
    }
    const user = await auth0Client!.getUser();

    setUser(user);
    setIsAuthenticated(true);
  };

  const handleRedirectCallback = async (): Promise<any> => {
    setLoading(true);
    const result = await auth0Client!.handleRedirectCallback();
    const user = await auth0Client!.getUser();

    setLoading(false);
    setIsAuthenticated(true);
    setUser(user);
    return result;
  };

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        getIdTokenClaims: (o: getIdTokenClaimsOptions | undefined) => auth0Client!.getIdTokenClaims(o),
        loginWithRedirect: (o: RedirectLoginOptions) => auth0Client!.loginWithRedirect(o),
        getTokenSilently: (o: GetTokenSilentlyOptions | undefined) => auth0Client!.getTokenSilently(o),
        getTokenWithPopup: (o: GetTokenWithPopupOptions | undefined) => auth0Client!.getTokenWithPopup(o),
        logout: (o: LogoutOptions | undefined) => auth0Client!.logout(o),
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};
