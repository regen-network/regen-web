import {
  LinkFieldsFragment,
  ButtonFieldsFragment,
  Maybe,
} from '../generated/sanity-graphql';

export const isInternalLink = (url: string): boolean => url.startsWith('/');

export const openLink = (url: string, blankTarget: boolean): void =>
  void window.open(url, blankTarget ? '_blank' : '_self', 'noopener');

export function getBtnHref(button?: Maybe<ButtonFieldsFragment>): string {
  return getLinkHref(button?.buttonLink);
}

export function getLinkHref(link?: Maybe<LinkFieldsFragment>): string {
  return link?.buttonHref || link?.buttonDoc?.href || '';
}

export function onBtnClick(
  openModal: (href: string) => void,
  button?: Maybe<ButtonFieldsFragment>,
): void {
  const href = getBtnHref(button);
  if (href) {
    if (button?.buttonModal) openModal(href);
    else openLink(href, button?.buttonBlankTarget ? true : false);
  }
}
