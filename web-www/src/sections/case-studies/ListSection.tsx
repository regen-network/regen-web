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

// items {
//   name
//   description
//   slug
//   cardImage {
//     publicURL
//   }
// }

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
            }
          }
          list: allCaseStudyItemsYaml {
            nodes {
              name
              description
              slug
              cardImage {
                publicURL
              }
            }
          }
        }
      `}
      render={data => {
        const text = data.text.caseStudies;
        const nodes = data.list.nodes;
        return (
          <Section
            className={classes.section}
            titleClassName={classes.title}
            title={text.header}
            titleAlign="left"
            titleVariant="h3"
          >
            <Grid container spacing={5}>
              {nodes.map((item, i) => (
                <Grid item xs={12} sm={6} md={4}>
                  <ResourcesCard
                    target="_self"
                    title={item.name}
                    description={item.description}
                    image={item.cardImage}
                    buttonText={text.view}
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
