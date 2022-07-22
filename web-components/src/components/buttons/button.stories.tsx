import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Box } from '@mui/material';

import * as React from 'react';
import OutlinedButton from './OutlinedButton';
import PrevNextButton from './PrevNextButton';
import ContainedButton, { ContainedColorVariant } from './ContainedButton';
import { TableActionButtons } from './TableActionButtons';
import { ExpandButton } from './ExpandButton';
import { TextButton } from './TextButton';
import { FlexCol } from '../box';
import { EditButton } from './EditButton';

export default {
  title: 'Buttons',
  component: OutlinedButton,
};

export const outlinedButton = (): JSX.Element => (
  <OutlinedButton startIcon={<ArrowDownwardIcon />}>read more</OutlinedButton>
);

export const containedButton = (): JSX.Element => {
  const colorVariants: ContainedColorVariant[] = [
    'secondary',
    'gradientBlueGreen',
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      {colorVariants.map(colorVariant => (
        <Box
          key={colorVariant}
          sx={{ mr: '8px', display: 'flex', flexDirection: 'column' }}
        >
          <ContainedButton colorVariant={colorVariant} sx={{ mb: '8px' }}>
            Contained
          </ContainedButton>
          <ContainedButton colorVariant={colorVariant} disabled>
            Disabled
          </ContainedButton>
        </Box>
      ))}
    </Box>
  );
};

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

export const textButton = (): JSX.Element => (
  <FlexCol sx={{ alignItems: 'flex-start' }}>
    <TextButton textSize="lg">Text button lg</TextButton>
    <TextButton textSize="md">Text button md</TextButton>
    <TextButton textSize="sm">Text button sm</TextButton>
    <TextButton textSize="xs">Text button xs</TextButton>
    <TextButton sx={{ color: 'red', py: [10] }}>
      Text button custom styles
    </TextButton>
  </FlexCol>
);

export const editButton = () => <EditButton onClick={() => {}} />;
