import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Card from './Card';
import UserInfo from '../user/UserInfo';

interface ProjectDeveloperCardProps {
  name: string;
  place?: string;
  imgSrc: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    margin:  `${theme.spacing(4.5)} ${theme.spacing(5.25)}`,
  },
  title: {
    fontSize: '0.6875rem',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    letterSpacing: theme.spacing(0.125),
    marginBottom: theme.spacing(4.25),
  },
}));

export default function ProjectDeveloperCard({ name, place, imgSrc }: ProjectDeveloperCardProps): JSX.Element {
  const classes = useStyles({});
  return (
    <Card>
      <div className={classes.container}>
        <Typography className={classes.title}>this project is developed by</Typography>
        <UserInfo
          name={name}
          place={place}
          imgSrc={imgSrc}
        />
      </div>
    </Card>
  );
}
