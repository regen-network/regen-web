import { ElementType } from 'react';
import { LinkProps } from '@mui/material';

export type LinkComponentType = ElementType<LinkProps & { href: string }>;
