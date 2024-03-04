// Type for "track" function returned by useTracker

export type Track = <IPayload = any>(
  eventName: string,
  payload?: IPayload,
) => Promise<any>;

// Login tracking events metadata specification

export interface LoginEvent {
  id: string; 
  account?: string;
  date: string;
}

export interface WCLoginEvent {
  account: string;
  date: string;
}

// Buy tracking event metadata specification

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

// Sell tracking event metadata specification

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

// Send tracking event metadata specification

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

// Retire tracking event metadata specification

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

// Bridge tracking event metadata specification

interface BridgeBaseEvent {
  batchDenom: string | undefined;
  creditClassId: string | undefined;
  projectId: string | undefined;
}

interface BridgeBaseQuantityEvent extends BridgeBaseEvent {
  quantity: number | undefined;
  recipient: string;
}

export interface Bridge1Event extends BridgeBaseEvent {}

export interface Bridge2Event extends BridgeBaseQuantityEvent {}

export interface BridgeSuccessEvent extends BridgeBaseQuantityEvent {}

export interface BridgeFailureEvent extends BridgeBaseQuantityEvent {
  errorMessage: string | undefined;
}

// Put tracking event metadata specification

interface PutBaseEvent {
  batchDenom: string;
  creditClassId: string | undefined;
  projectId: string;
}

interface PutBaseQuantityEvent extends PutBaseEvent {
  quantity: number | undefined;
  basketName: string | undefined;
}

export interface PutInBasket1Event extends PutBaseEvent {}

export interface PutInBasket2Event extends PutBaseQuantityEvent {}

export interface PutInBasketSuccessEvent extends PutBaseQuantityEvent {}

export interface PutInBasketFailureEvent extends PutBaseQuantityEvent {
  errorMessage: string | undefined;
}

// Take tracking event metadata specification

interface TakeBaseEvent {
  basketName: string | undefined;
}

interface TakeBaseQuantityEvent extends TakeBaseEvent {
  quantity: string;
  retireOnTake: boolean;
}

export interface TakeFromBasket1 extends TakeBaseEvent {}

export interface TakeFromBasket2 extends TakeBaseQuantityEvent {}

export interface TakeFromBasketSuccess extends TakeBaseQuantityEvent {
  batchDenoms: string[] | undefined;
}

export interface TakeFromBasketFailure extends TakeBaseQuantityEvent {
  errorMessage: string | undefined;
}

// Buy modal options event tracking specification

export interface BuyModalEvent {
  creditClassId?: string | null;
  projectId?: string | null;
  url: string;
}
