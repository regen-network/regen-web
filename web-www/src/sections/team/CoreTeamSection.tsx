import React from 'react';
import { Theme, makeStyles } from '@material-ui/core';
import { graphql, useStaticQuery } from 'gatsby';
import Grid from '@material-ui/core/Grid';
import TeamItem from 'web-components/lib/components/team-Item';
import Section from 'web-components/lib/components/section';
import Title from 'web-components/lib/components/title';

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    paddingLeft: theme.spacing(27),
    paddingRight: theme.spacing(27),
    textAlign: 'center',
  },
  item: {
    display: 'flex',
    textAlign: 'center',
  },
  itemWrapper: {
    display: 'flex',
  },
  title: {
    display: 'inline-block',
    marginBottom: theme.spacing(10.5),
  },
}));

const CoreTeamSection = (): JSX.Element => {
  const data = useStaticQuery(graphql`
    query {
      text: teamYaml {
        coreSection {
          title
          coreMembers {
            name
            title
            description
            image {
              extension
              publicURL
            }
            linkedUrl
            twitterUrl
            githubUrl
          }
        }
      }
    }
  `);
  const classes = useStyles();
  const members = data.text.coreSection.coreMembers;
  return (
    <Section
      title={data.text.coreSection.title}
      titleVariant="h2"
      titleClassName={classes.title}
      className={classes.section}
    >
      <Grid className={classes.itemWrapper} container direction="row">
        {members.map((m: any, index: any) => {
          return (
            <Grid className={classes.item} sm={4} item key={index}>
              <TeamItem
                name={m.name}
                title={m.title}
                desc={m.description}
                imgUrl={m.image.publicURL}
                linkedUrl={m.linkedUrl}
                twitterUrl={m.twitterUrl}
                githubUrl={m.githubUrl}
              />
            </Grid>
          );
        })}
      </Grid>
    </Section>
  );
};

export default CoreTeamSection;
