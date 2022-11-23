import React from 'react';

import {
  CertificationForm,
  CertificationProps,
} from '../form/CertificationForm';
import { RegenModalProps } from '../modal';
import { FormModalTemplate } from './FormModalTemplate';

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
