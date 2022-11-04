import React from 'react';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import Section from '@regen-network/web-components/lib/components/section';
import { TitleBody } from '@regen-network/web-components/lib/components/text-layouts';
import { Theme } from '@regen-network/web-components/lib/theme/muiTheme';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import SanityImage from 'gatsby-plugin-sanity-image';

import { DevLedgerSectionQuery } from '../../generated/graphql';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'relative',
    width: '100vw',
    paddingBottom: theme.spacing(25),
  },
  img: {
    zIndex: -1,
  },
  bgGradient: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    background:
      'linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)',
  },
  cosmosImg: {
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(65.5),
      height: theme.spacing(12),
      margin: `0 auto ${theme.spacing(10.5)}`,
    },
    [theme.breakpoints.down('sm')]: {
      width: '60%',
      margin: `0 auto ${theme.spacing(6.5)}`,
    },
  },
}));

const query = graphql`
  query devLedgerSection {
    background: file(relativePath: { eq: "developers-ledger-bg.jpg" }) {
      childImageSharp {
        fluid(quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    sanityDevelopersPage {
      ledgerSection {
        header
        _rawBody
        cosmosImage {
          ...ImageWithPreview
        }
      }
    }
  }
`;

const LedgerSection = (): JSX.Element => {
  const { background, sanityDevelopersPage } =
    useStaticQuery<DevLedgerSectionQuery>(query);
  const data = sanityDevelopersPage?.ledgerSection;
  const backgroundImg = background?.childImageSharp?.fluid;
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <Section>
        <Box display="flex" justifyContent="center">
          {data?.cosmosImage && (
            <SanityImage
              className={styles.cosmosImg}
              alt="cosmos image"
              {...(data.cosmosImage as any)}
            />
          )}
        </Box>
        <TitleBody
          title={`${data?.header}`}
          body={data?._rawBody}
          sx={{ root: { zIndex: 1 } }}
        />
      </Section>
      <div className={styles.bgGradient}>
        <Img
          className={styles.img}
          alt="background"
          fluid={backgroundImg as any}
        />
      </div>
    </div>
  );
};

export default LedgerSection;
