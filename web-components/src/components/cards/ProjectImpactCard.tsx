import React from 'react';
import { Box } from '@mui/material';

import Card from './Card';
import { Body, Label, Title } from '../typography';
import { Image } from '../image';

export interface ProjectImpactCardProps {
  className?: string;
  name?: string | null;
  description: JSX.Element | string;
  imgSrc: string;
  monitored?: boolean;
  standard?: string;
  apiServerUrl?: string;
  imageStorageBaseUrl?: string;
}

export default function ProjectImpactCard({
  name,
  description,
  imgSrc,
  monitored = false,
  className,
  standard,
  imageStorageBaseUrl,
  apiServerUrl,
}: ProjectImpactCardProps): JSX.Element {
  return (
    <Card
      className={className}
      borderRadius="10px"
      borderColor="grey.100"
      sx={{ display: 'flex', flexDirection: 'column' }}
    >
      <Box
        sx={theme => ({
          display: 'flex',
          backgroundImage: `url(${imgSrc})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          textAlign: 'center',
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
          flexGrow: 1,
          p: [4, 5],
        }}
      >
        <Body
          as="div"
          size="sm"
          mobileSize="sm"
          sx={{ flex: '1 0 auto', pb: 4 }}
        >
          {description}
        </Body>
        {standard && (
          <Box sx={{ py: [2] }}>
            <Image
              src={standard}
              alt={standard}
              imageStorageBaseUrl={imageStorageBaseUrl}
              apiServerUrl={apiServerUrl}
              width={140}
            />
          </Box>
        )}
      </Box>
    </Card>
  );
}
