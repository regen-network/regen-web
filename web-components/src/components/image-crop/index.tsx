import React, { useState, useCallback, useRef } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { makeStyles, Theme, Button } from '@material-ui/core';
import ContainedButton from '../buttons/ContainedButton';
import { getCroppedImg } from './canvas-utils';
import useMediaQuery from '@material-ui/core/useMediaQuery';
export interface ImageCropProps {
  image: string;
  circularCrop?: boolean;
  onCropSubmit: (blob: HTMLImageElement) => void;
  onCancel: () => void;
  fixedCrop?: Crop;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cropContainer: {
    display: 'flex',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 80,
    width: '100%',
    padding: theme.spacing(6),
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
  circularCrop,
  onCropSubmit,
  onCancel,
  fixedCrop,
}: ImageCropProps): JSX.Element {
  const classes = useStyles();
  const imgRef = useRef<any>(null);
  const [crop, setCrop] = useState<Crop | undefined>(fixedCrop);
  const [completedCrop, setCompletedCrop] = useState<Crop | undefined>(fixedCrop);
  const mobileMatches = useMediaQuery('(max-width:834px)');

  const onCropComplete = useCallback((newCrop: Crop): void => {
    setCompletedCrop(newCrop);
  }, []);

  const showCroppedImage = useCallback(async () => {
    if (!!completedCrop) {
      try {
        const currentImage = imgRef.current;
        const croppedImg = await getCroppedImg(currentImage, completedCrop);

        onCropSubmit(croppedImg);
      } catch (e) {}
    }
  }, [completedCrop, onCropSubmit]);

  const onLoad = useCallback(
    img => {
      imgRef.current = img;
      const imgWidth = img.width;
      const imgHeight = img.height;
      const aspect = crop?.aspect || 1;
      const isPortrait = imgWidth / aspect < imgHeight * aspect;
      const isLandscape = imgWidth / aspect > imgHeight * aspect;
      let width;
      let height;

      if (crop?.width) {
        width = crop.width;
      } else {
        width = isPortrait ? 90 : ((imgHeight * aspect) / imgWidth) * 90;
      }

      if (crop?.height) {
        height = crop.height;
      } else {
        height = isLandscape ? 90 : (imgWidth / aspect / imgHeight) * 90;
      }

      const y = (100 - height) / 2;
      const x = (100 - width) / 2;
      const percentCrop: Crop = {
        aspect,
        unit: '%',
        width,
        height,
        x,
        y,
      };

      setCrop(percentCrop);

      const pxWidth = isPortrait ? imgWidth * 0.9 : imgHeight * 0.9;
      const pxHeight = pxWidth; // Square. This calculation will change if we need to support other aspect ratios
      const pxX = (imgWidth - pxWidth) / 2;
      const pxY = (imgHeight - pxHeight) / 2;
      const pxCrop: Crop = {
        aspect,
        unit: 'px',
        width: pxWidth,
        height: pxHeight,
        x: pxX,
        y: pxY,
      };
      setCompletedCrop(pxCrop);

      return false; // Return false if you set crop state in here.
    },
    [crop],
  );

  return (
    <div className={classes.root}>
      <div className={classes.cropContainer}>
        <ReactCrop
          src={image}
          crop={crop}
          onImageLoaded={onLoad}
          onChange={(crop: Crop, percentCrop: any) => setCrop(percentCrop)}
          onComplete={c => onCropComplete(c)}
          circularCrop={circularCrop}
          crossorigin="anonymous"
          imageStyle={{ maxHeight: mobileMatches ? 380 : 500 }}
        />
      </div>
      <div className={classes.controls}>
        <Button onClick={onCancel} className={classes.cancelButton}>
          Cancel
        </Button>
        <ContainedButton onClick={showCroppedImage} className={classes.button} disabled={!completedCrop}>
          Apply
        </ContainedButton>
      </div>
    </div>
  );
}
