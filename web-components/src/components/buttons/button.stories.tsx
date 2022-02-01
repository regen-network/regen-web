import * as React from 'react';
import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import PrevNextButton from 'web-components/lib/components/buttons/PrevNextButton';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export default {
  title: 'Buttons',
  component: OutlinedButton,
};

export const outlinedButton = (): JSX.Element => (
  <OutlinedButton startIcon={<ArrowDownwardIcon />}>read more</OutlinedButton>
);

export const containedButton: React.FC = () => (
  <ContainedButton>Contained</ContainedButton>
);

export const nextButton = (): JSX.Element => (
  <PrevNextButton direction="next" />
);

export const prevButton = (): JSX.Element => (
  <PrevNextButton direction="prev" />
);
