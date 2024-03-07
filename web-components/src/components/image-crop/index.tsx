import React, { useCallback, useRef, useState } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import { Button } from '@mui/material';
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { makeStyles } from 'tss-react/mui';

import ContainedButton from '../buttons/ContainedButton';
import { getCroppedImg } from './canvas-utils';
import { APPLY, CANCEL, UPDATE } from './ImageCrop.constants';

import 'react-image-crop/dist/ReactCrop.css';

export interface ImageCropProps {
  image: string;
  circularCrop?: boolean;
  onCropSubmit: (blob: HTMLImageElement) => Promise<void>;
  onCancel: () => void;
  fixedCrop: Partial<Crop>;
  isCropSubmitDisabled?: boolean;
  isIgnoreCrop?: boolean;
  children?: React.ReactNode;
}

const useStyles = makeStyles()((theme: Theme) => ({
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
    marginTop: theme.spacing(10),
    [theme.breakpoints.up('sm')]: {
      paddingRight: 0,
    },
  },
  button: {
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginRight: theme.spacing(6),
    },
  },
  cancelButton: {
    color: theme.palette.grey[500],
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
  isCropSubmitDisabled,
  isIgnoreCrop = false,
  children,
}: ImageCropProps): JSX.Element {
  const { classes } = useStyles();
  const imgRef = useRef<any>(null);
  const [crop, setCrop] = useState<Partial<Crop>>(fixedCrop);
  const [loading, setLoading] = useState<boolean>(false);
  const [completedCrop, setCompletedCrop] = useState<Crop | undefined>(
    undefined,
  );
  const mobileMatches = useMediaQuery('(max-width:834px)');

  const showCroppedImage = useCallback(async () => {
    if (!!completedCrop) {
      try {
        const currentImage = imgRef.current;
        setLoading(true);
        const croppedImg = await getCroppedImg(currentImage, completedCrop);
        await onCropSubmit(croppedImg);
      } catch (e) {
        setLoading(false);
      }
    }
  }, [completedCrop, onCropSubmit]);

  /**
   * onLoad callback function to initialize the crop area based on the given image element.
   * It sets both the percentage-based and pixel-based crop areas.
   *
   * @param {HTMLImageElement} img - The image element to be used as a reference for calculating the crop area.
   * @returns {boolean} - Returns false to indicate that the crop state is set in this function.
   */
  const onLoad = useCallback(
    (img: HTMLImageElement) => {
      console.log(img);
      imgRef.current = img;
      const imgWidth = img.width;
      const imgHeight = img.height;
      const aspect = crop?.aspect || 1;
      const isPortrait = imgWidth / aspect < imgHeight * aspect;
      const isLandscape = imgWidth / aspect > imgHeight * aspect;
      const width = isPortrait ? 90 : ((imgHeight * aspect) / imgWidth) * 90;
      const height = isLandscape ? 90 : (imgWidth / aspect / imgHeight) * 90;
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

      const pxWidth = imgWidth * (width / 100);
      const pxHeight = imgHeight * (height / 100);
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
          onChange={setCrop}
          onComplete={setCompletedCrop}
          circularCrop={circularCrop}
          crossorigin="anonymous"
          imageStyle={{ width: '100%', maxHeight: mobileMatches ? 380 : 500 }}
        />
      </div>
      {children}
      <div className={classes.controls}>
        {!isIgnoreCrop && (
          <Button onClick={onCancel} className={classes.cancelButton}>
            {CANCEL}
          </Button>
        )}
        <ContainedButton
          onClick={isIgnoreCrop ? onCancel : showCroppedImage}
          className={classes.button}
          disabled={
            ((!completedCrop || loading) && !isIgnoreCrop) ||
            isCropSubmitDisabled
          }
        >
          {isIgnoreCrop ? UPDATE : APPLY}
        </ContainedButton>
      </div>
    </div>
  );
}
