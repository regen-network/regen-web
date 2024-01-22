import { Box, Grid } from '@mui/material';

import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';
import { Body, Title } from 'web-components/src/components/typography';

import { Link } from 'components/atoms';

import {
  CREATE_OFFCHAIN_PROJECT_BUTTON,
  CREATE_OFFCHAIN_PROJECT_DESCRIPTION,
  CREATE_OFFCHAIN_PROJECT_HREF,
  CREATE_OFFCHAIN_PROJECT_LINK,
  CREATE_OFFCHAIN_PROJECT_TITLE,
} from './ChooseCreditClass.config';

type Props = {
  onClick: () => void;
};

export const CreateOffchainProjectCard = ({ onClick }: Props) => {
  return (
    <Grid item xs={12} sm={6}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          textAlign: 'center',
          borderRadius: '10px',
          border: '1px solid',
          borderColor: 'info.light',
          backgroundColor: 'info.light',
          py: 20.5,
          px: 7.25,
        }}
      >
        <Title variant="h4" sx={{ mb: 2.5 }}>
          {CREATE_OFFCHAIN_PROJECT_TITLE}
        </Title>
        <Body sx={{ mb: 2.5 }}>
          {CREATE_OFFCHAIN_PROJECT_DESCRIPTION}{' '}
          <Link href={CREATE_OFFCHAIN_PROJECT_HREF}>
            {CREATE_OFFCHAIN_PROJECT_LINK}
          </Link>
        </Body>
        <OutlinedButton size="small" onClick={onClick}>
          {CREATE_OFFCHAIN_PROJECT_BUTTON}
        </OutlinedButton>
      </Box>
    </Grid>
  );
};
