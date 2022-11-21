export type Track = <IEventName extends string, IPayload = any>(
  eventName: IEventName,
  payload?: IPayload,
) => Promise<any>;

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

export interface BuySuccessEvent {
  url: string;
  price?: string;
  batchDenom?: string;
  projectName?: string | null;
  projectId?: string | null;
  quantity: number;
  currencyDenom?: string;
  retirementAction?: string;
}

export interface BuyFailureEvent {
  url: string;
  price?: string;
  batchDenom?: string;
  projectName?: string | null;
  projectId?: string | null;
  quantity: number;
  currencyDenom?: string;
  retirementAction?: string;
  errorMessage?: string;
}

export interface Sell1Event {
  creditClassId?: string;
  projectId: string;
  projectName?: string;
}

export interface Sell2Event {
  batchDenom: string;
  currencyDenom?: string;
  enableAutoRetire?: boolean;
  price?: number;
  quantity?: number;
}

interface SellOutcomeBaseEvent {
  batchDenom?: string;
  creditClassId?: string;
  currencyDenom?: string;
  enableAutoRetire?: boolean;
  price?: number;
  projectId?: string;
  projectName?: string;
  quantity?: number;
}

export interface SellSuccessEvent extends SellOutcomeBaseEvent {}

export interface SellFailureEvent extends SellOutcomeBaseEvent {
  errorMessage?: string;
}

interface SendBaseEvent {
  batchDenom: string;
  creditClassId?: string;
  projectId: string;
  projectName?: string;
}

export interface Send1Event extends SendBaseEvent {}

export interface Send2Event extends SendBaseEvent {
  enableAutoRetire?: boolean;
  quantity?: number;
}

interface SendOutcomeBaseEvent {
  batchDenom?: string;
  creditClassId?: string;
  enableAutoRetire?: boolean;
  projectId?: string;
  projectName?: string;
  quantity?: number;
}

export interface SendSuccessEvent extends SendOutcomeBaseEvent {}

export interface SendFailureEvent extends SendOutcomeBaseEvent {
  errorMessage?: string;
}
