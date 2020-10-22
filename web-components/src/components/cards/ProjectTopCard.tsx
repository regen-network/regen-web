import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from './Card';
import Title from '../title';
import UserInfoWithTitle from '../user/UserInfoWithTitle';
import { User } from '../user/UserInfo';

export interface SDG {
  imageUrl: string;
  title: string;
}

interface ProjectTopCardProps {
  projectDeveloper: User;
  landSteward?: User;
  landOwner?: User;
  sdgs?: SDG[];
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    backgroundColor: theme.palette.grey[50],
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing(8)} ${theme.spacing(7.5)} ${theme.spacing(9)}`,
    },
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(17)} ${theme.spacing(5)} ${theme.spacing(12.5)}`,
    },
  },
  separator: {
    border: `1px solid ${theme.palette.grey[100]}`,
    marginTop: theme.spacing(7),
    marginBottom: theme.spacing(7),
  },
  image: {
    borderRadius: '2px',
    boxShadow: `3px 3px ${theme.palette.grey[100]}`,
    [theme.breakpoints.down('xs')]: {
      height: theme.spacing(25),
      width: theme.spacing(25),
      marginRight: theme.spacing(4),
    },
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(35),
      width: theme.spacing(35),
      marginRight: theme.spacing(4.5),
    },
  },
  sdg: {
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(5),
    },
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(10),
    },
  },
  sdgs: {
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(14.25),
    },
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(21.25),
    },
  },
  userInfo: {
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(12),
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(15),
    },
  },
  sdgGrid: {
    '&:not(:last-child)': {
      [theme.breakpoints.down('xs')]: {
        paddingBottom: theme.spacing(6.25),
      },
      [theme.breakpoints.up('sm')]: {
        paddingBottom: theme.spacing(8.75),
      },
    },
  },
}));

export default function ProjectTopCard({
  projectDeveloper,
  landSteward,
  landOwner,
  sdgs,
}: ProjectTopCardProps): JSX.Element {
  const classes = useStyles({});
  return (
    <Card>
      <div className={classes.container}>
        {sdgs && (
          <div className={classes.sdgs}>
            <Title className={classes.sdg} variant="h3">
              SDGs
            </Title>
            {sdgs.map((sdg: SDG, index: number) => (
              <Grid key={index} className={classes.sdgGrid} container wrap="nowrap" alignItems="center">
                <Grid item>
                  <img className={classes.image} alt={sdg.imageUrl} src={sdg.imageUrl} />
                </Grid>
                <Grid item>
                  <Title variant="h5">{sdg.title}</Title>
                </Grid>
              </Grid>
            ))}
          </div>
        )}
        <UserInfoWithTitle size="xl" user={projectDeveloper} title="project developer" />
        {landSteward && (
          <div className={classes.userInfo}>
            {/* <hr className={classes.separator} /> */}
            <UserInfoWithTitle size="xl" user={landSteward} title="land steward" />
          </div>
        )}
        {landOwner && (
          <div className={classes.userInfo}>
            {/* <hr className={classes.separator} /> */}
            <UserInfoWithTitle size="xl" user={landOwner} title="land owner" />
          </div>
        )}
      </div>
    </Card>
  );
}
