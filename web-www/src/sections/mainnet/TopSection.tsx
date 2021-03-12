import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import ReactCountdown from 'react-countdown';
import { makeStyles, Theme, Typography } from '@material-ui/core';

import BackgroundSection from '../../components/BackgroundSection';

const useStyles = makeStyles((theme: Theme) => ({
  headerWrap: {
    display: 'flex',
    flexDirection: 'column',
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
    query {
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
            <Countdown date={launchDate} />
          </div>
        </div>
      }
      linearGradient="linear-gradient(220.67deg, rgba(250, 235, 209, 0.6) 21.4%, rgba(125, 201, 191, 0.6) 46.63%, rgba(81, 93, 137, 0.6) 71.86%), linear-gradient(180deg, rgba(0, 0, 0, 0.684) 0%, rgba(0, 0, 0, 0) 97.78%)"
      body={<span>{body}</span>}
      imageData={childImageSharp.fluid}
    />
  );
};

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
  const padN = (n: number): string => (n < 10 ? `0${n}` : n.toString());
  return (
    <ReactCountdown
      date={new Date(p.date)}
      renderer={({ days, hours, minutes, seconds }) => {
        const count = [days, hours, minutes, seconds].map(padN).join(':');
        return (
          <Typography variant="h1" className={classes.countdown}>
            {count}
          </Typography>
        );
      }}
    />
  );
};

export default TopSection;
