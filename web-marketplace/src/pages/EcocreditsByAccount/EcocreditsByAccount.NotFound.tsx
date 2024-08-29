import { Link } from 'react-router-dom';
import { useLingui } from '@lingui/react';
import { Box, SxProps } from '@mui/material';

import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import ProfileNotFoundIcon from 'web-components/src/components/icons/ProfileNotFound';
import { Title } from 'web-components/src/components/typography';
import { Theme } from 'web-components/src/theme/muiTheme';

import {
  PROFILE_NOT_FOUND_BUTTON,
  PROFILE_NOT_FOUND_MESSAGE,
} from './EcocreditsByAccount.constants';

export interface Props {
  sx?: SxProps<Theme>;
}

const ProfileNotFound = ({ sx = [] }: Props): JSX.Element => {
  const { _ } = useLingui();

  return (
    <Box
      sx={[
        {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          backgroundColor: 'primary.main',
          textAlign: 'center',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box sx={{ mb: 2.5 }}>
        <ProfileNotFoundIcon sx={{ color: '#8F8F8F', fontSize: 100 }} />
      </Box>
      <Title variant="h4" mobileVariant="h5" as="p" sx={{ mb: 6.25 }}>
        {_(PROFILE_NOT_FOUND_MESSAGE)}
      </Title>
      <Box>
        <Link to="/">
          <ContainedButton>{_(PROFILE_NOT_FOUND_BUTTON)}</ContainedButton>
        </Link>
      </Box>
    </Box>
  );
};

export { ProfileNotFound };
