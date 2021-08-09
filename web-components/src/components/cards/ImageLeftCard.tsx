import React from 'react';
import { makeStyles, Theme, CardContent } from '@material-ui/core';
import ReactHtmlParser from 'react-html-parser';
import cx from 'clsx';

import Card from './Card';
import Title from '../title';
import { Image } from '../image';
import OutlinedButton from '../buttons/OutlinedButton';

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

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    borderRadius: 9,
    [theme.breakpoints.down('xs')]: {
      padding: 0,
      flexDirection: 'column',
    },
    [theme.breakpoints.up('sm')]: {
      maxWidth: theme.spacing(180),
      padding: 0,
    },
  },
  image: {
    [theme.breakpoints.down('xs')]: {
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
  line: {
    marginBottom: theme.spacing(4),
  },
  button: {
    [theme.breakpoints.down('xs')]: {
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
  const styles = useStyles();

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
        <Title className={styles.line} variant="h4">
          {ReactHtmlParser(title)}
        </Title>
        {children && <div className={styles.line}>{children}</div>}
        <OutlinedButton
          className={styles.button}
          startIcon={buttonIcon}
          href={buttonUrl}
          target={buttonBlankTarget ? '_blank' : '_self'}
        >
          {buttonText}
        </OutlinedButton>
      </CardContent>
    </Card>
  );
}

export { ImageLeftCard };
