import React from 'react';

import OnboardingFooter from 'web-components/lib/components/fixed-footer/OnboardingFooter';
import { EditProjectPageFooter } from './EditProjectPageFooter';

interface Props {
  onSave: () => void;
  saveText?: string;
  isEdit?: boolean;
  saveDisabled: boolean;
}

const ProjectPageFooter: React.FC<Props> = ({
  saveText = 'Save',
  isEdit,
  saveDisabled,
  onSave,
  ...props
}) => {
  return isEdit ? (
    <EditProjectPageFooter saveText={saveText} onSave={onSave} saveDisabled={saveDisabled} />
  ) : (
    <OnboardingFooter
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
