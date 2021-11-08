import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import { makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';
// import Img from 'gatsby-image';

import { ImageItemProps } from 'web-components/lib/components/image-item';
import ImageItems from 'web-components/lib/components/sliders/ImageItems';
import Section from 'web-components/src/components/section';
import { useAllHomePageWebQuery, ValuesSection as ValuesProps } from '../../generated/sanity-graphql';
import { client } from '../../../sanity';
import { HomeValuesSectionQuery } from '../../generated/graphql';
import SanityImage from 'gatsby-plugin-sanity-image';

const useStyles = makeStyles((theme: Theme) => ({
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

const HomeValues: React.FC<{ className?: string }> = ({ className }) => {
  const imgData: HomeValuesSectionQuery = useStaticQuery(graphql`
    query homeValuesSection {
      bg: file(relativePath: { eq: "topo-bg-top.png" }) {
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
      allSanityHomePageWeb {
        nodes {
          valuesSection {
            header
            imageItems {
              title
              description
              image {
                ...Image
              }
            }
          }
        }
      }
    }
  `);
  const styles = useStyles();

  const content = imgData.allSanityHomePageWeb.nodes[0].valuesSection;

  const imageItems: ImageItemProps[] = (content?.imageItems || []).map(item => {
    return {
      title: item?.title || '',
      description: item?.description || '',
      img: <SanityImage {...(item?.image as any)} alt={item?.title} />,
    };
  }) as ImageItemProps[];

  return (
    <BackgroundImage
      Tag="section"
      className={clsx(className, styles.section)}
      fluid={imgData?.bg?.childImageSharp?.fluid as any}
    >
      <Section
        withSlider
        className={styles.root}
        titleVariant="h1"
        titleLineHeight="130%"
        title={content?.header || ''}
      >
        <div className={styles.sliderContainer}>
          <ImageItems imageClassName={styles.image} titleVariant="h3" items={imageItems} />
        </div>
      </Section>
    </BackgroundImage>
  );
};

export default HomeValues;
