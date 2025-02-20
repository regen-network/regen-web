import React from 'react';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import { FormModalTemplate } from 'web-components/src/components/modal/FormModalTemplate';
import { RegenModalPropsWithOnClose } from 'web-components/src/types/shared/modalPropsWithOnClose';

import {
  CertificationForm,
  CertificationProps,
} from 'components/organisms/CertificationForm/CertificationForm';

interface AddCertificationModalProps
  extends RegenModalPropsWithOnClose,
    CertificationProps {}

export const title = msg`Additional Certificate`;

const AddCertificationModal: React.FC<
  React.PropsWithChildren<AddCertificationModalProps>
> = ({ open, onClose, onSubmit }) => {
  const { _ } = useLingui();

  return (
    <FormModalTemplate title={_(title)} open={open} onClose={onClose}>
      <CertificationForm onClose={onClose} onSubmit={onSubmit} />
    </FormModalTemplate>
  );
};

export { AddCertificationModal };
