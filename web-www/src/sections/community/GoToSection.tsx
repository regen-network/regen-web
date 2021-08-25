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
  item: {
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(16),
    },
  },
}));

const GoToSection = (): JSX.Element => {
  const data = useStaticQuery(graphql`
    query {
      text: communityYaml {
        goToSection {
          videoLabel
          videoButtonText
          videoButtonHref
          blogLabel
          blogButtonText
          blogButtonHref
          discussionLabel
          discussionButtonText
          discussionButtonHref
        }
      }
    }
  `);
  const content = data.text.goToSection;
  const styles = useStyles();

  return (
    <Section className={styles.root}>
      <ImageItem
        className={styles.item}
        img={<img src="../media/svgs/video.svg" alt="podcast" />}
        title={content.videoLabel}
        buttonText={content.videoButtonText}
        buttonHref={content.videoButtonHref}
      />
      <ImageItem
        className={styles.item}
        img={<img src="../media/svgs/blog.svg" alt="blog" />}
        title={content.blogLabel}
        buttonText={content.blogButtonText}
        buttonHref={content.blogButtonHref}
      />
      <ImageItem
        img={<img src="../media/svgs/discussion.svg" alt="discussion" />}
        title={content.discussionLabel}
        buttonText={content.discussionButtonText}
        buttonHref={content.discussionButtonHref}
      />
    </Section>
  );
};

export default GoToSection;
