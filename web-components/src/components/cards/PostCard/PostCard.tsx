import React from 'react';
import { Box, Button, Grid } from '@mui/material';

import { LockIcon } from '../../icons/LockIcon';
import VerifiedIcon from '../../icons/VerifiedIcon';
import WhitepaperIcon from '../../icons/WhitepaperIcon';
import { Image, OptimizeImageProps } from '../../image';
import StaticMap from '../../map/StaticMap';
import { Body, Subtitle } from '../../typography';
import UserInfo, { User } from '../../user/UserInfo';
import Card from '../Card';
import NameWithRoleAndTimestamp from './PostCard.NameWithRoleAndTimestamp';
import SignerName from './PostCard.SignerName';
import usePostCardStyles from './PostCard.styles';
import ActionButton from './PostCardActionButton';

interface PostCardProps extends OptimizeImageProps {
  title: string;
  description: string;
  imgSrc: string;
  geojson?: any;
  isGISFile?: Boolean;
  mapboxToken?: string;
  author: User;
  authorRole?: string;
  signer?: User;
  timestamp: string;
  isPrivate?: boolean;
  isAdmin?: boolean;
  numberOfFiles?: number;
  handleClickFile?: (ev: React.MouseEvent) => void;
  adminMenuItems?: JSX.Element[];
  handleClickShare?: (ev: React.MouseEvent) => void;
}

export default function PostCard({
  title,
  description,
  imgSrc,
  geojson,
  isGISFile,
  mapboxToken,
  imageStorageBaseUrl,
  apiServerUrl,
  author,
  authorRole,
  signer,
  timestamp,
  isPrivate,
  isAdmin,
  numberOfFiles,
  handleClickFile,
  adminMenuItems,
  handleClickShare,
}: PostCardProps): JSX.Element {
  const { classes } = usePostCardStyles();

  const authorWithNameRaw: User = {
    ...author,
    nameRaw: (
      <NameWithRoleAndTimestamp
        name={author.name}
        authorRole={authorRole}
        timestamp={timestamp}
      />
    ),
  };

  const signerWithNameRaw: User | undefined = signer && {
    ...signer,
    nameRaw: <SignerName name={signer.name} />,
  };

  const hasImageBlock = imgSrc || (geojson && isGISFile);

  return (
    <Card className={classes.root} sx={{ p: [4, 8] }} borderRadius="10px">
      <ActionButton
        isAdmin={isAdmin}
        adminMenuItems={adminMenuItems}
        onClick={handleClickShare}
      />
      <Grid
        container
        sx={{ flexWrap: ['wrap-reverse', 'nowrap'], position: 'relative' }}
      >
        <Grid
          xs={12}
          sm={hasImageBlock ? 7 : 12}
          item
          sx={{ pb: [4.5, 0], pr: [0, 2] }}
        >
          <Subtitle size="lg" mb={2.75}>
            {title}
          </Subtitle>
          <UserInfo
            size="md"
            user={authorWithNameRaw}
            sx={{ display: 'flex', alignItems: 'center' }}
            nameHasPadding={false}
          />
          <Box sx={{ paddingInlineEnd: 2, paddingBlockStart: 4 }}>
            <Body size="md" sx={{ pb: 1.5 }} className={classes.description}>
              {description}
            </Body>
          </Box>
          {signerWithNameRaw && (
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
              <VerifiedIcon color="white" fontSize="medium" hasFill />
              <Body
                size="xs"
                mobileSize="xs"
                sx={{
                  whiteSpace: 'nowrap',
                  mx: 1,
                  fontStyle: 'italic',
                  fontWeight: 500,
                }}
              >
                Signed by
              </Body>
              <UserInfo
                user={signerWithNameRaw}
                size="xs"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  ml: 1,
                }}
                nameHasPadding={false}
              />
            </Box>
          )}
        </Grid>
        {hasImageBlock && (
          <Grid
            xs={12}
            sm={5}
            item
            sx={{
              mb: [5, 0],
            }}
          >
            <Box
              sx={theme => ({
                height: theme => ({
                  sm: theme.spacing(51),
                  xs: theme.spacing(49.25),
                }),
                border: `1px solid ${theme.palette.grey[100]}`,
                borderRadius: '10px',
                overflow: 'hidden',
                position: 'relative',
              })}
            >
              {isPrivate && (
                <Box
                  sx={{
                    borderRadius: 1,
                    backgroundColor: theme => theme.palette.error.dark,
                    position: 'absolute',
                    top: theme => theme.spacing(3),
                    left: theme => theme.spacing(3),
                    display: 'flex',
                    alignItems: 'center',
                    p: 1.5,
                  }}
                >
                  <LockIcon
                    sx={theme => ({
                      color: theme => theme.palette.primary.contrastText,
                      height: '18px',
                      width: '18px',
                    })}
                  />
                  <Subtitle size="sm" sx={{ pl: 1 }}>
                    Post is private
                  </Subtitle>
                </Box>
              )}
              {isPrivate && !isAdmin ? (
                <Box sx={{ backgroundColor: 'black', height: '100%' }}>
                  Post is Private
                </Box>
              ) : geojson && isGISFile ? (
                <StaticMap geojson={geojson} mapboxToken={mapboxToken} />
              ) : (
                imgSrc && (
                  <Image
                    className={classes.image}
                    src={imgSrc}
                    alt={imgSrc}
                    imageStorageBaseUrl={imageStorageBaseUrl}
                    apiServerUrl={apiServerUrl}
                  />
                )
              )}
              {numberOfFiles && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    transform: 'translate(-50%, -25%)',
                    display: 'flex',
                    alignItems: 'center',
                    color: theme => theme.palette.primary.main,
                    boxShadow: theme => theme.shadows[1],
                  }}
                >
                  <Button
                    onClick={handleClickFile}
                    sx={{
                      p: [0, 0],
                      border: 'none',
                      justifyContent: 'end',
                      minWidth: 0,
                    }}
                  >
                    <Subtitle
                      size="sm"
                      color="white"
                      sx={{ boxShadow: theme => theme.shadows[1] }}
                    >
                      {numberOfFiles}
                    </Subtitle>
                    <WhitepaperIcon className={classes.fileIcon} />
                  </Button>
                </Box>
              )}
            </Box>
          </Grid>
        )}
      </Grid>
    </Card>
  );
}
