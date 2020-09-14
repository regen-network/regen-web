import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Theme, makeStyles } from '@material-ui/core/styles';
import Img from 'gatsby-image';

import Section from 'web-components/lib/components/section';
import TitleDescription from 'web-components/lib/components/title-description';

const useStyles = makeStyles((theme: Theme) => ({
  img: {
    zIndex: -1,
  },
  sectionWrapper: {
    position: 'relative',
    width: '100vw',
    paddingBottom: theme.spacing(25),
  },
  bgGradient: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    background: 'linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)',
  },
  titleDesc: {
    zIndex: 1,
  },
}));

const LedgerSection = (): JSX.Element => {
  const data = useStaticQuery(graphql`
    query {
      background: file(relativePath: { eq: "developers-ledger-bg.jpg" }) {
        childImageSharp {
          fluid(quality: 90) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      text: developersYaml {
        ledgerSection {
          header
          body
        }
      }
    }
  `);
  const content = data.text.ledgerSection;
  const imageData = data.background.childImageSharp.fluid;
  const classes = useStyles();
  return (
    <div className={classes.sectionWrapper}>
      <Section>
        <TitleDescription
          className={classes.titleDesc}
          title={content.header}
          description={content.body}
        ></TitleDescription>
      </Section>
      <div className={classes.bgGradient}>
        <Img className={classes.img} fluid={imageData} />
      </div>
    </div>
  );
};

export default LedgerSection;
