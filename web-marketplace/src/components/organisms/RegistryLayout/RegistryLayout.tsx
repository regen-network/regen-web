import { Outlet, ScrollRestoration } from 'react-router-dom';

export const RegistryLayout = () => {
  return (
    <>
      <ScrollRestoration
        getKey={(location, matches) => {
          const profileMatch = matches.find(match =>
            match.pathname.startsWith('/profiles/'),
          );
          return profileMatch ? profileMatch.pathname : location.key;
        }}
      />
      <Outlet />
    </>
  );
};
