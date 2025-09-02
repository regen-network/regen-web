import { Box, SxProps } from '@mui/system';

import { Flex } from '../../../components/box';
import { Body } from '../../../components/typography';
import { Theme } from '../../../theme/muiTheme';
import { LinkComponentType } from '../../../types/shared/linkComponentType';
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
  socialsLinks,
  LinkComponent,
  sx = [],
}: Props) => {
  const showAddress = !!addressLink?.text;
  const showDescription = !!description?.trim();
  return (
    <Flex
      flexDirection={{ xs: 'column', sm: 'row' }}
      alignItems={{ xs: 'center', sm: 'flex-start' }}
      justifyContent={{ xs: 'center', sm: 'flex-start' }}
      textAlign={{ xs: 'center', sm: 'left' }}
      width="100%"
      sx={[...sxToArray(sx)]}
    >
      {(showAddress || showDescription) && (
        <Box
          sx={{
            width: '100%',
            mb: { xs: showAddress ? 1.25 : 0, sm: 0 },
          }}
        >
          {showAddress && (
            <Body
              size="lg"
              sx={{
                display: 'flex',
                justifyContent: { xs: 'center', sm: 'flex-start' },
                mb: { xs: 1.5, sm: 3 },
                color: 'primary.light',
                '& .MuiLink-root': {
                  color: 'primary.light',
                  fontWeight: 400,
                },
              }}
            >
              <Box sx={{ fontSize: 24, mr: 1, color: 'info.main' }}>
                {ProfileVariantIconMapping[variant]}
              </Box>
              <LinkComponent href={addressLink!.href}>
                {addressLink!.text}
              </LinkComponent>
            </Body>
          )}
          {showDescription && (
            <Body size="md" sx={{ px: { xs: 3.75, sm: 0 } }}>
              {description}
            </Body>
          )}
        </Box>
      )}
      <Flex sx={{ alignItems: 'center' }}>
        {socialsLinks?.map(({ href, icon }) => (
          <LinkComponent
            key={href}
            href={href}
            sx={{
              color: 'secondary.dark',
              '& .MuiSvgIcon-root': { fontSize: 40 },
              ':not(:last-child)': { mr: 2 },
            }}
          >
            {icon}
          </LinkComponent>
        ))}
      </Flex>
    </Flex>
  );
};
