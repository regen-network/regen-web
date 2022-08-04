import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Box } from '@mui/material';

import { Flex, FlexCol } from '../box';
import ContainedButton from './ContainedButton';
import { EditButton } from './EditButton';
import { ExpandButton } from './ExpandButton';
import OutlinedButton from './OutlinedButton';
import PrevNextButton from './PrevNextButton';
import { TableActionButtons } from './TableActionButtons';
import { TextButton } from './TextButton';

export default {
  title: 'Buttons',
  component: OutlinedButton,
};

export const outlinedButton = (): JSX.Element => (
  <Flex sx={{ gap: 4 }}>
    <OutlinedButton startIcon={<ArrowDownwardIcon />}>read more</OutlinedButton>
    <OutlinedButton disabled startIcon={<ArrowDownwardIcon />}>
      disabled
    </OutlinedButton>
  </Flex>
);

export const containedButton = (): JSX.Element => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ mr: '8px', display: 'flex', flexDirection: 'column' }}>
        <ContainedButton sx={{ mb: '8px' }}>Contained</ContainedButton>
        <ContainedButton disabled>Disabled</ContainedButton>
      </Box>
    </Box>
  );
};

export const combined = (): JSX.Element => (
  <Box>
    <ContainedButton>Contained</ContainedButton>
    <OutlinedButton>Outlined</OutlinedButton>
  </Box>
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
