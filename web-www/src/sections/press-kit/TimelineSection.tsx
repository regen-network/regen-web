import React from 'react';
import { makeStyles } from '@mui/styles';
import { graphql, StaticQuery } from 'gatsby';

import { Theme } from 'web-components/lib/theme/muiTheme';
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
  title: {
    [theme.breakpoints.down('xs')]: {
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
                summary
                description
              }
            }
          }
        }
      `}
      render={data => {
        const content = data.content.timelineSection;
        return (
          <Section classes={{ root: classes.root, title: classes.title }} title={content.header}>
            <Description className={classes.description}>{content.description}</Description>
            <Timeline events={content.items} completedItemIndex={content.completedItemIndex} />
          </Section>
        );
      }}
    />
  );
};

export default TimelineSection;
