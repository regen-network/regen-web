import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Card from './Card';
import UserInfoWithTitle from '../user/UserInfoWithTitle';
import { User } from '../user/UserInfo';

interface ProjectDeveloperCardProps {
  projectDeveloper: User;
  landSteward?: User;
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    margin: `${theme.spacing(7)} ${theme.spacing(6.5)}`,
  },
  separator: {
    border: `1px solid ${theme.palette.grey[50]}`,
    marginTop: theme.spacing(7),
    marginBottom: theme.spacing(7),
  },
}));

export default function ProjectDeveloperCard({
  projectDeveloper,
  landSteward,
}: ProjectDeveloperCardProps): JSX.Element {
  const classes = useStyles({});
  return (
    <Card>
      <div className={classes.container}>
        <UserInfoWithTitle user={projectDeveloper} title="project developer" />
        {landSteward && (
          <div>
            <hr className={classes.separator} />
            <UserInfoWithTitle user={landSteward} title="land steward" />
          </div>
        )}
      </div>
    </Card>
  );
}
