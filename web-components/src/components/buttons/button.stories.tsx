import * as React from 'react';
import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

export default {
  title: 'Components|Button',
  component: OutlinedButton,
};

export const outlinedButton = (): JSX.Element => (
  <OutlinedButton startIcon={<ArrowDownwardIcon />}>read more</OutlinedButton>
);
