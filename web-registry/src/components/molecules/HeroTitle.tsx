import React from 'react';
import cx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { BackgroundImgSection } from './BackgroundImgSection';

type Props = {
  img: string;
  title: string;
  description: string;
  classes?: {
    title?: string;
    description?: string;
    main?: string;
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
      fontSize: theme.spacing(5.5),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(4.75),
    },
  },
}));

/**
 * Hero section with title, description and background image justified to the lower left with our section component
 */
const HeroTitle: React.FC<Props> = props => {
  const styles = useStyles();

  return (
    <BackgroundImgSection
      img={props.img}
      classes={{ main: cx(styles.main, props.classes && props.classes.main) }}
    >
      <Typography variant="h1" className={cx(styles.title, props.classes && props.classes.title)}>
        {props.title}
      </Typography>
      <Typography variant="h4" className={cx(styles.description, props.classes && props.classes.description)}>
        {props.description}
      </Typography>
    </BackgroundImgSection>
  );
};

export { HeroTitle };
