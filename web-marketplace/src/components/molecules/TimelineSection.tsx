import React from 'react';
import { makeStyles } from 'tss-react/mui';

import Section from 'web-components/src/components/section';
import Timeline, {
  Item,
} from 'web-components/src/components/timeline/NewTimeline';
import { Theme } from 'web-components/src/theme/muiTheme';

import {
  Maybe,
  Tag,
  TimelineItem,
  TimelineSection as TimelineSectionProps,
} from '../../generated/sanity-graphql';

const useStyles = makeStyles()((theme: Theme) => ({
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

const TimelineSection: React.FC<React.PropsWithChildren<Props>> = ({
  content,
}) => {
  const { classes: styles } = useStyles();

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
      <Section title={content.header || ''} classes={{ title: styles.title }}>
        <div className={styles.timeline}>
          {items.length > 0 && <Timeline items={items} />}
        </div>
      </Section>
    </div>
  );
};

export { TimelineSection };
