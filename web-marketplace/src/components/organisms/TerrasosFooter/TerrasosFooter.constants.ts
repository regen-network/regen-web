/* eslint-disable lingui/no-unlocalized-strings */
import { msg } from '@lingui/macro';

import InstagramIcon from 'web-components/src/components/icons/social/InstagramIcon';
import LinkedInIcon from 'web-components/src/components/icons/social/LinkedInIcon';
import TwitterIcon from 'web-components/src/components/icons/social/TwitterIcon';
import YoutubeIcon from 'web-components/src/components/icons/social/YoutubeIcon';

import { TranslatorType } from 'lib/i18n/i18n.types';

import { TerrasosColumnItem, TerrasosSocialItem } from './Terrasos.types';

export const terrasosFooterSocialItems: TerrasosSocialItem[] = [
  {
    name: 'Twitter',
    href: 'https://x.com/TerrasosCo',
    Icon: TwitterIcon,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/terrasos/',
    Icon: LinkedInIcon,
    className: 'p-[3px]',
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/terrasos_co/',
    Icon: InstagramIcon,
    className: 'p-[3px]',
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/channel/UCXMGrR3xfTDL2Z1CyMPURJg',
    Icon: YoutubeIcon,
  },
];

export const getTerrasosFooterColumns = (
  _: TranslatorType,
): TerrasosColumnItem[] => [
  {
    title: 'TERRASOS',
    links: [
      {
        label: _(msg`About Us`),
        href: 'https://www.terrasos.co/nosotros/',
      },
      {
        label: _(msg`Our Services`),
        href: 'https://www.terrasos.co/servicios/',
      },
      {
        label: _(msg`Habitat banks`),
        href: '/projects/1',
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
        label: _(msg`Contact`),
        href: 'https://www.terrasos.co/contacto/',
      },
    ],
  },
  {
    title: 'USEFUL LINKS',
    links: [
      {
        label: _(msg`Act Now - Tebu`),
        href: 'https://tebu.terrasos.co/',
      },
      {
        label: _(msg`Opportunities`),
        href: 'https://www.terrasos.co/convocatorias/',
      },
      {
        label: _(msg`PQR Request`),
        href: 'https://www.terrasos.co/pqrs/',
      },
      {
        label: _(msg`Terms and Conditions`),
        href: 'https://www.terrasos.co/terminos-y-condiciones/',
      },
      {
        label: _(msg`Privacy Policy`),
        href: 'https://www.terrasos.co/politica-de-privacidad/',
      },

      {
        label: _(msg`Cookies Policy`),
        href: 'https://www.terrasos.co/politica-de-cookies/',
      },
    ],
  },
  {
    title: 'CONTACT US',
    links: [
      {
        label: 'Carrera 13 # 90 - 20,\n Bogotá, D.C. (Colombia)',
        href: 'https://maps.app.goo.gl/ChQczporqpW6TS1m8',
      },
      {
        subLinks: [
          {
            label: '+57 (601) 467-3587',
            href: 'tel:+576014673587',
          },
          {
            label: '+57 310-457-7606',
            href: 'https://wa.me/573104577606',
          },
        ],
      },
    ],
  },
];
