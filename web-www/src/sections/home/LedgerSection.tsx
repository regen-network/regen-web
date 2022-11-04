import React from 'react';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import ContainedButton from '@regen-network/web-components/lib/components/buttons/ContainedButton';
import {
  Body,
  Title,
} from '@regen-network/web-components/lib/components/typography';
import { Theme } from '@regen-network/web-components/lib/theme/muiTheme';
import { graphql, useStaticQuery } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import Img from 'gatsby-image';

import { HomeLedgerSectionQuery } from '../../generated/graphql';

let useStyles = makeStyles((theme: Theme) => ({
  grid: {
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      paddingTop: theme.spacing(20),
      paddingBottom: theme.spacing(51.25),
      flexDirection: 'column',
    },
    [theme.breakpoints.up(theme.breakpoints.values.tablet)]: {
      paddingTop: theme.spacing(24.25),
      paddingRight: theme.spacing(30.25),
      paddingBottom: theme.spacing(39.5),
    },
  },
  title: {
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(6),
    },
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      paddingTop: theme.spacing(10),
    },
  },
  img: {
    width: '100%',
  },
  imgContainer: {
    [theme.breakpoints.up(theme.breakpoints.values.tablet)]: {
      paddingRight: theme.spacing(25),
      flexGrow: 0,
      maxWidth: '45%',
      flexBasis: '45%',
    },
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      paddingRight: theme.spacing(4),
      width: '100%',
    },
  },
  green: {
    color: theme.palette.secondary.main,
  },
  text: {
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      paddingRight: theme.spacing(4),
      paddingLeft: theme.spacing(4),
    },
    [theme.breakpoints.up(theme.breakpoints.values.tablet)]: {
      flexGrow: 0,
      maxWidth: '55%',
      flexBasis: '55%',
    },
  },
}));

const query = graphql`
  query homeLedgerSection {
    bg: file(relativePath: { eq: "farm-background.png" }) {
      childImageSharp {
        fluid(quality: 90, maxWidth: 1920) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    ledger: file(relativePath: { eq: "ledger.png" }) {
      childImageSharp {
        fluid(quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    sanityHomePageWeb {
      ledgerDescription
    }
  }
`;

const HomeLedger: React.FC = () => {
  const styles = useStyles();
  const data = useStaticQuery<HomeLedgerSectionQuery>(query);
  const content = data.sanityHomePageWeb;

  return (
    <BackgroundImage
      Tag="section"
      fluid={data.bg?.childImageSharp?.fluid as any}
    >
      <Grid className={styles.grid} container alignItems="center" wrap="nowrap">
        <Grid className={styles.imgContainer} item xs={12}>
          <Img
            className={styles.img}
            fluid={data.ledger?.childImageSharp?.fluid as any}
          />
        </Grid>
        <Grid item xs={12} className={styles.text}>
          <Title align="left" variant="h1" className={styles.title}>
            <span className={styles.green}>Regen Ledger</span> powers{' '}
            <span className={styles.green}>Regen Marketplace</span>
          </Title>
          <Body size="xl" mobileSize="md" sx={{ pb: [6, 8.5], pt: [3, 5] }}>
            {content?.ledgerDescription}
          </Body>
          <ContainedButton size="large" href="/developers">
            Learn More
          </ContainedButton>
        </Grid>
      </Grid>
    </BackgroundImage>
  );
};

export default HomeLedger;
