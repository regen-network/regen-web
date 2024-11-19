import { msg } from '@lingui/macro';

import { TranslatorType } from 'lib/i18n/i18n.types';

import { TerrasosHeaderItem } from './TerrasosHeader.types';

export const TERRASOS_LOGO_ALT = msg`Terrasos Logo`;
export const TERRASOS_BASE_PATHNAME = '/project';

type Params = {
  _: TranslatorType;
  selectedLanguage: string;
};

export const getTerrasosHeaderItems = ({
  _,
  selectedLanguage,
}: Params): TerrasosHeaderItem[] => {
  const domainUrl = 'https://www.terrasos.co';
  const baseUrl = selectedLanguage === 'en' ? `${domainUrl}/en` : domainUrl;

  return [
    {
      label: _(msg`Home`),
      href: baseUrl,
    },
    {
      label: _(msg`About Us`),
      href: `${baseUrl}/nosotros/`,
    },
    {
      label: _(msg`Services`),
      href: `${baseUrl}/servicios/`,
    },
    {
      label: _(msg`Habitat banks`),
      href: `/projects/1`,
      items: [
        {
          label: _(msg`Information`),
          href: `${baseUrl}/informacion-de-bancos-de-habitat/`,
        },
        {
          label: _(msg`Explore Banks`),
          href: '/projects/1',
          default: true,
        },
      ],
    },
    {
      label: _(msg`What is Tebu`),
      href: `${baseUrl}/que-es-tebu/`,
    },
    {
      label: _(msg`Geo-Viewer`),
      href: `${baseUrl}/geovisor/`,
    },
    {
      label: _(msg`Information`),
      href: '',
      items: [
        {
          label: _(msg`News`),
          href: `${baseUrl}/noticias/`,
        },
        {
          label: _(msg`Articles`),
          href: `${baseUrl}/blog/`,
        },
        {
          label: _(msg`Publications`),
          href: `${baseUrl}/publicaciones/`,
        },
        {
          label: _(msg`Frequently Asked Questions`),
          href: `${baseUrl}/preguntas-frecuentes/`,
        },
        {
          label: _(msg`Contact`),
          href: `${baseUrl}/contacto/`,
        },
      ],
    },
  ];
};
