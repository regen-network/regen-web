/* eslint-disable no-console */
import { Link } from '@mui/material';

import { Body } from '../typography';
import { BasketPutForm } from './BasketPutForm/BasketPutForm';
import { BasketTakeForm } from './BasketTakeForm';
import { bottomTextMapping } from './form.mock';
import NewsletterForm from './NewsletterForm';

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
    requiredMessage="Required"
    invalidAmount="Invalid amount"
    insufficientCredits="Insufficient credits"
    invalidDecimalCount="Invalid decimal count"
    maxLabel="Max"
    availableLabel="Available"
  />
);

export const basketTakeForm = (): JSX.Element => (
  <BasketTakeForm
    accountAddress="123xyz"
    basketDisplayDenom="eco.C.rNCT"
    basket={{
      curator: 'regen18hj7m3skrsrr8lfvwqh66r7zruzdvp6ylwxrx4',
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
    requiredMessage="Required"
    invalidAmount="Invalid amount"
    insufficientCredits="Insufficient credits"
    invalidDecimalCount="Invalid decimal count"
    maxLabel="Max"
    availableLabel="Available"
    invalidMemoLength="Invalid memo length"
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
    requiredMessage="Required"
    invalidEmailMessage="Invalid email"
  />
);
