import { useRouteError } from 'react-router-dom';
import { useLingui } from '@lingui/react';
import isNetworkError from 'is-network-error';

import { SadBeeIcon } from 'web-components/src/components/icons/SadBeeIcon';
import ErrorView from 'web-components/src/components/views/ErrorView';

import {
  ERROR_HELP_TEXT,
  ERROR_TITLE,
  HOMEPAGE_BUTTON_TEXT,
} from './ErrorPage.contants';
import { normalizeError } from './ErrorPage.utils';

import UnhappyBee from 'assets/unhappy-bee.png';

type ErrorPageProps = {
  importError?: Error | string;
};

const ErrorPage = ({ importError }: ErrorPageProps): JSX.Element => {
  const routeError = useRouteError() as Error;
  const { _ } = useLingui();

  const error = normalizeError(importError || routeError);

  return (
    <ErrorView
      img={
        isNetworkError(error) ? (
          <SadBeeIcon />
        ) : (
          <img alt="error" src={UnhappyBee} />
        )
      }
      home={process.env.NEXT_PUBLIC_WEBSITE_URL}
      msg={error.message}
      title={_(ERROR_TITLE)}
      bodyText={_(ERROR_HELP_TEXT)}
      buttonText={_(HOMEPAGE_BUTTON_TEXT)}
    />
  );
};

export { ErrorPage };
