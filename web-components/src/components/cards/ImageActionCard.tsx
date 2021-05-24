import React from 'react';
import clsx from 'clsx';
import ReactHtmlParser from 'react-html-parser';
import { makeStyles, Theme } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import OutlinedButton from '../buttons/OutlinedButton';
import MediaCard from '../cards/MediaCard';

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
  title: string;
  btnText?: string;
  className?: string;
};

const ImageActionCard: React.FC<Props> = ({ btnText = 'Choose Credit Class', ...p }) => {
  const classes = useStyles();
  return (
    <MediaCard imgSrc={p.imgSrc} className={clsx(classes.root, p.className)} elevation={1}>
      <CardContent>
        <Typography gutterBottom className={classes.title} variant="h5">
          {ReactHtmlParser(p.title)}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {p.description}
        </Typography>
        <OutlinedButton className={classes.btn} onClick={p.onClick}>
          {btnText}
        </OutlinedButton>
      </CardContent>
    </MediaCard>
  );
};

export default ImageActionCard;
