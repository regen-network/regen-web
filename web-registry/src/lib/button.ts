import { ButtonFieldsFragment, Maybe } from '../generated/sanity-graphql';

const openLink = (url: string, blankTarget: boolean): void =>
  void window.open(url, blankTarget ? '_blank' : '_self', 'noopener');

export function onBtnClick(openModal: (href: string) => void, button?: Maybe<ButtonFieldsFragment>): void {
  const href = button?.buttonLink?.buttonHref || button?.buttonLink?.buttonDoc?.href;
  if (href) {
    if (button?.buttonModal) openModal(href);
    else openLink(href, button?.buttonBlankTarget ? true : false);
  }
}
