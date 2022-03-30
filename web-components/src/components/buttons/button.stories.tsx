import * as React from 'react';
import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import PrevNextButton from 'web-components/lib/components/buttons/PrevNextButton';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import { TableActionButtons } from 'web-components/lib/components/buttons/TableActionButtons';
import { ExpandButton } from 'web-components/lib/components/buttons/ExpandButton';
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

export const tableActionButtons = (): JSX.Element => (
  <>
    <h3>(Adjust size to see responsive styles)</h3>
    <TableActionButtons
      buttons={[
        { label: 'one', onClick: () => alert('clicked one') },
        { label: 'two', onClick: () => alert('clicked two') },
        { label: 'three', onClick: () => alert('clicked three') },
      ]}
    />
  </>
);

export const expandButton = (): JSX.Element => (
  <>
    <ExpandButton onClick={() => {}} expanded={false} />
    <ExpandButton onClick={() => {}} expanded={true} />
  </>
);
