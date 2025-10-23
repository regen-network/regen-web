import { useCallback } from 'react';
import { OrganizationMultiStepData } from '../useOrganizationFlow';
import { useMultiStep } from 'components/templates/MultiStepTemplate';
import { FormValues } from 'components/organisms/MigrateProjects/MigrateProjects.types';

export const useMigrateProjects = () => {
  const { handleSaveNext, data, handleNext } =
    useMultiStep<OrganizationMultiStepData>();
  const migrateProjects = useCallback((values: FormValues) => {
    console.log(values);
    handleSaveNext({ ...data, ...values });
  }, []);
  return migrateProjects;
};
