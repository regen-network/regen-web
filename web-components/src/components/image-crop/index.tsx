import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { makeStyles, Theme, Button } from '@material-ui/core';
import ContainedButton from '../buttons/ContainedButton';
import { getCroppedImg } from './canvas-utils';

export interface ImageCropProps {
  image: string;
  cropShape?: 'round' | 'rect' | undefined; // default 'rect'
  restrictPosition?: boolean; // default true
  onCropSubmit: (blob: string) => void;
  onCancel: () => void;
}

interface Area {
  x: number; // x/y are the coordinates of the top/left corner of the cropped area
  y: number;
  width: number; // width of the cropped area
  height: number; // height of the cropped area
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'absolute',
    top: 96,
    left: 0,
    right: 0,
    bottom: 0,
  },
  cropContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 80,
  },
  controls: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    width: '100%',
    transform: 'translateX(-50%)',
    height: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    background: theme.palette.primary.main,
  },
  slider: {
    padding: '22px 0px',
    color: theme.palette.secondary.main,
    marginLeft: theme.spacing(6),
    marginRight: theme.spacing(2),
  },
  button: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(6),
  },
  cancelButton: {
    color: theme.palette.grey[400],
    textTransform: 'none',
    fontSize: theme.spacing(4),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
}));

export default function ImageCrop({
  image,
  cropShape,
  restrictPosition = true,
  onCropSubmit,
  onCancel,
}: ImageCropProps): JSX.Element {
  const classes = useStyles();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPxls: Area) => {
    setCroppedAreaPixels(croppedAreaPxls);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImg = await getCroppedImg(image, croppedAreaPixels, rotation);
      onCropSubmit(croppedImg);
    } catch (e) {}
  }, [croppedAreaPixels, image, rotation, onCropSubmit]);

  return (
    <div className={classes.root}>
      <div className={classes.cropContainer}>
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={3 / 3}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          onRotationChange={setRotation}
          cropShape={cropShape}
          restrictPosition={restrictPosition}
        />
      </div>
      <div className={classes.controls} id="controls">
        <Button onClick={onCancel} className={classes.cancelButton}>
          Cancel
        </Button>
        <ContainedButton onClick={showCroppedImage} className={classes.button}>
          APPLY
        </ContainedButton>
      </div>
    </div>
  );
}
