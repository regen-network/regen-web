import React from 'react';
import { makeStyles, DefaultTheme as Theme, useTheme } from '@mui/styles';
import clsx from 'clsx';

import { ImageItemProps } from 'web-components/lib/components/image-item';
import ImageItems from 'web-components/lib/components/sliders/ImageItems';
import ResponsiveSlider from 'web-components/lib/components/sliders/ResponsiveSlider';
import Description from 'web-components/lib/components/description';
import Section from 'web-components/lib/components/section';

import { WrappedImpactCard } from '../atoms';
import { PracticesOutcomesSection as PracticesOutcomesSectionProps } from '../../generated/sanity-graphql';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.down('xs')]: {
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
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(12),
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(20.75),
    },
  },
  note: {
    float: 'right',
    paddingTop: theme.spacing(7.25),
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

const PracticesOutcomesSection: React.FC<Props> = ({ content }) => {
  const classes = useStyles();
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
    outcomes?.map(outcome => <WrappedImpactCard outcome={outcome} />) || [];

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
        itemWidth="90%"
        padding={theme.spacing(2.5)}
        className={clsx(classes.outcomes, classes.slider)}
        title="Ecological Outcomes"
        arrows
        slidesToShow={outcomeCards.length <= 2 ? outcomeCards.length : 3}
        items={outcomeCards}
      />
      <Description className={classes.note}>{content?.note}</Description>
    </Section>
  );
};

export { PracticesOutcomesSection };
