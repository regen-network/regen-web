import React, { useCallback, useRef, useState } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import { CircularProgress } from '@mui/material';
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { makeStyles } from 'tss-react/mui';

import { CancelButtonFooter } from '../organisms/CancelButtonFooter/CancelButtonFooter';
import { getCroppedImg } from './canvas-utils';

import 'react-image-crop/dist/ReactCrop.css';

export interface ImageCropProps {
  image: string;
  circularCrop?: boolean;
  onCropSubmit: (blob: HTMLImageElement) => Promise<void>;
  onCancel: () => void;
  aspect?: number;
  isCropSubmitDisabled?: boolean;
  isIgnoreCrop?: boolean;
  uploadText: string;
  updateText: string;
  applyText: string;
  children?: React.ReactNode;
}

const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    display: 'flex',
    [theme.breakpoints.down('tablet')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    gap: theme.spacing(12.5),
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  container: {
    [theme.breakpoints.up('tablet')]: {
      width: '50%',
    },
    [theme.breakpoints.down('tablet')]: {
      width: '100%',
    },
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 80,
    width: '100%',
    // padding: theme.spacing(6),
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
    fontSize: theme.spacing(4),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    border: 'none',
  },
}));

export default function ImageCrop({
  image,
  circularCrop,
  onCropSubmit,
  onCancel,
  aspect = 1,
  isCropSubmitDisabled,
  isIgnoreCrop = false,
  uploadText,
  updateText,
  applyText,
  children,
}: ImageCropProps): JSX.Element {
  const { classes } = useStyles();
  const imgRef = useRef<any>(null);
  const [crop, setCrop] = useState<Crop>();
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
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      imgRef.current = e.currentTarget;
      const imgWidth = e.currentTarget.width;
      const imgHeight = e.currentTarget.height;
      const isPortrait = imgWidth / aspect < imgHeight * aspect;
      const isLandscape = imgWidth / aspect > imgHeight * aspect;
      const width = isPortrait ? 90 : ((imgHeight * aspect) / imgWidth) * 90;
      const height = isLandscape ? 90 : (imgWidth / aspect / imgHeight) * 90;
      const y = (100 - height) / 2;
      const x = (100 - width) / 2;

      const percentCrop: Crop = {
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
        unit: 'px',
        width: pxWidth,
        height: pxHeight,
        x: pxX,
        y: pxY,
      };
      setCompletedCrop(pxCrop);

      return false; // Return false if you set crop state in here.
    },
    [aspect],
  );

  return (
    <>
      <div className={classes.root}>
        <div className={classes.container}>
          <ReactCrop
            aspect={aspect}
            crop={crop}
            onChange={setCrop}
            onComplete={setCompletedCrop}
            circularCrop={circularCrop}
          >
            <img
              src={image}
              alt="crop"
              onLoad={onLoad}
              crossOrigin="anonymous"
              style={{ width: '100%', maxHeight: mobileMatches ? 380 : 500 }}
            />
          </ReactCrop>
        </div>
        <div className={classes.container}>
          {children}
          <div className={classes.controls}>
            <CancelButtonFooter
              onCancel={onCancel}
              onClick={isIgnoreCrop ? onCancel : showCroppedImage}
              className={classes.button}
              disabled={
                ((!completedCrop || loading) && !isIgnoreCrop) ||
                isCropSubmitDisabled
              }
              label={
                <>
                  {loading ? (
                    <>
                      <div className="h-20">
                        <CircularProgress size={20} color="secondary" />
                      </div>
                      <span className="ml-5">{uploadText}</span>
                    </>
                  ) : isIgnoreCrop ? (
                    updateText
                  ) : (
                    applyText
                  )}
                </>
              }
              hideCancel={isIgnoreCrop || loading}
            />
          </div>
        </div>
      </div>
    </>
  );
}
