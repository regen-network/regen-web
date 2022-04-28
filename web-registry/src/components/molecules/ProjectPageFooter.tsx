import React from 'react';

import SaveFooter from 'web-components/lib/components/fixed-footer/SaveFooter';
import { EditProjectPageFooter } from './EditProjectPageFooter';
import { useProjectEditContext } from '../../pages/ProjectEdit';

interface Props {
  onSave: () => void;
  saveText?: string;
  saveDisabled: boolean;
}

const ProjectPageFooter: React.FC<Props> = ({
  saveText,
  saveDisabled,
  onSave,
  ...props
}) => {
  const { isEdit } = useProjectEditContext();

  return isEdit ? (
    <EditProjectPageFooter
      saveText={saveText || 'Save'}
      onSave={onSave}
      saveDisabled={saveDisabled}
    />
  ) : (
    <SaveFooter
      saveText={saveText || 'Save and Next'}
      onSave={onSave}
      onPrev={() => null} // TODO https://github.com/regen-network/regen-registry/issues/561
      onNext={() => null} // TODO https://github.com/regen-network/regen-registry/issues/561
      hideProgress={false} // TODO
      saveDisabled={saveDisabled}
      percentComplete={0} // TODO
    />
  );
};

export { ProjectPageFooter };
