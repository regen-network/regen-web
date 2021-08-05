import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { Crop } from 'react-image-crop';

import ImageCrop from '../image-crop';
import Title from '../title';
import Modal from './';

export interface CropImageModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (image: HTMLImageElement) => void;
  circularCrop?: boolean;
  initialImage: string;
  fixedCrop?: Crop;
}

const useStyles = makeStyles((theme: Theme) => ({
  modal: {
    [theme.breakpoints.up('md')]: {
      height: '70%',
    },
    [theme.breakpoints.down('xs')]: {
      padding: 0,
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
    [theme.breakpoints.down('xs')]: {
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
  fixedCrop,
}: CropImageModalProps): JSX.Element {
  const classes = useStyles();

  return (
    <Modal open={open} onClose={onClose} className={classes.modal}>
      <div className={classes.root}>
        <Title variant="h4" align="center" className={classes.title}>
          Position and size your image
        </Title>
        <ImageCrop
          image={initialImage}
          onCropSubmit={onSubmit}
          onCancel={onClose}
          circularCrop={circularCrop}
          fixedCrop={fixedCrop}
        />
      </div>
    </Modal>
  );
}
