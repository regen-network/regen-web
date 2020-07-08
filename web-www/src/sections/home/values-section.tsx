import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Grid from '@material-ui/core/Grid';
import BackgroundImage from 'gatsby-background-image';
import Title from 'web-components/lib/components/title';
import { makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';
import Img from 'gatsby-image';

import { ImageItemProps } from 'web-components/lib/components/image-item';
import ImageItems from 'web-components/lib/components/sliders/ImageItems';
import Section from '../../components/Section';

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
	'& h1': {
		[theme.breakpoints.down('xs')]: {
			marginBottom: theme.spacing(5.5)
		},
		[theme.breakpoints.up('sm')]: {
			marginBottom: theme.spacing(5.5)
		},
		
	},
    '& h3': {
      'margin-bottom': theme.spacing(15),
      'line-height': '130%',
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
  title: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.3125rem',
    },
  }
}));

const HomeValues = ({ className }: Props) => {
  const data = useStaticQuery(graphql`
    query {
      bg: file(relativePath: { eq: "topography.jpg" }) {
        childImageSharp {
          fluid(quality: 90, maxWidth: 1920) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      ellipse: file(relativePath: { eq: "green-ellipse.png" }) {
        childImageSharp {
          fixed(quality: 90, width: 120) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
	  }
	  text: contentYaml {
        valuesSection {
          header
          imageItems {
            image {
              childImageSharp {
                fixed(quality: 90, width: 120) {
                  ...GatsbyImageSharpFixed_withWebp
                }
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
    img: !image.childImageSharp && image.extension === 'svg' ? (
      <img src={image.publicURL} alt={image.publicURL} />
    ) : (
      <Img fixed={image.childImageSharp.fixed} />
    ),
    title,
    description,
  }));


  return (
    <BackgroundImage
      Tag="section"
      className={clsx(className, classes.section)}
      fluid={data.bg.childImageSharp.fluid}
    >
      <Section withSlider className={classes.root} titleVariant="h1" titleLineHeight="130%" title={content.header}>
		  		<ImageItems withEllipse items={imageItems} />
      
    </Section>
    </BackgroundImage>
  );
};

export default HomeValues;
