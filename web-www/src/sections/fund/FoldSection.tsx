import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Theme, makeStyles } from '@material-ui/core';

import Section from 'web-components/src/components/section';
import TitleDescription from 'web-components/src/components/title-description';
import { FundFoldSectionQuery } from '../../generated/graphql';

const useStyles = makeStyles<Theme>(theme => ({
  spacing: {
    '& > div': {
      paddingBottom: 0,
    },
  },
}));

const query = graphql`
  query fundFoldSection {
    sanityFundPage {
      foldSection {
        title
        _rawBody
      }
    }
  }
`;

const FoldSection = (): JSX.Element => {
  const styles = useStyles();
  const { sanityFundPage } = useStaticQuery<FundFoldSectionQuery>(query);
  const data = sanityFundPage?.foldSection;

  return (
    <Section>
      <TitleDescription className={styles.spacing} title={data?.title || ''} description={data?._rawBody} />
    </Section>
  );
};

export default FoldSection;
