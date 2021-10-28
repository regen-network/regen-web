import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import Grid from '@material-ui/core/Grid';

import Title from 'web-components/lib/components/title';
import Section from 'web-components/src/components/section';

const useStyles = makeStyles<Theme>(theme => ({
  section: {
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 'none',
      paddingRight: 'none',
    },
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
    <Section>
      <Grid container spacing={3}>
        {content.callToActions.map((cta: any) => {
          return (
            <Grid key={cta.header} className={styles.gridItem} item xs>
              <Img fixed={cta.image.childImageSharp.fixed} />
              <div className={styles.smallTitle}>{cta.caption}</div>
              <Title className={styles.h3} variant="h3" align="center">
                {cta.header}
              </Title>
              <p>{cta.description}</p>
            </Grid>
          );
        })}
      </Grid>
    </Section>
  );
};

export default CallToAction;
