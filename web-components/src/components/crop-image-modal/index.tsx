import React from 'react';
import { makeStyles, Theme, Modal } from '@material-ui/core';
import ImageCrop from '../image-crop';
import CloseIcon from '../icons/CloseIcon';

export interface CropImageModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (image: string) => void;
  cropShape?: 'round' | 'rect' | undefined; // default 'rect'
  restrictPosition?: boolean; // default true
  image: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 24px 24px',
    background: theme.palette.primary.main,
    height: '32px',
    margin: 0,
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
}));

export default function CropImageModal({
  open,
  onClose,
  onSubmit,
  cropShape,
  restrictPosition = true,
  image,
}: CropImageModalProps): JSX.Element {
  const classes = useStyles();

  return (
    <Modal open={open} onClose={onClose}>
      <div className={classes.root}>
        <div className={classes.closeIcon} onClick={onClose}>
          <CloseIcon />
        </div>
        <h2 className={classes.title}>Position and size your image</h2>
        <ImageCrop
          image={image}
          onCropSubmit={onSubmit}
          onCancel={onClose}
          cropShape={cropShape}
          restrictPosition={restrictPosition}
        />
      </div>
    </Modal>
  );
}
