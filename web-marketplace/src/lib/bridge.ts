import { BRIDGE_CLASS_ID } from './env';

export const isBridgeClassIdExact = (value?: string): boolean =>
  Boolean(BRIDGE_CLASS_ID && value === BRIDGE_CLASS_ID);

export const isBridgeClassIdPrefix = (value?: string): boolean =>
  Boolean(BRIDGE_CLASS_ID && value?.startsWith(BRIDGE_CLASS_ID));

export const getCreditClassPath = (classId: string) => {
  if (isBridgeClassIdExact(classId)) {
    return `/credit-classes/deprecated/${classId}`;
  }
  return `/credit-classes/${classId}`;
};

export const getCreditBatchPath = (batchDenom: string) => {
  if (isBridgeClassIdPrefix(batchDenom)) {
    return `/credit-batches/deprecated/${batchDenom}`;
  }
  return `/credit-batches/${batchDenom}`;
};

export const getProjectPath = (projectId: string) => {
  if (isBridgeClassIdPrefix(projectId)) {
    return `/project/deprecated/${projectId}`;
  }
  return `/project/${projectId}`;
};
