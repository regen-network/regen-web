import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Grid, makeStyles, Theme, Typography } from '@material-ui/core';

import BackgroundSection from '../../components/BackgroundSection';
import { FluidObject } from 'gatsby-image';
import GreenTopIconCard from 'web-components/src/components/cards/GreenTopIconCard';
import { MainnetWhatsNextSectionQuery } from '../../generated/graphql';
import { BlockContent } from 'web-components/src/components/block-content';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(10),
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 900,
    margin: theme.spacing(7, 0, 4),
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(10),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(8),
    },
  },
  description: {
    color: 'white',
    textAlign: 'center',
    maxWidth: theme.spacing(150),
    fontSize: theme.spacing(5),
    margin: theme.spacing(5, 0),
  },
  card: {
    minHeight: '95%',
  },
}));

const query = graphql`
  query mainnetWhatsNextSection {
    background: file(relativePath: { eq: "mainnet-whats-next.png" }) {
      childImageSharp {
        fluid(quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    sanityMainnetPage {
      whatsNextSection {
        title
        _rawDescription
        infoItems {
          title
          _rawDescription
          gitLink
          icon {
            image {
              asset {
                url
              }
            }
          }
        }
      }
    }
  }
`;

const WhatsNextSection: React.FC = () => {
  const styles = useStyles();
  const { background, sanityMainnetPage } = useStaticQuery<MainnetWhatsNextSectionQuery>(query);
  const content = sanityMainnetPage?.whatsNextSection;
  return (
    <BackgroundSection
      className={styles.root}
      linearGradient="linear-gradient(209.5deg, rgba(250, 235, 209, 0.8) 12.63%, rgba(125, 201, 191, 0.8) 44.03%, rgba(81, 93, 137, 0.8) 75.43%);"
      imageData={background?.childImageSharp?.fluid as any}
    >
      <Grid container direction="column" alignItems="center">
        <Typography variant="h1" className={styles.title}>
          {content?.title}
        </Typography>
        <Typography className={styles.description}>
          <BlockContent content={content?._rawDescription} />
        </Typography>
        <Grid container direction="row" justify="center">
          {content?.infoItems?.map((item, i) => (
            <Grid item key={i}>
              <GreenTopIconCard
                key={i}
                className={styles.card}
                description={item?._rawDescription}
                title={item?.title || ''}
                linkUrl={item?.gitLink || ''}
                linkText="View on Github"
                imgSrc={item?.icon?.image?.asset?.url || ''}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </BackgroundSection>
  );
};

export default WhatsNextSection;
