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
  fieldIndex: number;
  fieldId: string;
}

export const BottomCreditRetireFields: React.FC<
  React.PropsWithChildren<BottomCreditRetireFieldsProps>
> = ({ mapboxToken, fieldId, fieldIndex }) => {
  const { classes: styles } = useBottomCreditRetireFieldsStyles();
  const ctx = useFormContext<CreditSendFormSchemaType>();
  const { register, control, setValue } = ctx;
  const isFirstItem = fieldIndex === 0;
  const country = useWatch({
    control,
    name: `retireFields.${fieldIndex}.country`,
  });
  const stateProvince = useWatch({
    control,
    name: `retireFields.${fieldIndex}.stateProvince`,
  });
  const postalCode = useWatch({
    control,
    name: `retireFields.${fieldIndex}.postalCode`,
  });

  useEffect(() => {
    if (!country) {
      setValue(`retireFields.${fieldIndex}.retirementJurisdiction`, '');
      return;
    }

    const jurisdiction = getJurisdictionIsoCode({
      country,
      stateProvince,
      postalCode,
    });
    setValue(`retireFields.${fieldIndex}.retirementJurisdiction`, jurisdiction);
  }, [country, stateProvince, postalCode, mapboxToken, setValue, fieldIndex]);

  return (
    <>
      {isFirstItem && (
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
            key={fieldId}
            {...register(`retireFields.${fieldIndex}.note`)}
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
            <LocationCountryField
              exclude
              key={fieldId}
              {...register(`retireFields.${fieldIndex}.country`)}
            />
          </Suspense>
        </Grid>
        <Grid item xs={12} sm={6} className={styles.stateCountryTextField}>
          <Suspense
            fallback={<SelectTextField label="State / Region" options={[]} />}
          >
            <LocationStateField
              country={country}
              key={fieldId}
              {...register(`retireFields.${fieldIndex}.stateProvince`)}
            />
          </Suspense>
        </Grid>
      </Grid>
      <ControlledTextField
        label="Postal Code"
        key={fieldId}
        optional
        {...register(`retireFields.${fieldIndex}.postalCode`)}
      />
    </>
  );
};
