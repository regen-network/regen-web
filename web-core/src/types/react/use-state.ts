import { Dispatch, SetStateAction } from 'react';

export type UseStateSetter<T> = Dispatch<SetStateAction<T>>;
