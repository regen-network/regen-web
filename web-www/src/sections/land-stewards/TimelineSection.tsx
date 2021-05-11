import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { useStaticQuery, graphql } from 'gatsby';

import Timeline, { Item } from 'web-components/lib/components/timeline/NewTimeline';
import Section from 'web-components/src/components/section';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.grey[50],
    borderTop: `1px solid ${theme.palette.info.light}`,
    borderBottom: `1px solid ${theme.palette.info.light}`,
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(25),
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(20),
    },
  },
  title: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(19.5),
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(11.25),
    },
  },
  timeline: {
    maxWidth: theme.spacing(236),
    margin: '0 auto',
  },
}));

const TimelineSection = (): JSX.Element => {
  const data = useStaticQuery(graphql`
    query {
      text: landStewardsYaml {
        timelineSection {
          header
          items {
            image {
              extension
              publicURL
            }
            title
            url
            tags {
              name
              color
            }
          }
        }
      }
    }
  `);
  const content = data.text.timelineSection;
  const classes = useStyles();
  const items: Item[] = content.items.map(({ image, title, url, tags }) => ({
    imgSrc: image.publicURL,
    title,
    url,
    tags,
  }));

  return (
    <div className={classes.root}>
      <Section title={content.header} titleClassName={classes.title} titleVariant="subtitle2">
        <div className={classes.timeline}>
          <Timeline items={items} />
        </div>
      </Section>
    </div>
  );
};

export default TimelineSection;
