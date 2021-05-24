import React from 'react';
import clsx from 'clsx';
import ReactHtmlParser from 'react-html-parser';
import { makeStyles, Theme } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import OutlinedButton from '../buttons/OutlinedButton';
import MediaCard from '../cards/MediaCard';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
    maxWidth: theme.spacing(90),
    borderRadius: theme.spacing(2),
  },
  title: {
    fontFamily: theme.typography.h1.fontFamily,
    fontWeight: 900,
  },
  btn: {
    marginTop: theme.spacing(2),
    width: '100%',
  },
  cardContent: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
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
  const styles = useStyles();
  return (
    <MediaCard imgSrc={p.imgSrc} className={clsx(styles.root, p.className)} elevation={1}>
      <CardContent className={styles.cardContent}>
        <div>
          <Typography gutterBottom className={styles.title} variant="h5">
            {ReactHtmlParser(p.title)}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {p.description}
          </Typography>
        </div>

        <OutlinedButton className={styles.btn} onClick={p.onClick}>
          {btnText}
        </OutlinedButton>
      </CardContent>
    </MediaCard>
  );
};

export default ImageActionCard;
