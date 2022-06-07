import React, { useState, useEffect } from 'react';
import { Field, useFormikContext } from 'formik';

import SelectTextField, {
  Option,
} from 'web-components/lib/components/inputs/SelectTextField';
import { blocksToText } from 'web-components/lib/components/block-content';

import { client } from '../../sanity';
import useQueryListClasses from '../../hooks/useQueryListClasses';
import { useAllCreditClassQuery } from '../../generated/sanity-graphql';

interface Props {
  name?: string;
  required?: boolean;
}

const defaultCCOption = { value: '', label: 'Choose Credit Class' };

export function CreditClassSelect<T>({
  name = 'classId',
  required,
}: Props): React.ReactElement {
  const { setFieldValue } = useFormikContext<T>();
  const [creditClassOptions, setCreditClassOptions] = useState<Option[]>();
  const onChainClasses = useQueryListClasses();
  const { data: creditClassData } = useAllCreditClassQuery({ client });

  useEffect(() => {
    const onChainClassIDs = onChainClasses?.classes?.map(c => c.classId);
    if (onChainClassIDs && onChainClassIDs.length > 0) {
      const creditClassesContent = creditClassData?.allCreditClass;
      const ccOptions =
        onChainClassIDs?.map(onChainClassId => {
          const contentMatch = creditClassesContent?.find(
            content => content.path === onChainClassId,
          );

          return {
            value: onChainClassId,
            label: contentMatch
              ? `${blocksToText(contentMatch?.nameRaw)} (${onChainClassId})`
              : onChainClassId,
          };
        }) || [];

      const creditClassOptions = [defaultCCOption, ...ccOptions];

      setCreditClassOptions(creditClassOptions);
    }
  }, [onChainClasses, creditClassData, setFieldValue]);

  return (
    <Field
      name={name}
      label="Credit Class"
      required={required}
      component={SelectTextField}
      options={creditClassOptions}
    />
  );
}
