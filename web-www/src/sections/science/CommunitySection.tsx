import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import { makeStyles, DefaultTheme as Theme, useTheme } from '@mui/styles';
import Grid from '@mui/material/Grid';
import { GatsbyImage } from 'gatsby-plugin-image';

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
    [theme.breakpoints.down('xs')]: {
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
    [theme.breakpoints.down('xs')]: {
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
      query={graphql`{
  arrow: file(relativePath: {eq: "Arrow.png"}) {
    childImageSharp {
      gatsbyImageData(quality: 90, layout: FULL_WIDTH)
    }
  }
  background: file(relativePath: {eq: "science-community-bg.jpg"}) {
    childImageSharp {
      gatsbyImageData(quality: 90, layout: FULL_WIDTH)
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
            imageData={data.background.childImageSharp.gatsbyImageData}
          >
            <Grid container alignItems="center">
              <Grid xs={12} sm={6} item container wrap="nowrap" className={classes.connect}>
                <Title className={classes.caption} variant="h3">
                  {content.caption}
                </Title>
                <GatsbyImage
                  image={data.arrow.childImageSharp.gatsbyImageData}
                  className={classes.arrow} />
              </Grid>
              <Grid xs={12} sm={6} item container justify="flex-end" className={classes.icons}>
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
