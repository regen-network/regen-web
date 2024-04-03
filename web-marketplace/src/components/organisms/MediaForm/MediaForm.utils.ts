import { MutableRefObject } from 'react';

/* handleDelete */

export type getHandleDeleteParams = {
  fileNamesToDeleteRef: MutableRefObject<string[]>;
  callback?: (doSetValue: boolean) => void;
};

export const getHandleDelete =
  ({ fileNamesToDeleteRef, callback }: getHandleDeleteParams) =>
  async (fileName: string, doSetValue: boolean = true): Promise<void> => {
    fileNamesToDeleteRef.current.push(fileName);
    callback && callback(doSetValue);
  };
