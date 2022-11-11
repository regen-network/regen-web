export interface LoginEvent {
  date: string;
  account: string;
}

export interface Buy1Event {
  url: string;
  cardType?: string;
  buttonLocation: string;
  projectName?: string | null;
  projectId?: string | null;
  creditClassName?: string;
  creditClassId?: string | null;
}

export interface Buy2Event {
  url: string;
  price?: string;
  batchDenom?: string;
  projectName?: string | null;
  projectId?: string | null;
  creditClassId?: string;
  quantity?: number;
  currencyDenom?: string;
  retirementAction?: string;
}
