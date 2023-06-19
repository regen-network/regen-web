import { ProjectWithOrderData } from '../Projects.types';

export type GECKO_PRICES = {
  regenPrice?: number;
  eeurPrice?: number;
  usdcPrice?: number;
  evmosPrice?: number;
};

export interface ProjectsSellOrders {
  projectsWithOrderData: ProjectWithOrderData[];
  projectsCount?: number;
  loading: boolean;
  hasCommunityProjects: boolean;
}
