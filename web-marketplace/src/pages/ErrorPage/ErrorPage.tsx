import { useRouteError } from 'react-router-dom';

import ErrorView from 'web-components/src/components/views/ErrorView';

import UnhappyBee from 'assets/unhappy-bee.png';

const ErrorPage = (): JSX.Element => {
  const error = useRouteError() as Error;

  return (
    <ErrorView
      img={<img alt="error" src={UnhappyBee} />}
      home={import.meta.env.VITE_WEBSITE_URL}
      msg={error.message || JSON.stringify(error)}
    />
  );
};

export { ErrorPage };
