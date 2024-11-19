/* eslint-disable lingui/no-unlocalized-strings */
import { msg } from '@lingui/macro';

import FacebookIcon from 'web-components/src/components/icons/social/FacebookIcon';
import InstagramIcon from 'web-components/src/components/icons/social/InstagramIcon';
import LinkedInIcon from 'web-components/src/components/icons/social/LinkedInIcon';
import TwitterIcon from 'web-components/src/components/icons/social/TwitterIcon';
import YoutubeIcon from 'web-components/src/components/icons/social/YoutubeIcon';

import { TranslatorType } from 'lib/i18n/i18n.types';

import { TerrasosColumnItem, TerrasosSocialItem } from './Terrasos.types';

export const terrasosFooterSocialItems: TerrasosSocialItem[] = [
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
    name: 'X',
    href: 'https://x.com/TerrasosCo',
    Icon: TwitterIcon,
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/channel/UCXMGrR3xfTDL2Z1CyMPURJg',
    Icon: YoutubeIcon,
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/people/Terrasos-Oficial/61550597363991/',
    Icon: FacebookIcon,
    className: 'p-[3px]',
  },
];

type Params = {
  _: TranslatorType;
  selectedLanguage: string;
};

export const getTerrasosFooterColumns = ({
  _,
  selectedLanguage,
}: Params): TerrasosColumnItem[] => {
  const domainUrl = 'https://www.terrasos.co';
  const baseUrl = selectedLanguage === 'en' ? `${domainUrl}/en` : domainUrl;
  const tebuDomainUrl = 'https://tebu.terrasos.co';
  const tebuUrl =
    selectedLanguage === 'en' ? `${tebuDomainUrl}/en` : tebuDomainUrl;

  return [
    {
      title: 'TERRASOS',
      links: [
        {
          label: _(msg`About Us`),
          href: `${baseUrl}/nosotros/`,
        },
        {
          label: _(msg`Our Services`),
          href: `${baseUrl}/servicios/`,
        },
        {
          label: _(msg`Habitat banks`),
          href: '/projects/1',
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
          label: _(msg`Contact`),
          href: `${baseUrl}/contacto/`,
        },
      ],
    },
    {
      title: 'USEFUL LINKS',
      links: [
        {
          label: _(msg`Act Now - Tebu`),
          href: tebuUrl,
        },
        {
          label: _(msg`Opportunities`),
          href: `${baseUrl}/convocatorias/`,
        },
        {
          label: _(msg`PQR Request`),
          href: `${baseUrl}/pqrs/`,
        },
        {
          label: _(msg`Terms and Conditions`),
          href: `${baseUrl}/terminos-y-condiciones/`,
        },
        {
          label: _(msg`Privacy Policy`),
          href: `${baseUrl}/politica-de-privacidad/`,
        },

        {
          label: _(msg`Cookies Policy`),
          href: `${baseUrl}/politica-de-cookies/`,
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
};
