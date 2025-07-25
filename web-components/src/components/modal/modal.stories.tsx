import React, { useState } from 'react';
import { Avatar, Button, Card, CardMedia, Link } from '@mui/material';

import { bottomTextMapping } from '../form/form.mock';
import { SocialItemsMock } from '../share-section/ShareSection.mock';
import Modal from '.';
import { BasketPutModal } from './BasketPutModal';
import { BasketTakeModal } from './BasketTakeModal';
import { ConfirmModal } from './ConfirmModal';
import CropImageModal from './CropImageModal';
import { ProcessingModal } from './ProcessingModal';
import { SaveChangesWarningModal } from './SaveChangesWarningModal/SaveChangesWarningModal';
import { TxErrorModal } from './TxErrorModal';
import { TxSuccessfulModal } from './TxSuccessfulModal';

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

  const handleSubmit = async (
    croppedImage: HTMLImageElement,
  ): Promise<void> => {
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
        applyText="Apply"
        updateText="Update"
        uploadText="Uploading image"
        titleIgnoreCrop="Update image details"
        title="Position and size your image"
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
export const cropSquareImageModal = (): JSX.Element => <OpenCropImageModal />;
export const cropRoundImageModal = (): JSX.Element => (
  <OpenCropImageModal circularCrop />
);
export const processingModal = (): JSX.Element => (
  <ProcessingModal
    open={true}
    onClose={() => {}}
    title="Processing"
    bodyText="Processing"
  />
);
export const confirmModal = (): JSX.Element => (
  <ConfirmModal
    open={true}
    onClose={() => {}}
    linkComponent={Link}
    onConfirm={() => alert('confirmed!')}
    onConfirmTitle="Yes, cancel sell order"
    onCancelTitle="WHOOPS, EXIT"
    title="Are you sure would you like to cancel this sell order?"
    cardItems={[
      { label: 'sell order id:', value: { name: '233' } },
      { label: 'quantity:', value: { name: 1000 } },
      {
        label: 'batch denom:',
        value: { name: 'C01-20190101-20201010-003', url: '/' },
      },
    ]}
  />
);
export const txSuccessfulModal = (): JSX.Element => (
  <TxSuccessfulModal
    open={true}
    onClose={() => {}}
    linkComponent={Link}
    onButtonClick={() => alert('view on portofolio')}
    cardTitle="Put in basket"
    txHash="3F7EFAA3BBD0F4109094FEDA0D06B7E2C4C57A4720D591A1FACD42FC7E2C2583"
    txHashUrl="https://redwood.regen.aneka.io/txs/3F7EFAA3BBD0F4109094FEDA0D06B7E2C4C57A4720D591A1FACD42FC7E2C2583"
    cardItems={[
      { label: 'basket', value: { name: 'NCT' } },
      { label: 'amount', value: { name: 100 } },
    ]}
    description={
      'Visit <a href="https://app.regen.network" target="_blank">this link</a> to view the transaction.'
    }
    socialItems={SocialItemsMock}
    title="Put in basket"
    buttonTitle="View on portfolio"
    blockchainRecordText="Blockchain record"
    seeMoreText="+ see more"
    seeLessText="- see less"
  />
);
export const txErrorModal = (): JSX.Element => (
  <TxErrorModal
    open={true}
    onClose={() => {}}
    linkComponent={Link}
    onButtonClick={() => alert('view on portofolio')}
    cardTitle="Put in basket"
    txHash="3F7EFAA3BBD0F4109094FEDA0D06B7E2C4C57A4720D591A1FACD42FC7E2C2583"
    txHashUrl="https://redwood.regen.aneka.io/txs/3F7EFAA3BBD0F4109094FEDA0D06B7E2C4C57A4720D591A1FACD42FC7E2C2583"
    error="Lorem ipsum dolor sit apsicing sit amut."
    buttonTitle="View on portfolio"
    blockchainRecordText="Blockchain record"
    seeMoreText="+ see more"
    seeLessText="- see less"
  />
);

export const basketPutModal = (): JSX.Element => (
  <BasketPutModal
    title="Put in basket"
    basketOptions={[{ label: 'NCT', value: 'eco.uC.NCT' }]}
    availableTradableAmount={1000}
    batchDenoms={['C01-20190101-20201010-02']}
    open={true}
    onClose={() => null}
    onSubmit={async () => alert('submit')}
    batchLabel="Choose ecocredits batch"
    batchDescription={
      <>
        {'Choose any ecocredits that are eligible for this basket. '}
        <Link
          href="https://guides.regen.network/guides/regen-marketplace/baskets/put-in-basket"
          target="_blank"
        >
          Learn more»
        </Link>
      </>
    }
    basketLabel="Choose basket"
    amountLabel="Amount"
    submitLabel="Put in basket"
    submitErrorText="Please correct the errors above"
    requiredMessage="Required"
    invalidAmount="Invalid amount"
    maxLabel="Max"
    availableLabel="Available"
    insufficientCredits="Insufficient credits"
    invalidDecimalCount="Invalid decimal count"
  />
);

const MAPBOX_TOKEN = import.meta.env.STORYBOOK_MAPBOX_TOKEN || '';

export const basketTakeModal = (): JSX.Element => (
  <BasketTakeModal
    title="Take from basket"
    subtitle="You will receive one ecocredit for every basket token you redeem. Oldest batches will be pulled first."
    open={true}
    accountAddress="123xyz"
    basketDisplayDenom="eco.C.rNCT"
    basket={{
      curator: 'regen18hj7m3skrsrr8lfvwqh66r7zruzdvp6ylwxrx4',
      name: 'rNCT',
      basketDenom: 'eco.uC.rNCT',
      creditTypeAbbrev: 'C',
      disableAutoRetire: false,
      exponent: 6,
    }}
    balance={9999}
    mapboxToken={MAPBOX_TOKEN}
    onClose={() => null}
    onSubmit={() => alert('submit')}
    amountErrorText="You don't have enough basket tokens"
    stateProvinceErrorText="Required with postal code"
    amountLabel="Amount"
    retireOnTakeLabel="Retire credits upon transfer"
    retireOnTakeTooltip="The creator of this basket has chosen that all credits must be retired upon take."
    submitLabel="take from basket"
    submitErrorText="Please correct the errors above"
    retirementInfoText="Retirement is permanent and non-reversible."
    requiredMessage="Required"
    invalidAmount="Invalid amount"
    maxLabel="Max"
    availableLabel="Available"
    insufficientCredits="Insufficient credits"
    invalidDecimalCount="Invalid decimal count"
    invalidMemoLength="Invalid memo length"
    bottomTextMapping={bottomTextMapping}
  />
);

export const saveChangesWarningModal = (): JSX.Element => (
  <SaveChangesWarningModal
    open={true}
    onClose={() => null}
    navigate={() => null}
    title="Save changes"
    bodyText="Are you sure you want to save changes?"
    buttonText="Save"
  />
);
