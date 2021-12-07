import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import BackgroundSection from '../../components/BackgroundSection';
import { Theme } from 'web-components/lib/theme/muiTheme';
import TitleDescription from 'web-components/lib/components/title-description';
import Description from 'web-components/lib/components/description';
import Title from 'web-components/lib/components/title';
import ResponsiveSlider from 'web-components/lib/components/sliders/ResponsiveSlider';
import GreenMediaCard from 'web-components/lib/components/cards/GreenMediaCard';

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(19.25),
      paddingBottom: theme.spacing(12.5),
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(17.5),
      paddingBottom: theme.spacing(15),
    },
  },
  title: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(7.75),
    },
    [theme.breakpoints.down('xs')]: {
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
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(5),
      paddingTop: theme.spacing(15),
    },
  },
  card: {
    height: theme.spacing(62.5),
  },
}));

const WhoSection = (): JSX.Element => {
  const classes = useStyles();

  return (
    <StaticQuery
      query={graphql`
        {
          background: file(relativePath: { eq: "who-validators-bg.jpg" }) {
            childImageSharp {
              fluid(quality: 90) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          text: validatorsYaml {
            whoSection {
              header
              body
              validators {
                header
                description
                members {
                  image {
                    publicURL
                    childImageSharp {
                      fluid(quality: 90) {
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                  link
                }
              }
            }
          }
        }
      `}
      render={data => {
        const content = data.text.whoSection;
        return (
          <BackgroundSection
            linearGradient="unset"
            className={classes.section}
            imageData={data.background.childImageSharp.fluid}
            topSection={false}
          >
            <TitleDescription title={content.header} description={content.body} />
            {content.validators.map((v, i: number) => {
              const items: JSX.Element[] = v.members.map((m, j: number) => (
                <GreenMediaCard className={classes.card} imageUrl={m.image.publicURL} link={m.link} />
              ));
              return (
                <div key={i} className={classes.validators}>
                  <Title align="center" variant="h3" className={classes.title}>
                    {v.header}
                  </Title>
                  <Description align="center" className={classes.description}>
                    {v.description}
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
      }}
    />
  );
};

export default WhoSection;
