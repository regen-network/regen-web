import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Theme, makeStyles } from '@material-ui/core/styles';
import Img from 'gatsby-image';
import Section from 'web-components/lib/components/section';
import TitleDescription from 'web-components/lib/components/title-description';

const useStyles = makeStyles((theme: Theme) => ({
  img: {},
}));

const TestnetSection = (): JSX.Element => {
  const data = useStaticQuery(graphql`
    query {
      text: developersYaml {
        testnetSection {
          header
          description
          address
          leftColumnLabel
          leftColumnContent
          rightColumnLabel
          rightColumnContent
          buttonText
        }
      }
    }
  `);
  const content = data.text.testnetSection;
  const classes = useStyles();
  return <Section></Section>;
};

export default TestnetSection;
