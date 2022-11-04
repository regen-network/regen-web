import React from 'react';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import Section from '@regen-network/web-components/lib/components/section';
import {
  Body,
  Title,
} from '@regen-network/web-components/lib/components/typography';
import { Theme } from '@regen-network/web-components/lib/theme/muiTheme';
import { BlockContent } from '@regen-network/web-components/lib/components/block-content';
import { graphql, useStaticQuery } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';

import { SciencePartnershipsSectionQuery } from '../../generated/graphql';

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
        <Title align="center" variant="h1" sx={{ pb: [7.5, 9] }}>
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
              <Body as="div" size="lg" mobileSize="sm" pt={[0, 3.5]}>
                <BlockContent content={p?._rawBody} />
              </Body>
            </Grid>
          ))}
        </Grid>
      </Section>
    </div>
  );
};

export default PartnershipsSection;
