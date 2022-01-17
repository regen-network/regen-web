import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { makeStyles } from '@mui/styles';

import { Theme } from 'web-components/lib/theme/muiTheme';
import Section from 'web-components/lib/components/section';
import TitleDescription from 'web-components/lib/components/title-description';
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
