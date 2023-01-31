import React from 'react';

import SaveFooter from 'web-components/lib/components/fixed-footer/SaveFooter';

import { useProjectEditContext } from '../../pages/ProjectEdit';
import { EditProjectPageFooter } from './EditProjectPageFooter';

interface Props {
  onSave: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  saveText?: string;
  isValid?: boolean;
  dirty?: boolean;
  isSubmitting: boolean;
}

const ProjectPageFooter: React.FC<React.PropsWithChildren<Props>> = ({
  saveText,
  isValid = true,
  dirty = true,
  isSubmitting,
  onSave,
  ...props
}) => {
  const { isEdit } = useProjectEditContext();
  const saveDisabled = !isValid || isSubmitting;

  return isEdit ? (
    <EditProjectPageFooter
      saveText={saveText || 'Save'}
      onSave={onSave}
      saveDisabled={saveDisabled || !dirty}
    />
  ) : (
    <SaveFooter
      saveText={saveText || 'Save and Next'}
      onSave={onSave}
      onPrev={props.onPrev}
      onNext={props.onNext}
      hideProgress={false} // TODO
      saveDisabled={saveDisabled}
      percentComplete={0} // TODO
    />
  );
};

export { ProjectPageFooter };
