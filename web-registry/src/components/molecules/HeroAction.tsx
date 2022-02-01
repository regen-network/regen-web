import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';

import { Theme } from 'web-components/lib/theme/muiTheme';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import Title from 'web-components/lib/components/title';
import Description from 'web-components/lib/components/description';
import { BlockContent } from 'web-components/lib/components/block-content';
import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';

import {
  BottomBannerFieldsFragment,
  Maybe,
} from '../../generated/sanity-graphql';
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
    section?: string;
    title?: string;
    description?: string;
    button?: string;
  };
};

type StyleProps = {
  lightBg: boolean;
};

const useStyles = makeStyles<Theme, StyleProps>(theme => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    margin: '0 auto',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 900,
    lineHeight: theme.typography.pxToRem(53.2),
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(32),
      lineHeight: theme.typography.pxToRem(44.8),
    },
  },
  btn: {
    margin: theme.spacing(10, 4, 0),
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(21),
      padding: theme.spacing(2, 8),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(18),
      padding: theme.spacing(2, 4),
      '&:nth-child(2)': {
        marginTop: theme.spacing(6),
      },
    },
  },
  description: props => ({
    color: props.lightBg
      ? theme.palette.text.primary
      : theme.palette.primary.main,
    marginTop: theme.spacing(4),
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(22),
      lineHeight: theme.typography.pxToRem(33),
    },
    [theme.breakpoints.down('sm')]: {
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
  const secondButton = props.bottomBanner?.secondButton;

  return (
    <BackgroundImgSection
      img={props.img || ''}
      classes={{
        main: cx(styles.main, classes?.main),
        root: classes?.root,
        section: cx(styles.section, classes?.section),
      }}
      isBanner={props.isBanner}
    >
      <Grid container justifyContent="center">
        <div className={styles.content}>
          <Title
            align="center"
            variant="h2"
            color={lightBg ? 'textPrimary' : 'primary'}
            className={cx(styles.title, classes?.title)}
          >
            {props.bottomBanner?.title}
          </Title>
          {!!props.bottomBanner?.descriptionRaw && (
            <Description
              className={cx(styles.description, classes?.description)}
            >
              <BlockContent content={props.bottomBanner.descriptionRaw} />
            </Description>
          )}
          <Grid container justifyContent="center">
            <Button
              onClick={() => onBtnClick(props.openModal, button)}
              className={cx(styles.btn, classes?.button)}
              size="medium"
            >
              {button?.buttonText}
            </Button>
            {secondButton?.buttonText && (
              <OutlinedButton
                onClick={() => onBtnClick(props.openModal, secondButton)}
                className={cx(styles.btn, classes?.button)}
                size="medium"
              >
                {secondButton?.buttonText}
              </OutlinedButton>
            )}
          </Grid>
        </div>
      </Grid>
    </BackgroundImgSection>
  );
};

export { HeroAction };
