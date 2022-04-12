import React from 'react';

import { Loading } from 'web-components/lib/components/loading';

export default {
  title: 'Loading',
  component: Loading,
};

export const loadingSpinner = (): JSX.Element => <Loading />;
