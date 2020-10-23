import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import ProjectImpactCard, {
  ProjectImpactCardProps as Impact,
} from 'web-components/lib/components/cards/ProjectImpactCard';
import Section from 'web-components/lib/components/section';

interface ProjectImpactProps {
  impact: Impact[];
}

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(21.5),
      paddingBottom: theme.spacing(27.5),
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(17.5),
      paddingBottom: theme.spacing(20.5),
    },
  },
  title: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(15),
    },
    [theme.breakpoints.down('xs')]: {
      textAlign: 'left',
      paddingBottom: theme.spacing(10),
    },
  },
  item: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(7.5),
      '&:nth-child(odd)': {
        paddingRight: theme.spacing(3.75),
      },
      '&:nth-child(even)': {
        paddingLeft: theme.spacing(3.75),
      },
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(3.75),
    },
  },
  background: {
    backgroundImage: `url(${require('../../assets/project-impact-bg.png')})`,
    backgroundSize: 'cover',
  },
}));

export default function ProjectImpact({ impact }: ProjectImpactProps): JSX.Element {
  const classes = useStyles();

  return (
    <div className={classes.background}>
      <Section className={classes.section} title="Impact" titleVariant="h2" titleClassName={classes.title}>
        <Grid container>
          {impact.map(({ name, description, imgSrc, monitored }: Impact, index: number) => (
            <Grid item key={index} xs={12} sm={6} className={classes.item}>
              <ProjectImpactCard
                name={name}
                description={description}
                imgSrc={imgSrc}
                monitored={monitored}
              />
            </Grid>
          ))}
        </Grid>
      </Section>
    </div>
  );
}
