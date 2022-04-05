import React from 'react';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';
import { Variant } from '@mui/material/styles/createTypography';
import clsx from 'clsx';
import Grid from '@mui/material/Grid';

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
  buttonText?: string;
  buttonHref?: string;
  buttonTarget?: string;
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
    [theme.breakpoints.down('sm')]: {
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
  buttonTarget,
}: ImageItemProps): JSX.Element {
  const styles = useStyles({ titleVariant });

  return (
    <div className={clsx(styles.root, classes?.root, className)}>
      <Grid
        container
        justifyContent="center"
        className={clsx(styles.image, classes?.image)}
      >
        {img}
      </Grid>
      <Title
        align="center"
        variant={titleVariant}
        className={
          titleVariant === 'h3'
            ? clsx(styles.title, styles.h3title)
            : styles.title
        }
      >
        {title}
      </Title>
      {description && (
        <Description fontSize={getFontSize('big')}>{description}</Description>
      )}
      {buttonText && buttonHref && (
        <ContainedButton
          size="large"
          className={styles.button}
          href={buttonHref}
          target={buttonTarget}
        >
          {buttonText}
        </ContainedButton>
      )}
    </div>
  );
}
