import { useNavigate } from 'react-router-dom';

import { useCreateProjectContext } from '../ProjectCreate';

export const useProjectSaveAndExit = () => {
  const { formRef, shouldNavigateRef, isOrganizationAccount } =
    useCreateProjectContext();
  const navigate = useNavigate();

  const saveAndExit = async (): Promise<void> => {
    if (shouldNavigateRef) {
      shouldNavigateRef.current = false;
      await formRef?.current?.submitForm(true);
      shouldNavigateRef.current = true;
    }
    if (isOrganizationAccount) navigate('/dashboard/organization/projects');
    else navigate('/dashboard/projects');
  };

  return saveAndExit;
};
