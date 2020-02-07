import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Project } from '../mocks';
import Grid from '@material-ui/core/Grid';
import projects from '../assets/projects.png';
import Title from 'web-components/lib/components/title';

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  header: {
    backgroundImage: `url("${projects}")`,
    backgroundSize: 'cover',
    [theme.breakpoints.down('xs')]: {
      backgroundPositionX: '-700px',
    },
    position: 'relative',
  },
  backgroundGradient: {
    height: '100%',
    zIndex: 0,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    background: 'linear-gradient(186.69deg, #FAEBD1 12.63%, #7DC9BF 44.03%, #515D89 75.43%)',
    opacity: 0.8,
  },
  text: {
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(28.75),
      paddingBottom: theme.spacing(17.25),
      paddingLeft: theme.spacing(36.75),
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(38.75),
      paddingBottom: theme.spacing(13.5),
      paddingLeft: theme.spacing(3.75),
    },
    [theme.breakpoints.up('xl')]: {
      paddingRight: theme.spacing(5),
      paddingLeft: theme.spacing(5),
    },
    maxWidth: theme.breakpoints.values.lg,
    margin: '0 auto',
  },
  subTitle: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(3.25),
      fontSize: '1.375rem',
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(2.75),
      fontSize: '1.125rem',
    },
    color: theme.palette.primary.main,
  },
  projects: {
    backgroundColor: '#f9f9f9',
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(17.25)} ${theme.spacing(37.75)} ${theme.spacing(24.75)}`,
    },
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing(11.5)} ${theme.spacing(3.75)} ${theme.spacing(24.75)}`,
    },
    [theme.breakpoints.up('xl')]: {
      paddingRight: theme.spacing(5),
      paddingLeft: theme.spacing(5),
    },
    maxWidth: theme.breakpoints.values.lg,
    margin: '0 auto',
  },
  australia: {
    color: theme.palette.info.dark,
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontWeight: 800,
    fontFamily: theme.typography.h1.fontFamily,
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.125rem',
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '0.875rem',
    },
  },
}));

interface ProjectsProps {
  projects: Project[];
}

export default function ProjectList({ projects }: ProjectsProps): JSX.Element {
  const classes = useStyles({});

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div className={classes.backgroundGradient} />
        <div className={classes.text}>
          <Title variant="h1" color="primary">
            Projects
          </Title>
          <div className={classes.subTitle}>Learn more about our pilot projects.</div>
        </div>
      </div>
      <div className={classes.projects}>
        <div className={classes.australia}>australia</div>
        <Grid container>
          <Grid item xs={12} sm={4}></Grid>
          <Grid item xs={12} sm={4}></Grid>
        </Grid>
      </div>
    </div>
  );
}
