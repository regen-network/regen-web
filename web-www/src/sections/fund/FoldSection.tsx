import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { makeStyles } from '@mui/styles';

import { Theme } from 'web-components/lib/theme/muiTheme';
import Section from 'web-components/lib/components/section';
import TitleDescription from 'web-components/lib/components/title-description';

const useStyles = makeStyles<Theme>(theme => ({
  spacing: {
    '& > div': {
      paddingBottom: 0,
    },
  },
}));

type QueryData = {
  text: {
    foldSection: {
      title: string;
      body: string;
    };
  };
};

const FoldSection = (): JSX.Element => {
  const styles = useStyles();
  const {
    text: {
      foldSection: { title, body },
    },
  } = useStaticQuery<QueryData>(graphql`
    query {
      text: fundYaml {
        foldSection {
          title
          body
        }
      }
    }
  `);

  return (
    <Section>
      <TitleDescription className={styles.spacing} title={title} description={body} />
    </Section>
  );
};

export default FoldSection;
