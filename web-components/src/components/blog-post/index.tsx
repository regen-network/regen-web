import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Title from '../title';
import OutlinedButton from '../buttons/OutlinedButton';
import { BlockContent } from '../block-content';

export interface BlogPostProps {
  header: string;
  description: string | any[]; // optional array for sanity block content
  img: JSX.Element;
  url: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  image: {
    '& :first-child': {
      width: '100%',
      borderRadius: '10px',
      border: `1px solid ${theme.palette.info.light}`,
      [theme.breakpoints.down('xs')]: {
        height: theme.spacing(50.75),
      },
      [theme.breakpoints.up('sm')]: {
        height: theme.spacing(63),
      },
    },
  },
  header: {
    lineHeight: '150%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(3),
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(3.25),
      paddingBottom: theme.spacing(2),
    },
  },
  description: {
    paddingBottom: theme.spacing(5.75),
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3.5),
    },
    color: theme.palette.info.dark,
    lineHeight: '150%',
  },
  button: {
    width: theme.spacing(38),
    height: theme.spacing(10),
    paddingRight: theme.spacing(0),
    paddingLeft: theme.spacing(0),
  },
}));

const BlogPost: React.FC<BlogPostProps> = ({ header, description, img, url }) => {
  const classes = useStyles({});
  return (
    <div>
      <div className={classes.image}>{img}</div>
      <Title variant="h5" className={classes.header}>
        {header}
      </Title>
      <Typography className={classes.description} component="div">
        {typeof description == 'string' ? description : <BlockContent content={description} />}
      </Typography>
      <OutlinedButton className={classes.button} href={url} target="_blank" rel="noopener noreferrer">
        read more
      </OutlinedButton>
    </div>
  );
};

export default BlogPost;
