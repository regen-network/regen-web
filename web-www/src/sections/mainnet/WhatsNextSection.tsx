import React from 'react';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import GreenTopIconCard from '@regen-network/web-components/lib/components/cards/GreenTopIconCard';
import {
  Body,
  Title,
} from '@regen-network/web-components/lib/components/typography';
import type { Theme } from '@regen-network/web-components/lib/theme/muiTheme';
import { BlockContent } from '@regen-network/web-components/lib/components/block-content';
import { graphql, useStaticQuery } from 'gatsby';

import BackgroundSection from '../../components/BackgroundSection';
import type { MainnetWhatsNextSectionQuery } from '../../generated/graphql';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
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
        <Body
          as="div"
          size="xl"
          color="primary"
          align="center"
          sx={{ maxWidth: 658, pt: 4, mb: [14, 20] }}
        >
          <BlockContent content={content?._rawDescription} />
        </Body>
        <Grid container direction="row" justifyContent="center" gap={7}>
          {content?.infoItems?.map((item, i) => (
            <Grid item key={i}>
              <GreenTopIconCard
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
