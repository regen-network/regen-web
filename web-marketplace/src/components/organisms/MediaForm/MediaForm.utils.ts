import { MutableRefObject } from 'react';

/* handleDelete */

export type getHandleDeleteParams = {
  fileNamesToDeleteRef: MutableRefObject<string[]>;
  callback?: () => void;
};

export const getHandleDelete =
  ({ fileNamesToDeleteRef, callback }: getHandleDeleteParams) =>
  async (fileName: string): Promise<void> => {
    fileNamesToDeleteRef.current.push(fileName);
    callback && callback();
  };
