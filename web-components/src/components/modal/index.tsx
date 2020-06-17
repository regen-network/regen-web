import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import CloseIcon from '../icons/CloseIcon';
import { RemoveScroll } from 'react-remove-scroll';

interface RegenModalProps {
  open: boolean;
  onClose: () => void;
  children: any;
}

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    outline: 'none',
    position: 'absolute',
    overflow: 'auto',
    '-webkit-overflow-scrolling': 'touch',
    [theme.breakpoints.up('sm')]: {
      '&::-webkit-scrollbar': {
        width: '0.5em',
      },
      '&::-webkit-scrollbar-track': {
        boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
        webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
        marginTop: '20px',
        marginBottom: '20px',
        borderRadius: '6px',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,.2)',
        borderRadius: '6px',
      },
      borderRadius: '20px',
      transform: 'translate(-50%, -50%)',
      top: '50%',
      left: '50%',
      padding: `${theme.spacing(10.75)} ${theme.spacing(7.5)} ${theme.spacing(15)}`,
    },
    maxWidth: theme.spacing(150),
    [theme.breakpoints.up('md')]: {
      width: '50%',
      height: '80%',
    },
    [theme.breakpoints.between('sm', 'sm')]: {
      width: '70%',
      height: '80%',
    },
    [theme.breakpoints.down('xs')]: {
      left: '0px',
      top: '0px',
      width: '100%',
      height: '100%',
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
      <RemoveScroll>
        <div className={classes.content}>
          {children}
          <div className={classes.closeIcon} onClick={onClose}>
            <CloseIcon />
          </div>
        </div>
      </RemoveScroll>
    </Modal>
  );
}
