import * as React from 'react';
import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import PlayButton from 'web-components/lib/components/buttons/PlayButton';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

export default {
  title: 'Components|Button',
  component: OutlinedButton,
};

export const outlinedButton = (): JSX.Element => (
  <OutlinedButton text="read more" startIcon={<ArrowDownwardIcon />} />
);
