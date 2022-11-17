import React from 'react';
import { DefaultTheme as Theme } from '@mui/styles';
import { makeStyles } from 'tss-react/mui';

import GreenCard from './GreenCard';

export interface GreenMediaCardProps {
  imageUrl: string;
  link: string;
  className?: string;
}

const useStyles = makeStyles()((theme: Theme) => ({
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

export default function GreenMediaCard({
  className,
  imageUrl,
  link,
}: GreenMediaCardProps): JSX.Element {
  const { classes, cx } = useStyles();

  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <GreenCard className={cx(className, classes.root)}>
        <img className={classes.img} src={imageUrl} alt={imageUrl} />
      </GreenCard>
    </a>
  );
}
