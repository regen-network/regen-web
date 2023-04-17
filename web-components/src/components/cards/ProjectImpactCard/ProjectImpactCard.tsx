import React from 'react';
import { Box, Grid } from '@mui/material';

import { ImageType } from '../../../types/shared/imageType';
import { Image } from '../../image';
import { Body, Label, Title } from '../../typography';
import Card from '../Card';
import { useProjectImpactCardStyles } from './ProjectImpactCard.styles';

export interface ProjectImpactCardProps {
  className?: string;
  name?: string | null;
  description: JSX.Element | string;
  imgSrc: string;
  sdgs?: ImageType[];
  monitored?: boolean;
  standard?: string;
  apiServerUrl?: string;
  imageStorageBaseUrl?: string;
}

export default function ProjectImpactCard({
  name,
  description,
  imgSrc,
  sdgs = [],
  monitored = false,
  className,
  standard,
  imageStorageBaseUrl,
  apiServerUrl,
}: ProjectImpactCardProps): JSX.Element {
  const hasSdgs = sdgs.length > 0;
  const { classes } = useProjectImpactCardStyles();

  return (
    <Card
      className={className}
      borderRadius="10px"
      borderColor="grey.100"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: { xs: 291, sm: 367 },
      }}
    >
      <Box
        sx={theme => ({
          display: 'flex',
          backgroundImage: `url(${imgSrc})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          textAlign: 'left',
          position: 'relative',
          [theme.breakpoints.up('sm')]: {
            height: theme.spacing(59),
          },
          [theme.breakpoints.down('sm')]: {
            height: theme.spacing(50),
          },
        })}
      >
        <Label
          size="sm"
          sx={theme => ({
            position: 'absolute',
            top: theme.spacing(7.5),
            left: 0,
            backgroundColor: 'secondary.main',
            color: 'primary.main',
            borderRadius: '0px 2px 2px 0px',
            p: 3,
          })}
        >
          {monitored ? 'primary impact' : 'co-benefit'}
        </Label>
        <Title
          variant="h4"
          sx={{
            color: 'primary.main',
            alignSelf: 'flex-end',
            p: [4, 5],
          }}
        >
          {name}
        </Title>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flexGrow: 1,
          p: [4, 5],
        }}
      >
        <Body as="div" size="sm" mobileSize="sm" sx={{ pb: 4 }}>
          {description}
        </Body>
        <Box>
          {hasSdgs && (
            <Grid container spacing={5.625} sx={{ mb: 3.125, mt: -5 }}>
              {sdgs.map(sdg => (
                <Grid key={sdg.src} item>
                  <Box
                    component="img"
                    sx={{
                      width: { xs: 68, sm: 92 },
                      height: { xs: 68, sm: 92 },
                    }}
                    src={sdg.src}
                    alt={sdg.alt}
                  />
                </Grid>
              ))}
            </Grid>
          )}
          {standard && (
            <Box
              sx={{
                my: [2],
                height: 42,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Image
                src={standard}
                alt={standard}
                imageStorageBaseUrl={imageStorageBaseUrl}
                apiServerUrl={apiServerUrl}
                width={158}
                className={classes.image}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Card>
  );
}
