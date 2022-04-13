import React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { graphql, useStaticQuery } from 'gatsby';

import BackgroundSection from '../../components/BackgroundSection';
import { Theme } from 'web-components/lib/theme/muiTheme';
import { TitleDescription } from 'web-components/lib/components/text-layouts';
import Description from 'web-components/lib/components/description';
import { Title } from 'web-components/lib/components/typography';
import ResponsiveSlider from 'web-components/lib/components/sliders/ResponsiveSlider';
import GreenMediaCard from 'web-components/lib/components/cards/GreenMediaCard';
import { ValidatorsWhoSectionQuery } from '../../generated/graphql';

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(19.25),
      paddingBottom: theme.spacing(12.5),
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(17.5),
      paddingBottom: theme.spacing(15),
    },
  },
  title: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(7.75),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(5.25),
      paddingBottom: theme.spacing(3.25),
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
      <TitleDescription
        title={data?.header || ''}
        description={data?._rawBody}
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
          <div key={i} className={styles.validators}>
            <Title align="center" variant="h3" className={styles.title}>
              {v?.header}
            </Title>
            <Description align="center" className={styles.description}>
              {v?.description}
            </Description>

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
              <ResponsiveSlider itemWidth="90%" items={items} />
            </Box>
          </div>
        );
      })}
    </BackgroundSection>
  );
};

export default WhoSection;
