import React from 'react';
import cx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import Title from 'web-components/lib/components/title';

type Props = {
  actionTxt: string;
  action: () => void;
  img: string;
  title: string;
  maxWidth?: string;
  classes?: {
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
  btn: {
    marginTop: theme.spacing(10),
  },
}));

/**
 * Hero section with background image, centered title, and button with action
 */
const HeroAction: React.FC<Props> = props => {
  const styles = useStyles();

  return (
    <CardMedia image={props.img}>
      <Container maxWidth="md">
        <Grid container justify="center">
          <div className={cx(styles.main, props.classes && props.classes.main)}>
            <Title align="center" variant="h2" color="primary">
              {props.title}
            </Title>
            <Grid container justify="center">
              <ContainedButton onClick={props.action} className={styles.btn} size="medium">
                {props.actionTxt}
              </ContainedButton>
            </Grid>
          </div>
        </Grid>
      </Container>
    </CardMedia>
  );
};

export { HeroAction };
