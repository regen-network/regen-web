import { FC, PropsWithChildren } from 'react';

// FCC = functional component with children
export type FCC<P = {}> = FC<PropsWithChildren<P>>;
