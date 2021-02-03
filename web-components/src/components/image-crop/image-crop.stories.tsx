import React, { useState } from 'react';
import ImageCrop from 'web-components/lib/components/image-crop';
import { makeStyles, Theme } from '@material-ui/core';
import OutlinedButton from '../buttons/OutlinedButton';

export default {
  title: 'Components|Image Crop',
  component: ImageCrop,
};

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    display: 'flex',
  },
  cropped: {
    display: 'flex',
    flexDirection: 'column',
  },
  imageContainer: {
    position: 'relative',
    flex: 1,
    padding: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 250,
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

const dogImg =
  'https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000';

function ShowImageCrop(): JSX.Element {
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const classes = useStyles();

  function reset(): void {
    setCroppedImage(null);
  }

  return (
    <div className={classes.root}>
      {croppedImage ? (
        <div className={classes.cropped}>
          <div className={classes.imageContainer}>
            <img className={classes.image} src={croppedImage} alt="cropped" />
          </div>
          <OutlinedButton onClick={reset} className={classes.button}>
            Close
          </OutlinedButton>
        </div>
      ) : (
        <ImageCrop image={dogImg} onCropSubmit={setCroppedImage} onCancel={reset} />
      )}
    </div>
  );
}

function ShowImageCropUnrestricted(): JSX.Element {
  const [croppedImage, setCroppedImage] = useState<string>(null);
  const classes = useStyles();

  function reset(): void {
    setCroppedImage(null);
  }

  return (
    <div className={classes.root}>
      {croppedImage ? (
        <div className={classes.cropped}>
          <div className={classes.imageContainer}>
            <img className={classes.image} src={croppedImage} alt="cropped" />
          </div>
          <OutlinedButton onClick={reset} className={classes.button}>
            Close
          </OutlinedButton>
        </div>
      ) : (
        <ImageCrop image={dogImg} onCropSubmit={setCroppedImage} onCancel={reset} restrictPosition={false} />
      )}
    </div>
  );
}

export const imageCrop = (): JSX.Element => <ShowImageCrop />;
export const imageCropUnrestricted = (): JSX.Element => <ShowImageCropUnrestricted />;
