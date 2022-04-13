import React from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import cx from 'clsx';

import Card from './Card';
import { Title } from '../typography';
import UserInfoWithTitle from '../user/UserInfoWithTitle';
import { User } from '../user/UserInfo';

export interface SDG {
  imageUrl: string;
  title?: string;
}

interface ProjectTopCardProps {
  classes?: {
    root?: string;
    userInfo?: string;
  };
  projectDeveloper?: User;
  landSteward?: User;
  landOwner?: User;
  issuer?: User;
  reseller?: User;
  sdgs?: SDG[];
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.grey[50],
    [theme.breakpoints.down('sm')]: {
      padding: `${theme.spacing(8)} ${theme.spacing(7.5)} ${theme.spacing(9)}`,
    },
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(10.9)} ${theme.spacing(5)} ${theme.spacing(
        12.5,
      )}`,
    },
  },
  separator: {
    border: `1px solid ${theme.palette.grey[100]}`,
    marginTop: theme.spacing(7),
    marginBottom: theme.spacing(7),
  },
  image: {
    borderRadius: '2px',
    // boxShadow: `3px 3px ${theme.palette.grey[100]}`,
    width: '100%',
  },
  sdg: {
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(3),
    },
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(4),
    },
  },
  sdgs: {
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(14.25),
    },
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(21.25),
    },
  },
  userInfo: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(12),
    },
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(15),
    },
  },
  sdgGridItem: {
    '&:nth-child(odd)': {
      [theme.breakpoints.down('sm')]: {
        paddingRight: theme.spacing(5.5 / 2),
      },
      [theme.breakpoints.up('sm')]: {
        paddingRight: theme.spacing(6.8 / 2),
      },
    },
    '&:nth-child(even)': {
      [theme.breakpoints.down('sm')]: {
        paddingLeft: theme.spacing(5.5 / 2),
      },
      [theme.breakpoints.up('sm')]: {
        paddingLeft: theme.spacing(6.8 / 2),
      },
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(5.5),
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6.8),
    },
  },
  sdgGrid: {
    '&:not(:last-child)': {
      [theme.breakpoints.down('sm')]: {
        paddingBottom: theme.spacing(6.25),
      },
      [theme.breakpoints.up('sm')]: {
        paddingBottom: theme.spacing(8.75),
      },
    },
  },
  issuer: {
    '& img': {
      width: '70%',
      height: '70%',
    },
  },
}));

export default function ProjectTopCard({
  classes,
  projectDeveloper,
  landSteward,
  landOwner,
  issuer,
  reseller,
  sdgs,
}: ProjectTopCardProps): JSX.Element {
  const styles = useStyles();
  return (
    <Card className={cx(styles.root, classes && classes.root)}>
      {sdgs && (
        <div className={styles.sdgs}>
          <Title className={styles.sdg} variant="h3">
            SDGs
          </Title>
          <Grid container>
            {sdgs.map((sdg: SDG, index: number) => (
              <Grid className={styles.sdgGridItem} key={index} item xs={6}>
                <img
                  className={styles.image}
                  alt={sdg.title || sdg.imageUrl}
                  src={sdg.imageUrl}
                />
              </Grid>
              // Previous layout version, keep it here in case we wanna use it in the future
              // <Grid key={index} className={styles.sdgGrid} container wrap="nowrap" alignItems="center">
              //   <Grid item>
              //     <img className={styles.image} alt={sdg.imageUrl} src={sdg.imageUrl} />
              //   </Grid>
              //   <Grid item>
              //     <Title variant="h5">{sdg.title}</Title>
              //   </Grid>
              // </Grid>
            ))}
          </Grid>
        </div>
      )}
      {projectDeveloper && (
        <div className={cx(styles.userInfo, classes && classes.userInfo)}>
          <UserInfoWithTitle
            size="xl"
            user={projectDeveloper}
            title="project developer"
          />
        </div>
      )}
      {landSteward && (
        <div className={cx(styles.userInfo, classes && classes.userInfo)}>
          {/* <hr className={styles.separator} /> */}
          <UserInfoWithTitle
            size="xl"
            user={landSteward}
            title="land steward"
          />
        </div>
      )}
      {landOwner && (
        <div className={cx(styles.userInfo, classes && classes.userInfo)}>
          {/* <hr className={styles.separator} /> */}
          <UserInfoWithTitle size="xl" user={landOwner} title="land owner" />
        </div>
      )}
      {issuer && (
        <div className={styles.issuer}>
          <UserInfoWithTitle size="xl" user={issuer} title="issuer" />
        </div>
      )}
      {reseller && (
        <div className={styles.issuer}>
          <UserInfoWithTitle size="xl" user={reseller} title="reseller" />
        </div>
      )}
    </Card>
  );
}
