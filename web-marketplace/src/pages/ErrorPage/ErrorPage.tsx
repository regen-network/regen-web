import { useRouteError } from 'react-router-dom';
import { useLingui } from '@lingui/react';

import { SadBeeIcon } from 'web-components/src/components/icons/SadBeeIcon';
import ErrorView from 'web-components/src/components/views/ErrorView';

import {
  ERROR_HELP_TEXT,
  ERROR_TITLE,
  HOMEPAGE_BUTTON_TEXT,
} from './ErrorPage.contants';

import UnhappyBee from 'assets/unhappy-bee.png';

type ErrorPageProps = {
  importError?: Error;
};

const ErrorPage = ({ importError }: ErrorPageProps): JSX.Element => {
  const routeError = useRouteError() as Error;
  const { _ } = useLingui();

  const displayedError = importError || routeError;

  return (
    <ErrorView
      img={importError ? <SadBeeIcon /> : <img alt="error" src={UnhappyBee} />}
      home={import.meta.env.VITE_WEBSITE_URL}
      msg={displayedError?.message || JSON.stringify(displayedError)}
      title={_(ERROR_TITLE)}
      bodyText={_(ERROR_HELP_TEXT)}
      buttonText={_(HOMEPAGE_BUTTON_TEXT)}
    />
  );
};

export { ErrorPage };
