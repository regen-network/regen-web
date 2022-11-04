import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import GreenMediaCard from '@regen-network/web-components/lib/components/cards/GreenMediaCard';
import ResponsiveSlider from '@regen-network/web-components/lib/components/sliders/ResponsiveSlider';
import { TitleBody } from '@regen-network/web-components/lib/components/text-layouts';
import {
  Body,
  Title,
} from '@regen-network/web-components/lib/components/typography';
import { Theme } from '@regen-network/web-components/lib/theme/muiTheme';
import { graphql, useStaticQuery } from 'gatsby';

import BackgroundSection from '../../components/BackgroundSection';
import { ValidatorsWhoSectionQuery } from '../../generated/graphql';

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(19.25),
      paddingBottom: theme.spacing(37.5),
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(17.5),
      paddingBottom: theme.spacing(15.25),
    },
  },
  description: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(10),
    },
  },
  validators: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(20),
      paddingTop: theme.spacing(5),
    },
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(5),
      paddingTop: theme.spacing(15),
    },
  },
  card: {
    height: theme.spacing(62.5),
  },
  slider: {
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(4),
    },
  },
}));

const query = graphql`
  query validatorsWhoSection {
    background: file(relativePath: { eq: "who-validators-bg.jpg" }) {
      childImageSharp {
        fluid(quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    sanityValidatorsPage {
      whoSection {
        header
        _rawBody
        validators {
          header
          description
          members {
            link {
              buttonHref
            }
            image {
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
  }
`;

const WhoSection = (): JSX.Element => {
  const styles = useStyles();
  const { background, sanityValidatorsPage } =
    useStaticQuery<ValidatorsWhoSectionQuery>(query);
  const data = sanityValidatorsPage?.whoSection;
  return (
    <BackgroundSection
      linearGradient="unset"
      className={styles.section}
      imageData={background?.childImageSharp?.fluid}
      topSection={false}
    >
      <TitleBody
        title={data?.header || ''}
        body={data?._rawBody}
        bodySize={['md', 'xl']}
        sx={{ body: { maxWidth: 946 } }}
      />
      {(data?.validators || []).map((v, i) => {
        const items: JSX.Element[] = (v?.members || []).map((m, j) => (
          <GreenMediaCard
            key={j}
            className={styles.card}
            imageUrl={m?.image?.image?.asset?.url || ''}
            link={m?.link?.buttonHref || ''}
          />
        ));

        return (
          <Box
            key={i}
            sx={{ pb: [0, 7], pt: [15, 20], ':last-of-type': { pb: [4, 10] } }}
          >
            <Title
              align="center"
              variant="h3"
              mobileVariant="h5"
              pb={[3.25, 7.75]}
            >
              {v?.header}
            </Title>
            <Body align="center" pb={[0, 10]}>
              {v?.description}
            </Body>

            <Box display={{ xs: 'none', sm: 'block' }}>
              <Grid container justifyContent="center" spacing={7}>
                {items.map((item: JSX.Element, index: number) => (
                  <Grid key={index} item xs={6} md={4}>
                    {item}
                  </Grid>
                ))}
              </Grid>
            </Box>
            <Box display={{ xs: 'block', sm: 'none' }}>
              <ResponsiveSlider
                itemWidth="90%"
                items={items}
                className={styles.slider}
              />
            </Box>
          </Box>
        );
      })}
    </BackgroundSection>
  );
};

export default WhoSection;
