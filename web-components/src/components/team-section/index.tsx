import React from 'react';
import { Theme, makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';

import TeamItem, { TeamItemProps } from '../team-item';
import Section from '../section';

export interface TeamSectionProps {
  members: TeamItemProps[];
  title: string;
  children?: React.ReactNode;
  bgUrl: string;
  className?: string;
  titleClassName?: string;
  gridMd?:
    | boolean
    | 'auto'
    | 4
    | 1
    | 2
    | 3
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | undefined;
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

const TeamSection = ({
  members,
  title,
  titleClassName,
  className,
  bgUrl,
  gridMd = 4,
  children,
}: TeamSectionProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Section
      title={title}
      titleVariant="h2"
      classes={{
        root: clsx(className, classes.section),
        title: clsx(titleClassName, classes.title),
      }}
    >
      <Grid justify="center" container direction="row">
        {members.map((m: any, index: any) => {
          return (
            <Grid
              className={classes.item}
              xs={12}
              sm={6}
              md={gridMd}
              item
              key={index}
            >
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
      {children}
    </Section>
  );
};

export default TeamSection;
