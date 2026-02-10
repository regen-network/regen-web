import { BRIDGE_CLASS_ID } from './env';

export const isBridgeClassIdExact = (value?: string): boolean =>
  Boolean(BRIDGE_CLASS_ID && value === BRIDGE_CLASS_ID);

export const isBridgeClassIdPrefix = (value?: string): boolean =>
  Boolean(BRIDGE_CLASS_ID && value?.startsWith(BRIDGE_CLASS_ID));
