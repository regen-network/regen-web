import React from 'react';
import { useLocation } from 'react-router-dom';

import SaveFooter from 'web-components/src/components/fixed-footer/SaveFooter';

import { getProjectCreationPercentage } from 'pages/ProjectCreate/ProjectCreate.utils';

import { useProjectEditContext } from '../../pages/ProjectEdit';
import { EditProjectPageFooter } from './EditProjectPageFooter';

interface Props {
  onSave?: () => void;
  onPrev?: () => void;
  saveText?: string;
  isValid?: boolean;
  dirty?: boolean;
  isSubmitting: boolean;
  saveAndExit?: () => Promise<void>;
}

const ProjectPageFooter: React.FC<React.PropsWithChildren<Props>> = ({
  saveText,
  isValid = true,
  dirty = true,
  isSubmitting,
  onSave = () => void 0,
  saveAndExit,
  ...props
}) => {
  const { isEdit } = useProjectEditContext();
  const saveDisabled = !isValid || isSubmitting;
  const { pathname } = useLocation();
  const currentStep = pathname.substring(pathname.lastIndexOf('/') + 1);
  const percentage = getProjectCreationPercentage({ currentStep });

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
      hideProgress={false}
      saveDisabled={saveDisabled}
      percentComplete={percentage}
      saveAndExit={saveAndExit}
    />
  );
};

export { ProjectPageFooter };
