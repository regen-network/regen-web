import { Box, SxProps } from '@mui/system';

import { LinkComponentType } from 'src/types/shared/linkComponentType';

import { Flex } from '../../../components/box';
import { Body } from '../../../components/typography';
import { Theme } from '../../../theme/muiTheme';
import { sxToArray } from '../../../utils/mui/sxToArray';
import { ProfileVariantIconMapping } from './ProfileHeader.constants';
import { ProfileInfos, ProfileVariant } from './ProfileHeader.types';

type Props = {
  variant: ProfileVariant;
  LinkComponent: LinkComponentType;
  sx?: SxProps<Theme>;
} & ProfileInfos;

export const ProfileHeaderInfos = ({
  addressLink,
  description,
  variant,
  LinkComponent,
  sx = [],
}: Props) => (
  <Flex
    flexDirection="column"
    alignItems={{ xs: 'center', sm: 'flex-start' }}
    justifyContent={{ xs: 'center', sm: 'flex-start' }}
    textAlign={{ xs: 'center', sm: 'left' }}
    width="100%"
    sx={[...sxToArray(sx)]}
  >
    <Body
      size="lg"
      sx={{
        display: 'flex',
        mb: { xs: 1.5, sm: 3 },
        color: 'primary.light',
      }}
    >
      <Box sx={{ fontSize: 24, mr: 1, color: 'info.main' }}>
        {ProfileVariantIconMapping[variant]}
      </Box>
      <LinkComponent
        href={addressLink.href}
        sx={{ color: 'secondary.main', fontWeight: 700 }}
      >
        {addressLink.text}
      </LinkComponent>
    </Body>
    <Body size="md" sx={{ px: { xs: 3.75, sm: 0 } }}>
      {description}
    </Body>
  </Flex>
);
