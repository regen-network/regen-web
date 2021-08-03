import { ButtonFieldsFragment, Maybe } from '../generated/sanity-graphql';

const openLink = (url: string, blankTarget: boolean): void =>
  void window.open(url, blankTarget ? '_blank' : '_self', 'noopener');

export function getBtnHref(button?: Maybe<ButtonFieldsFragment>): string {
  return button?.buttonLink?.buttonHref || button?.buttonLink?.buttonDoc?.href || '';
}
export function onBtnClick(openModal: (href: string) => void, button?: Maybe<ButtonFieldsFragment>): void {
  const href = getBtnHref(button);
  if (href) {
    if (button?.buttonModal) openModal(href);
    else openLink(href, button?.buttonBlankTarget ? true : false);
  }
}
