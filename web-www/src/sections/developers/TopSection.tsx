import React from 'react';
import { makeStyles } from '@mui/styles';
import { Theme } from '@regen-network/web-components/lib/theme/muiTheme';
import { graphql, useStaticQuery } from 'gatsby';

import BackgroundSection from '../../components/BackgroundSection';
import { DevelopersTopSectionQuery } from '../../generated/graphql';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  topSection: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(64),
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(60),
    },
  },
  title: {
    fontWeight: 'normal',
    fontFamily: theme.typography.overline.fontFamily,
    lineHeight: '160%',
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(4.5),
    },
  },
}));

const query = graphql`
  query developersTopSection {
    background: file(relativePath: { eq: "developers-top-image.jpg" }) {
      childImageSharp {
        fluid(quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    sanityDevelopersPage {
      topSection {
        title
        body
      }
    }
  }
`;

const TopSection = (): JSX.Element => {
  const styles = useStyles();
  const { sanityDevelopersPage, background } =
    useStaticQuery<DevelopersTopSectionQuery>(query);
  const data = sanityDevelopersPage?.topSection;
  const imageData = background?.childImageSharp?.fluid;
  return (
    <BackgroundSection
      linearGradient="linear-gradient(220.67deg, rgba(250, 235, 209, 0.6) 21.4%, rgba(125, 201, 191, 0.6) 46.63%, rgba(81, 93, 137, 0.6) 71.86%), linear-gradient(180deg, rgba(0, 0, 0, 0.684) 0%, rgba(0, 0, 0, 0) 97.78%)"
      header={data?.title}
      body={data?.body}
      imageData={imageData}
      titleClassName={styles.title}
      titleVariant="h2"
      className={styles.topSection}
    />
  );
};

export default TopSection;
