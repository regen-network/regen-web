import React from 'react';
import { makeStyles } from 'tss-react/mui';

import { Spinner } from '../icons/Spinner';
import Modal, { RegenModalProps } from '../modal';
import { Body, Title } from '../typography';

const useStyles = makeStyles()(theme => ({
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
  verticalSpacing: {
    marginBottom: theme.spacing(6),
  },
}));

export interface ProcessingModalProps extends RegenModalProps {
  title: string;
  bodyText: string;
}

const ProcessingModal: React.FC<React.PropsWithChildren<ProcessingModalProps>> =
  ({ open, onClose, title, bodyText }) => {
    const { classes: styles, cx } = useStyles();

    return (
      <Modal className={styles.root} open={open} onClose={onClose}>
        <Spinner className={cx(styles.verticalSpacing, styles.spinner)} />
        <Title align="center" variant="h3" mb={6}>
          {title}
        </Title>
        <Body size="lg" sx={{ mx: 4, mb: [8, 0] }}>
          {bodyText}
        </Body>
      </Modal>
    );
  };

export { ProcessingModal };
