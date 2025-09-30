import { useEffect, useState } from 'react';

const STORAGE_KEY = 'regen:organization-progress';
const UPDATE_EVENT = 'organization-progress-updated';

export type OrgProgressEntry = {
  daoAddress: string;
  step: number;
  name?: string;
  updatedAt: string;
};

export type OrgProgressMap = Record<string, OrgProgressEntry>;

const isBrowser = typeof window !== 'undefined';

const normalizeProgress = (parsed: any): OrgProgressMap => {
  const result: OrgProgressMap = {};
  if (!parsed || typeof parsed !== 'object') return result;

  Object.entries(parsed as Record<string, any>).forEach(([key, value]) => {
    if (!value || typeof value !== 'object') return;
    const entry = value as Partial<OrgProgressEntry>;
    result[key] = {
      daoAddress: entry.daoAddress ?? key,
      step: entry.step ?? 0,
      name: entry.name,
      updatedAt: entry.updatedAt ?? new Date().toISOString(),
    };
  });

  return result;
};

const safeParse = (value: string | null): OrgProgressMap => {
  if (!value) return {};
  try {
    const parsed = JSON.parse(value);
    return normalizeProgress(parsed);
  } catch (error) {
    console.warn('Failed to parse organization progress from storage', error);
    return {};
  }
};

const readProgress = (): OrgProgressMap => {
  if (!isBrowser) return {};
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return safeParse(value);
  } catch (error) {
    console.warn('Unable to read organization progress from storage', error);
    return {};
  }
};

const writeProgress = (progress: OrgProgressMap): void => {
  if (!isBrowser) return;
  try {
    if (Object.keys(progress).length === 0) {
      window.localStorage.removeItem(STORAGE_KEY);
    } else {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }
    window.dispatchEvent(new Event(UPDATE_EVENT));
  } catch (error) {
    console.warn('Unable to persist organization progress to storage', error);
  }
};

export const setOrganizationProgressStep = (
  daoAddress: string,
  step: number,
  name?: string,
): void => {
  if (!daoAddress) return;
  const progress = readProgress();
  progress[daoAddress] = {
    daoAddress,
    step,
    name: name ?? progress[daoAddress]?.name,
    updatedAt: new Date().toISOString(),
  };
  writeProgress(progress);
};

export const removeOrganizationProgress = (daoAddress?: string): void => {
  if (!daoAddress) return;
  const progress = readProgress();
  if (progress[daoAddress]) {
    delete progress[daoAddress];
    writeProgress(progress);
  }
};

export const getOrganizationProgress = (
  daoAddress: string,
): OrgProgressEntry | undefined => readProgress()[daoAddress];

export const getAllOrganizationProgress = (): OrgProgressMap => readProgress();

export const hasOrganizationInProgress = (organizationId?: string): boolean => {
  if (!organizationId) return false;
  return !!readProgress()[organizationId];
};

export const hasAnyOrganizationInProgress = (): boolean => {
  const progress = readProgress();
  return Object.keys(progress).length > 0;
};

export const useOrganizationProgress = (): OrgProgressMap => {
  const [progress, setProgress] = useState<OrgProgressMap>(() =>
    readProgress(),
  );

  useEffect(() => {
    if (!isBrowser) return () => undefined;

    const handleUpdate = () => {
      setProgress(readProgress());
    };

    window.addEventListener('storage', handleUpdate);
    window.addEventListener(UPDATE_EVENT, handleUpdate);

    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener(UPDATE_EVENT, handleUpdate);
    };
  }, []);

  return progress;
};
