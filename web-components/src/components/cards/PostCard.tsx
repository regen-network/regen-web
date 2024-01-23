import React, { createContext, ReactNode } from 'react';
import { Box, Grid, IconButton } from '@mui/material';
import { DefaultTheme as Theme } from '@mui/styles';
import { makeStyles } from 'tss-react/mui';

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
}));

const NameWithRoleAndTimestamp = ({
  name,
  authorRole,
  timestamp,
}: {
  name: string;
  authorRole?: string;
  timestamp: string;
}): JSX.Element => (
  <Box sx={{ mt: -2 }}>
    <Box>
      <Subtitle sx={{ display: 'inline' }}>{name}</Subtitle>
      <Box
        borderRadius={1}
        // className={classes.chip}
        sx={{
          px: 1.5,
          py: 0.5,
          ml: 2,
          backgroundColor: theme => theme.palette.grey['300'],
          display: 'inline-block',
          fontSize: '12px',
          color: theme => theme.palette.grey['500'],
          textTransform: 'uppercase',
        }}
      >
        {authorRole}
      </Box>
    </Box>
    <Box sx={theme => ({ color: theme.palette.grey['700'] })}>
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
    nameRaw: (
      <NameWithRoleAndTimestamp
        name={author.name}
        authorRole={authorRole}
        timestamp={timestamp}
      />
    ),
    ...author,
  };

  return (
    <Card className={classes.root} sx={{ p: 6 }} borderRadius="10px">
      <Grid
        container
        sx={{ flexWrap: ['wrap-reverse', 'nowrap'], position: 'relative' }}
      >
        {/* TODO: share/edit button link */}
        <IconButton
          sx={{
            position: 'absolute',
            top: theme => theme.spacing(-5),
            right: theme => theme.spacing(-5),
            zIndex: 1,
            borderRadius: theme => theme.spacing(5),
            backgroundColor: 'white',
            boxShadow: theme => theme.shadows[1],
          }}
        >
          <ShareIcon color="secondary" />
        </IconButton>
        <Grid xs={12} sm={7} item sx={{ pb: [4.5, 0], pr: [0, 2] }}>
          <Subtitle size="xl" mb={2.75}>
            {title}
          </Subtitle>

          {/* TODO: resolve size issue with UserInfo */}
          <UserInfo
            // size="big"
            user={authorWithNameRaw}
            sx={{ display: 'flex', alignItems: 'center' }}
          />
          <Box sx={{ paddingInlineEnd: 2, paddingBlockStart: 4 }}>
            <Body size="lg" mobileSize="sm" sx={{ pb: 1.5 }}>
              {description}
            </Body>
          </Box>
          {signer && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <VerifiedIcon color="white" fontSize="medium" hasFill />
              <Body sx={{ whiteSpace: 'nowrap', mx: 2, fontStyle: 'italic' }}>
                Signed by
              </Body>
              <UserInfo
                user={signer}
                // size="small"
                sx={{ display: 'flex', alignItems: 'center' }}
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
        <Grid xs={12} sm={5} item>
          <Box
            sx={theme => ({
              height: theme.spacing(49.25),
              border: `1px solid ${theme.palette.grey[100]}`,
              borderRadius: '5px',
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
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}
