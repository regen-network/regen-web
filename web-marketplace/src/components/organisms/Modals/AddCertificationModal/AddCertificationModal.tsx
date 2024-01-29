import React from 'react';

import { RegenModalProps } from 'web-components/src/components/modal';
import { FormModalTemplate } from 'web-components/src/components/modal/FormModalTemplate';

import {
  CertificationForm,
  CertificationProps,
} from 'components/organisms/CertificationForm/CertificationForm';

interface AddCertificationModalProps
  extends RegenModalProps,
    CertificationProps {}

export const title = 'Additional Certificate';

const AddCertificationModal: React.FC<
  React.PropsWithChildren<AddCertificationModalProps>
> = ({ open, onClose, onSubmit }) => (
  <FormModalTemplate title={title} open={open} onClose={onClose}>
    <CertificationForm onClose={onClose} onSubmit={onSubmit} />
  </FormModalTemplate>
);

export { AddCertificationModal };
