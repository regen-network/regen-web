import React from 'react';
import { makeStyles } from '@mui/styles';
import { graphql, useStaticQuery } from 'gatsby';

import BackgroundSection from '../../components/BackgroundSection';
import { ValidatorsTopSectionQuery } from '../../generated/graphql';

const useStyles = makeStyles(() => ({
  section: {
    filter: 'drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.05))',
  },
}));

const query = graphql`
  query validatorsTopSection {
    background: file(relativePath: { eq: "validators-top-bg.png" }) {
      childImageSharp {
        fluid(quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    sanityValidatorsPage {
      topSection {
        title
        body
      }
    }
  }
`;

const TopSection = (): JSX.Element => {
  const gradient =
    'linear-gradient(180deg, rgba(0, 0, 0, 0.684) 0%, rgba(0, 0, 0, 0) 97.78%), linear-gradient(235.95deg, rgba(250, 235, 209, 0.7) 22.17%, rgba(125, 201, 191, 0.7) 46.11%, rgba(81, 93, 137, 0.7) 70.05%)';
  const styles = useStyles();
  const { background, sanityValidatorsPage } =
    useStaticQuery<ValidatorsTopSectionQuery>(query);
  const data = sanityValidatorsPage?.topSection;
  return (
    <BackgroundSection
      linearGradient={gradient}
      header={data?.title || ''}
      body={data?.body || ''}
      className={styles.section}
      imageData={background?.childImageSharp?.fluid}
    />
  );
};

export default TopSection;
