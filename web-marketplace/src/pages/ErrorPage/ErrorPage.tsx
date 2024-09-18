import { useRouteError } from 'react-router-dom';
import { useLingui } from '@lingui/react';

import ErrorView from 'web-components/src/components/views/ErrorView';

import {
  ERROR_HELP_TEXT,
  ERROR_TITLE,
  HOMEPAGE_BUTTON_TEXT,
} from './ErrorPage.contants';

import UnhappyBee from 'assets/unhappy-bee.png';

const ErrorPage = (): JSX.Element => {
  const error = useRouteError() as Error;
  const { _ } = useLingui();

  return (
    <ErrorView
      img={<img alt="error" src={UnhappyBee} />}
      home={import.meta.env.VITE_WEBSITE_URL}
      msg={error.message || JSON.stringify(error)}
      title={_(ERROR_TITLE)}
      bodyText={_(ERROR_HELP_TEXT)}
      buttonText={_(HOMEPAGE_BUTTON_TEXT)}
    />
  );
};

export { ErrorPage };
