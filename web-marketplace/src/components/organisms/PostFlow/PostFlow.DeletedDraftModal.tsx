import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';

import { RegenModalProps } from 'web-components/src/components/modal';
import { SadBeeModal } from 'web-components/src/components/modal/SadBeeModal/SadBeeModal';
import { CancelButtonFooter } from 'web-components/src/components/organisms/CancelButtonFooter/CancelButtonFooter';
import { Body, Title } from 'web-components/src/components/typography';

type DeletedDraftModalProps = {
  onCancel: () => void;
  onSubmit: () => void;
  shouldSaveDraft: boolean;
} & RegenModalProps;

export const DeletedDraftModal = ({
  onCancel,
  onSubmit,
  open,
  onClose,
  shouldSaveDraft,
}: DeletedDraftModalProps) => {
  const { _ } = useLingui();
  return (
    <SadBeeModal open={open} onClose={onClose}>
      <Title variant="h4" className="text-center my-20">
        <Trans>Another user deleted this draft.</Trans>
        <br />
        {shouldSaveDraft ? (
          <Trans>Restore and save your version?</Trans>
        ) : (
          <Trans>Restore and publish your version?</Trans>
        )}
      </Title>
      <Body size="lg" className="text-center mb-50">
        {shouldSaveDraft ? (
          <Trans>Save to keep your changes.</Trans>
        ) : (
          <Trans>Publish to keep your changes.</Trans>
        )}
      </Body>
      <CancelButtonFooter
        label={shouldSaveDraft ? _(msg`save`) : _(msg`publish`)}
        onCancel={onCancel}
        onClick={onSubmit}
      />
    </SadBeeModal>
  );
};
