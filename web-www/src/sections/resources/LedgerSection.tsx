import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { useTheme, Theme, makeStyles } from '@material-ui/core';
import Title from 'web-components/lib/components/title';
import ResourceCardsSlider from 'web-components/lib/components/sliders/ResourceCards';

import Section from '../../components/Section';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: `${theme.spacing(21.5)} ${theme.spacing(33.75)} ${theme.spacing(21.75)} ${theme.spacing(33.75)}`,
    margin: 'inherit',
    maxWidth: 'inherit',
  },
  section: {
    [theme.breakpoints.down('xs')]: {
      padding: `
       ${theme.spacing(17.75)}
       ${theme.spacing(6.5)}
       ${theme.spacing(28.25)}
       ${theme.spacing(6)}
     `,
    },
    [theme.breakpoints.up('sm')]: {
      padding: `
      ${theme.spacing(17.75)}
       ${theme.spacing(6.5)}
       ${theme.spacing(19.75)}
       ${theme.spacing(6)}
     `,
    },
    [theme.breakpoints.up(theme.breakpoints.values.tablet)]: {
      padding: `
       ${theme.spacing(21.5)}
       ${theme.spacing(6.5)}
       ${theme.spacing(19.75)}
       ${theme.spacing(33.75)}
     `,
    },
    [theme.breakpoints.up('md')]: {
      padding: `
       ${theme.spacing(21.5)}
       ${theme.spacing(6.5)}
       ${theme.spacing(21.75)}
       ${theme.spacing(33.75)}
     `,
    },
  },
  title: {
    marginBottom: theme.spacing(8.5),
  },
}));

const LedgerSection = (): JSX.Element => {
  const data = useStaticQuery(graphql`
    query {
      text: resourcesYaml {
        ledgerSection {
          header
          resourceCards {
            image {
              childImageSharp {
                fixed(quality: 90, width: 500) {
                  ...GatsbyImageSharpFixed_withWebp
                }
              }
            }
            title
            updated
            description
            buttonText
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
