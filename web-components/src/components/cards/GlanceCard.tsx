import React from 'react';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';
import { Box, Grid } from '@mui/material';

import Card from './Card';
import { BodyText, ButtonText } from '../typography';
import StaticMap from '../map/StaticMap';
import { Image, OptimizeImageProps } from '../image';

interface GlanceCardProps extends OptimizeImageProps {
  title?: string;
  text: string[];
  imgSrc?: string;
  geojson?: any;
  isGISFile?: Boolean;
  mapboxToken?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.up('sm')]: {
      border: 'none',
    },
  },
  image: {
    objectFit: 'cover',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      height: '100%',
    },
    [theme.breakpoints.down('sm')]: {
      height: theme.spacing(51),
    },
  },
}));

export default function GlanceCard({
  title = 'At a glance',
  text,
  imgSrc,
  imageStorageBaseUrl,
  apiServerUrl,
  geojson,
  isGISFile,
  mapboxToken,
}: GlanceCardProps): JSX.Element {
  const classes = useStyles({});

  return (
    <Card className={classes.root}>
      <Grid
        container
        sx={{ flexWrap: ['wrap-reverse', 'nowrap'], py: [6, 0], px: [4.5, 0] }}
      >
        <Grid xs={12} sm={5} item>
          <Box
            sx={theme => ({
              height: theme.spacing(49.25),
              border: `1px solid ${theme.palette.grey[100]}`,
              borderRadius: '5px',
              overflow: 'hidden',
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
          </Box>
        </Grid>
        <Grid xs={12} sm={7} item sx={{ pb: [4.5, 0], pl: [0, 8.25] }}>
          <ButtonText mb={2.75}>{title}</ButtonText>
          <Box
            component="ul"
            sx={{ m: 0, listStyle: 'none', paddingInlineStart: 2 }}
          >
            {text.map((p, i) => (
              <BodyText
                key={i}
                size="lg"
                mobileSize="sm"
                sx={{
                  pb: 1.5,
                  '& li': {
                    position: 'relative',
                    paddingInlineStart: 2,
                  },
                  '& li::before': {
                    position: 'absolute',
                    content: "'\\2022'",
                    fontSize: '0.75rem',
                    color: 'secondary.main',
                    display: 'inline-block',
                    width: '1rem',
                    ml: '-1rem',
                    top: 0,
                  },
                }}
              >
                <li>{p}</li>
              </BodyText>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}
