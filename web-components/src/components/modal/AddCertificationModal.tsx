import React from 'react';
import { RegenModalProps } from '../modal';
import { FormModalTemplate } from './FormModalTemplate';
import {
  CertificationForm,
  CertificationProps,
} from '../form/CertificationForm';

interface AddCertificationModalProps
  extends RegenModalProps,
    CertificationProps {}

export const title = 'Additional Certificate';

const AddCertificationModal: React.FC<AddCertificationModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => (
  <FormModalTemplate title={title} open={open} onClose={onClose}>
    <CertificationForm onClose={onClose} onSubmit={onSubmit} />
  </FormModalTemplate>
);

export { AddCertificationModal };
