import React from 'react';
import { useTheme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import { ImageItemProps } from 'web-components/lib/components/image-item';
import Section from 'web-components/lib/components/section';
import ImageItems from 'web-components/lib/components/sliders/ImageItems';
import ResponsiveSlider from 'web-components/lib/components/sliders/ResponsiveSlider';
import { Body } from 'web-components/lib/components/typography';
import type { Theme } from 'web-components/lib/theme/muiTheme';

import type { PracticesOutcomesSection as PracticesOutcomesSectionProps } from '../../generated/sanity-graphql';
import { WrappedImpactCard } from '../atoms';

const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(14),
    },
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(25),
    },
  },
  outcomes: {
    '& .slick-slide': {
      '& div:first-child': {
        height: '100%',
      },
    },
  },
  slider: {
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(12),
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(20.75),
    },
  },
  title: {
    [theme.breakpoints.up('lg')]: {
      paddingLeft: theme.spacing(40),
      paddingRight: theme.spacing(40),
    },
  },
}));

interface Props {
  content: PracticesOutcomesSectionProps;
}

const PracticesOutcomesSection: React.FC<React.PropsWithChildren<Props>> = ({
  content,
}) => {
  const { classes, cx } = useStyles();
  const theme = useTheme();
  const { practices, outcomes, title } = content;

  const practiceItems: ImageItemProps[] =
    practices?.map(i => ({
      img: (
        <img src={i?.icon?.asset?.url || ''} alt={`${i?.icon?.asset?.label}`} />
      ),
      title: i?.title || '',
      description: i?.descriptionRaw[0]?.children[0]?.text,
    })) || [];

  const outcomeCards =
    outcomes?.map((outcome, i) => (
      <WrappedImpactCard key={i} outcome={outcome} />
    )) || [];

  return (
    <Section
      withSlider
      classes={{ root: classes.root, title: classes.title }}
      title={title || ''}
    >
      <ImageItems
        className={classes.slider}
        title="Land Management Practices"
        arrows
        slidesToShow={practiceItems.length <= 3 ? practiceItems.length : 4}
        items={practiceItems}
      />
      <ResponsiveSlider
        mobileItemWidth="90%"
        padding={theme.spacing(2.5)}
        className={cx(classes.outcomes, classes.slider)}
        title="Ecological Outcomes"
        arrows
        slidesToShow={outcomeCards.length <= 2 ? outcomeCards.length : 3}
        items={outcomeCards}
      />
      <Body sx={{ pt: 7.25, float: 'right' }}>{content?.note}</Body>
    </Section>
  );
};

export { PracticesOutcomesSection };
