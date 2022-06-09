import React from 'react';
import { DefaultTheme as Theme, makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import clsx from 'clsx';

import TeamItem, { TeamItemProps } from '../team-item';
import Section from '../section';

export interface TeamSectionProps {
  alphabetized?: boolean;
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
    [theme.breakpoints.down('sm')]: {
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
  alphabetized = false,
  children,
}: TeamSectionProps): JSX.Element => {
  const classes = useStyles();
  const sortedMembers = alphabetized // avoid sorting if not alphabetized
    ? members.sort((a, b) => (firstName(a.name) > firstName(b.name) ? 1 : -1))
    : members;

  return (
    <Section
      title={title}
      titleVariant="h2"
      classes={{
        root: clsx(className, classes.section),
        title: clsx(titleClassName, classes.title),
      }}
    >
      <Grid justifyContent="center" container direction="row">
        {sortedMembers.map((m, index) => {
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
                linkedinUrl={m.linkedinUrl}
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

// sorting by first name alone was causing weird firefox behavior
const firstName = (name: string): string => name.toLowerCase().replace(' ', '');

export default TeamSection;
