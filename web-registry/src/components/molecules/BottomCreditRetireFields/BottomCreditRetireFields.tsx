import { Suspense, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { Grid } from '@mui/material';

import { Flex } from 'web-components/lib/components/box';
import ControlledTextField from 'web-components/lib/components/inputs/new/ControlledTextField/ControlledTextField';
import LocationCountryField from 'web-components/lib/components/inputs/new/LocationCountryField/LocationCountryField';
import LocationStateField from 'web-components/lib/components/inputs/new/LocationStateField/LocationStateField';
import SelectTextField from 'web-components/lib/components/inputs/new/SelectTextField/SelectTextField';
import TextField from 'web-components/lib/components/inputs/new/TextField/TextField';
import InfoTooltipWithIcon from 'web-components/lib/components/tooltip/InfoTooltipWithIcon';
import { Body, Title } from 'web-components/lib/components/typography';
import { getJurisdictionIsoCode } from 'web-components/lib/utils/locationStandard';

import { CreditSendFormSchemaType } from 'components/organisms/CreditSendForm/CreditSendForm.schema';

import {
  bottomCreditRetireFieldsSxs as sxs,
  useBottomCreditRetireFieldsStyles,
} from './BottomCreditRetireFields.styles';

export interface BottomCreditRetireFieldsProps {
  mapboxToken: string;
  arrayPrefix?: string;
  arrayIndex?: number;
}

export const BottomCreditRetireFields: React.FC<
  React.PropsWithChildren<BottomCreditRetireFieldsProps>
> = ({ mapboxToken, arrayPrefix = '', arrayIndex }) => {
  const { classes: styles } = useBottomCreditRetireFieldsStyles();
  const ctx = useFormContext<CreditSendFormSchemaType>();
  const { register, control, setValue } = ctx;
  const country = useWatch({ control: control, name: 'country' });
  const stateProvince = useWatch({ control: control, name: 'stateProvince' });
  const postalCode = useWatch({ control: control, name: 'postalCode' });

  // const { values, setFieldValue } = useFormikContext<
  //   RetireFormValues | RetireFormValuesArray
  // >();

  useEffect(() => {
    if (!country) {
      setValue('retirementJurisdiction', '');
      return;
    }

    const jurisdiction = getJurisdictionIsoCode({
      country,
      stateProvince,
      postalCode,
    });

    setValue('retirementJurisdiction', jurisdiction);
  }, [country, stateProvince, postalCode, mapboxToken, arrayPrefix, setValue]);

  // showNotesField
  // When in the same form we have a set of credit retirement (for example,
  // because there are several recipients when we issue a batch of credits),
  // we only show the retirement note fields for the first occurrence (first recipient)
  const noArray = arrayPrefix === '' && typeof arrayIndex === 'undefined';
  const isFirstItem = !noArray && arrayIndex === 0;
  const showNotesField = noArray || isFirstItem;

  return (
    <>
      {showNotesField && (
        <>
          <Flex sx={sxs.title}>
            <Title variant="h5" sx={{ mr: 2 }}>
              Retirement note
            </Title>
            <InfoTooltipWithIcon title="You can add the name of the organization or person you are retiring the credits on behalf of here (i.e. 'Retired on behalf of ABC Organization')" />
          </Flex>
          <TextField
            formErrors={[]}
            type="text"
            label="Add retirement transaction details (stored in the tx memo)"
            className={styles.noteTextField}
            optional
            defaultStyle={false}
            {...register('note')}
          />
        </>
      )}
      <Flex sx={sxs.title}>
        <Title variant="h5" sx={{ mr: 2 }}>
          Location of retirement
        </Title>
        <InfoTooltipWithIcon title="The retirement location can be where you live or your business operates." />
      </Flex>

      <Body>
        Please enter a location for the retirement of these credits. This
        prevents double counting of credits in different locations.
      </Body>
      <Grid container className={styles.stateCountryGrid}>
        <Grid item xs={12} sm={6} className={styles.stateCountryTextField}>
          <Suspense fallback={<SelectTextField label="Country" options={[]} />}>
            <LocationCountryField exclude {...register('country')} />
          </Suspense>
        </Grid>
        <Grid item xs={12} sm={6} className={styles.stateCountryTextField}>
          <Suspense
            fallback={<SelectTextField label="State / Region" options={[]} />}
          >
            <LocationStateField
              country={country}
              {...register('stateProvince')}
            />
          </Suspense>
        </Grid>
      </Grid>
      <ControlledTextField
        label="Postal Code"
        optional
        {...register('postalCode')}
      />
    </>
  );
};
