import React, { createContext, ReactNode } from 'react';
import { AbsoluteCenter, theme } from '@chakra-ui/react';
import { Brightness1 } from '@mui/icons-material';
import { Box, Grid, IconButton } from '@mui/material';
import { DefaultTheme as Theme } from '@mui/styles';
import { makeStyles } from 'tss-react/mui';

import DocumentIcon from '../icons/DocumentIcon';
import ShareIcon from '../icons/ShareIcon';
import VerifiedIcon from '../icons/VerifiedIcon';
// import { formatDate } from '../../utils/format';
import { Image, OptimizeImageProps } from '../image';
import StaticMap from '../map/StaticMap';
import { Body, Label, Subtitle } from '../typography';
import UserInfo, { User } from '../user/UserInfo';
import Card from './Card';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  return [
    date.toLocaleDateString('en-US', dateOptions),
    date.toLocaleTimeString('en-US', timeOptions),
  ].join(' | ');
};

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
}

const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.grey['200'],
  },
  image: {},
  chip: {},
  description: {
    lineClamp: 2,
    WebkitLineClamp: 2,
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
}));

const SignerName = ({ name }: { name: string }): JSX.Element => {
  return (
    <Body size="sm" sx={{ ml: 2, fontWeight: 800 }}>
      {name}
    </Body>
  );
};

const NameWithRoleAndTimestamp = ({
  name,
  authorRole,
  timestamp,
}: {
  name: string;
  authorRole?: string;
  timestamp: string;
}): JSX.Element => (
  <Box
    sx={{
      // mt: -2
      ml: 3,
    }}
  >
    <Box>
      <Subtitle size="sm" sx={{ display: 'inline' }}>
        {name}
      </Subtitle>
      <Box
        borderRadius={1}
        // className={classes.chip}
        sx={{
          px: 1.5,
          py: 0.5,
          ml: 2,
          backgroundColor: theme => theme.palette.grey['300'],
          display: 'inline-block',
          fontSize: '10px',
          color: theme => theme.palette.grey['500'],
          textTransform: 'uppercase',
          fontWeight: 800,
          letterSpacing: '1px',
        }}
      >
        {authorRole}
      </Box>
    </Box>
    <Box
      sx={theme => ({
        color: theme.palette.grey['700'],
        fontSize: '12px',
        mt: 1.5,
      })}
    >
      {formatDate(timestamp)}
    </Box>
  </Box>
);

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
}: PostCardProps): JSX.Element {
  const { classes } = useStyles();

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

  console.log({ signerWithNameRaw });

  return (
    <Card className={classes.root} sx={{ p: [4, 8] }} borderRadius="10px">
      <IconButton
        sx={{
          position: 'absolute',
          top: theme => [0, theme.spacing(3)],
          right: theme => [0, theme.spacing(3)],
          transform: 'translate(-50%, 50%)',
          zIndex: 1,
          borderRadius: theme => theme.spacing(5),
          backgroundColor: 'white',
          boxShadow: theme => theme.shadows[1],
          // height: '34px',
          // width: '34px',
        }}
      >
        <ShareIcon color="secondary" />
      </IconButton>
      <Grid
        container
        sx={{ flexWrap: ['wrap-reverse', 'nowrap'], position: 'relative' }}
      >
        {/* TODO: private indicator */}
        {/* TODO: share/edit button link */}

        <Grid xs={12} sm={7} item sx={{ pb: [4.5, 0], pr: [0, 2] }}>
          <Subtitle size="xl" mb={2.75}>
            {title}
          </Subtitle>

          {/* TODO: resolve size issue with UserInfo */}
          <UserInfo
            size="md"
            user={authorWithNameRaw}
            sx={{ display: 'flex', alignItems: 'center' }}
            nameHasPadding={false}
          />
          <Box sx={{ paddingInlineEnd: 2, paddingBlockStart: 4 }}>
            <Body
              size="lg"
              mobileSize="sm"
              sx={{ pb: 1.5 }}
              className={classes.description}
            >
              {description}
            </Body>
          </Box>
          {signerWithNameRaw && (
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
              <VerifiedIcon color="white" fontSize="medium" hasFill />
              <Body
                size="sm"
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
                // avatarSx={theme => ({
                //   // height: theme.spacing(1),
                //   // width: theme.spacing(1),
                //   height: '12px',
                //   width: '12px',
                // })}
              />
            </Box>
          )}
        </Grid>
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
              height: theme => ({ sm: '100%', xs: theme.spacing(49.25) }),
              border: `1px solid ${theme.palette.grey[100]}`,
              borderRadius: '10px',
              overflow: 'hidden',
              position: 'relative',
            })}
          >
            {geojson && isGISFile ? (
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
            {/* TODO: number of files indicator */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                transform: 'translate(-50%, -25%)',
              }}
            >
              <DocumentIcon
                sx={
                  {
                    // fileType="light"
                  }
                }
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}
