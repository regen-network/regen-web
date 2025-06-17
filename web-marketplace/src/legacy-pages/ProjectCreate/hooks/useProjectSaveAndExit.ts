import { useNavigate } from 'react-router-dom';

import { useCreateProjectContext } from '../ProjectCreate';

export const useProjectSaveAndExit = () => {
  const { formRef, shouldNavigateRef } = useCreateProjectContext();
  const navigate = useNavigate();

  const saveAndExit = async (): Promise<void> => {
    if (shouldNavigateRef) {
      shouldNavigateRef.current = false;
      await formRef?.current?.submitForm(true);
      shouldNavigateRef.current = true;
    }
    navigate('/dashboard/projects');
  };

  return saveAndExit;
};
