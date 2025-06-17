import { useLingui } from '@lingui/react';

import NotFound from 'web-components/src/components/views/NotFoundView';

import {
  PAGE_NOT_FOUND_BODY,
  PAGE_NOT_FOUND_BUTTON,
  PAGE_NOT_FOUND_TITLE,
} from 'lib/constants/shared.constants';

const NotFoundPage = (): JSX.Element => {
  const { _ } = useLingui();

  return (
    <NotFound
      title={_(PAGE_NOT_FOUND_TITLE)}
      bodyText={_(PAGE_NOT_FOUND_BODY)}
      buttonChildren={PAGE_NOT_FOUND_BUTTON}
      home={process.env.NEXT_PUBLIC_WEBSITE_URL}
    />
  );
};

export { NotFoundPage };
