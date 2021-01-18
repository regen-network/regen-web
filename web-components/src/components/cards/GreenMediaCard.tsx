import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import GreenCard from './GreenCard';
import clsx from 'clsx';

export interface GreenMediaCardProps {
  imageUrl: string;
  link: string;
  className?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    borderTop: `10px ${theme.palette.secondary.dark} solid`,
    width: '100%',
    height: '100%',
    padding: 'inherit',
    borderLeft: `0.5px ${theme.palette.grey[100]} solid`,
    borderRight: `0.5px ${theme.palette.grey[100]} solid`,
    borderBottom: `0.5px ${theme.palette.grey[100]} solid`,
  },
  img: {
    maxHeight: '90%',
    maxWidth: '80%',
  },
}));

export default function GreenMediaCard({ className, imageUrl, link }: GreenMediaCardProps): JSX.Element {
  const classes = useStyles();

  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <GreenCard className={clsx(className, classes.root)}>
        <img className={classes.img} src={imageUrl} alt={imageUrl} />
      </GreenCard>
    </a>
  );
}
