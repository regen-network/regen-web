import React, { useState } from 'react';
import CropImageModal from 'web-components/lib/components/crop-image-modal';
import { Button, Card, Avatar, CardMedia } from '@material-ui/core';

export default {
  title: 'Components|Crop Image Modal',
  component: CropImageModal,
};

interface CropStoryProps {
  variant?: 'round' | 'rect' | undefined; // default 'rect'
}

function OpenCropImageModal(props: CropStoryProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState('');
  const [uploadedImage, setUploadedImage] = useState('');

  // On file select (from the pop up)
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event && event.target && event.target.files) {
      const file = event.target.files[0];
      toBase64(file).then(image => {
        if (typeof image === 'string') {
          setUploadedImage(image);
          setOpen(true);
        }
      });
    }
  };

  const handleClose = (): void => {
    setUploadedImage('');
    setImage('');
    setOpen(false);
  };

  const handleSubmit = (cropppedImage: string): void => {
    setImage(cropppedImage);
    setOpen(false);
  };

  // Convert file to base64 string
  const toBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

  return (
    <div>
      <Button variant="contained" component="label">
        Add Image
        <input type="file" hidden onChange={onFileChange} accept="image/*" />
      </Button>

      <CropImageModal
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
        image={uploadedImage}
        cropShape={props.variant}
      />
      <Card style={{ width: 200, height: 200, marginTop: 32 }}>
        {props.variant === 'round'
          ? image && (
              <Avatar style={{ height: 'inherit', width: 'inherit' }} src={image} title="cropped image" />
            )
          : image && (
              <CardMedia
                style={{ height: 'inherit', width: 'inherit' }}
                image={image}
                title="cropped image"
              />
            )}
      </Card>
    </div>
  );
}

export const addSquareImage = (): JSX.Element => <OpenCropImageModal />;
export const addRoundImage = (): JSX.Element => <OpenCropImageModal variant="round" />;
