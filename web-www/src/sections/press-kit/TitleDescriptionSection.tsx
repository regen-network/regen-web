import React from 'react';
import { makeStyles } from '@mui/styles';
import { graphql, useStaticQuery } from 'gatsby';

import Section from 'web-components/lib/components/section';
import { TitleBody } from 'web-components/lib/components/text-layouts';
import { Theme } from 'web-components/lib/theme/muiTheme';

import { PresskitTitleDescriptionSectionQuery } from '../../generated/graphql';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(22.25),
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
  const { sanityPresskitPage } =
    useStaticQuery<PresskitTitleDescriptionSectionQuery>(query);
  const content = sanityPresskitPage?.titleDescriptionSection;
  return (
    <Section className={styles.root}>
      <TitleBody title={content?.title || ''} body={content?._rawBody} />
    </Section>
  );
};

export default TitleDescriptionSection;
