import { msg, Trans } from '@lingui/macro';
import { Link } from '@mui/material';

import { TranslatorType } from 'lib/i18n/i18n.types';

export const COPY_SUCCESS = msg`Link copied!`;
export const EDIT_TEXT = msg`Edit`;
export const DRAFT_TEXT = msg`Draft`;
export const SAVE_TEXT = msg`Next`;
export const SAVE_EXIT_TEXT = msg`Save draft & exit`;
export const SUBMIT_TEXT = msg`submit`;
export const SUBMIT_ERRORS = msg`Please correct the errors above`;

export const BATCH_LABEL = msg`Choose ecocredits batch`;
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
export const BASKET_LABEL = msg`Choose basket`;
export const AMOUNT_LABEL = msg`Amount`;
export const BASKET_PUT_SUBMIT_LABEL = msg`Put in basket`;
export const SUBMIT_ERROR_TEXT = msg`Please correct the errors above`;
export const BASKET_TAKE_AMOUNT_ERROR_TEXT = msg`You don't have enough basket tokens`;
export const RETIRE_ON_TAKE_LABEL = msg`Retire credits upon transfer`;
export const RETIRE_ON_TAKE_TOOLTIP = msg`The creator of this basket has chosen that all credits must be retired upon take.`;
export const BASKET_TAKE_SUBMIT_LABEL = msg`take from basket`;
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
});
export const STATE_PROVINCE_ERROR_TEXT = msg`Required with postal code`;
export const RETIREMENT_INFO_TEXT = msg`Retirement is permanent and non-reversible.`;
export const APPLY = 'Apply';
export const CANCEL = 'Cancel';
export const UPDATE = 'Update';
export const UPLOADING = 'Uploading image';
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
