import { useLingui } from '@lingui/react';

import { RegenModalProps } from 'web-components/src/components/modal';
import { SadBeeModal } from 'web-components/src/components/modal/SadBeeModal/SadBeeModal';
import { CancelButtonFooter } from 'web-components/src/components/organisms/CancelButtonFooter/CancelButtonFooter';
import { Body, Title } from 'web-components/src/components/typography';

import {
  BODY,
  CANCEL,
  DELETE,
  TITLE,
} from './DeletePostWarningModal.constants';

type DeletePostWarningModalProps = { onDelete: () => void } & RegenModalProps;
export const DeletePostWarningModal = ({
  open,
  onClose,
  onDelete,
}: DeletePostWarningModalProps) => {
  const { _ } = useLingui();

  return (
    <SadBeeModal open={open} onClose={onClose}>
      <Title variant="h4" align="center" className="my-20">
        {_(TITLE)}
      </Title>
      <Body size="lg" align="center" className="mb-50">
        {_(BODY)}
      </Body>
      <CancelButtonFooter
        classes={{
          root: 'bg-none bg-error-300 hover:bg-error-200 hover:text-grey-0',
        }}
        label={_(DELETE)}
        cancelLabel={_(CANCEL)}
        onCancel={onClose}
        onClick={onDelete}
      />
    </SadBeeModal>
  );
};
