import React from 'react';
import { Box, Grid } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import { BlockContent } from 'web-components/src/components/block-content';
import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';
import { Body, Title } from 'web-components/src/components/typography';

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
    main?: string;
    section?: string;
    button?: string;
  };
};

type StyleProps = {
  lightBg: boolean;
};

const useStyles = makeStyles<StyleProps>()((theme, { lightBg }) => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    margin: '0 auto',
    ...(!lightBg && {
      '& a': {
        transition: '200ms ease-in-out',
        color: theme.palette.secondary.contrastText,
        '&:hover': {
          color: theme.palette.secondary.dark,
        },
      },
    }),
  },
  btn: {
    margin: theme.spacing(10, 4, 0),
    [theme.breakpoints.down('sm')]: {
      '&:nth-of-type(2)': {
        marginTop: theme.spacing(6),
      },
    },
  },
}));

/**
 * Hero section with optional background image, centered title, and button with action. Passing no img will render with a light background and dark text & buttons
 */
const HeroAction: React.FC<React.PropsWithChildren<Props>> = ({
  classes,
  ...props
}) => {
  const lightBg = props.lightBg || !props.img;
  const { classes: styles, cx } = useStyles({ lightBg });

  const Button = lightBg ? OutlinedButton : ContainedButton;
  const button = props.bottomBanner?.button;
  const secondButton = props.bottomBanner?.secondButton;

  return (
    <BackgroundImgSection
      img={props.img || ''}
      classes={{
        main: cx(styles.main, classes?.main),
        section: classes?.section,
      }}
      isBanner={props.isBanner}
    >
      <Grid container justifyContent="center">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'center',
            justifyContent: 'center',
          }}
        >
          <Title
            align="center"
            variant="h2"
            mobileVariant="h3"
            color={lightBg ? 'textPrimary' : 'primary'}
          >
            {props.bottomBanner?.title}
          </Title>
          {!!props.bottomBanner?.descriptionRaw && (
            <Body
              as="div"
              size="xl"
              align="center"
              color={props.lightBg ? 'text.primary' : 'primary.main'}
              mt={4}
            >
              <BlockContent content={props.bottomBanner.descriptionRaw} />
            </Body>
          )}
          <Grid container justifyContent="center">
            <Button
              onClick={() => onBtnClick(props.openModal, button)}
              className={cx(styles.btn, classes?.button)}
              size="large"
            >
              {button?.buttonText}
            </Button>
            {secondButton?.buttonText && (
              <OutlinedButton
                onClick={() => onBtnClick(props.openModal, secondButton)}
                className={cx(styles.btn, classes?.button)}
                size="large"
              >
                {secondButton?.buttonText}
              </OutlinedButton>
            )}
          </Grid>
        </Box>
      </Grid>
    </BackgroundImgSection>
  );
};

export { HeroAction };
