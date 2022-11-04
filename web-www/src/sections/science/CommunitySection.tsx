import React from 'react';
import { Grid, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import HexaImages from '@regen-network/web-components/lib/components/hexa-images';
import MediumIcon from '@regen-network/web-components/lib/components/icons/social/MediumIcon';
import TelegramIcon from '@regen-network/web-components/lib/components/icons/social/TelegramIcon';
import TwitterIcon from '@regen-network/web-components/lib/components/icons/social/TwitterIcon';
import { Title } from '@regen-network/web-components/lib/components/typography';
import { Theme } from '@regen-network/web-components/lib/theme/muiTheme';
import { graphql, StaticQuery } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';

import BackgroundSection from '../../components/BackgroundSection';
import { ScienceCommunitySectionQuery } from '../../generated/graphql';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
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
  description: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(2.25),
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
  caption: {
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
      paddingBottom: theme.spacing(5.5),
    },
  },
  iconContainer: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '50%',
    display: 'block',
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      width: theme.spacing(13),
      height: theme.spacing(13),
    },
    [theme.breakpoints.up(theme.breakpoints.values.tablet)]: {
      width: theme.spacing(18.5),
      height: theme.spacing(18.5),
    },
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(13),
      height: theme.spacing(13),
      marginRight: theme.spacing(2.5),
      marginLeft: theme.spacing(2.5),
    },
    [theme.breakpoints.up('sm')]: {
      '&:not(:last-child)': {
        marginRight: theme.spacing(7.5),
      },
    },
  },
  icon: {
    width: '100%',
    height: '100%',
  },
  icons: {
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  arrow: {
    [theme.breakpoints.up(theme.breakpoints.values.tablet)]: {
      marginLeft: theme.spacing(9.5),
      width: '100%',
      height: '100%',
    },
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      display: 'none',
    },
  },
  connect: {
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
}));

const CommunitySection = (): JSX.Element => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <StaticQuery
      query={graphql`
        query scienceCommunitySection {
          arrow: file(relativePath: { eq: "Arrow.png" }) {
            childImageSharp {
              fluid(quality: 90) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          background: file(relativePath: { eq: "science-community-bg.jpg" }) {
            childImageSharp {
              fluid(quality: 90) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          sanitySciencePage {
            communitySection {
              caption
              header
              members {
                name
                image {
                  imageHref
                  image {
                    asset {
                      url
                    }
                  }
                }
                _rawRole
                _rawDescription
              }
            }
          }
        }
      `}
      render={(data: ScienceCommunitySectionQuery) => {
        const content = data.sanitySciencePage?.communitySection;
        return (
          <BackgroundSection
            className={classes.root}
            linearGradient="unset"
            topSection={false}
            imageData={data.background?.childImageSharp?.fluid}
          >
            <Grid container alignItems="center">
              <Grid
                xs={12}
                sm={6}
                item
                container
                wrap="nowrap"
                className={classes.connect}
              >
                <Title
                  variant="h3"
                  sx={{ textAlign: 'center', pb: [5.5, 'initial'] }}
                >
                  {content?.caption}
                </Title>
                <Img
                  className={classes.arrow}
                  fluid={data.arrow?.childImageSharp?.fluid as FluidObject}
                />
              </Grid>
              <Grid
                xs={12}
                sm={6}
                item
                container
                justifyContent="flex-end"
                className={classes.icons}
              >
                <a
                  href="https://t.me/regennetwork_science"
                  rel="noopener noreferrer"
                  target="_blank"
                  className={classes.iconContainer}
                >
                  <TelegramIcon
                    className={classes.icon}
                    color={theme.palette.primary.main}
                    hoverColor={theme.palette.secondary.main}
                  />
                </a>
                <a
                  href="https://medium.com/regen-network"
                  rel="noopener noreferrer"
                  target="_blank"
                  className={classes.iconContainer}
                >
                  <MediumIcon
                    className={classes.icon}
                    color={theme.palette.primary.main}
                    hoverColor={theme.palette.secondary.main}
                  />
                </a>
                <a
                  href="http://twitter.com/regen_network"
                  rel="noopener noreferrer"
                  target="_blank"
                  className={classes.iconContainer}
                >
                  <TwitterIcon
                    className={classes.icon}
                    color={theme.palette.primary.main}
                    hoverColor={theme.palette.secondary.main}
                  />
                </a>
              </Grid>
            </Grid>
            <Title variant="h1" sx={{ pt: [18.5, 38.5], pb: [7.5, 9] }}>
              {content?.header}
            </Title>
            <HexaImages
              items={(content?.members || []).map(m => {
                return {
                  name: m?.name,
                  description: m?._rawDescription,
                  role: m?._rawRole,
                  imgSrc: m?.image?.image?.asset?.url,
                } as any;
              })}
            />
          </BackgroundSection>
        );
      }}
    />
  );
};

export default CommunitySection;
