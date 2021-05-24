import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Section from 'web-components/lib/components/section';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import RegenIcon from 'web-components/lib/components/icons/RegenIcon';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(8),
    },
  },
  root: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(34.5),
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(20),
    },
  },
  logo: {
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(65),
      height: theme.spacing(29),
      marginTop: theme.spacing(13.75),
      marginBottom: theme.spacing(7.5),
    },
    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(43.5),
      height: theme.spacing(19.4),
      marginTop: theme.spacing(12),
      marginBottom: theme.spacing(5),
    },
  },
}));

const LogosSection = (): JSX.Element => {
  const classes = useStyles();

  return (
    <StaticQuery
      query={graphql`
        query {
          content: pressKitYaml {
            logosSection {
              header
              buttonText
              buttonLink
            }
          }
        }
      `}
      render={data => {
        const content = data.content.logosSection;
        return (
          <Section title={content.header} classes={{ root: classes.root, title: classes.title }}>
            <Grid container alignItems="center" direction="column">
              <RegenIcon className={classes.logo} />
              <ContainedButton href={content.buttonLink}>{content.buttonText}</ContainedButton>
            </Grid>
          </Section>
        );
      }}
    />
  );
};

export default LogosSection;
