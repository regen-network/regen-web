import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import { makeStyles, Theme } from '@material-ui/core/styles';

import TitleDescription from 'web-components/lib/components/title-description';
import Section from 'web-components/lib/components/section';

const useStyles = makeStyles((theme: Theme) => ({
  caption: {
    fontWeight: 'normal',
    fontFamily: theme.typography.overline.fontFamily,
    color: theme.palette.secondary.main,
    lineHeight: '140%',
    textAlign: 'center',
    paddingBottom: theme.spacing(3.75),
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(7),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(5),
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
          <Section>
            <div className={classes.caption}>{content.caption}</div>
            <TitleDescription title={content.header} description={content.body} />
          </Section>
        );
      }}
    />
  );
};

export default ApproachSection;
