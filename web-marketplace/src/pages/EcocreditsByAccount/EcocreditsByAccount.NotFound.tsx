import { Link } from 'react-router-dom';
import { Box, SxProps } from '@mui/material';

import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import { Title } from 'web-components/lib/components/typography';
import { Theme } from 'web-components/lib/theme/muiTheme';
import ProfileNotFoundIcon from 'web-components/src/components/icons/ProfileNotFound';

import {
  PROFILE_NOT_FOUND_BUTTON,
  PROFILE_NOT_FOUND_MESSAGE,
} from './EcocreditsByAccount.constants';

export interface Props {
  sx?: SxProps<Theme>;
}

const ProfileNotFound = ({ sx = [] }: Props): JSX.Element => (
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
      {PROFILE_NOT_FOUND_MESSAGE}
    </Title>
    <Box>
      <Link to="/">
        <ContainedButton>{PROFILE_NOT_FOUND_BUTTON}</ContainedButton>
      </Link>
    </Box>
  </Box>
);

export { ProfileNotFound };
