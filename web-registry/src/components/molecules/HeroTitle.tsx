import React from 'react';
import cx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
// import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Section from 'web-components/lib/components/section';

type Props = {
  img: string;
  title: string;
  description: string;
  maxWidth?: false | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  classes?: {
    title?: string;
    description?: string;
    main?: string;
  };
};

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'flex-end',
    minHeight: theme.spacing(150),
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
    <CardMedia image={props.img}>
      <Section>
        <div className={cx(styles.main, props.classes && props.classes.main)}>
          <Typography variant="h1" className={cx(styles.title, props.classes && props.classes.title)}>
            {props.title}
          </Typography>
          <Typography
            variant="h4"
            className={cx(styles.description, props.classes && props.classes.description)}
          >
            {props.description}
          </Typography>
        </div>
      </Section>
    </CardMedia>
  );
};

export { HeroTitle };
