import React from 'react';
import type { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ArticleCard from '@regen-network/web-components/lib/components/cards/ArticleCard';
import { SliderSection } from '@regen-network/web-components/lib/components/section/SliderSection';
import { graphql, useStaticQuery } from 'gatsby';

import type { NctMediaSectionQuery } from '../../generated/graphql';
import { sanityMediaToArticleCardProps } from '../../util/sanity-transforms';

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    border: `1px solid ${theme.palette.grey[100]}`,
    borderRadius: '10px',
  },
}));

const query = graphql`
  query nctMediaSection {
    sanityNctPage {
      mediaItems {
        ...mediaFields
      }
    }
  }
`;

export const MediaSection = (): JSX.Element => {
  const styles = useStyles();
  const { sanityNctPage } = useStaticQuery<NctMediaSectionQuery>(query);
  const data = sanityNctPage?.mediaItems;
  const articleCards = sanityMediaToArticleCardProps(data).map(props => (
    <ArticleCard className={styles.card} {...props} />
  ));

  return <SliderSection title="Media" items={articleCards} />;
};
