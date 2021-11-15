import React from 'react';
import cx from 'clsx';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';
import Typography from '@mui/material/Typography';

import { BlockContent } from 'web-components/lib/components/block-content';
import { BackgroundImgSection } from './BackgroundImgSection';
import { Maybe, Scalars } from '../../generated/sanity-graphql';

type Props = {
  img: string;
  title?: string | null;
  descriptionRaw?: Maybe<Scalars['JSON']> | string;
  linearGradient?: string;
  tooltipText?: Maybe<string>;
  isBanner?: boolean;
  classes?: {
    title?: string;
    description?: string;
    main?: string;
    section?: string;
  };
};

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    justifyContent: 'flex-end',
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(30),
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(17),
    },
  },
  title: {
    color: theme.palette.primary.main,
    fontWeight: 900,
  },
  description: {
    color: theme.palette.primary.main,
    marginTop: theme.spacing(5.5),
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(22),
      lineHeight: theme.typography.pxToRem(35.2),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(16),
      lineHeight: theme.typography.pxToRem(25),
    },
  },
}));

/**
 * Hero section with title, description and background image justified to the lower left with our section component.
 * Optional tooltip when using underlined text in description.
 */
const HeroTitle: React.FC<Props> = ({ classes, ...props }) => {
  const styles = useStyles();

  return (
    <BackgroundImgSection
      isBanner={props.isBanner}
      img={props.img}
      linearGradient={props?.linearGradient}
      classes={{
        main: cx(styles.main, classes?.main),
        section: classes?.section,
      }}
    >
      {props.title && (
        <Typography variant="h1" className={cx(styles.title, classes?.title)}>
          {props.title}
        </Typography>
      )}
      {props.descriptionRaw && (
        <Typography
          variant="h4"
          className={cx(styles.description, classes?.description)}
        >
          <BlockContent
            content={props.descriptionRaw}
            tooltipText={props?.tooltipText || ''}
          />
        </Typography>
      )}
    </BackgroundImgSection>
  );
};

export { HeroTitle };
