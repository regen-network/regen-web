import React from 'react';
import { makeStyles } from '@mui/styles';

import { Theme } from 'web-components/lib/theme/muiTheme';
import Timeline, {
  Item,
} from 'web-components/lib/components/timeline/NewTimeline';
import Section from 'web-components/lib/components/section';

import {
  TimelineSection as TimelineSectionProps,
  TimelineItem,
  Maybe,
  Tag,
} from '../../generated/sanity-graphql';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.grey[50],
    borderTop: `1px solid ${theme.palette.info.light}`,
    borderBottom: `1px solid ${theme.palette.info.light}`,
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(25),
    },
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(20),
    },
  },
  title: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(19.5),
    },
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(11.25),
    },
  },
  timeline: {
    maxWidth: theme.spacing(236),
    margin: '0 auto',
  },
}));

interface Props {
  content: TimelineSectionProps;
}

const TimelineSection: React.FC<Props> = ({ content }) => {
  const styles = useStyles();

  const items: Item[] =
    content?.timelineItems?.map((t: Maybe<TimelineItem>) => ({
      imgSrc: t?.image?.asset?.url || '',
      title: t?.title || '',
      url: t?.url || '',
      tags:
        t?.tags?.map((tag: Maybe<Tag>) => ({
          name: tag?.name || '',
          color: tag?.color || '',
        })) || [],
    })) || [];

  return (
    <div className={styles.root}>
      <Section
        title={content.header || ''}
        classes={{ title: styles.title }}
        titleVariant="subtitle1"
      >
        <div className={styles.timeline}>
          {items.length > 0 && <Timeline items={items} />}
        </div>
      </Section>
    </div>
  );
};

export { TimelineSection };
