import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';

import BackgroundSection from '../../components/BackgroundSection';
import GreenTopIconCard from 'web-components/lib/components/cards/GreenTopIconCard';
import { BlockContent } from 'web-components/src/components/block-content';
import { Body, Title } from 'web-components/lib/components/typography';

import type { Theme } from 'web-components/lib/theme/muiTheme';
import type { MainnetWhatsNextSectionQuery } from '../../generated/graphql';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(10),
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
  const { background, sanityMainnetPage } =
    useStaticQuery<MainnetWhatsNextSectionQuery>(query);
  const content = sanityMainnetPage?.whatsNextSection;
  return (
    <BackgroundSection
      className={styles.root}
      linearGradient="linear-gradient(209.5deg, rgba(250, 235, 209, 0.8) 12.63%, rgba(125, 201, 191, 0.8) 44.03%, rgba(81, 93, 137, 0.8) 75.43%);"
      imageData={background?.childImageSharp?.fluid as any}
    >
      <Grid container direction="column" alignItems="center">
        <Title
          variant="h2"
          mobileVariant="h3"
          color="primary"
          align="center"
          sx={{ mt: 7, mb: 4 }}
        >
          {content?.title}
        </Title>
        <Body size="xl" color="primary" align="center">
          <BlockContent content={content?._rawDescription} />
        </Body>
        <div>
          <Grid container direction="row" justifyContent="center">
            {content?.infoItems?.map((item, i) => (
              <Grid item key={i}>
                <GreenTopIconCard
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
        </div>
      </Grid>
    </BackgroundSection>
  );
};

export default WhatsNextSection;
