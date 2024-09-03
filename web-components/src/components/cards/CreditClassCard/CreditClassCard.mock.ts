/* eslint-disable lingui/no-unlocalized-strings */
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
  subtitle: 'CREDIT CLASS',
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
  creditClassTooltip:
    'Credit class: the structure, procedures and requirements for project registration, the quantification, monitoring, reporting and verification (MRV), and issuance of credits related to a certain credit type.',
  methodologyLabel: 'Project methodology',
  offsetGenerationMethodLabel: 'Offset generation method',

  methodology: {
    href: '#',
    text: 'Ruuts Protocol Soil Carbon Sequestration Methodology',
  },
};
