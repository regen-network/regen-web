import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { makeStyles } from '@mui/styles';
import Img from 'gatsby-image';

import { Theme } from 'web-components/lib/theme/muiTheme';
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
  cosmosImg: {
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(65.5),
      height: theme.spacing(12),
      margin: `0 auto ${theme.spacing(10.5)}`,
    },
    [theme.breakpoints.down('xs')]: {
      width: '60%',
      margin: `0 auto ${theme.spacing(6.5)}`,
    },
  },
}));

const LedgerSection = (): JSX.Element => {
  const data = useStaticQuery(graphql`{
  background: file(relativePath: {eq: "developers-ledger-bg.jpg"}) {
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
      cosmosImage {
        childImageSharp {
          fluid(quality: 90) {
        ...GatsbyImageSharpFluid_withWebp
      }
        }
      }
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
        <Img
          fluid={content.cosmosImage.childImageSharp.fluid}
          className={classes.cosmosImg} />
        <TitleDescription
          className={classes.titleDesc}
          title={content.header}
          description={content.body}
        ></TitleDescription>
      </Section>
      <div className={classes.bgGradient}>
        <Img fluid={imageData} className={classes.img} />
      </div>
    </div>
  );
};

export default LedgerSection;
