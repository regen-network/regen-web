import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Section from '../../components/Section';
import ResourcesCard from 'web-components/lib/components/cards/ResourcesCard';
import Grid from '@material-ui/core/Grid';
import { useTheme, Theme, makeStyles } from '@material-ui/core';
import Title from 'web-components/lib/components/title';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: `${theme.spacing(21.5)} ${theme.spacing(33.75)} ${theme.spacing(21.75)} ${theme.spacing(33.75)}`,
    margin: 'inherit',
    maxWidth: 'inherit',
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
    <Section className={classes.root}>
      <Title className={classes.title} variant="h3" align="left">
        {content.header}
      </Title>
      <Grid container direction="row" spacing={5}>
        {content.resourceCards.map(card => {
          return (
            <Grid item>
              <ResourcesCard
                image={card.image.childImageSharp.fixed}
                title={card.title}
                updated={card.updated}
                description={card.description}
                buttonText={card.buttonText}
              ></ResourcesCard>
            </Grid>
          );
        })}
      </Grid>
    </Section>
  );
};

export default LedgerSection;
