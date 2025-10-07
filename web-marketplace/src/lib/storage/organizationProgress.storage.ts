import { getDefaultStore, useAtomValue } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

const STORAGE_KEY = 'regen:organization-progress';
const UPDATE_EVENT = 'organization-progress-updated';

// New canonical shape: map of daoAddress => step (number >=0)
export type OrgProgressMap = Record<string, number>;

const isBrowser = typeof window !== 'undefined';
const defaultStore = getDefaultStore();

const normalizeStep = (value: unknown): number =>
  typeof value === 'number' && value >= 0 ? value : 0;

const normalizeProgress = (parsed: unknown): OrgProgressMap => {
  const result: OrgProgressMap = {};
  if (!parsed || typeof parsed !== 'object') return result;

  Object.entries(parsed as Record<string, unknown>).forEach(([key, value]) => {
    if (value == null) return;
    if (typeof value === 'number') {
      result[key] = normalizeStep(value);
      return;
    }
    if (typeof value === 'object') {
      const legacyStep = (value as { step?: unknown }).step;
      result[key] = normalizeStep(legacyStep);
    }
  });
  return result;
};

const safeParse = (value: string | null): OrgProgressMap => {
  if (!value) return {};
  try {
    const parsed = JSON.parse(value) as unknown;
    return normalizeProgress(parsed);
  } catch (_error) {
    return {};
  }
};

const readProgress = (initialValue: OrgProgressMap = {}): OrgProgressMap => {
  if (!isBrowser) return initialValue;
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    if (!value) return initialValue;
    return safeParse(value);
  } catch (_error) {
    return initialValue;
  }
};

type StorageCallback = (value: OrgProgressMap) => void;

type OrganizationStorage = {
  getItem: (key: string, initialValue: OrgProgressMap) => OrgProgressMap;
  setItem: (key: string, newValue: OrgProgressMap) => void;
  removeItem: (key: string) => void;
  subscribe?: (
    key: string,
    callback: StorageCallback,
    initialValue: OrgProgressMap,
  ) => () => void;
};

const storage: OrganizationStorage = {
  getItem: (_key: string, initialValue: OrgProgressMap) =>
    readProgress(initialValue),
  setItem: (_key: string, newValue: OrgProgressMap) => {
    if (!isBrowser) return;
    try {
      if (!newValue || Object.keys(newValue).length === 0) {
        window.localStorage.removeItem(STORAGE_KEY);
      } else {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(newValue));
      }
      window.dispatchEvent(new Event(UPDATE_EVENT));
    } catch (_error) {}
  },
  removeItem: (_key: string) => {
    if (!isBrowser) return;
    try {
      window.localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new Event(UPDATE_EVENT));
    } catch (_error) {}
  },
  subscribe: (
    _key: string,
    callback: StorageCallback,
    initialValue: OrgProgressMap,
  ) => {
    if (!isBrowser) return () => undefined;

    const handleStorageChange = (event: StorageEvent) => {
      if (
        event.storageArea === window.localStorage &&
        event.key === STORAGE_KEY
      ) {
        callback(readProgress(initialValue));
      }
    };

    const handleCustomUpdate = () => {
      callback(readProgress(initialValue));
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener(UPDATE_EVENT, handleCustomUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener(UPDATE_EVENT, handleCustomUpdate);
    };
  },
};

const organizationProgressAtom = atomWithStorage<OrgProgressMap>(
  STORAGE_KEY,
  {},
  storage,
);

const isPromise = (value: unknown): value is Promise<OrgProgressMap> =>
  !!value && typeof (value as Promise<OrgProgressMap>).then === 'function';

const readAtomValue = (): OrgProgressMap => {
  const value = defaultStore.get(organizationProgressAtom);
  if (isPromise(value)) {
    return {};
  }
  return value ?? {};
};

export const setOrganizationProgressStep = (
  daoAddress: string,
  step: number,
): void => {
  if (!daoAddress) return;
  defaultStore.set(
    organizationProgressAtom,
    (previous: OrgProgressMap | Promise<OrgProgressMap> | undefined) => {
      const prevValue: OrgProgressMap = isPromise(previous)
        ? {}
        : previous ?? {};
      return {
        ...prevValue,
        [daoAddress]: normalizeStep(step),
      };
    },
  );
};

export const removeOrganizationProgress = (daoAddress?: string): void => {
  if (!daoAddress) return;
  defaultStore.set(
    organizationProgressAtom,
    (previous: OrgProgressMap | Promise<OrgProgressMap> | undefined) => {
      const prevValue: OrgProgressMap = isPromise(previous)
        ? {}
        : previous ?? {};
      if (!prevValue[daoAddress]) return prevValue;
      const { [daoAddress]: _removed, ...rest } = prevValue;
      return rest;
    },
  );
};

export const getOrganizationProgress = (
  daoAddress: string,
): number | undefined => readAtomValue()[daoAddress];

export const getAllOrganizationProgress = (): OrgProgressMap => readAtomValue();

export const useOrganizationProgress = (): OrgProgressMap =>
  useAtomValue(organizationProgressAtom);
