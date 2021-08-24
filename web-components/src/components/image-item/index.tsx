import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { Variant } from '@material-ui/core/styles/createTypography';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';

import Title from '../title';
import Description from '../description';
import ContainedButton from '../buttons/ContainedButton';
import { getFontSize } from '../../theme/sizing';

export interface ImageItemProps {
  img: JSX.Element; // using pure img tag or gatsby-image
  title: string;
  description?: string;
  className?: string;
  classes?: {
    root?: string;
    image?: string;
  };
  titleVariant?: Variant;
  buttonText?: Variant;
  buttonHref?: Variant;
}

export interface StyleProps {
  titleVariant: string;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: {
    textAlign: 'center',
  },
  title: {
    lineHeight: '150%',
    paddingBottom: theme.spacing(2.5),
  },
  image: {
    height: theme.spacing(32.5),
    marginBottom: theme.spacing(4),
  },
  h3title: {
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(5.25),
    },
  },
  button: {
    marginTop: theme.spacing(4),
  },
}));

export default function ImageItem({
  img,
  title,
  className,
  classes,
  description,
  titleVariant = 'h4',
  buttonText,
  buttonHref,
}: ImageItemProps): JSX.Element {
  const styles = useStyles({ titleVariant });

  return (
    <div className={clsx(styles.root, classes?.root, className)}>
      <Grid container justify="center" className={clsx(styles.image, classes?.image)}>
        {img}
      </Grid>
      <Title
        align="center"
        variant={titleVariant}
        className={titleVariant === 'h3' ? clsx(styles.title, styles.h3title) : styles.title}
      >
        {title}
      </Title>
      {description && <Description fontSize={getFontSize('big')}>{description}</Description>}
      {buttonText && buttonHref && (
        <ContainedButton className={styles.button} href={buttonHref}>
          {buttonText}
        </ContainedButton>
      )}
    </div>
  );
}
