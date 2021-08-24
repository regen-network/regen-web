import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Theme, makeStyles } from '@material-ui/core/styles';

import Section from 'web-components/lib/components/section';
import ImageItem from 'web-components/lib/components/image-item';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(22.25),
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(17.75),
      flexDirection: 'column',
    },
  },
}));

const GoToSection = (): JSX.Element => {
  const data = useStaticQuery(graphql`
    query {
      text: communityYaml {
        goToSection {
          podcastLabel
          podcastButtonText
          podcastButtonHref
          blogLabel
          blogButtonText
          blogButtonHref
          chatLabel
          chatButtonText
          chatButtonHref
        }
      }
    }
  `);
  const content = data.text.goToSection;
  const styles = useStyles();

  return (
    <Section className={styles.root}>
      <ImageItem
        img={<img src="../media/svgs/podcast.svg" alt="podcast" />}
        title={content.podcastLabel}
        buttonText={content.podcastButtonText}
        buttonHref={content.podcastButtonHref}
      />
      <ImageItem
        img={<img src="../media/svgs/blog.svg" alt="blog" />}
        title={content.blogLabel}
        buttonText={content.blogButtonText}
        buttonHref={content.blogButtonHref}
      />
      <ImageItem
        img={<img src="../media/svgs/discussion.svg" alt="discussion" />}
        title={content.chatLabel}
        buttonText={content.chatButtonText}
        buttonHref={content.chatButtonHref}
      />
    </Section>
  );
};

export default GoToSection;
