import React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import OutlinedButton from '../buttons/OutlinedButton';
import MediaCard from '../cards/MediaCard';
import { parseText } from '../../utils/textParser';

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
    '& p': {
      margin: 0,
    },
  },
}));

type Props = {
  description: string | JSX.Element;
  imgSrc: string;
  onClick: () => void;
  title: string | JSX.Element;
  btnText: string;
  className?: string;
};

const ImageActionCard: React.FC<Props> = props => {
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
            {parseText(props.title)}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {parseText(props.description)}
          </Typography>
        </div>

        <OutlinedButton className={styles.btn} onClick={props.onClick}>
          {props.btnText}
        </OutlinedButton>
      </CardContent>
    </MediaCard>
  );
};

export default ImageActionCard;
