import { useEffect, useState } from 'react';

import { CREATE_ORGANIZATION_FORM_ID } from '../CreateOrganization.constants';
import type { OrganizationMultiStepData } from './useOrganizationFlow';

type StoredCreateOrgData = {
  formValues?: OrganizationMultiStepData;
  maxAllowedStep?: number;
};

export type OrganizationProgress = {
  daoAddress: string;
  step: number;
  name?: string;
  walletAddress?: string;
};

const LOCAL_STORAGE_EVENT = 'local-storage:update';

const readProgress = (): OrganizationProgress | undefined => {
  if (typeof window === 'undefined') return undefined;

  try {
    const rawValue = window.localStorage.getItem(CREATE_ORGANIZATION_FORM_ID);
    if (!rawValue) return undefined;

    const stored = JSON.parse(rawValue) as StoredCreateOrgData;
    const daoAddress = stored.formValues?.dao?.daoAddress?.trim();
    if (!daoAddress) return undefined;

    const stepValue = stored.maxAllowedStep;
    const step =
      typeof stepValue === 'number' && Number.isFinite(stepValue)
        ? Math.max(0, Math.floor(stepValue))
        : 0;

    const name = stored.formValues?.name?.trim() || undefined;
    const walletAddress =
      stored.formValues?.dao?.walletAddress?.trim() || undefined;

    return { daoAddress, step, name, walletAddress };
  } catch (_error) {
    return undefined;
  }
};

const shouldHandle = (key?: string | null): boolean =>
  !key || key === CREATE_ORGANIZATION_FORM_ID;

export const useOrganizationProgress = (): OrganizationProgress | undefined => {
  const [progress, setProgress] = useState<OrganizationProgress | undefined>(
    () => readProgress(),
  );
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleStorage = (event: StorageEvent) => {
      if (!shouldHandle(event.key)) return;
      setProgress(readProgress());
    };

    const handleCustom = (event: Event) => {
      const { detail } = event as CustomEvent<{ key?: string }>;
      if (!shouldHandle(detail?.key ?? null)) return;
      setProgress(readProgress());
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener(LOCAL_STORAGE_EVENT, handleCustom);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener(LOCAL_STORAGE_EVENT, handleCustom);
    };
  }, []);

  return progress;
};
