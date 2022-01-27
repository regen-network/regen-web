import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import { makeStyles, Theme, Typography } from '@material-ui/core';

import Countdown from 'web-components/src/components/countdown';
import BackgroundSection from '../../components/BackgroundSection';
import { MainnetTopSectionQuery } from '../../generated/graphql';

const useStyles = makeStyles((theme: Theme) => ({
  headerWrap: {
    display: 'flex',
    flexDirection: 'column',
  },
  countdown: {
    color: '#FFFFFF',
    display: 'inline-flex',
    padding: theme.spacing(0, 2),
    borderRadius: '5px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
}));

const query = graphql`
  query mainnetTopSection {
    desktop: file(relativePath: { eq: "mainnet-globe.png" }) {
      childImageSharp {
        fluid(quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    sanityMainnetPage {
      launchDate
      topSection {
        title
        body
      }
    }
  }
`;

const TopSection: React.FC = () => {
  const { desktop, sanityMainnetPage } = useStaticQuery<MainnetTopSectionQuery>(query);
  const styles = useStyles();
  const data = sanityMainnetPage?.topSection;
  return (
    <BackgroundSection
      header={
        <div className={styles.headerWrap}>
          <div>{data?.title}</div>
          <div>
            <Typography variant="h1" className={styles.countdown}>
              <Countdown date={sanityMainnetPage?.launchDate} />
            </Typography>
          </div>
        </div>
      }
      linearGradient="linear-gradient(220.67deg, rgba(250, 235, 209, 0.6) 21.4%, rgba(125, 201, 191, 0.6) 46.63%, rgba(81, 93, 137, 0.6) 71.86%), linear-gradient(180deg, rgba(0, 0, 0, 0.684) 0%, rgba(0, 0, 0, 0) 97.78%)"
      body={<span>{data?.body}</span>}
      imageData={desktop?.childImageSharp?.fluid as FluidObject}
    />
  );
};

export default TopSection;
