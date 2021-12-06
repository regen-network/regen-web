import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import { makeStyles } from '@mui/styles';

import { Theme } from 'web-components/lib/theme/muiTheme';
import TitleDescription from 'web-components/lib/components/title-description';
import Section from 'web-components/lib/components/section';

const useStyles = makeStyles((theme: Theme) => ({
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
  section: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(14),
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(16),
    },
  },
}));

const ApproachSection = (): JSX.Element => {
  const classes = useStyles();

  return (
    <StaticQuery
      query={graphql`
        query {
          content: developersYaml {
            approachSection {
              header
              body
              caption
            }
          }
        }
      `}
      render={data => {
        const content = data.content.approachSection;
        return (
          <Section className={classes.section}>
            <div className={classes.caption}>{content.caption}</div>
            <TitleDescription title={content.header} description={content.body} />
          </Section>
        );
      }}
    />
  );
};

export default ApproachSection;
