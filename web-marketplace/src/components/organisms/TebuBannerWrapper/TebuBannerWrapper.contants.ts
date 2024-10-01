import { msg } from '@lingui/macro';

import { LinkType } from 'web-components/src/types/shared/linkType';

import { CustomImage } from 'generated/sanity-graphql';
import { TranslatorType } from 'lib/i18n/i18n.types';

export const TEBU_BANNER_LOGO = '/png/logo/tebu.png';
export const getDefaultTebuBannerLink = (_: TranslatorType): LinkType => ({
  text: _(msg`Learn more`),
  href: 'https://www.terrasos.co/',
});

export const getDefaultTebuBannerLogo = (_: TranslatorType): CustomImage => ({
  imageAlt: _(msg`Tebu logo`),
  imageHref: TEBU_BANNER_LOGO,
});
