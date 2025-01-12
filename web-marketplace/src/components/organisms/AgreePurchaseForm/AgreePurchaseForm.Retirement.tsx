import { lazy, Suspense } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import Card from 'web-components/src/components/cards/Card';
import CheckboxLabel from 'web-components/src/components/inputs/new/CheckboxLabel/CheckboxLabel';
import SelectTextField from 'web-components/src/components/inputs/new/SelectTextField/SelectTextField';
import TextField from 'web-components/src/components/inputs/new/TextField/TextField';
import QuestionMarkTooltip from 'web-components/src/components/tooltip/QuestionMarkTooltip';
import { Body, Title } from 'web-components/src/components/typography';

import {
  COUNTRY_LABEL,
  COUNTRY_LABEL_PLACEHOLDER,
  EMPTY_OPTION_TEXT,
  LOCATION_STATE_PLACEHOLDER_LABEL,
  STATE_LABEL,
} from 'lib/constants/shared.constants';

import { AgreePurchaseFormSchemaType } from './AgreePurchaseForm.schema';

const LocationCountryField = lazy(
  () =>
    import(
      'web-components/src/components/inputs/new/LocationCountryField/LocationCountryField'
    ),
);
const LocationStateField = lazy(
  () =>
    import(
      'web-components/src/components/inputs/new/LocationStateField/LocationStateField'
    ),
);

type Props = { retiring: boolean };

export const Retirement = ({ retiring }: Props) => {
  const { _ } = useLingui();
  const ctx = useFormContext<AgreePurchaseFormSchemaType>();
  const { register, formState, control } = ctx;
  const { errors } = formState;

  const anonymousPurchase = useWatch({
    control: control,
    name: 'anonymousPurchase',
  });
  const country = useWatch({
    control: control,
    name: 'country',
  });
  const stateProvince = useWatch({
    control: control,
    name: 'stateProvince',
  });

  return (
    <div className={retiring ? '' : 'hidden'}>
      <Card className="py-30 px-20 sm:py-50 sm:px-40 border-grey-300">
        <Title variant="h6" className="flex items-center">
          <Trans>Retirement reason</Trans>
          <QuestionMarkTooltip
            className="ml-5"
            title={_(
              msg`Examples of a retirement reason include: “company travel 2025”, “offsetting my personal footprint”, or the name of a specific person or organization.`,
            )}
          />
        </Title>
        <TextField
          className="!mt-20 sm:!mt-30"
          label={_(msg`Explain the reason you are retiring these credits`)}
          {...register('retirementReason')}
          error={!!errors['retirementReason']}
          helperText={errors['retirementReason']?.message}
          labelClassName="text-sm sm:text-base font-normal"
          optional
        />
        {/* <CheckboxLabel
          className=" !mt-20 sm:!mt-30"
          checked={anonymousPurchase}
          optional
          optionalTextClassName="sm:after:text-sm"
          label={
            <Body size="sm" mobileSize="sm" className="text-grey-700" as="span">
              <Trans>
                Make your purchase anonymous. Your name will be hidden from the
                retirement certificate and the certificate will be hidden from
                your public profile.
              </Trans>
            </Body>
          }
          {...register('anonymousPurchase')}
        /> */}
      </Card>
      <Card className="py-30 px-20 sm:py-50 sm:px-40 border-grey-300 my-20">
        <Title variant="h6" className="flex items-center pb-30">
          <Trans>Credit retirement location</Trans>
          <QuestionMarkTooltip
            className="ml-5"
            title={_(
              msg`The retirement location can be where you live or your business operates.`,
            )}
          />
        </Title>
        <div>
          <div className="flex sm:gap-20 flex-col sm:flex-row">
            <Suspense
              fallback={
                <SelectTextField
                  label={_(COUNTRY_LABEL)}
                  options={[]}
                  emptyOptionText={_(EMPTY_OPTION_TEXT)}
                />
              }
            >
              <LocationCountryField
                countryLabelPlaceholder={_(COUNTRY_LABEL_PLACEHOLDER)}
                label={_(COUNTRY_LABEL)}
                emptyOptionText={_(EMPTY_OPTION_TEXT)}
                exclude
                error={!!errors['country']}
                helperText={errors['country']?.message}
                value={country}
                {...register('country')}
              />
            </Suspense>
            <Suspense
              fallback={
                <SelectTextField
                  label={_(msg`State / Region`)}
                  options={[]}
                  emptyOptionText={_(EMPTY_OPTION_TEXT)}
                />
              }
            >
              <LocationStateField
                placeholderLabel={_(LOCATION_STATE_PLACEHOLDER_LABEL)}
                label={_(STATE_LABEL)}
                emptyOptionText={_(EMPTY_OPTION_TEXT)}
                className="sm:mt-0"
                optional
                country={country as string}
                error={!!errors['stateProvince']}
                helperText={errors['stateProvince']?.message}
                value={stateProvince}
                {...register('stateProvince')}
              />
            </Suspense>
          </div>
          <TextField
            label={_(msg`Postal code`)}
            {...register('postalCode')}
            error={!!errors['postalCode']}
            helperText={errors['postalCode']?.message}
            optional
          />
        </div>
      </Card>
    </div>
  );
};
