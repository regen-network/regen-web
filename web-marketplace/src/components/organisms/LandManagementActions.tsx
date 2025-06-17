import React, { useCallback, useRef } from 'react';
import Slider from 'react-slick';
import { useLingui } from '@lingui/react';
import { useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import { makeStyles } from 'tss-react/mui';

import Action, { ActionProps } from 'web-components/src/components/action';
import PrevNextButton from 'web-components/src/components/buttons/PrevNextButton';
import Section from 'web-components/src/components/section';
import { Body } from 'web-components/src/components/typography';
import { Theme } from 'web-components/src/theme/muiTheme';

import { LESS, MORE, READ } from 'lib/constants/shared.constants';

export interface LandManagementActionsProps {
  actions: ActionProps[];
  title: string;
  subtitle?: string;
}

const useStyles = makeStyles()((theme: Theme) => ({
  section: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(21.5),
      paddingBottom: theme.spacing(22.25),
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(17.5),
      paddingBottom: theme.spacing(17.5),
    },
  },
  title: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(3),
    },
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(2),
    },
  },
  slider: {
    margin: theme.spacing(0, -1.75),
  },
  swipe: {
    display: 'flex',
    marginLeft: theme.spacing(-4),
    marginRight: theme.spacing(-4),
    overflowX: 'auto',
    minHeight: theme.spacing(104),
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  item: {
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(0, 1.875),
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0, 1.875),
      '&:first-child': {
        paddingLeft: theme.spacing(4),
      },
      '&:last-child': {
        paddingRight: theme.spacing(4),
      },
    },
  },
  buttons: {
    flex: 1,
    position: 'relative',
    top: theme.spacing(9.5),
    '& div': {
      marginLeft: theme.spacing(2.5),
    },
  },
}));

function LandManagementActions({
  actions,
  title,
  subtitle,
}: LandManagementActionsProps): JSX.Element {
  const { _ } = useLingui();
  const { classes: styles } = useStyles();
  const theme: Theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet: boolean = useMediaQuery(
    theme.breakpoints.between('xs', 'tablet'),
  );
  const slidesCount = isTablet ? 2 : 3;

  const settings = {
    speed: 500,
    slidesToShow: slidesCount,
    slidesToScroll: slidesCount,
    arrows: false,
  };

  // TODO build reusable HOC slider component
  const slider: any = useRef(null);

  const slickPrev = useCallback(() => {
    if (slider && slider.current) {
      slider.current.slickPrev();
    }
  }, [slider]);

  const slickNext = useCallback(() => {
    if (slider && slider.current) {
      slider.current.slickNext();
    }
  }, [slider]);

  return (
    <Section
      classes={{ root: styles.section, title: styles.title }}
      title={title}
      titleVariant="h2"
      titleAlign="left"
      topRight={
        <>
          {!isMobile && actions.length > slidesCount && (
            <Grid
              container
              justifyContent="flex-end"
              className={styles.buttons}
            >
              <PrevNextButton direction="prev" onClick={slickPrev} />
              <PrevNextButton direction="next" onClick={slickNext} />
            </Grid>
          )}
        </>
      }
    >
      <Body mb={[4, 7]}>{subtitle}</Body>
      {isMobile ? (
        <div className={styles.swipe}>
          {actions.map(action => (
            <div className={styles.item} key={action.name}>
              <Action
                name={action.name}
                description={action.description}
                imgSrc={action.imgSrc}
                text={_(READ)}
                lessText={_(LESS)}
                moreText={_(MORE)}
              />
            </div>
          ))}
        </div>
      ) : (
        <Slider {...settings} ref={slider} className={styles.slider}>
          {actions.map(action => (
            <Action
              className={styles.item}
              key={action.name}
              name={action.name}
              description={action.description}
              imgSrc={action.imgSrc}
              text={_(READ)}
              lessText={_(LESS)}
              moreText={_(MORE)}
            />
          ))}
        </Slider>
      )}
    </Section>
  );
}

export { LandManagementActions };
