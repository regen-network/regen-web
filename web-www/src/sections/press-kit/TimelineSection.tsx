import React from 'react';
import { makeStyles } from '@mui/styles';
import { graphql, useStaticQuery } from 'gatsby';

import { Theme } from 'web-components/lib/theme/muiTheme';
import Section from 'web-components/lib/components/section';
import Timeline from 'web-components/lib/components/timeline';
import Description from 'web-components/lib/components/description';
import { PresskitTimelineSectionQuery } from '../../generated/graphql';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(28.5),
    },
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(25),
    },
  },
  title: {
    [theme.breakpoints.down('sm')]: {
      textAlign: 'left',
      fontSize: theme.spacing(8),
    },
  },
  description: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: theme.spacing(188.5),
      paddingBottom: theme.spacing(13.25),
      paddingTop: theme.spacing(7.5),
      textAlign: 'center',
      margin: '0 auto',
    },
    [theme.breakpoints.down('sm')]: {
      textAlign: 'left',
      paddingBottom: theme.spacing(9.5),
      paddingTop: theme.spacing(5),
    },
  },
}));

const query = graphql`
  query presskitTimelineSection {
    sanityPresskitPage {
      timelineSection {
        header
        description
        completedItemIndex
        items {
          date
          summary
          description
        }
      }
    }
  }
`;

const TimelineSection = (): JSX.Element => {
  const styles = useStyles();
  const { sanityPresskitPage: data } = useStaticQuery<PresskitTimelineSectionQuery>(query);
  const content = data?.timelineSection;

  return (
    <Section classes={{ root: styles.root, title: styles.title }} title={content?.header || ''}>
      <Description className={styles.description}>{content?.description}</Description>
      <Timeline
        onViewOnLedger={() => null}
        events={content?.items as any[]}
        completedItemIndex={content?.completedItemIndex || 0}
      />
    </Section>
  );
};

export default TimelineSection;
