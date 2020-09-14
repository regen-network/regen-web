import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import { Theme, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ResourcesCard from 'web-components/lib/components/cards/ResourcesCard';
import Section from 'web-components/lib/components/section';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(8.25),
    },
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(11.5),
    },
  },
  section: {
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(27.5),
    },
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(25),
    },
  },
}));

const ListSection = (): JSX.Element => {
  const classes = useStyles();
  return (
    <StaticQuery
      query={graphql`
        query {
          text: caseStudiesYaml {
            caseStudies {
              header
              view
              items {
                name
                description
                slug
                cardImage {
                  publicURL
                }
              }
            }
          }
        }
      `}
      render={data => {
        const content = data.text.caseStudies;
        return (
          <Section
            className={classes.section}
            titleClassName={classes.title}
            title={content.header}
            titleAlign="left"
            titleVariant="h3"
          >
            <Grid container spacing={5}>
              {content.items.map((item, i) => (
                <Grid item xs={12} sm={6} md={4}>
                  <ResourcesCard
                    target="_self"
                    title={item.name}
                    description={item.description}
                    image={item.cardImage}
                    buttonText={content.view}
                    link={`/case-studies/${item.slug}`}
                    backgroundGradient={false}
                  />
                </Grid>
              ))}
            </Grid>
          </Section>
        );
      }}
    />
  );
};

export default ListSection;
