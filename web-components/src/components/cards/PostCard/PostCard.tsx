import React from 'react';
import { Box, Button, Grid } from '@mui/material';

import { defaultFontFamily } from '../../../theme/muiTheme';
import VerifiedIcon from '../../icons/VerifiedIcon';
import WhitepaperIcon from '../../icons/WhitepaperIcon';
import { Image, OptimizeImageProps } from '../../image';
import { Body, Subtitle } from '../../typography';
import UserInfo, { User } from '../../user/UserInfo';
import Card from '../Card';
import PrivateBadge from './PostCard.PrivateBadge';
import usePostCardStyles from './PostCard.styles';
import ActionButton from './PostCardActionButton';

interface PostCardProps extends OptimizeImageProps {
  title: string;
  description: string;
  imgSrc?: string;
  author: User;
  signers?: Array<User>;
  privacyLabel?: string;
  isAdmin?: boolean;
  numberOfFiles?: number;
  handleClickFile?: (ev: React.MouseEvent) => void;
  handleClickShare?: (ev: React.MouseEvent) => void;
}

export default function PostCard({
  title,
  description,
  imgSrc,
  imageStorageBaseUrl,
  apiServerUrl,
  author,
  signers,
  privacyLabel,
  isAdmin,
  numberOfFiles,
  handleClickFile,
  handleClickShare,
}: PostCardProps): JSX.Element {
  const { classes } = usePostCardStyles();

  const hasImageBlock = !!imgSrc;

  return (
    <Card className={classes.root} sx={{ p: [4, 8] }} borderRadius="10px">
      <ActionButton isAdmin={isAdmin} onClickShare={handleClickShare} />
      {!hasImageBlock && privacyLabel && (
        <PrivateBadge hasImageBlock={hasImageBlock} label={privacyLabel} />
      )}
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
          <Subtitle size="xl" mb={2.75}>
            {title}
          </Subtitle>
          <UserInfo
            size="lg"
            fontFamily={defaultFontFamily}
            user={author}
            classNames={{
              info: 'ml-10',
              title: 'text-sm',
              timestamp: 'text-xs',
            }}
          />
          <Box sx={{ paddingInlineEnd: 2, paddingBlockStart: 4.5 }}>
            <Body size="lg" sx={{ pb: 1.5 }} className={classes.description}>
              {description}
            </Body>
          </Box>
          {signers && signers.length > 0 && (
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 3.5 }}>
              <VerifiedIcon color="white" hasFill />
              <Body
                size="xs"
                mobileSize="xs"
                sx={{
                  whiteSpace: 'nowrap',
                  ml: 1,
                  fontStyle: 'italic',
                  fontWeight: 500,
                }}
              >
                Signed by
              </Body>
              {signers.map((signer, i) => (
                <UserInfo
                  key={`${signer.timestamp}-${i}`}
                  fontFamily={defaultFontFamily}
                  user={signer}
                  size="xs"
                  classNames={{
                    info: 'ml-3',
                    title: 'text-xs font-semibold',
                  }}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    ml: 2,
                    width: 'inherit',
                  }}
                  nameHasPadding={false}
                />
              ))}
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
              {hasImageBlock && privacyLabel && (
                <PrivateBadge
                  hasImageBlock={hasImageBlock}
                  label={privacyLabel}
                />
              )}
              {imgSrc && (
                <Image
                  className={classes.image}
                  src={imgSrc}
                  alt={imgSrc}
                  imageStorageBaseUrl={imageStorageBaseUrl}
                  apiServerUrl={apiServerUrl}
                />
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
