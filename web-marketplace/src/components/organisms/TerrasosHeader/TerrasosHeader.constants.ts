import { msg } from '@lingui/macro';

import { TranslatorType } from 'lib/i18n/i18n.types';

import { TerrasosHeaderItem } from './TerrasosHeader.types';

export const TERRASOS_LOGO_ALT = msg`Terrasos Logo`;
export const TERRASOS_BASE_PATHNAME = '/project';

export const getTerrasosHeaderItems = (
  _: TranslatorType,
): TerrasosHeaderItem[] => [
  {
    label: _(msg`Home`),
    href: 'https://www.terrasos.co/',
  },
  {
    label: _(msg`About Us`),
    href: 'https://www.terrasos.co/nosotros/',
  },
  {
    label: _(msg`Services`),
    href: 'https://www.terrasos.co/servicios/',
  },
  {
    label: _(msg`Habitat banks`),
    href: '/projects/1',
    items: [
      {
        label: _(msg`Information`),
        href: 'https://www.terrasos.co/informacion-de-bancos-de-habitat/',
      },
      {
        label: _(msg`Explore Banks`),
        href: 'https://www.terrasos.co/bancos-de-habitat/',
        default: true,
      },
    ],
  },
  {
    label: _(msg`What is Tebu`),
    href: 'https://www.terrasos.co/que-es-tebu/',
  },
  {
    label: _(msg`Geo-Viewer`),
    href: 'https://www.terrasos.co/geovisor/',
  },
  {
    label: _(msg`Information`),
    href: '',
    items: [
      {
        label: _(msg`News`),
        href: 'https://www.terrasos.co/noticias/',
      },
      {
        label: _(msg`Articles`),
        href: 'https://www.terrasos.co/blog/',
      },
      {
        label: _(msg`Publications`),
        href: 'https://www.terrasos.co/publicaciones/',
      },
      {
        label: _(msg`Frequently Asked Questions`),
        href: 'https://www.terrasos.co/preguntas-frecuentes/',
      },
      {
        label: _(msg`Contact`),
        href: 'https://www.terrasos.co/contacto/',
      },
    ],
  },
];
