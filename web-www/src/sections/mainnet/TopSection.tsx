import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import { makeStyles } from '@mui/styles';
import { Typography } from '@mui/material';

import { Theme } from 'web-components/lib/theme/muiTheme';
import Countdown from 'web-components/lib/components/countdown';
import BackgroundSection from '../../components/BackgroundSection';

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

type QueryData = {
  desktop: { childImageSharp: { fluid: FluidObject } };
  text: {
    launchDate: string;
    topSection: {
      header: string;
      body: string;
    };
  };
};

const TopSection: React.FC = () => {
  const {
    desktop: { childImageSharp },
    text: { topSection, launchDate },
  } = useStaticQuery<QueryData>(graphql`
    {
      desktop: file(relativePath: { eq: "mainnet-globe.png" }) {
        childImageSharp {
          fluid(quality: 90) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      text: mainnetYaml {
        launchDate
        topSection {
          header
          body
        }
      }
    }
  `);
  const { body, header } = topSection;
  const classes = useStyles();
  return (
    <BackgroundSection
      header={
        <div className={classes.headerWrap}>
          <div>{header}</div>
          <div>
            <Typography variant="h1" className={classes.countdown}>
              <Countdown date={launchDate} />
            </Typography>
          </div>
        </div>
      }
      linearGradient="linear-gradient(220.67deg, rgba(250, 235, 209, 0.6) 21.4%, rgba(125, 201, 191, 0.6) 46.63%, rgba(81, 93, 137, 0.6) 71.86%), linear-gradient(180deg, rgba(0, 0, 0, 0.684) 0%, rgba(0, 0, 0, 0) 97.78%)"
      body={<span>{body}</span>}
      imageData={childImageSharp.fluid}
    />
  );
};

export default TopSection;
