import React from 'react';
import { Box, CardContent } from '@mui/material';
import { Theme } from '@mui/material/styles';
import ReactHtmlParser from 'html-react-parser';
import { makeStyles } from 'tss-react/mui';

import { getLinkTarget } from '../../utils/linkTarget';
import OutlinedButton from '../buttons/OutlinedButton';
import { Image } from '../image';
import { Title } from '../typography';
import Card from './Card';

export interface ImageLeftCardProps {
  className?: string;
  classes?: {
    root: string;
  };
  children?: JSX.Element;
  imageSrc: string;
  imageAlt?: string;
  apiServerUrl?: string;
  imageStorageBaseUrl?: string;
  title: string;
  buttonText: string;
  buttonUrl: string;
  buttonIcon?: JSX.Element;
  buttonBlankTarget?: boolean;
}

const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    display: 'flex',
    borderRadius: 9,
    [theme.breakpoints.down('sm')]: {
      padding: 0,
      flexDirection: 'column',
    },
    [theme.breakpoints.up('sm')]: {
      maxWidth: theme.spacing(180),
      padding: 0,
    },
  },
  image: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: theme.spacing(44),
      padding: 0,
    },
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(70),
      height: theme.spacing(72),
    },
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'baseline',
    padding: theme.spacing(6.75),
  },
  button: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(74),
    },
  },
}));

function ImageLeftCard({
  className,
  classes,
  children,
  imageSrc,
  imageAlt,
  apiServerUrl,
  imageStorageBaseUrl,
  title,
  buttonText,
  buttonUrl,
  buttonIcon,
  buttonBlankTarget,
}: ImageLeftCardProps): JSX.Element {
  const { classes: styles, cx } = useStyles();

  return (
    <Card className={cx(styles.root, classes?.root, className)} elevation={1}>
      <Image
        className={styles.image}
        src={imageSrc}
        alt={imageAlt}
        imageStorageBaseUrl={imageStorageBaseUrl}
        apiServerUrl={apiServerUrl}
        backgroundImage
      />
      <CardContent className={styles.cardContent}>
        <Title sx={{ mb: 4 }} variant="h4">
          {ReactHtmlParser(title)}
        </Title>
        {children && <Box sx={{ mb: 4 }}>{children}</Box>}
        <OutlinedButton
          size="small"
          className={styles.button}
          startIcon={buttonIcon}
          href={buttonUrl}
          target={getLinkTarget(buttonBlankTarget)}
        >
          {buttonText}
        </OutlinedButton>
      </CardContent>
    </Card>
  );
}

export { ImageLeftCard };
