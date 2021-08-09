import React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import Title from 'web-components/lib/components/title';
import Description from 'web-components/lib/components/description';
import { BlockContent } from 'web-components/lib/components/block-content';
import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';

import { BottomBannerFieldsFragment, Maybe } from '../../generated/sanity-graphql';
import { onBtnClick } from '../../lib/button';
import { BackgroundImgSection } from './BackgroundImgSection';

type Props = {
  openModal: (link: string) => void;
  bottomBanner?: Maybe<BottomBannerFieldsFragment>;
  img?: string;
  lightBg?: boolean;
  isBanner?: boolean;
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
  const button = props.bottomBanner?.button;

  return (
    <BackgroundImgSection
      img={props.img || ''}
      classes={{ main: styles.main, root: classes?.root }}
      isBanner={props.isBanner}
    >
      <Grid container justify="center">
        <div className={clsx(styles.main, classes?.main)}>
          <Title
            align="center"
            variant="h2"
            color={lightBg ? 'textPrimary' : 'primary'}
            className={styles.title}
          >
            {props.bottomBanner?.title}
          </Title>
          {!!props.bottomBanner?.descriptionRaw && (
            <Description className={clsx(styles.description, classes?.description)}>
              <BlockContent content={props.bottomBanner.descriptionRaw} />
            </Description>
          )}
          <Grid container justify="center">
            <Button onClick={() => onBtnClick(props.openModal, button)} className={styles.btn} size="medium">
              {button?.buttonText}
            </Button>
          </Grid>
        </div>
      </Grid>
    </BackgroundImgSection>
  );
};

export { HeroAction };
