import { useEffect, useState } from 'react';

const CREATE_ORGANIZATION_STORAGE_KEY = 'create-organization';
const LOCAL_STORAGE_EVENT = 'local-storage:update';

type StoredDaoInfo = {
  daoAddress?: unknown;
  organizationId?: unknown;
};

type StoredFormValues = {
  name?: unknown;
  dao?: StoredDaoInfo;
};

type StoredCreateOrgData = {
  formValues?: StoredFormValues;
  maxAllowedStep?: unknown;
};

export type OrganizationProgress = {
  daoAddress: string;
  step: number;
  name?: string;
};

const isBrowser = typeof window !== 'undefined';

const normalizeStep = (value: unknown): number =>
  typeof value === 'number' && value >= 0 ? Math.floor(value) : 0;

const parseOrganizationProgress = (
  rawValue: string | null,
): OrganizationProgress | undefined => {
  if (!rawValue) return undefined;

  try {
    const parsed = JSON.parse(rawValue) as StoredCreateOrgData;
    const daoAddress = parsed?.formValues?.dao?.daoAddress;

    if (!daoAddress || typeof daoAddress !== 'string' || !daoAddress.trim()) {
      return undefined;
    }

    const step = normalizeStep(parsed?.maxAllowedStep);
    const nameValue = parsed?.formValues?.name;
    const name =
      typeof nameValue === 'string' && nameValue.trim().length > 0
        ? nameValue
        : undefined;

    return { daoAddress, step, name };
  } catch (_error) {
    return undefined;
  }
};

const readProgress = (): OrganizationProgress | undefined => {
  if (!isBrowser) return undefined;

  try {
    const storedValue = window.localStorage.getItem(
      CREATE_ORGANIZATION_STORAGE_KEY,
    );
    return parseOrganizationProgress(storedValue);
  } catch (_error) {
    return undefined;
  }
};

export const getStoredOrganizationProgress = ():
  | OrganizationProgress
  | undefined => readProgress();

export const clearStoredOrganizationProgress = (): void => {
  if (!isBrowser) return;

  try {
    window.localStorage.removeItem(CREATE_ORGANIZATION_STORAGE_KEY);
    window.dispatchEvent(
      new CustomEvent(LOCAL_STORAGE_EVENT, {
        detail: { key: CREATE_ORGANIZATION_STORAGE_KEY },
      }),
    );
  } catch (_error) {
    // ignore failures when interacting with storage
  }
};

type CustomStorageEvent = CustomEvent<{ key?: string }>;

const shouldHandleEvent = (key?: string | null): boolean =>
  !key || key === CREATE_ORGANIZATION_STORAGE_KEY;

export const useOrganizationProgress = (): OrganizationProgress | undefined => {
  const [progress, setProgress] = useState<OrganizationProgress | undefined>(
    () => readProgress(),
  );

  useEffect(() => {
    if (!isBrowser) return undefined;

    const handleStorage = (event: StorageEvent) => {
      if (!shouldHandleEvent(event.key)) return;
      setProgress(readProgress());
    };

    const handleCustom = (event: Event) => {
      const customEvent = event as CustomStorageEvent;
      if (!shouldHandleEvent(customEvent.detail?.key)) return;
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
