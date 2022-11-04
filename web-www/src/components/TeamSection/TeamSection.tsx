import React from 'react';
import { Grid, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Section from '@regen-network/web-components/lib/components/section';
import clsx from 'clsx';

import type { SanityRegenTeamMember } from '../../generated/graphql';
import { TeamItem } from './TeamItem';

interface TeamSectionProps {
  members?: SanityRegenTeamMember[];
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

export const TeamSection = ({
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
