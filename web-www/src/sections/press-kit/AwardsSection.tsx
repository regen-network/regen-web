import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import { makeStyles } from '@mui/styles';
import Img from 'gatsby-image';

import { Theme } from 'web-components/lib/theme/muiTheme';
import Section from 'web-components/lib/components/section';
import ResponsiveSlider from 'web-components/lib/components/sliders/ResponsiveSlider';
import Title from 'web-components/lib/components/title';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(8),
    },
  },
  slider: {
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(7.5),
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(15),
    },
    '& .slick-slide': {
      [theme.breakpoints.down('xs')]: {
        paddingRight: `${theme.spacing(4.125)} !important`,
      },
    },
    '& a': {
      textDecoration: 'none',
      '&:link, &:visited, &:hover, &:active': {
        textDecoration: 'none',
      },
    },
  },
  itemTitle: {
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(4),
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(4.5),
    },
  },
  image: {
    borderRadius: '5px',
  },
}));

const AwardsSection = (): JSX.Element => {
  const classes = useStyles();

  return (
    <StaticQuery
      query={graphql`
        {
          content: pressKitYaml {
            awardsSection {
              header
              items {
                title
                url
                image {
                  childImageSharp {
                    fluid(quality: 90) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
              }
            }
          }
        }
      `}
      render={data => {
        const content = data.content.awardsSection;
        const items: JSX.Element[] = content.items.map(({ image, url, title }) => (
          <a href={url} target="_blank" rel="noopener noreferrer">
            <Img fluid={image.childImageSharp.fluid} className={classes.image} />
            <Title className={classes.itemTitle} variant="h5">
              {title}
            </Title>
          </a>
        ));
        return (
          <Section withSlider title={content.header} classes={{ title: classes.title }}>
            <ResponsiveSlider
              infinite={false}
              className={classes.slider}
              itemWidth="90%"
              slidesToShow={4}
              items={items}
            />
          </Section>
        );
      }}
    />
  );
};

export default AwardsSection;
