import { ArticleType } from 'web-components/src/components/cards/ArticleCard/ArticleCard.types';
import {
  ProjectCardBodyTextsMapping,
  ProjectCardButtonsMapping,
  ProjectCardTitlesMapping,
} from 'web-components/src/components/cards/ProjectCard/ProjectCard.types';
import CurrentCreditsIcon from 'web-components/src/components/icons/CurrentCreditsIcon';
import EyeIcon from 'web-components/src/components/icons/EyeIcon';
import { PrefinanceIcon } from 'web-components/src/components/icons/PrefinanceIcon';

export const DRAFT_TEXT = 'Draft';
export const ARTICLE_CARD_BTN_TEXT_MAPPING: Record<ArticleType, string> = {
  video: 'watch video',
  article: 'read article',
  podcast: 'listen to podcast',
};
export const REQUIRED_MESSAGE = 'This field is required';
export const INVALID_EMAIL_MESSAGE = 'Please enter a valid email address';

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
