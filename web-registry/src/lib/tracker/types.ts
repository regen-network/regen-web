export type Track = <IEventName extends string, IPayload = any>(
  eventName: IEventName,
  payload?: IPayload,
) => Promise<any>;

export interface LoginEvent {
  account: string;
  date: string;
}

interface BuyBaseEvent {
  creditClassId?: string | null;
  projectId?: string | null;
  projectName?: string | null;
  url: string;
}

export interface Buy1Event extends BuyBaseEvent {
  buttonLocation: string;
  cardType?: string;
  creditClassName?: string;
}

export interface Buy2Event extends BuyBaseEvent {
  batchDenom?: string;
  currencyDenom?: string;
  price?: string;
  quantity?: number;
  retirementAction?: string;
}

interface BuyOutcomeBaseEvent {
  batchDenom?: string;
  currencyDenom?: string;
  price?: string;
  projectId?: string | null;
  projectName?: string | null;
  quantity: number;
  retirementAction?: string;
  url: string;
}

export interface BuySuccessEvent extends BuyOutcomeBaseEvent {}

export interface BuyFailureEvent extends BuyOutcomeBaseEvent {
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

interface RetireBaseEvent {
  batchDenom: string;
  creditClassId?: string;
  projectId: string;
  projectName?: string;
}

interface RetireBaseQuantityEvent extends RetireBaseEvent {
  quantity: number;
}

export interface Retire1Event extends RetireBaseEvent {}

export interface Retire2Event extends RetireBaseQuantityEvent {}

export interface RetireSuccessEvent extends RetireBaseQuantityEvent {}

export interface RetireFailureEvent extends RetireBaseQuantityEvent {
  errorMessage: string | undefined;
}
