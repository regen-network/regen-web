import { Props } from './CreditClassCard';

export const creditClassCardMock: Props = {
  type: {
    name: 'Carbon',
    icon: {
      src: '/icons/carbon-white.svg',
      alt: 'carbon',
    },
  },
  title: 'Verified Carbon Standard (C01)',
  description:
    'This credit class provides a vehicle for nature based Verified Carbon Units (VCUs) to enter the blockchain space via issuance on Regen Ledger. ',
  imgSrc: '/coorong.png',
  generationMethods: [
    {
      name: 'Carbon removal',
      icon: {
        src: '/icons/carbon.svg',
        alt: 'carbon',
      },
    },
  ],
  methodology: {
    href: '#',
    text: 'Ruuts Protocol Soil Carbon Sequestration Methodology',
  },
};
