import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Project } from '../mocks';
import { User } from 'web-components/lib/components/user/UserInfo';
import Grid from '@material-ui/core/Grid';
import projects from '../assets/projects.png';
import Title from 'web-components/lib/components/title';
import ProjectCard from 'web-components/lib/components/cards/ProjectCard';
import { getImgSrc } from '../lib/imgSrc';

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
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing(36.75),
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(10),
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(28.75),
      paddingBottom: theme.spacing(17.25),
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
    [theme.breakpoints.up('md')]: {
      padding: `${theme.spacing(17.25)} ${theme.spacing(32.75)} ${theme.spacing(22.25)} ${theme.spacing(
        37.75,
      )}`,
    },
    [theme.breakpoints.down('sm')]: {
      padding: `${theme.spacing(17.25)} ${theme.spacing(5)} ${theme.spacing(22.25)} ${theme.spacing(10)}`,
    },
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing(11.5)} ${theme.spacing(3.75)} ${theme.spacing(16.75)}`,
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
      paddingBottom: theme.spacing(9),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.875rem',
      paddingBottom: theme.spacing(6.75),
    },
  },
  projectList: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(-2.5),
    },
  },
  project: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(0)} ${theme.spacing(2.5)} ${theme.spacing(2.5)}`,
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(8),
    },
    // [theme.breakpoints.down(900)]: {
    //   maxWidth: '100%',
    //   flexBasis: '100%',
    // },
  },
  projectLink: {
    textDecoration: 'none',
    height: '100%',
    width: '100%',
  },
}));

interface ProjectsProps {
  projects: Project[];
}

export default function ProjectList({ projects }: ProjectsProps): JSX.Element {
  const classes = useStyles({});
  // let { url } = useRouteMatch();

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
        {/**<div className={classes.australia}>australia</div>**/}
        <Grid container className={classes.projectList}>
          {projects.map((p, i) => {
            const developer: User = {
              name: p.developer.name,
              type: p.developer.type,
            };
            if (p.developer.imgSrc) {
              developer.imgSrc = getImgSrc(p.developer.imgSrc);
            }
            return (
              <Grid className={classes.project} item xs={12} sm={6} md={4} key={p.id}>
                <Link className={classes.projectLink} to={`/projects/${p.id}`}>
                  <ProjectCard
                    name={p.name}
                    place={p.place}
                    area={p.area}
                    areaUnit={p.areaUnit}
                    imgSrc={getImgSrc(p.image)}
                    developer={developer}
                    tag={p.creditClass.tag}
                    displayCity={false}
                    displayRegion={false}
                  />
                </Link>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
}
