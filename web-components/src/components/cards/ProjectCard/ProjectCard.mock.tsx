/* eslint-disable lingui/no-unlocalized-strings */
import CurrentCreditsIcon from '../../../components/icons/CurrentCreditsIcon';
import EyeIcon from '../../../components/icons/EyeIcon';
import { PrefinanceIcon } from '../../../components/icons/PrefinanceIcon';
import {
  ProjectCardBodyTextsMapping,
  ProjectCardButtonsMapping,
  ProjectCardTitlesMapping,
} from './ProjectCard.types';

export const projectCardBodyTextMapping: ProjectCardBodyTextsMapping = {
  comingSoon: 'coming soon',
  creditsPurchased: 'credits purchased',
  viewDetails: 'view details',
  errorCardPrice: 'Error fetching price',
  soldOut: 'Sold Out',
  avgPriceLabel: 'Avg Price',
  avgPriceTooltip:
    'This is the median average price of all open sell orders for this project.',
  prefinance: 'prefinance',
  price: 'price',
  estimatedIssuance: 'estimated issuance',
  creditsAvailable: 'credits available',
  prefinancePriceTooltip:
    'Price of credits for prefinance projects have specific terms, please click on the project to learn more.',
  estimatedIssuanceTooltip:
    'Actual number of credits issued may be different from the estimated issuance.',
};

export const projectCardPurchaseDetailsTitleMapping: ProjectCardTitlesMapping =
  {
    vintageId: 'vintage id',
    vintageIdWithSerial: 'vintage id (serial number)',
    vintagePeriod: 'vintage period',
    creditClass: 'credit class',
    methodology: 'methodology',
    projectType: 'project type',
    additionalCertifications: 'additional certifications',
  };

export const projectCardButtonMapping: ProjectCardButtonsMapping = {
  default: {
    text: 'Buy ecocredits',
    startIcon: <CurrentCreditsIcon height="24px" width="24px" />,
  },
  prefinance: {
    text: 'prefinance this project',
    startIcon: <PrefinanceIcon height="24px" width="24px" />,
    className:
      '[border-image:linear-gradient(179deg,#515D89_19.77%,#7DC9BF_114.05%,#FAEBD1_200.67%)_1] text-purple-400 hover:bg-purple-100 hover:border-purple-100',
  },
  view: {
    text: 'view project',
    startIcon: <EyeIcon className="h-[24px] w-[24px]" />,
  },
};
