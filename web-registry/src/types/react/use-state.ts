import { Dispatch, SetStateAction } from 'react';

export type useStateSetter<T> = Dispatch<SetStateAction<T>>;
