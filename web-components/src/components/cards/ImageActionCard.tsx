import React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import OutlinedButton from '../buttons/OutlinedButton';
import Card from './Card';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    maxWidth: theme.spacing(90),
    borderRadius: theme.spacing(2),
  },
  title: {
    fontFamily: theme.typography.h1.fontFamily,
    fontWeight: 900,
  },
  btn: {
    width: '100%',
    marginTop: theme.spacing(6),
  },
  media: {
    height: theme.spacing(40),
  },
}));

type Props = {
  description: string;
  imgSrc: string;
  onClick: () => void;
  title: string | (() => JSX.Element); // optional render function for italic text segments
  btnText?: string;
  className?: string;
};

const ImageActionCard: React.FC<Props> = ({ btnText = 'Choose Credit Class', ...p }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, p.className)}>
      <CardMedia className={classes.media} image={p.imgSrc} title={p.description} />
      <CardContent>
        <Typography gutterBottom className={classes.title} variant="h5">
          {typeof p.title === 'function' ? p.title() : p.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {p.description}
        </Typography>
        <OutlinedButton className={classes.btn} onClick={p.onClick}>
          {btnText}
        </OutlinedButton>
      </CardContent>
    </Card>
  );
};

export default ImageActionCard;
