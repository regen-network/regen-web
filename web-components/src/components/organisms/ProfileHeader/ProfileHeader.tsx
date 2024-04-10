import { useState } from 'react';
import { Avatar, Box, Link, SxProps, useTheme } from '@mui/material';

import Banner from '../../../components/banner';
import { Flex } from '../../../components/box';
import EditIcon from '../../../components/icons/EditIcon';
import ShareIcon from '../../../components/icons/ShareIcon';
import InfoTooltip from '../../../components/tooltip/InfoTooltip';
import { Label, Title } from '../../../components/typography';
import { containerStyles } from '../../../styles/container';
import { Theme } from '../../../theme/muiTheme';
import { LinkComponentType } from '../../../types/shared/linkComponentType';
import copyTextToClipboard from '../../../utils/copy';
import {
  COPY_PROFILE,
  COPY_SUCCESS,
  EDIT_PROFILE,
  PROFILE_AVATAR_MARGIN_TOP_DESKTOP,
  PROFILE_AVATAR_MARGIN_TOP_MOBILE,
  PROFILE_AVATAR_MARGIN_TOP_TABLET,
  PROFILE_AVATAR_SIZE_DESKTOP,
  PROFILE_AVATAR_SIZE_MOBILE,
  PROFILE_AVATAR_SIZE_TABLET,
  PROFILE_BG_HEIGHT_DESKTOP,
  PROFILE_BG_HEIGHT_MOBILE,
} from './ProfileHeader.constants';
import { ProfileHeaderInfos } from './ProfileHeader.Infos';
import { ProfileInfos, ProfileVariant } from './ProfileHeader.types';

export interface Props {
  name: string;
  avatar: string;
  backgroundImage: string;
  variant: ProfileVariant;
  infos: ProfileInfos;
  editLink: string;
  profileLink: string;
  LinkComponent: LinkComponentType;
  sx?: SxProps<Theme>;
}

const ProfileHeader = ({
  name,
  avatar,
  backgroundImage,
  infos,
  variant,
  editLink,
  profileLink,
  LinkComponent,
  sx = [],
}: Props): JSX.Element => {
  const theme = useTheme();
  const [showProfileLinkSuccessBanner, setShowProfileLinkSuccessBanner] =
    useState(false);

  return (
    <Box
      sx={[
        {
          borderBottom: theme => `1px solid ${theme.palette.info.light}`,
          position: 'relative',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {showProfileLinkSuccessBanner && (
        <Banner
          text={COPY_SUCCESS}
          onClose={() => {
            setShowProfileLinkSuccessBanner(false);
          }}
        />
      )}
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: {
            xs: PROFILE_BG_HEIGHT_MOBILE,
            sm: PROFILE_BG_HEIGHT_DESKTOP,
          },
          '&:after': {
            content: '""',
            position: 'absolute',
            width: '100%',
            height: '100%',
            inset: 0,
            background: {
              xs: `linear-gradient(to bottom, ${theme.palette.primary.contrastText}, transparent)`,
              sm: `linear-gradient(to top, ${theme.palette.primary.contrastText}, transparent)`,
            },
            opacity: 0.2,
          },
        }}
      >
        <Box
          component="img"
          src={backgroundImage}
          alt="user profile background image"
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>
      <Flex
        flexDirection={{ xs: 'column', sm: 'row' }}
        justifyContent={{ xs: 'flex-start', sm: 'center' }}
        alignItems={{ xs: 'center', sm: 'flex-start' }}
        width="100%"
        height="100%"
        sx={{ ...containerStyles, px: { xs: 0, sm: 10 } }}
      >
        <Avatar
          src={avatar}
          alt="user profile avatar"
          sx={{
            mt: {
              xs: PROFILE_AVATAR_MARGIN_TOP_MOBILE,
              sm: PROFILE_AVATAR_MARGIN_TOP_TABLET,
              md: PROFILE_AVATAR_MARGIN_TOP_DESKTOP,
            },
            mb: { xs: 2.5 },
            border: theme => `5px solid ${theme.palette.grey[50]}`,
            mr: 4,
            width: {
              xs: PROFILE_AVATAR_SIZE_MOBILE,
              sm: PROFILE_AVATAR_SIZE_TABLET,
              md: PROFILE_AVATAR_SIZE_DESKTOP,
            },
            height: {
              xs: PROFILE_AVATAR_SIZE_MOBILE,
              sm: PROFILE_AVATAR_SIZE_TABLET,
              md: PROFILE_AVATAR_SIZE_DESKTOP,
            },
          }}
        />
        <Flex
          flexDirection="column"
          width="100%"
          mb={{ xs: 5, sm: 7.5 }}
          mt={{ xs: 0, sm: 68.25 }}
        >
          <Flex
            justifyContent={{
              xs: 'center',
              sm: 'space-between',
            }}
            alignItems="flex-end"
          >
            <Title
              variant="h3"
              mobileVariant="h4"
              sx={{
                color: { xs: 'main.contrastText', sm: 'primary.main' },
                mb: { xs: 1.375, sm: 2 },
                zIndex: 1,
                minHeight: { xs: 'auto', sm: 44.7 },
                flex: { sm: 2 },
              }}
            >
              {name}
            </Title>
            {editLink !== '' && (
              <LinkComponent href={editLink}>
                <Label
                  size="sm"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'primary.main',
                    position: { xs: 'absolute', sm: 'relative' },
                    top: { xs: 24, sm: 'auto' },
                    right: { right: 17, sm: 'auto' },
                    height: 18,
                    mb: 4.5,
                    mr: { xs: 10 },
                    ml: { sm: 3 },
                  }}
                >
                  <EditIcon
                    sx={{ fontSize: 17, mr: 2, color: 'primary.main' }}
                  />
                  {EDIT_PROFILE}
                </Label>
              </LinkComponent>
            )}
            {profileLink !== '' && (
              <InfoTooltip arrow placement="top" title={COPY_PROFILE}>
                <Link
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'primary.main',
                    position: { xs: 'absolute', sm: 'relative' },
                    top: { xs: 24, sm: 'auto' },
                    right: { right: 17, sm: 'auto' },
                    height: 18,
                    mb: 4.5,
                  }}
                  onClick={() => {
                    copyTextToClipboard(profileLink);
                    setShowProfileLinkSuccessBanner(true);
                  }}
                >
                  <ShareIcon
                    className="text-grey-0"
                    sx={{ ml: 2, cursor: 'pointer' }}
                  />
                </Link>
              </InfoTooltip>
            )}
          </Flex>
          <ProfileHeaderInfos
            {...infos}
            variant={variant}
            LinkComponent={LinkComponent}
            sx={{
              pt: { xs: 0, sm: 3.5 },
            }}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export { ProfileHeader };
