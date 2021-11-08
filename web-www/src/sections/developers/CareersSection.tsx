import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { makeStyles, Theme } from '@material-ui/core';

import Title from 'web-components/lib/components/title';
import Description from 'web-components/lib/components/description';
import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import BackgroundSection from '../../components/BackgroundSection';
import { BlockContent } from 'web-components/src/components/block-content';

import { DevCareersSectionQuery } from '../../generated/graphql';

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(17.75),
    },
  },
  title: {
    lineHeight: '145%',
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(9),
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(6),
    },
  },
  caption: {
    fontWeight: 'normal',
    fontFamily: theme.typography.overline.fontFamily,
    color: theme.palette.secondary.main,
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(7),
      lineHeight: '130%',
      paddingBottom: theme.spacing(6),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(5),
      lineHeight: '160%',
      paddingBottom: theme.spacing(3.75),
    },
  },
  description: {
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4.5),
      maxWidth: theme.spacing(188.5),
      margin: '0 auto',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(4),
    },
  },
  buttonContainer: {
    textAlign: 'center',
    marginTop: theme.spacing(7.5),
  },
  button: {
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4.5),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3.5),
    },
  },
}));

const query = graphql`
  query devCareersSection {
    background: file(relativePath: { eq: "developers-careers-bg.jpg" }) {
      childImageSharp {
        fluid(quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    allSanityDevelopersPage {
      nodes {
        careersSection {
          caption
          header
          _rawBody
          button {
            ...buttonFields
          }
        }
      }
    }
  }
`;

const CareersSection: React.FC = () => {
  const styles = useStyles();
  const data: DevCareersSectionQuery = useStaticQuery(query);
  const content = data?.allSanityDevelopersPage?.nodes?.[0].careersSection;
  return (
    <BackgroundSection
      linearGradient="unset"
      topSection={false}
      className={styles.section}
      imageData={data?.background?.childImageSharp?.fluid}
    >
      <div className={styles.caption}>{content?.caption}</div>
      <Title align="center" className={styles.title} variant="h2">
        {content?.header}
      </Title>
      <Description align="center" className={styles.description}>
        <BlockContent content={content?._rawBody} />
      </Description>
      <div className={styles.buttonContainer}>
        <OutlinedButton
          className={styles.button}
          target="_blank"
          href={`${content?.button?.buttonLink?.buttonHref}`}
        >
          {content?.button?.buttonText}
        </OutlinedButton>
      </div>
    </BackgroundSection>
  );
};

export default CareersSection;
