import React from 'react';
import clsx from 'clsx';
import ReactHtmlParser from 'react-html-parser';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import OutlinedButton from '../buttons/OutlinedButton';
import MediaCard from '../cards/MediaCard';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
    borderRadius: theme.spacing(2),
  },
  title: {
    fontFamily: theme.typography.h1.fontFamily,
    fontWeight: 900,
  },
  btn: {
    marginTop: theme.spacing(4),
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

const ImageActionCard: React.FC<Props> = ({ btnText = 'Choose Credit Class', ...props }) => {
  const styles = useStyles();
  const theme = useTheme();
  return (
    <MediaCard
      imgSrc={props.imgSrc}
      className={clsx(styles.root, props.className)}
      elevation={1}
      borderRadius="10px"
      borderColor={theme.palette.grey[100]}
    >
      <CardContent className={styles.cardContent}>
        <div>
          <Typography gutterBottom className={styles.title} variant="h5">
            {ReactHtmlParser(props.title)}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.description}
          </Typography>
        </div>

        <OutlinedButton className={styles.btn} onClick={props.onClick}>
          {btnText}
        </OutlinedButton>
      </CardContent>
    </MediaCard>
  );
};

export default ImageActionCard;
