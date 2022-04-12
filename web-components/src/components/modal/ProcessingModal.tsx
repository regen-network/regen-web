import React from 'react';
import { makeStyles } from '@mui/styles';
import cx from 'clsx';

import Description from '../description';
import Title from '../title';
import { Spinner } from '../icons/Spinner';
import Modal, { RegenModalProps } from '../modal';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      height: 'auto',
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(4),
    },
  },
  spinner: {
    marginTop: theme.spacing(4),
    height: '48px',
    width: '48px',
  },
  title: {
    [theme.breakpoints.up('sm')]: {
      lineHeight: theme.typography.pxToRem(44.8),
    },
    [theme.breakpoints.down('sm')]: {
      lineHeight: theme.typography.pxToRem(34.8),
    },
  },
  description: {
    padding: theme.spacing(0, 4),
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(18),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(16),
      marginBottom: theme.spacing(8),
    },
  },
  verticalSpacing: {
    marginBottom: theme.spacing(6),
  },
  button: {
    padding: theme.spacing(2, 6),
    fontSize: theme.typography.pxToRem(18),
  },
}));

interface Props extends RegenModalProps {}

const ProcessingModal: React.FC<Props> = ({ open, onClose }) => {
  const styles = useStyles();

  return (
    <Modal className={styles.root} open={open} onClose={onClose}>
      <Spinner className={cx(styles.verticalSpacing, styles.spinner)} />
      <Title
        className={cx(styles.title, styles.verticalSpacing)}
        align="center"
        variant="h3"
      >
        Please wait while transaction processes
      </Title>
      <Description
        className={cx(styles.description, styles.verticalSpacing)}
        align="center"
      >
        This may take up to 10 minutes.
      </Description>
    </Modal>
  );
};

export { ProcessingModal };
