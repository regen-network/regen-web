import React from 'react';
import { Crop } from 'react-image-crop';
import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

import ImageCrop from '../image-crop';
import { Title } from '../typography';
import Modal from './';

export interface CropImageModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (image: HTMLImageElement) => Promise<void>;
  circularCrop?: boolean;
  initialImage: string;
  fixedCrop?: Partial<Crop>;
  isCropSubmitDisabled?: boolean;
  isIgnoreCrop?: boolean;
  children?: React.ReactNode;
}

const useStyles = makeStyles()((theme: Theme) => ({
  modal: {
    [theme.breakpoints.up('tablet')]: {
      width: '909px',
      maxWidth: '909px',
    },
    [theme.breakpoints.down('sm')]: {
      paddingY: 0,
      paddingX: 2.5,
    },
    [theme.breakpoints.between('xs', 'tablet')]: {
      maxHeight: '100%',
    },
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: 0,
      paddingBottom: theme.spacing(7.5),
      paddingLeft: theme.spacing(7.5),
      paddingRight: theme.spacing(7.5),
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(6),
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
}));

export default function CropImageModal({
  open,
  onClose,
  onSubmit,
  circularCrop,
  initialImage,
  fixedCrop = {},
  isCropSubmitDisabled = false,
  isIgnoreCrop = false,
  children,
}: CropImageModalProps): JSX.Element {
  const { classes } = useStyles();

  return (
    <Modal open={open} onClose={onClose} className={classes.modal}>
      <div className={classes.root}>
        <Title variant="h4" align="center" className={classes.title}>
          {isIgnoreCrop
            ? 'Update image details'
            : 'Position and size your image'}
        </Title>
        <ImageCrop
          image={initialImage}
          onCropSubmit={onSubmit}
          onCancel={onClose}
          circularCrop={circularCrop}
          fixedCrop={fixedCrop}
          isCropSubmitDisabled={isCropSubmitDisabled}
          isIgnoreCrop={isIgnoreCrop}
        >
          {children}
        </ImageCrop>
      </div>
    </Modal>
  );
}
