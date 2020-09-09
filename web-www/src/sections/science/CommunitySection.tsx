import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Img from 'gatsby-image';
import ReactHtmlParser from 'react-html-parser';
import Title from 'web-components/lib/components/title';
import TwitterIcon from 'web-components/lib/components/icons/social/TwitterIcon';
import TelegramIcon from 'web-components/lib/components/icons/social/TelegramIcon';
import MediumIcon from 'web-components/lib/components/icons/social/MediumIcon';
import HexaImages from 'web-components/lib/components/hexa-images';
import BackgroundSection from '../../components/BackgroundSection';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(23.5),
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(17),
    },
  },
  title: {
    lineHeight: '140%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(38.5),
      paddingBottom: theme.spacing(9),
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(18.5),
      paddingBottom: theme.spacing(7.5),
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
    [theme.breakpoints.down('xs')]: {
      '& > div:not(:first-child)': {
        paddingTop: theme.spacing(8.75),
      },
    },
  },
  caption: {
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
      paddingBottom: theme.spacing(5.5),
    },
  },
  iconContainer: {
    backgroundColor: theme.palette.secondary.light,
    borderRadius: '50%',
    display: 'block',
    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(13),
      height: theme.spacing(13),
      marginRight: theme.spacing(2.5),
      marginLeft: theme.spacing(2.5),
    },
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(18.5),
      height: theme.spacing(18.5),
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
    [theme.breakpoints.down('xs')]: {
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
        query {
          background: file(relativePath: { eq: "science-community-bg.jpg" }) {
            childImageSharp {
              fluid(quality: 90) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          content: scienceYaml {
            communitySection {
              caption
              header
              members {
                name
                role
                image {
                  publicURL
                }
                description
              }
            }
          }
        }
      `}
      render={data => {
        const content = data.content.communitySection;
        return (
          <BackgroundSection
            className={classes.root}
            linearGradient="unset"
            topSection={false}
            imageData={data.background.childImageSharp.fluid}
          >
            <Grid container alignItems="center">
              <Grid xs={12} sm={3} md={5} item>
                <Title className={classes.caption} variant="h3">
                  {content.caption}
                </Title>
              </Grid>
              <Grid xs={12} sm={9} md={7} item container justify="flex-end" className={classes.icons}>
                <a
                  href="http://t.me/regennetwork_public"
                  rel="noopener noreferrer"
                  target="_blank"
                  className={classes.iconContainer}
                >
                  <TelegramIcon className={classes.icon} color={theme.palette.secondary.main} />
                </a>
                <a
                  href="http://t.me/regennetwork_public"
                  rel="noopener noreferrer"
                  target="_blank"
                  className={classes.iconContainer}
                >
                  <TelegramIcon className={classes.icon} color={theme.palette.secondary.main} />
                </a>
                <a
                  href="https://medium.com/regen-network"
                  rel="noopener noreferrer"
                  target="_blank"
                  className={classes.iconContainer}
                >
                  <MediumIcon className={classes.icon} color={theme.palette.secondary.main} />
                </a>
                <a
                  href="http://twitter.com/regen_network"
                  rel="noopener noreferrer"
                  target="_blank"
                  className={classes.iconContainer}
                >
                  <TwitterIcon className={classes.icon} color={theme.palette.secondary.main} />
                </a>
              </Grid>
            </Grid>
            <Title className={classes.title} variant="h1">
              {content.header}
            </Title>
            <HexaImages
              items={content.members.map(({ name, description, role, image }, i) => ({
                name,
                description,
                role,
                imgSrc: image.publicURL,
              }))}
            />
          </BackgroundSection>
        );
      }}
    />
  );
};

export default CommunitySection;
