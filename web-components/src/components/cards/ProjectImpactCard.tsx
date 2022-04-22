import React from 'react';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';
import cx from 'clsx';

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

interface StyleProps {
  imgSrc: string;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  background: props => ({
    backgroundImage: `url(${props.imgSrc})`,
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
  }),
  text: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(5),
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(4),
    },
  },
}));

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
  const classes = useStyles({ imgSrc });

  return (
    <Card className={cx(classes.root, className)}>
      <div className={classes.background}>
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
            position: 'absolute',
            left: [4, 5],
            bottom: [5, 6],
          }}
        >
          {name}
        </Title>
      </div>
      <div className={classes.text}>
        <Body size="sm" mobileSize="sm" sx={{ flex: '1 0 auto' }}>
          {description}
        </Body>
        {standard && (
          <Image
            src={standard}
            alt={standard}
            imageStorageBaseUrl={imageStorageBaseUrl}
            apiServerUrl={apiServerUrl}
            width={140}
          />
        )}
      </div>
    </Card>
  );
}
