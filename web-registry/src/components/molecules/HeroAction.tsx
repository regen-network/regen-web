import React from 'react';
import clsx from 'clsx';
import ReactHtmlParser from 'react-html-parser';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import Title from 'web-components/lib/components/title';
import Description from 'web-components/lib/components/description';
import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';

import { BackgroundImgSection } from './BackgroundImgSection';

type Props = {
  actionTxt: string;
  action: () => void;
  img?: string;
  title: string;
  lightBg?: boolean;
  description?: string;
  classes?: {
    root?: string;
    main?: string;
    description?: string;
  };
};

type StyleProps = {
  lightBg: boolean;
};

const useStyles = makeStyles<Theme, StyleProps>(theme => ({
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
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(21),
      padding: theme.spacing(2, 8),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(18),
      padding: theme.spacing(2, 4),
    },
  },
  description: props => ({
    color: props.lightBg ? theme.palette.text.primary : theme.palette.primary.main,
    marginTop: theme.spacing(4),
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(22),
      lineHeight: theme.typography.pxToRem(33),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(18),
      lineHeight: theme.typography.pxToRem(27),
    },
  }),
}));

/**
 * Hero section with optional background image, centered title, and button with action. Passing no img will render with a light background and dark text & buttons
 */
const HeroAction: React.FC<Props> = ({ classes, ...props }) => {
  const lightBg = props.lightBg || !props.img;
  const styles = useStyles({ lightBg });

  const Button = lightBg ? OutlinedButton : ContainedButton;

  return (
    <BackgroundImgSection img={props.img || ''} classes={{ main: styles.main, root: classes?.root }}>
      <Grid container justify="center">
        <div className={clsx(styles.main, classes?.main)}>
          <Title
            align="center"
            variant="h2"
            color={lightBg ? 'textPrimary' : 'primary'}
            className={styles.title}
          >
            {ReactHtmlParser(props.title)}
          </Title>
          {!!props.description && (
            <Description className={clsx(styles.description, classes?.description)}>
              {ReactHtmlParser(props.description)}
            </Description>
          )}
          <Grid container justify="center">
            <Button onClick={props.action} className={styles.btn} size="medium">
              {ReactHtmlParser(props.actionTxt)}
            </Button>
          </Grid>
        </div>
      </Grid>
    </BackgroundImgSection>
  );
};

export { HeroAction };
