import React from 'react';
import { graphql, StaticQuery, useStaticQuery } from 'gatsby';
import { makeStyles, Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Img, { FluidObject } from 'gatsby-image';
import ReactHtmlParser from 'react-html-parser';

import Title from 'web-components/lib/components/title';
import Description from 'web-components/lib/components/description';
import Section from 'web-components/lib/components/section';
import { SciencePartnershipsSectionQuery } from '../../generated/graphql';
import { BlockContent } from 'web-components/src/components/block-content';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
  },
  section: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(23.5),
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(17),
    },
  },
  title: {
    lineHeight: '140%',
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(9),
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(7.5),
    },
  },
  itemLeft: {
    [theme.breakpoints.up('sm')]: {
      paddingRight: theme.spacing(2.5),
    },
  },
  itemRight: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(2.5),
    },
  },
  description: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(2.25),
      fontSize: theme.spacing(4.5),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3.5),
    },
  },
  image: {
    borderRadius: '10px',
  },
  grid: {
    [theme.breakpoints.down('xs')]: {
      '& > div:not(:first-child)': {
        paddingTop: theme.spacing(8.75),
      },
    },
  },
}));

const query = graphql`
  query sciencePartnershipsSection {
    background: file(relativePath: { eq: "science-partnerships-bg.jpg" }) {
      childImageSharp {
        fluid(quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    sanitySciencePage {
      partnershipSection {
        header
        partners {
          image {
            ...fluidCustomImageFields_withWebp
          }
          _rawBody
        }
      }
    }
  }
`;

const PartnershipsSection = (): JSX.Element => {
  const styles = useStyles();
  const data = useStaticQuery<SciencePartnershipsSectionQuery>(query);
  const content = data.sanitySciencePage?.partnershipSection;
  return (
    <div className={styles.root}>
      <Section className={styles.section}>
        <Title align="center" className={styles.title} variant="h1">
          {content?.header}
        </Title>
        <Grid container className={styles.grid}>
          {content?.partners?.map((p, i) => (
            <Grid item key={i} xs={12} sm={6} className={i % 2 === 0 ? styles.itemLeft : styles.itemRight}>
              <Img
                className={styles.image}
                alt={p?.image?.imageAlt || ''}
                fluid={p?.image?.image?.asset?.fluid as FluidObject}
              />
              <Description className={styles.description}>
                <BlockContent content={p?._rawBody} />
              </Description>
            </Grid>
          ))}
        </Grid>
      </Section>
    </div>
  );
};

export default PartnershipsSection;
