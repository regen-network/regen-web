import React from 'react';
import cx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';

type Props = {
  actionTxt: string;
  action: () => void;
  img: string;
  title: string;
  maxWidth?: string;
  classes?: {
    title?: string;
    main?: string;
  };
};

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignContent: 'center',
    justifyContent: 'center',
    minHeight: theme.spacing(150),
  },
  title: {
    color: theme.palette.primary.main,
    fontWeight: 900,
  },
  btn: {
    marginTop: theme.spacing(10),
  },
}));

/**
 * Hero section with background image, centered title, and button with action
 */
const HeroAction: React.FC<Props> = p => {
  const styles = useStyles();

  return (
    <CardMedia image={p.img}>
      <Container maxWidth="md">
        <Grid container justify="center">
          <div className={cx(styles.main, p.classes && p.classes.main)}>
            <Typography
              variant="h2"
              align="center"
              className={cx(styles.title, p.classes && p.classes.title)}
            >
              {p.title}
            </Typography>
            <Grid container justify="center">
              <ContainedButton onClick={p.action} className={styles.btn} size="medium">
                {p.actionTxt}
              </ContainedButton>
            </Grid>
          </div>
        </Grid>
      </Container>
    </CardMedia>
  );
};

export { HeroAction };
