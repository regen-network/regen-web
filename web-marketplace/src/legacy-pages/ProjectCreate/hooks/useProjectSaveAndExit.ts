import { useRouter } from 'next/navigation';

import { useCreateProjectContext } from '../ProjectCreate';

export const useProjectSaveAndExit = () => {
  const {
    formRef,
    shouldNavigateRef,
    isOrganizationAccount,
    organizationAddress,
  } = useCreateProjectContext();
  const router = useRouter();

  const saveAndExit = async (): Promise<void> => {
    if (shouldNavigateRef) {
      shouldNavigateRef.current = false;
      await formRef?.current?.submitForm(true);
    }
    if (isOrganizationAccount && organizationAddress)
      router.push(`/dashboard/organization/${organizationAddress}/projects`);
    else router.push('/dashboard/projects');
  };

  return saveAndExit;
};
