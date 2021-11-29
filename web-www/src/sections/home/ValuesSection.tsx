import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';
import clsx from 'clsx';
import { GatsbyImage } from 'gatsby-plugin-image';

import { ImageItemProps } from 'web-components/lib/components/image-item';
import ImageItems from 'web-components/lib/components/sliders/ImageItems';
import Section from 'web-components/src/components/section';

interface Props {
  className?: string;
}

let useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(14),
    },
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(25),
    },
  },
  section: {
    '& .MuiGrid-item': {
      'max-width': theme.spacing(70),
    },
    ' & p': {
      'font-family': 'Lato',
      'font-size': theme.typography.body2.fontSize,
      'line-height': '150%',
      color: theme.palette.primary.contrastText,
    },
    ' & h4': {
      'margin-bottom': theme.spacing(5),
    },
    'text-align': 'center',
    height: 'min-content',
    'padding-bottom': theme.spacing(15),
    'padding-top': theme.spacing(15),
  },
  sliderContainer: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(7.75),
    },
  },
  image: {
    height: theme.spacing(39),
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(9),
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(6.25),
    },
  },
}));

const HomeValues = ({ className }: Props) => {
  const data = useStaticQuery(graphql`{
  bg: file(relativePath: {eq: "topo-bg-top.png"}) {
    childImageSharp {
      gatsbyImageData(quality: 90, layout: FULL_WIDTH)
    }
  }
  ellipse: file(relativePath: {eq: "green-ellipse.png"}) {
    childImageSharp {
      gatsbyImageData(quality: 90, width: 120, layout: FIXED)
    }
  }
  text: homeYaml {
    valuesSection {
      header
      imageItems {
        image {
          childImageSharp {
            gatsbyImageData(quality: 90, width: 120, layout: FIXED)
          }
          extension
          publicURL
        }
        header
        description
      }
    }
  }
}
`);
  const content = data.text.valuesSection;
  const classes = useStyles();

  const imageItems: ImageItemProps[] = content.imageItems.map(({ image, header: title, description }) => ({
    img:
      !image.childImageSharp && image.extension === 'svg' ? (
        <img src={image.publicURL} alt={image.publicURL} />
      ) : (
        <GatsbyImage image={image.childImageSharp.gatsbyImageData} />
      ),
    title,
    description,
  }));

  return (
    <BackgroundImage
      Tag="section"
      className={clsx(className, classes.section)}
      fluid={data.bg.childImageSharp.gatsbyImageData}
    >
      <Section
        withSlider
        className={classes.root}
        titleVariant="h1"
        titleLineHeight="130%"
        title={content.header}
      >
        <div className={classes.sliderContainer}>
          <ImageItems imageClassName={classes.image} titleVariant="h3" items={imageItems} />
        </div>
      </Section>
    </BackgroundImage>
  );
};

export default HomeValues;
