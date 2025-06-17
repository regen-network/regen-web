import { msg } from '@lingui/core/macro';
import { Trans } from '@lingui/react/macro';
import { Box, LabelDisplayedRowsArgs, Link } from '@mui/material';

import {
  ProjectCardBodyTextsMapping,
  ProjectCardButtonsMapping,
  ProjectCardTitlesMapping,
} from 'web-components/src/components/cards/ProjectCard/ProjectCard.types';
import CurrentCreditsIcon from 'web-components/src/components/icons/CurrentCreditsIcon';
import EyeIcon from 'web-components/src/components/icons/EyeIcon';
import { PrefinanceIcon } from 'web-components/src/components/icons/PrefinanceIcon';
import {
  MAX_FRACTION_DIGITS,
  MEMO_MAX_LENGTH,
} from 'web-components/src/components/inputs/validation';

import { TranslatorType } from 'lib/i18n/i18n.types';

// Contants

export const COPY_SUCCESS = msg`Link copied!`;
export const EDIT_TEXT = msg`Edit`;
export const DRAFT_TEXT = msg`Draft`;
export const SAVE_TEXT = msg`Next`;
export const SAVE_EXIT_TEXT = msg`Save draft & exit`;
export const SUBMIT_TEXT = msg`submit`;
export const SUBMIT_ERRORS = msg`Please correct the errors above`;
export const BATCH_LABEL = msg`Choose ecocredits batch`;
export const BASKET_LABEL = msg`Choose basket`;
export const AMOUNT_LABEL = msg`Amount`;
export const BASKET_PUT_SUBMIT_LABEL = msg`Put in basket`;
export const SUBMIT_ERROR_TEXT = msg`Please correct the errors above`;
export const BASKET_TAKE_AMOUNT_ERROR_TEXT = msg`You don't have enough basket tokens`;
export const RETIRE_ON_TAKE_LABEL = msg`Retire credits upon transfer`;
export const RETIRE_ON_TAKE_TOOLTIP = msg`The creator of this basket has chosen that all credits must be retired upon take.`;
export const BASKET_TAKE_SUBMIT_LABEL = msg`take from basket`;
export const LOCATION_STATE_PLACEHOLDER_LABEL = msg`Please choose a state`;
export const COUNTRY_LABEL_PLACEHOLDER = msg`Please choose a country`;
export const STATE_PROVINCE_ERROR_TEXT = msg`Required with postal code`;
export const RETIREMENT_INFO_TEXT = msg`Retirement is permanent and non-reversible.`;
export const APPLY = msg`Apply`;
export const CANCEL = msg`Cancel`;
export const UPDATE = msg`Update`;
export const UPLOADING = msg`Uploading image`;
export const TITLE_IGNORE_CROP = msg`Update image details`;
export const TITLE_CROP = msg`Position and size your image`;
export const AVAILABLE_LABEL = msg`Available`;
export const AMOUNT_SELL_LABEL = msg`Amount to sell`;
export const MAX_LABEL = msg`Max`;
export const EMAIL_CONFIRMATION_ARIA_LABEL = msg`Character`;
export const FILE_UPLOADING_TITLE = msg`File is uploading`;
export const FILE_UPLOADING_DESCRIPTION = msg`This may take some time if your file size is large.`;
export const FILE_DROP_LOCATION_TEXT = msg`Location`;
export const FILE_DROP_MOVE_UP_TEXT = msg`Move up`;
export const FILE_DROP_MOVE_DOWN_TEXT = msg`Move down`;
export const FILE_DROP_BUTTON_TEXT = msg`+ add`;
export const EXAMPLE_TEXT = msg`See an example»`;
export const COUNTRY_LABEL = msg`Country`;
export const STATE_LABEL = msg`State / Region`;
export const RADIO_PREFERABLE = msg`(preferable)`;
export const RADIO_DEFAULT_OPTIONAL = msg`(optional)`;
export const EMPTY_OPTION_TEXT = msg`No options available`;
export const REQUIRED_MESSAGE = msg`This field is required`;
export const INVALID_EMAIL_MESSAGE = msg`Please enter a valid email address`;
export const INVALID_PASSWORD =
  'Your password must contain at least 1 letter, 1 number, 1 special character (!@#$%^&*) and at least 8 characters';
export const REQUIREMENT_AGREEMENT = msg`You must agree to continue`;
export const INVALID_AMOUNT = msg`Please enter a valid amount`;
export const INSUFFICIENT_CREDITS = "You don't have enough credits";
export const INVALID_DATE = msg`Invalid date`;
export const INVALID_PAST_DATE = msg`Must be a date in the past`;
export const INVALID_URL = msg`Please enter a valid URL`;
export const INVALID_VCS_RETIREMENT =
  'Please enter a valid VCS retirement serial number';
export const INVALID_VCS_ID = msg`Please enter a valid VCS Project ID`;
export const INVALID_JSON = msg`Please enter valid JSON-LD`;
export const INVALID_REGEN_ADDRESS = msg`Invalid regen address`;
export const INVALID_POLYGON_ADDRESS = msg`Invalid Polygon address`;
export const REQUIRED_DENOM = msg`Please choose a denom`;
export const INVALID_DECIMAL_COUNT = `More than ${MAX_FRACTION_DIGITS} decimal places not allowed`;
export const INVALID_MEMO_LENGTH = `Must be ${MEMO_MAX_LENGTH} characters or fewer`;
export const POSITIVE_NUMBER = msg`Must be positive`;
export const EMAIL_CONFIRMATION_TITLE = msg`Please check your email`;
export const EMAIL_CONFIRMATION_DESCRIPTION = msg`We've just sent a confirmation email to:`;
export const EMAIL_CONFIRMATION_CODE_HELPER = msg`Please enter the code from that email:`;
export const DISCARD_CHANGES_TITLE = msg`Are you sure you want to discard your changes?`;
export const DISCARD_CHANGES_BODY = msg`If you proceed, you will lose all unsaved changes you made. This cannot be undone.`;
export const DISCARD_CHANGES_BUTTON = msg`yes, discard`;
export const PROCESSING_MODAL_TITLE = msg`Please wait while transaction processes`;
export const PROCESSING_MODAL_BODY = msg`This may take up to 15 seconds.`;
export const TX_ERROR_MODAL_TITLE = msg`Sorry, your transaction was not successful.`;
export const TX_MODAL_TITLE = msg`view your portfolio`;
export const TX_SUCCESSFUL_MODAL_TITLE = msg`Congrats! Your transaction was successful.`;
export const BLOCKCHAIN_RECORD = msg`blockchain record`;
export const CLOSE_BUTTON_TEXT = msg`CLOSE WINDOW`;
export const SEE_LESS = msg`- see less`;
export const SEE_MORE = msg`+ see more`;
export const PHOTO_CREDIT = msg`Photo credit`;
export const EDIT_PROFILE_TEXT = msg`Edit Profile`;
export const COPY_PROFILE_TEXT = msg`Copy link to profile`;
export const ALT_PROFILE_BACKGROUND_IMAGE = msg`user profile background image`;
export const ALT_PROFILE_AVATAR = msg`user profile avatar`;
export const PROJECT_ACTIVITY_LABEL = msg`Project Activity`;
export const ECOSYSTEM_LABEL = msg`Ecosystem`;
export const SHARE_TITLE = msg`Share`;
export const ACTIONS_TABLE_ACTIONS_TEXT = msg`Actions`;
export const VIEW_ON_LEDGER_TEXT = msg`view on ledger`;
export const PAGE_NOT_FOUND_TITLE = msg`Oops! Page not found.`;
export const PAGE_NOT_FOUND_BODY = msg`The page you are looking for might have been temporarily removed or had its name changed.`;
export const READ = msg`read`;
export const LESS = msg`less`;
export const MORE = msg`more`;

// Components

export const BATCH_DESCRIPTION = (
  <Trans>
    Choose any ecocredits that are eligible for this basket.
    <Link
      href="https://guides.regen.network/guides/regen-marketplace/baskets/put-in-basket"
      target="_blank"
    >
      Learn more»
    </Link>
  </Trans>
);

export const PAGE_NOT_FOUND_BUTTON = (
  <Trans>
    Visit Our Homepage{' '}
    <Box display={{ xs: 'none', sm: 'inline' }}>{'\u00A0'}Instead</Box>
  </Trans>
);

// Functions

type GetMaximumDecimalMessageProps = {
  _: TranslatorType;
  maximumFractionDigits: number;
};
export const getMaximumDecimalMessage = ({
  _,
  maximumFractionDigits,
}: GetMaximumDecimalMessageProps) =>
  _(msg`Maximum ${maximumFractionDigits} decimal places`);

export const getBottomFieldsTextMapping = (_: TranslatorType) => ({
  title: _(msg`Retirement reason`),
  tooltip: _(
    msg`You can add the name of the organization or person you are retiring the credits on behalf of here (i.e. "Retired on behalf of ABC Organization")`,
  ),
  reasonLabel: _(msg`Explain the reason you are retiring these credits`),
  locationTitle: _(msg`Location of retirement`),
  locationTooltip: _(
    msg`The retirement location can be where you live or your business operates.`,
  ),
  locationDescription: _(
    msg`Please enter a location for the retirement of these credits. This prevents double counting of credits in different locations.`,
  ),
  countryLabel: _(msg`Country`),
  stateLabel: _(msg`State / Region`),
  postalCodeLabel: _(msg`Postal Code`),
  locationStatePlaceholderLabel: _(LOCATION_STATE_PLACEHOLDER_LABEL),
  countryLabelPlaceholder: _(COUNTRY_LABEL_PLACEHOLDER),
});

export const getProjectCardBodyTextMapping = (
  _: TranslatorType,
): ProjectCardBodyTextsMapping => ({
  comingSoon: _(msg`coming soon`),
  creditsPurchased: _(msg`credits purchased`),
  viewDetails: _(msg`view details`),
  errorCardPrice: _(msg`Error fetching price`),
  soldOut: _(msg`Sold Out`),
  avgPriceLabel: _(msg`Avg Price`),
  avgPriceTooltip: _(
    msg`This is the median average price of all open sell orders for this project.`,
  ),
  prefinance: _(msg`prefinance`),
  price: _(msg`price`),
  estimatedIssuance: _(msg`estimated issuance`),
  creditsAvailable: _(msg`credits for sale`),
  prefinancePriceTooltip: _(
    msg`Price of credits for prefinance projects have specific terms, please click on the project to learn more.`,
  ),
  estimatedIssuanceTooltip: _(
    msg`Actual number of credits issued may be different from the estimated issuance.`,
  ),
});

export const getProjectCardPurchaseDetailsTitleMapping = (
  _: TranslatorType,
): ProjectCardTitlesMapping => ({
  vintageId: _(msg`vintage id`),
  vintageIdWithSerial: _(msg`vintage id (serial number)`),
  vintagePeriod: _(msg`vintage period`),
  creditClass: _(msg`credit class`),
  methodology: _(msg`methodology`),
  projectType: _(msg`project type`),
  additionalCertifications: _(msg`additional certifications`),
});

export const getProjectCardButtonMapping = (
  _: TranslatorType,
): ProjectCardButtonsMapping => ({
  default: {
    text: _(msg`Buy ecocredits`),
    startIcon: <CurrentCreditsIcon height="24px" width="24px" />,
  },
  prefinance: {
    text: _(msg`prefinance this project`),
    startIcon: <PrefinanceIcon height="24px" width="24px" />,
    className:
      '[border-image:linear-gradient(179deg,#515D89_19.77%,#7DC9BF_114.05%,#FAEBD1_200.67%)_1] text-purple-400 hover:bg-purple-100 hover:border-purple-100',
  },
  view: {
    text: _(msg`view project`),
    startIcon: <EyeIcon className="h-[24px] w-[24px]" />,
  },
});

type GetLabelDisplayedRowsProps = {
  _: TranslatorType;
  isIgnoreOffset?: boolean;
  rowsLength: number;
};

export const getLabelDisplayedRows =
  ({ _, isIgnoreOffset, rowsLength }: GetLabelDisplayedRowsProps) =>
  ({ from, to, count }: LabelDisplayedRowsArgs) => {
    const displayedTo = isIgnoreOffset ? from + rowsLength - 1 : to;
    return count !== -1
      ? _(msg`${from}–${displayedTo} of ${count}`)
      : _(msg`${from}–${displayedTo} of more than ${to}`);
  };
