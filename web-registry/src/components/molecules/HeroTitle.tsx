import React from 'react';
import cx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

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
 * Hero section with title, description and background image justified to the lower left with a medium container
 */
const HeroTitle: React.FC<Props> = p => {
  const styles = useStyles();

  return (
    <CardMedia image={p.img}>
      <Container maxWidth="md">
        <div className={cx(styles.main, p.classes && p.classes.main)}>
          <Typography variant="h1" className={cx(styles.title, p.classes && p.classes.title)}>
            {p.title}
          </Typography>
          <Typography variant="h4" className={cx(styles.description, p.classes && p.classes.description)}>
            {p.description}
          </Typography>
        </div>
      </Container>
    </CardMedia>
  );
};

export { HeroTitle };
