'use client';

import { useLingui } from '@lingui/react';
import isNetworkError from 'is-network-error';
import {
  ERROR_HELP_TEXT,
  ERROR_TITLE,
  HOMEPAGE_BUTTON_TEXT,
} from 'legacy-pages/ErrorPage/ErrorPage.contants';
import { normalizeError } from 'legacy-pages/ErrorPage/ErrorPage.utils';

import ErrorView from 'web-components/src/components/views/ErrorView';

import unhappyBee from '../../public/png/unhappy-bee.png';

export default function Error({ error }: { error: Error }) {
  const { _ } = useLingui();

  const normalizedError = normalizeError(error);

  return (
    <ErrorView
      home={process.env.NEXT_PUBLIC_WEBSITE_URL}
      msg={normalizedError.message}
      title={_(ERROR_TITLE)}
      bodyText={_(ERROR_HELP_TEXT)}
      buttonText={_(HOMEPAGE_BUTTON_TEXT)}
      isNetworkError={isNetworkError(normalizedError)}
      imgSrc={unhappyBee}
    />
  );
}
