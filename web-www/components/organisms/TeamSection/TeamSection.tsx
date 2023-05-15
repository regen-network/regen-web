import React from 'react';
import { Grid } from '@mui/material';
import clsx from 'clsx';

import Section from 'web-components/lib/components/section';

import { useTeamSectionStyles } from './TeamSection.styles';
import { TeamItem } from './TeamSection.TeamItem';

import { RegenTeamMember } from '@/generated/sanity-graphql';

interface TeamSectionProps {
  members?: RegenTeamMember[];
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

export const TeamSection = ({
  members,
  title,
  titleClassName,
  className,
  bgUrl,
  gridMd = 4,
  children,
}: TeamSectionProps): JSX.Element => {
  const { classes } = useTeamSectionStyles();

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
        {!!members?.length &&
          members.length > 0 &&
          members.map((m, index) => {
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
                  member={m}
                  bgUrl={bgUrl}
                  sx={{ py: 7, px: { sm: 8 } }}
                />
              </Grid>
            );
          })}
      </Grid>
      {children}
    </Section>
  );
};
