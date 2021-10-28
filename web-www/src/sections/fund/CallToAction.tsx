import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import Grid from '@material-ui/core/Grid';

import Card from 'web-components/lib/components/cards/Card';
import Title from 'web-components/lib/components/title';
import Section from 'web-components/src/components/section';

const useStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(22.25),
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(8),
    background: theme.palette.grey[50],
  },
}));

const CallToAction = (): JSX.Element => {
  const styles = useStyles();

  const data = useStaticQuery(graphql`
    query {
      text: fundYaml {
        calltoActionSection {
          callToActions {
            image {
              childImageSharp {
                fixed(quality: 90, width: 159) {
                  ...GatsbyImageSharpFixed_withWebp
                }
              }
            }
            caption
            header
            description
            linkText
            linkUrl
          }
        }
      }
    }
  `);

  const content = data.text.calltoActionSection;

  return (
    <Section className={styles.root}>
      <Grid container spacing={3}>
        {content.callToActions.map((cta: any) => {
          return (
            <Grid key={cta.header} item xs>
              <Card className={styles.card}>
                <Img fixed={cta.image.childImageSharp.fixed} />
                <Title variant="h4" align="center">
                  {cta.header}
                </Title>
                <p>{cta.description}</p>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Section>
  );
};

export default CallToAction;
