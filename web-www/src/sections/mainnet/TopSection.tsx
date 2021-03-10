import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import ReactCountdown from 'react-countdown';
import { makeStyles, Theme, Typography } from '@material-ui/core';

import BackgroundSection from '../../components/BackgroundSection';

const useCountStyles = makeStyles((theme: Theme) => ({
  countdown: {
    color: '#FFFFFF',
    display: 'inline-flex',
    padding: theme.spacing(0, 2),
    borderRadius: '5px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
}));

/**
 * I doubt we'll reuse this component, but potential TODO: move to web-components
 */
const Countdown: React.FC<{ date: string }> = p => {
  const classes = useCountStyles();
  return (
    <ReactCountdown
      date={new Date(p.date)}
      renderer={({ days, hours, minutes, seconds }) => (
        <Typography
          variant="h1"
          className={classes.countdown}
        >{`${days}:${hours}:${minutes}:${seconds}`}</Typography>
      )}
    />
  );
};

type QueryData = {
  desktop: { childImageSharp: { fluid: FluidObject } };
  text: {
    topSection: {
      header: string;
      body: string;
      launchDate: string;
    };
  };
};

const TopSection: React.FC = () => {
  const data = useStaticQuery<QueryData>(graphql`
    query {
      desktop: file(relativePath: { eq: "mainnet-globe.png" }) {
        childImageSharp {
          fluid(quality: 90) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      text: mainnetYaml {
        topSection {
          header
          body
          launchDate
        }
      }
    }
  `);
  const imageData = data.desktop.childImageSharp.fluid;
  const { body, header, launchDate } = data.text.topSection;
  return (
    <BackgroundSection
      header={
        <span>
          {header} <Countdown date={launchDate} />
        </span>
      }
      linearGradient="linear-gradient(220.67deg, rgba(250, 235, 209, 0.6) 21.4%, rgba(125, 201, 191, 0.6) 46.63%, rgba(81, 93, 137, 0.6) 71.86%), linear-gradient(180deg, rgba(0, 0, 0, 0.684) 0%, rgba(0, 0, 0, 0) 97.78%)"
      body={<span>{body}</span>}
      imageData={imageData}
    />
  );
};

export default TopSection;
