import React, { useState } from 'react';
import { Button, Card, Avatar, CardMedia, Link } from '@mui/material';
import Long from 'long';

import Modal from 'web-components/lib/components/modal';
import IssuanceModal from 'web-components/lib/components/modal/IssuanceModal';
import CropImageModal from 'web-components/lib/components/modal/CropImageModal';
import { ProcessingModal } from 'web-components/lib/components/modal/ProcessingModal';
import { TxSuccessfulModal } from 'web-components/lib/components/modal/TxSuccessfulModal';
import { CreditSendModal } from 'web-components/lib/components/modal/CreditSendModal';
import { CreditRetireModal } from 'web-components/lib/components/modal/CreditRetireModal';
import { BasketPutModal } from 'web-components/lib/components/modal/BasketPutModal';
import { BasketTakeModal } from 'web-components/lib/components/modal/BasketTakeModal';

export default {
  title: 'Modal',
  component: Modal,
};

function OpenModal(): JSX.Element {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open Modal
      </Button>
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
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open Modal
      </Button>
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
        standard={{
          documentId: 'RND_PG',
          name: 'Regen Registry Program Guide',
          version: 'v1.0',
        }}
        creditClass={{
          documentId: 'RND_CC_0001',
          name: 'CarbonPlus Grasslands',
          version: 'v0.9',
        }}
        methodology={{
          documentId: 'RND_M0001',
          name: 'CarbonPlus Grasslands',
          version: 'v0.9',
        }}
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
    if (
      event &&
      event.target &&
      event.target.files &&
      event.target.files.length
    ) {
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
          <Avatar
            style={{ height: 'inherit', width: 'inherit' }}
            src={image}
            title="cropped image"
          />
        ) : (
          image && (
            <CardMedia
              style={{ height: 'inherit', width: 'inherit' }}
              image={image}
              title="cropped image"
            />
          )
        )}
      </Card>
    </div>
  );
}

export const modal = (): JSX.Element => <OpenModal />;
export const ledgerModal = (): JSX.Element => <OpenLedgerModal />;
export const cropSquareImageModal = (): JSX.Element => <OpenCropImageModal />;
export const cropRoundImageModal = (): JSX.Element => (
  <OpenCropImageModal circularCrop />
);
export const processingModal = (): JSX.Element => (
  <ProcessingModal open={true} onClose={() => {}} />
);
export const txSuccessfulModal = (): JSX.Element => (
  <TxSuccessfulModal
    open={true}
    onClose={() => {}}
    linkComponent={Link}
    onViewPortfolio={() => alert('view on portofolio')}
    cardTitle="Put in basket"
    txHash="3F7EFAA3BBD0F4109094FEDA0D06B7E2C4C57A4720D591A1FACD42FC7E2C2583"
    txHashUrl="https://redwood.regen.aneka.io/txs/3F7EFAA3BBD0F4109094FEDA0D06B7E2C4C57A4720D591A1FACD42FC7E2C2583"
    cardItems={[
      { label: 'basket', value: { name: 'NCT' } },
      { label: 'amount', value: { name: 100 } },
    ]}
  />
);

export const creditSendModal = (): JSX.Element => (
  <CreditSendModal
    sender={'regen18hj7m3skrsrr8lfvwqh66r7zruzdvp6ylwxrx4'}
    batchDenom={'C01-20190101-20201010-02'}
    open={true}
    onClose={() => null}
  />
);

export const creditRetireModal = (): JSX.Element => (
  <CreditRetireModal
    holder={'regen18hj7m3skrsrr8lfvwqh66r7zruzdvp6ylwxrx4'}
    batchDenom={'C01-20190101-20201010-02'}
    open={true}
    onClose={() => null}
  />
);

export const basketPutModal = (): JSX.Element => (
  <BasketPutModal
    basketOptions={[{ label: 'NCT', value: 'eco.uC.NCT' }]}
    availableTradableAmount={1000}
    batchDenom={'C01-20190101-20201010-02'}
    open={true}
    onClose={() => null}
    onSubmit={() => alert('submit')}
  />
);

export const basketTakeModal = (): JSX.Element => (
  <BasketTakeModal
    open={true}
    accountAddress={'123xyz'}
    basket={{
      id: new Long(1),
      $type: 'regen.ecocredit.basket.v1.Basket',
      name: 'rNCT',
      basketDenom: 'eco.uC.rNCT',
      creditTypeAbbrev: 'C',
      disableAutoRetire: false,
      exponent: 6,
    }}
    balance={9999}
    mapboxToken={process.env.STORYBOOK_MAPBOX_TOKEN}
    onClose={() => null}
    onSubmit={() => alert('submit')}
  />
);
