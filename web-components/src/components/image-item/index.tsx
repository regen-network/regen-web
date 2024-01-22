import React from 'react';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Variant } from '@mui/material/styles/createTypography';
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import { makeStyles } from 'tss-react/mui';

import ContainedButton from '../buttons/ContainedButton';
import { Body, Title } from '../typography';

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
  sx?: { title: SxProps<Theme> };
}

export interface StyleProps {
  titleVariant: string;
}

const useStyles = makeStyles()((theme: Theme) => ({
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
  sx,
}: ImageItemProps): JSX.Element {
  const { classes: styles, cx } = useStyles();

  return (
    <Box className={cx(styles.root, classes?.root, className)}>
      <Grid
        container
        justifyContent="center"
        className={cx(styles.image, classes?.image)}
      >
        {img}
      </Grid>
      <Title
        align="center"
        variant={titleVariant}
        className={
          titleVariant === 'h3'
            ? cx(styles.title, styles.h3title)
            : styles.title
        }
        sx={sx?.title}
      >
        {title}
      </Title>
      {description && <Body size="lg">{description}</Body>}
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
    </Box>
  );
}
