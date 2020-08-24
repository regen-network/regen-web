import React from 'react';
import { Theme, makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TeamItem from '../team-Item';
import Section from '../section';

export interface TeamSectionProps {
  members: object[];
  title: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    paddingLeft: theme.spacing(27),
    paddingRight: theme.spacing(27),
    textAlign: 'center',
  },
  item: {
    textAlign: 'center',
  },
  itemWrapper: {},
  title: {
    display: 'inline-block',
    marginBottom: theme.spacing(10.5),
  },
}));

const TeamSection = ({ members, title }: TeamSectionProps): JSX.Element => {
  const classes = useStyles();
  return (
    <Section title={title} titleVariant="h2" titleClassName={classes.title} className={classes.section}>
      <Grid className={classes.itemWrapper} justify="center" container direction="row">
        {members.map((m: any, index: any) => {
          return (
            <Grid className={classes.item} xs={12} sm={6} md={4} item key={index}>
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

export default TeamSection;
