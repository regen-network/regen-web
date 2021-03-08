import * as React from 'react';
import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import PrevNextButton from 'web-components/lib/components/buttons/PrevNextButton';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

export default {
  title: 'Components|Buttons',
  component: OutlinedButton,
  parameters: {
    fileName: __filename,
  },
};

export const outlinedButton = (): JSX.Element => (
  <OutlinedButton startIcon={<ArrowDownwardIcon />}>read more</OutlinedButton>
);

export const nextButton = (): JSX.Element => <PrevNextButton direction="next" />;

export const prevButton = (): JSX.Element => <PrevNextButton direction="prev" />;
