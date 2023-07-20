import { LinkType } from '../../../types/shared/linkType';
import { TextItem } from './CreditClassCard.types';

export function isLinkItem(item?: Partial<LinkType>): item is LinkType {
  return !!item?.href;
}

export function isTextItem(item?: Partial<LinkType>): item is TextItem {
  return !item?.href && !!item?.text;
}
