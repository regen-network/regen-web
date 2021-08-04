import React, { useState } from 'react';
import Modal from 'web-components/lib/components/modal';
import IssuanceModal from 'web-components/lib/components/modal/IssuanceModal';
import CropImageModal from 'web-components/lib/components/modal/CropImageModal';
import { Button, Card, Avatar, CardMedia } from '@material-ui/core';

export default {
  title: 'Components|Modal',
  component: Modal,
};

function OpenModal(): JSX.Element {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <p>I'm a Modal</p>
      </Modal>
    </div>
  );
}

function OpenLedgerModal(): JSX.Element {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <IssuanceModal
        open={open}
        onClose={() => setOpen(false)}
        link="https://devnet.regen.aneka.io/txs/C7F4DDC696BB64605D2ACB45D5999CF3E36F2F73783E6DB5066CFB282A6E7C42"
        issuer={{
          name: 'Regen Network Development, Inc.',
          role: 'CTO',
          individual: 'Christian Shearer',
          address: 'regen:1p6syuqk3e5a8hwp8e20jyjwr8p7nj270x4spqm',
          location: 'Great Barrington, Massachussetts, United States',
          description:
            'Regen Network realigns the agricultural economy with ecological health by creating the global marketplace for planetary stewardship.',
        }}
        issuees={[
          {
            name: 'Wyelba Pty Ltd',
            role: 'Director',
            individual: 'Eric Lawrence',
            address: 'regen:1wuufq6vkl4qmmgzs06mtgatklpxr5zr4qqnk4k',
            location: 'New South Wales, Australia',
            description: 'Lorem ipsum',
          },
        ]}
        timestamp={new Date('2020-12-16 09:23:41.904137+00')}
        numberOfCredits={28682}
        creditUnit="1 ton of CO2e"
        vintageId={{
          name: 'certificate',
          info: '634aabf4',
          link: 'https://regen-registry.s3.amazonaws.com/projects/wilmot/wilmot-certificate-121620.pdf',
        }}
        vintagePeriod="2017-2019"
        monitoringPeriods={[
          {
            name: 'monitoring report',
            info: '2017-2018',
            link: 'https://regen-registry.s3.amazonaws.com/projects/wilmot/Wilmot+Monitoring+Report+2018.pdf',
          },
          {
            name: 'monitoring report',
            info: '2018-2019',
            link: 'https://regen-registry.s3.amazonaws.com/projects/wilmot/Wilmot+Monitoring+Report+2019.pdf',
          },
        ]}
        projectName="Wilmot"
        standardId={{
          name: 'RND_PG',
          version: 'v1.0',
        }}
        creditClass={{
          name: 'CarbonPlus Grasslands',
          version: 'v0.9',
        }}
        creditClassHandle="RND_CC_0001"
        methodology={{
          name: 'CarbonPlus Grasslands',
          version: 'v0.9',
        }}
        methodologyHandle="RND_M0001"
      />
    </div>
  );
}

interface CropStoryProps {
  circularCrop?: boolean;
}

function OpenCropImageModal(props: CropStoryProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState('');
  const [uploadedImage, setUploadedImage] = useState('');

  // On file select (from the pop up)
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event && event.target && event.target.files && event.target.files.length) {
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

  const handleSubmit = (croppedImage: HTMLImageElement): void => {
    const imageUrl = croppedImage.src;
    setImage(imageUrl);
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
        initialImage={uploadedImage}
        circularCrop={props.circularCrop}
      />
      <Card style={{ width: 200, height: 200, marginTop: 32 }}>
        {props.circularCrop ? (
          <Avatar style={{ height: 'inherit', width: 'inherit' }} src={image} title="cropped image" />
        ) : (
          image && (
            <CardMedia style={{ height: 'inherit', width: 'inherit' }} image={image} title="cropped image" />
          )
        )}
      </Card>
    </div>
  );
}

export const modal = (): JSX.Element => <OpenModal />;
export const ledgerModal = (): JSX.Element => <OpenLedgerModal />;
export const cropSquareImageModal = (): JSX.Element => <OpenCropImageModal />;
export const cropRoundImageModal = (): JSX.Element => <OpenCropImageModal circularCrop />;
