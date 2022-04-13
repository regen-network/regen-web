import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Img, { FluidObject } from 'gatsby-image';

import { Theme } from 'web-components/lib/theme/muiTheme';
import { Title } from 'web-components/lib/components/typography';
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
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(17),
    },
  },
  title: {
    lineHeight: '140%',
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(9),
    },
    [theme.breakpoints.down('sm')]: {
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
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(3.5),
    },
  },
  image: {
    borderRadius: '10px',
  },
  grid: {
    [theme.breakpoints.down('sm')]: {
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
            <Grid
              item
              key={i}
              xs={12}
              sm={6}
              className={i % 2 === 0 ? styles.itemLeft : styles.itemRight}
            >
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
