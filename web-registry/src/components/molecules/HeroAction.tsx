import React from 'react';
import clsx from 'clsx';
import ReactHtmlParser from 'react-html-parser';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import Title from 'web-components/lib/components/title';
import { BackgroundImgSection } from './BackgroundImgSection';
import Description from 'web-components/lib/components/description';

type Props = {
  actionTxt: string;
  action: () => void;
  img: string;
  title: string;
  description?: string;
  classes?: {
    main?: string;
    description?: string;
  };
};

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    alignContent: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 900,
    lineHeight: theme.typography.pxToRem(53.2),
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(32),
      lineHeight: theme.typography.pxToRem(44.8),
    },
  },
  btn: {
    marginTop: theme.spacing(10),
  },
  description: {
    color: theme.palette.primary.main,
    marginTop: theme.spacing(4),
    textAlign: 'center',
    fontSize: theme.typography.pxToRem(22),
    lineHeight: theme.typography.pxToRem(33),
  },
}));

/**
 * Hero section with background image, centered title, and button with action
 */
const HeroAction: React.FC<Props> = ({ classes, ...props }) => {
  const styles = useStyles();

  return (
    <BackgroundImgSection img={props.img} classes={{ main: styles.main }}>
      {/* <Container maxWidth="md"> */}
      <Grid container justify="center">
        <div className={clsx(styles.main, classes && classes.main)}>
          <Title align="center" variant="h2" color="primary" className={styles.title}>
            {ReactHtmlParser(props.title)}
          </Title>
          {!!props.description && (
            <Description className={clsx(styles.description, classes && classes.description)}>
              {props.description}
            </Description>
          )}
          <Grid container justify="center">
            <ContainedButton onClick={props.action} className={styles.btn} size="medium">
              {ReactHtmlParser(props.actionTxt)}
            </ContainedButton>
          </Grid>
        </div>
      </Grid>
      {/* </Container> */}
    </BackgroundImgSection>
  );
};

export { HeroAction };
