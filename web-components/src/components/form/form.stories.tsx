import { Link } from '@mui/material';

import { Body } from '../typography';
import { BasketPutForm } from './BasketPutForm/BasketPutForm';
import { BasketTakeForm } from './BasketTakeForm';
import { bottomTextMapping } from './form.mock';
import MoreInfoForm from './MoreInfoForm';
import NewsletterForm from './NewsletterForm';
import { FormValues, RecipientsForm } from './RecipientsForm';

const MAPBOX_TOKEN = import.meta.env.STORYBOOK_MAPBOX_TOKEN || '';

export default {
  title: 'Forms',
};

export const basketPutForm = (): JSX.Element => (
  <BasketPutForm
    basketOptions={[{ label: 'NCT', value: 'eco.uC.NCT' }]}
    availableTradableAmount={1000}
    batchDenoms={['C01-20190101-20201010-02', 'C01-20190101-20201010-03']}
    onClose={() => null}
    onSubmit={async () => alert('submit')}
    onBatchDenomChange={batchDenom => console.log(batchDenom)}
    batchLabel="Choose ecocredits batch"
    batchDescription={
      <>
        {'Choose any ecocredits that are eligible for this basket. '}
        <Link
          href="https://guides.regen.network/guides/regen-marketplace/baskets/put-in-basket"
          target="_blank"
        >
          Learn more»
        </Link>
      </>
    }
    basketLabel="Choose basket"
    amountLabel="Amount"
    submitLabel="Put in basket"
    submitErrorText="Please correct the errors above"
  />
);

export const basketTakeForm = (): JSX.Element => (
  <BasketTakeForm
    accountAddress="123xyz"
    basketDisplayDenom="eco.C.rNCT"
    basket={{
      curator: 'regen18hj7m3skrsrr8lfvwqh66r7zruzdvp6ylwxrx4',
      $type: 'regen.ecocredit.basket.v1.BasketInfo',
      name: 'rNCT',
      basketDenom: 'eco.uC.rNCT',
      creditTypeAbbrev: 'C',
      disableAutoRetire: false,
      exponent: 6,
    }}
    balance={9999}
    mapboxToken={MAPBOX_TOKEN}
    onClose={() => null}
    onSubmit={async () => alert('submit')}
    amountErrorText="You don't have enough basket tokens"
    stateProvinceErrorText="Required with postal code"
    amountLabel="Amount"
    retireOnTakeLabel="Retire credits upon transfer"
    retireOnTakeTooltip="The creator of this basket has chosen that all credits must be retired upon take."
    submitLabel="take from basket"
    submitErrorText="Please correct the errors above"
    retirementInfoText="Retirement is permanent and non-reversible."
    bottomTextMapping={bottomTextMapping}
  />
);

export const creditBatchRecipientsForm = (): JSX.Element => (
  <RecipientsForm
    requiredError="Must have recipients"
    minimumError="Minimum of 1 recipient"
    addButtonText="+Add recipient"
    deleteButtonText="Delete"
    recipientLabel="Recipient address"
    amountTradableLabel="Amount tradable"
    amountRetiredLabel="Amount Retired"
    withRetireLabel="Send additional retired credits"
    submitButtonText="Next"
    addressPrefix={'regen'}
    mapboxToken={MAPBOX_TOKEN}
    onSubmit={async (values: FormValues) =>
      alert('submit' + JSON.stringify(values, null, 2))
    }
    bottomTextMapping={bottomTextMapping}
    retirementInfoText="Retirement is permanent and non-reversible."
  />
);

export const moreInfoForm = (): JSX.Element => (
  <MoreInfoForm
    onClose={() => null}
    onSubmit={() => null}
    apiUrl=""
    title="Yes, I’m interested in buying credits for myself or my organization!"
    nameLabel="Your full name"
    emailLabel="Your email address"
    orgNameLabel="Organization Name"
    budgetLabel="Budget"
    projectTypesLabel="Which types of carbon credits projects are you interested in?"
    onBehalfOfLabel="I am interested in buying carbon credits on behalf of:"
    usdText="USD"
    protecTypesOptions={[
      {
        label: 'All nature based carbon credits',
        value: 'All nature based carbon credits',
      },
      {
        label: 'Forestry-based credits',
        value: 'Forestry-based credits',
      },
      {
        label: 'Grasslands-based credits',
        value: 'Grasslands-based credits',
      },
      {
        label: 'Cropland-based credits',
        value: 'Cropland-based credits',
      },
    ]}
    onBehalfOfOptions={[
      {
        label: '',
        value: '',
      },
      {
        label: 'Consumer/Individual/myself',
        value: 'Consumer/Individual/myself',
      },
      {
        label: 'Small or Medium Sized Business',
        value: 'Small or Medium Sized Business',
      },
      {
        label: 'Nonprofit',
        value: 'Nonprofit',
      },
      {
        label: 'Large Corporation',
        value: 'Large Corporation',
      },
      {
        label: 'Crypto Organization',
        value: 'Crypto Organization',
      },
    ]}
    submitLabel="Submit"
    submitErrorText="Please correct the errors above"
  />
);

export const newsletterForm = (): JSX.Element => (
  <NewsletterForm
    submitLabel="join us"
    apiUri="http://localhost:5000"
    inputPlaceholder="Your email"
    buttonSize="small"
    gridXs={{ textField: 8, button: 4 }}
    successChildren={
      <>
        <Body color="primary.main" align="center">
          Thank you!
        </Body>
        <Body color="primary.main" align="center">
          You have successfully joined our subscriber list.
        </Body>
      </>
    }
  />
);
