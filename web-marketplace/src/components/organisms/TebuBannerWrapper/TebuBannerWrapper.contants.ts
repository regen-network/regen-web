import { msg } from '@lingui/macro';

import { LinkType } from 'web-components/src/types/shared/linkType';

import { CustomImage } from 'generated/sanity-graphql';
import { TranslatorType } from 'lib/i18n/i18n.types';

import tebuLogo from '../../../../public/png/logo/tebu.png';

export const TEBU_BANNER_LOGO = tebuLogo.src;
export const getDefaultTebuBannerLink = (_: TranslatorType): LinkType => ({
  text: _(msg`Learn more`),
  href: 'https://www.terrasos.co/',
});

export const getDefaultTebuBannerLogo = (_: TranslatorType): CustomImage => ({
  imageAlt: _(msg`Tebu logo`),
  imageHref: TEBU_BANNER_LOGO,
});
