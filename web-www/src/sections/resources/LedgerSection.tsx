import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { useTheme, Theme, makeStyles } from '@material-ui/core';
import Title from 'web-components/lib/components/title';
import ResourceCardsSlider from 'web-components/lib/components/sliders/ResourceCards';

import Section from 'web-components/lib/components/section';

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  section: {
    borderTop: '0.3px #8080804f solid',
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(21.5),
      paddingBottom: theme.spacing(23.25),
    },
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(3),
      paddingTop: theme.spacing(17),
      paddingBottom: theme.spacing(25),
    },
  },
  title: {
    marginBottom: theme.spacing(8.5),
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(6.75),
    },
  },
}));

const LedgerSection = (): JSX.Element => {
  const data = useStaticQuery(graphql`
    query {
      text: resourcesYaml {
        ledgerSection {
          header
          cards {
            image {
              extension
              publicURL
            }
            title
            updated
            description
            buttonText
            link
          }
        }
      }
    }
  `);
  const content = data.text.ledgerSection;
  const classes = useStyles();
  return (
    <Section className={classes.section}>
      <Title className={classes.title} variant="h3" align="left">
        {content.header}
      </Title>
      <ResourceCardsSlider items={content.resourceCards} />
    </Section>
  );
};

export default LedgerSection;
