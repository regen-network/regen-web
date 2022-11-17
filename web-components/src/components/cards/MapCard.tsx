import { useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import { makeStyles } from 'tss-react/mui';

import CloseIcon from '../icons/CloseIcon';
import Card from './Card';
// import useMediaQuery from '@mui/material/useMediaQuery';

export interface MapCardProps {
  name: string;
  description?: string;
  imgSrc?: string;
  color: string;
  isPopup: boolean;
  onClose?: () => void;
}

interface StyleProps {
  color: string;
}

const useStyles = makeStyles<StyleProps>()((theme, { color }) => ({
  image: {
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(25),
      height: theme.spacing(25),
      paddingRight: theme.spacing(5),
    },
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(19.25),
      height: theme.spacing(19.25),
      paddingRight: theme.spacing(3.75),
    },
  },
  container: {
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
      borderTop: `solid 9px ${color}`,
      padding: `${theme.spacing(9.5)} ${theme.spacing(7.75)} ${theme.spacing(
        7.25,
      )}`,
    },
    [theme.breakpoints.down('sm')]: {
      borderTop: `solid 6px ${color}`,
      padding: `${theme.spacing(6)} ${theme.spacing(3.75)} ${theme.spacing(
        4.25,
      )}`,
    },
  },
  name: {
    fontWeight: 'bold',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.375rem',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.primary.light,
  },
  description: {
    fontWeight: 'normal',
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.info.dark,
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(3),
      fontSize: '1rem',
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(2),
      fontSize: '0.75rem',
    },
  },
  closeIcon: {
    position: 'absolute',
    right: theme.spacing(3),
    top: theme.spacing(2.75),
  },
  grid: {
    flexWrap: 'nowrap',
  },
  arrowContainer: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
  },
}));

export default function CreditCard({
  name,
  description,
  imgSrc,
  color,
  isPopup,
  onClose,
}: MapCardProps): JSX.Element {
  const { classes } = useStyles({ color });
  const theme = useTheme();
  // const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Card borderColor={theme.palette.grey[100]} elevation={2} width="28rem">
      <div className={classes.container}>
        {isPopup && (
          <div className={classes.closeIcon} onClick={onClose}>
            <CloseIcon />
          </div>
        )}
        <Grid container className={classes.grid}>
          {imgSrc && (
            <Grid item>
              <img className={classes.image} src={imgSrc} alt={name} />
            </Grid>
          )}
          <Grid item>
            <div className={classes.name}>{name}</div>
            <div className={classes.description}>{description}</div>
          </Grid>
        </Grid>
      </div>
    </Card>
  );
}
