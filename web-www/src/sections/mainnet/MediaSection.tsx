import React from 'react';
import clsx from 'clsx';
import { graphql, useStaticQuery } from 'gatsby';
import { makeStyles, Theme, Typography, useTheme } from '@material-ui/core';
import { FluidObject } from 'gatsby-image';

import ResponsiveSlider from 'web-components/lib/components/sliders/ResponsiveSlider';
import Section from 'web-components/src/components/section';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(10),
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: theme.spacing(10),
    textAlign: 'left',
  },
}));

type QueryData = {
  background: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
  text: {
    mediaSection: {
      title: string;
    };
  };
};

const MediaSection: React.FC = () => {
  const {
    text: {
      mediaSection: { title },
    },
  } = useStaticQuery<QueryData>(graphql`
    query {
      text: mainnetYaml {
        mediaSection {
          title
        }
      }
    }
  `);
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Section className={classes.root}>
      <div className={classes.main}>
        <ResponsiveSlider
          itemWidth="90%"
          padding={theme.spacing(2.5)}
          // className={clsx(classes.outcomes, classes.slider)}
          arrows
          slidesToShow={3}
          items={[]}
          renderTitle={() => (
            <Typography className={classes.title} variant="h1">
              {title}
            </Typography>
          )}
        />
      </div>
    </Section>
  );
};

const useCardStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const MediaCard: React.FC<{}> = p => {
  return <div>hello</div>;
};

export default MediaSection;
