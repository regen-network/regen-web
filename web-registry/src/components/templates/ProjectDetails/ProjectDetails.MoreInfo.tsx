import React, { useState } from 'react';
import { Modal } from '@mui/material';

import Banner from 'web-components/lib/components/banner';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import FixedFooter from 'web-components/lib/components/fixed-footer';
import MoreInfoForm from 'web-components/lib/components/form/MoreInfoForm';
import EmailIcon from 'web-components/lib/components/icons/EmailIcon';

import getApiUri from '../../../lib/apiUri';

export function MoreInfo(): JSX.Element {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <FixedFooter justifyContent="flex-end">
        <>
          <ContainedButton
            size="large"
            onClick={() => setOpen(true)}
            startIcon={<EmailIcon />}
          >
            send me more info
          </ContainedButton>
          {/*
            <OutlinedButton className={styles.callButton} startIcon={<PhoneIcon />}>
              schedule a call
            </OutlinedButton>
          */}
        </>
      </FixedFooter>
      <Modal open={open} onClose={handleClose}>
        <MoreInfoForm
          apiUrl={getApiUri()}
          onClose={handleClose}
          onSubmit={() => {
            handleClose();
            setSubmitted(true);
          }}
        />
      </Modal>
      {submitted && <Banner text="Thanks for submitting your information!" />}
    </>
  );
}
