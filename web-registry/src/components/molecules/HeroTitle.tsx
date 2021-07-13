import React from 'react';
import cx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { BackgroundImgSection } from './BackgroundImgSection';

type Props = {
  img: string;
  title: string;
  description: string;
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
 * Hero section with title, description and background image justified to the lower left with our section component
 */
const HeroTitle: React.FC<Props> = ({ classes, ...props }) => {
  const styles = useStyles();

  return (
    <BackgroundImgSection
      isBanner={props.isBanner}
      img={props.img}
      classes={{ main: cx(styles.main, classes?.main), section: classes?.section }}
    >
      <Typography variant="h1" className={cx(styles.title, classes?.title)}>
        {props.title}
      </Typography>
      <Typography variant="h4" className={cx(styles.description, classes?.description)}>
        {props.description}
      </Typography>
    </BackgroundImgSection>
  );
};

export { HeroTitle };
