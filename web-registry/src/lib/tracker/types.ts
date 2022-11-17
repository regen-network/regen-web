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
  projectId: string;
  projectName?: string;
  creditClassId?: string;
}

export interface Sell2Event {}

export interface SellSuccessEvent {}

export interface SellFailureEvent {}

export interface Send1Event {
  projectId: string;
  projectName?: string;
  creditClassId?: string;
}

export interface Send2Event {}

export interface SendSuccessEvent {}

export interface SendFailureEvent {}
