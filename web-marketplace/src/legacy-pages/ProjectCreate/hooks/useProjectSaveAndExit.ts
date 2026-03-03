import { useCreateProjectContext } from '../ProjectCreate';
import { useRouter } from 'next/navigation';

export const useProjectSaveAndExit = () => {
  const { formRef, shouldNavigateRef, isOrganizationAccount } =
    useCreateProjectContext();
  const router = useRouter();

  const saveAndExit = async (): Promise<void> => {
    if (shouldNavigateRef) {
      shouldNavigateRef.current = false;
      await formRef?.current?.submitForm(true);
    }
    if (isOrganizationAccount) router.push('/dashboard/organization/projects');
    else router.push('/dashboard/projects');
  };

  return saveAndExit;
};
