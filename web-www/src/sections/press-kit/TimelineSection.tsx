import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { graphql, StaticQuery } from 'gatsby';

import Section from 'web-components/lib/components/section';
import Timeline from 'web-components/lib/components/timeline';
import Description from 'web-components/lib/components/description';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(28.5),
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(25),
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
    [theme.breakpoints.down('xs')]: {
      textAlign: 'left',
      paddingBottom: theme.spacing(9.5),
      paddingTop: theme.spacing(5),
    },
  },
}));

const TimelineSection = (): JSX.Element => {
  const classes = useStyles();

  return (
    <StaticQuery
      query={graphql`
        query {
          content: pressKitYaml {
            timelineSection {
              header
              description
              completedItemIndex
              items {
                date
                title
                description
              }
            }
          }
        }
      `}
      render={data => {
        const content = data.content.timelineSection;
        return (
          <Section className={classes.root} title={content.header}>
            <Description className={classes.description}>{content.description}</Description>
            <Timeline events={content.items} completedItemIndex={content.completedItemIndex} />
          </Section>
        );
      }}
    />
  );
};

export default TimelineSection;
