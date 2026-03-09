import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';

import { RegenModalProps } from 'web-components/src/components/modal';
import { SadBeeModal } from 'web-components/src/components/modal/SadBeeModal/SadBeeModal';
import { CancelButtonFooter } from 'web-components/src/components/organisms/CancelButtonFooter/CancelButtonFooter';
import { Body, Title } from 'web-components/src/components/typography';

type EditedDraftModalProps = {
  onCancel: () => void;
  onSubmit: () => void;
  shouldSaveDraft: boolean;
} & RegenModalProps;

export const EditedDraftModal = ({
  onCancel,
  onSubmit,
  open,
  onClose,
  shouldSaveDraft,
}: EditedDraftModalProps) => {
  const { _ } = useLingui();
  return (
    <SadBeeModal open={open} onClose={onClose}>
      <Title variant="h4" className="text-center my-20">
        <Trans>
          Someone made changes to this draft while you were editing.
        </Trans>
      </Title>
      <Body size="lg" className="text-center mb-50">
        <Trans>You will overwrite their changes if you continue.</Trans>
      </Body>
      <CancelButtonFooter
        label={
          shouldSaveDraft
            ? _(msg`overwrite & save`)
            : _(msg`overwrite & publish`)
        }
        onCancel={onCancel}
        onClick={onSubmit}
      />
    </SadBeeModal>
  );
};
