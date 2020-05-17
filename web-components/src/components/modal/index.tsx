import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import CloseIcon from '../icons/CloseIcon';

interface RegenModalProps {
  open: boolean;
  onClose: () => void;
  children: any;
}

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    outline: 'none',
    position: 'absolute',
    [theme.breakpoints.up('sm')]: {
      borderRadius: '20px',
      transform: 'translate(-50%, -50%)',
      top: '50%',
      left: '50%',
      padding: `${theme.spacing(10.75)} ${theme.spacing(7.5)} ${theme.spacing(15)}`,
    },
    [theme.breakpoints.up('md')]: {
      width: '50%',
      height: '70%',
    },
    [theme.breakpoints.between('sm', 'sm')]: {
      width: '70%',
      height: '70%',
    },
    [theme.breakpoints.down('xs')]: {
      width: `calc(100% - 40px)`,
      height: `calc(100% - 20px)`,
      left: '20px',
      top: '20px',
      // width: '100%',
      // height: '100%',
      transform: 'none',
      padding: `${theme.spacing(13.25)} ${theme.spacing(4)} ${theme.spacing(20)}`,
    },
    backgroundColor: theme.palette.primary.main,
    boxShadow: theme.shadows[3],
    '& iframe': {
      width: '100%',
      height: '100%',
      border: 'none',
    },
  },
  closeIcon: {
    position: 'absolute',
    [theme.breakpoints.up('sm')]: {
      top: theme.spacing(5.75),
      right: theme.spacing(4.75),
    },
    [theme.breakpoints.down('xs')]: {
      top: theme.spacing(4),
      right: theme.spacing(3.75),
    },
    height: '26px',
    width: '26px',
    // backgroundColor: theme.palette.primary.main,
    // borderRadius: '50%',
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
    cursor: 'pointer',
    fontWeight: 'bold',
    // boxShadow: theme.shadows[5],
  },
}));

export default function RegenModal({ open, onClose, children }: RegenModalProps): JSX.Element {
  const classes = useStyles({});
  return (
    <Modal open={open} onClose={onClose}>
      <div className={classes.content}>
        {children}
        <div className={classes.closeIcon} onClick={onClose}>
          <CloseIcon />
        </div>
      </div>
    </Modal>
  );
}
