import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { makeStyles } from '@mui/styles';

import { Theme } from 'web-components/lib/theme/muiTheme';
import TitleDescription from 'web-components/lib/components/title-description';
import Section from 'web-components/lib/components/section';
import { PresskitTitleDescriptionSectionQuery } from '../../generated/graphql';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(8),
    },
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(15),
    },
  },
}));

const query = graphql`
  query presskitTitleDescriptionSection {
    sanityPresskitPage {
      titleDescriptionSection {
        title
        _rawBody
      }
    }
  }
`;

const TitleDescriptionSection = (): JSX.Element => {
  const styles = useStyles();
  const { sanityPresskitPage } = useStaticQuery<PresskitTitleDescriptionSectionQuery>(query);
  const content = sanityPresskitPage?.titleDescriptionSection;
  return (
    <Section className={styles.root}>
      <TitleDescription title={content?.title || ''} description={content?._rawBody} />
    </Section>
  );
};

export default TitleDescriptionSection;
