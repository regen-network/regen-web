import React from 'react';
import { makeStyles } from '@mui/styles';
import Section from '@regen-network/web-components/lib/components/section';
import Timeline from '@regen-network/web-components/lib/components/timeline';
import { Body } from '@regen-network/web-components/lib/components/typography';
import { Theme } from '@regen-network/web-components/lib/theme/muiTheme';
import { graphql, useStaticQuery } from 'gatsby';

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
  const { sanityPresskitPage: data } =
    useStaticQuery<PresskitTimelineSectionQuery>(query);
  const content = data?.timelineSection;

  return (
    <Section
      classes={{ root: styles.root, title: styles.title }}
      title={content?.header || ''}
    >
      <Body
        size="lg"
        sx={{
          textAlign: ['left', 'center'],
          pb: [9.5, 13.25],
          pt: [5, 7.5],
          m: { sm: '0 auto' },
          maxWidth: { sm: 754 },
        }}
      >
        {content?.description}
      </Body>
      <Timeline
        onViewOnLedger={() => null}
        events={content?.items as any[]}
        completedItemIndex={content?.completedItemIndex || 0}
      />
    </Section>
  );
};

export default TimelineSection;
