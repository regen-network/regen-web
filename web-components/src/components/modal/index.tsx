'use client';
import React from 'react';
import { RemoveScroll } from 'react-remove-scroll';
import Modal from '@mui/material/Modal';
import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

import CloseIcon from '../icons/CloseIcon';

export interface RegenModalProps {
  open: boolean;
  onClose?: () => void;
  className?: string;
  closeIconColor?: string;
  isIFrame?: boolean;
  isFullscreenMobile?: boolean;
}

const useStyles = makeStyles()((theme: Theme) => ({
  content: {
    outline: 'none',
    position: 'absolute',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    maxWidth: theme.spacing(150),
    [theme.breakpoints.up('md')]: {
      width: '50%',
      maxHeight: '90%',
    },
    [theme.breakpoints.between('sm', 'md')]: {
      width: '70%',
      maxHeight: '90%',
    },
    backgroundColor: theme.palette.grey[50],
    border: `1px solid ${theme.palette.grey[50]}`,
    boxShadow: theme.shadows[6],
    '& iframe': {
      width: '100%',
      height: '100%',
      border: 'none',
    },
  },
  notFullscreenMobile: {
    [theme.breakpoints.up('xs')]: {
      transform: 'translate(-50%, -50%)',
      top: '50%',
      left: '50%',
      width: '90%',
      maxHeight: '90%',
      borderRadius: '5px',
      padding: `${theme.spacing(10.75)} ${theme.spacing(4)} ${theme.spacing(
        15,
      )}`,
    },
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(10.75)} ${theme.spacing(16.5)} ${theme.spacing(
        15,
      )}`,
    },
  },
  fullscreenMobile: {
    [theme.breakpoints.down('sm')]: {
      left: '0px',
      top: '0px',
      width: '100%',
      height: '100%',
      transform: 'none',
      padding: `${theme.spacing(13.25)} ${theme.spacing(4)} ${theme.spacing(
        20,
      )}`,
    },
    [theme.breakpoints.up('sm')]: {
      borderRadius: '5px',
      transform: 'translate(-50%, -50%)',
      top: '50%',
      left: '50%',
      padding: `${theme.spacing(10.75)} ${theme.spacing(16.5)} ${theme.spacing(
        15,
      )}`,
    },
  },
  closeIcon: {
    position: 'absolute',
    top: theme.spacing(2.5),
    right: theme.spacing(2.5),
    height: '26px',
    width: '26px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  iframe: {
    padding: '0',
    overflow: 'hidden',
    [theme.breakpoints.up('md')]: {
      height: '90%',
    },
    [theme.breakpoints.between('sm', 'md')]: {
      height: '90%',
    },
  },
}));

const RegenModal: React.FC<React.PropsWithChildren<RegenModalProps>> = ({
  open,
  onClose,
  children,
  className,
  closeIconColor,
  isIFrame,
  isFullscreenMobile = true,
}) => {
  const { classes: styles, cx } = useStyles();
  return (
    <Modal open={open} onClose={onClose}>
      <RemoveScroll>
        <div
          className={cx(
            styles.content,
            isFullscreenMobile
              ? styles.fullscreenMobile
              : styles.notFullscreenMobile,
            isIFrame && styles.iframe,
            className,
          )}
        >
          {children}
          {onClose && (
            <div className={styles.closeIcon} onClick={onClose}>
              <CloseIcon svgColor={closeIconColor} />
            </div>
          )}
        </div>
      </RemoveScroll>
    </Modal>
  );
};

export default RegenModal;
