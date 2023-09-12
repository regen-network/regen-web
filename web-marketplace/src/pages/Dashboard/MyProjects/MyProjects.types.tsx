import { ProjectWithOrderData } from 'pages/Projects/Projects.types';

export interface Project extends ProjectWithOrderData {
  offChain?: boolean;
}
