import React from 'react';
import { Theme, makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';

import TeamItem, { TeamItemProps } from '../team-item';
import Section from '../section';

export interface TeamSectionProps {
  members: TeamItemProps[];
  title: string;
  bgUrl: string;
  className?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(25),
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(21.5),
    },
  },
  item: {
    textAlign: 'center',
  },
  title: {
    display: 'inline-block',
    marginBottom: theme.spacing(10.5),
  },
}));

const TeamSection = ({ members, title, className, bgUrl }: TeamSectionProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Section
      title={title}
      titleVariant="h2"
      titleClassName={classes.title}
      className={clsx(className, classes.section)}
    >
      <Grid justify="center" container direction="row">
        {members.map((m: any, index: any) => {
          return (
            <Grid className={classes.item} xs={12} sm={6} md={4} item key={index}>
              <TeamItem
                name={m.name}
                title={m.title}
                description={m.description}
                imgUrl={m.imgUrl}
                bgUrl={bgUrl}
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
