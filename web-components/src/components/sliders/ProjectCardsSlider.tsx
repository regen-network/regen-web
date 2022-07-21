import React from 'react';
import { makeStyles, DefaultTheme as Theme, useTheme } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Slider from 'react-slick';
import Grid from '@mui/material/Grid';

import ProjectCard, { ProjectCardProps } from '../cards/ProjectCard';

export interface ProjectCardsProps {
  projects: ProjectCardProps[];
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(10.25),
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(9.5),
    },
  },
  slider: {
    [theme.breakpoints.down('sm')]: {
      width: '85%',
    },
    '& .slick-list': {
      [theme.breakpoints.down('lg')]: {
        overflow: 'visible',
      },
    },
    '& .slick-track': {
      display: 'flex',
      '& .slick-slide': {
        height: 'inherit',
        [theme.breakpoints.down('sm')]: {
          paddingRight: theme.spacing(4.125),
          '&:last-child': {
            paddingRight: 0,
          },
        },
        '& > div:first-child': {
          height: '100%',
        },
      },
    },
  },
  item: {
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingRight: theme.spacing(5.25),
      paddingBottom: theme.spacing(5.25),
      height: 'inherit',
      '& > div:first-child': {
        height: '100%',
      },
      '&:nth-child(3n)': {
        paddingRight: 0,
      },
    },
  },
}));

export default function ProjectCardsSlider({
  projects,
}: ProjectCardsProps): JSX.Element {
  const classes = useStyles({});
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('md'));
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const slides: number = mobile ? 1 : 2;

  const settings = {
    infinite: false,
    speed: 500,
    // slidesToShow: slides,
    // slidesToScroll: slides,
    initialSlide: 0,
    arrows: false,
    rows: 1,
    slidesPerRow: slides,
  };
  return (
    <div className={classes.root}>
      {!desktop ? (
        <Slider {...settings} className={classes.slider}>
          {projects.map((project, index) => (
            <div key={index} className={classes.item}>
              <ProjectCard {...project} />
            </div>
          ))}
        </Slider>
      ) : (
        <Grid container>
          {projects.map((project, index) => (
            <Grid item xs={4} key={index} className={classes.item}>
              <ProjectCard {...project} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}
