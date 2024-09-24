/* eslint-disable lingui/no-unlocalized-strings */
import { EcologicalCreditCardProps } from './EcologicalCreditCard';

export const EcologicalCreditCardMock: EcologicalCreditCardProps = {
  image: {
    src: 'https://cdn.sanity.io/images/jm12rn9t/staging/16afff120712a3e148efa306ff362c409403209b-720x635.jpg?w=2000&fit=max&auto=format',
  },
  creditCategory: {
    icon: {
      src: 'https://cdn.sanity.io/images/jm12rn9t/staging/c6de355349dec9f4914fea0705e293596d40f068-66x106.svg',
      alt: 'co2',
    },
    name: 'Carbon',
  },
  title: 'Ruuts',
  infos: {
    count: '700,000 credits',
    price: '$25.00/credit',
    country: '🇦🇷 Argentina',
  },
  description:
    'Ruuts is mobilizing extensive farmer networks and technical teams to generate impactful carbon credits from holistic grazing practices in Latin American rangelands. The impact potential of significant land area in vulnerable bioregions like Patagonia make these credits compelling. ',
  offsetMethodList: {
    label: 'offset generation method',
    items: [
      {
        name: 'Carbon removal',
        icon: {
          src: 'https://cdn.sanity.io/images/jm12rn9t/staging/11bffee1118bc046a782837863f1e5114e979b94-65x68.svg',
          alt: 'co2',
        },
      },
    ],
  },
  projectActivitiesList: {
    label: 'offset generation method',
    items: [
      {
        name: 'Holistically managed cattle grazing',
      },
    ],
  },
  button: { text: 'Schedule a call', href: '#' },
};
