import React, { useState, useEffect } from 'react';
import { Field } from 'formik';
import { QueryClassesResponse } from '@regen-network/api/lib/generated/regen/ecocredit/v1alpha1/query';

import SelectTextField, {
  Option,
} from 'web-components/lib/components/inputs/SelectTextField';

import { useEcocreditQuery } from 'hooks';
import { getMetadataFromUint8Array } from 'lib/metadata-graph';

interface Props {
  name?: string;
  required?: boolean;
  saveOptions?: (options: Option[]) => void;
}

const defaultCCOption = { value: '', label: 'Choose Credit Class' };

export function CreditClassSelect({
  name = 'classId',
  required,
  saveOptions,
}: Props): React.ReactElement {
  const [creditClassOptions, setCreditClassOptions] = useState<Option[]>();

  const { data } = useEcocreditQuery<QueryClassesResponse>({
    query: 'classes',
    params: {},
  });

  useEffect(() => {
    async function prepareData(): Promise<void> {
      if (!data || !data.classes) return;

      const creditClassesOptions = await Promise.all(
        data.classes.map(async creditClass => {
          const creditClassId = creditClass.classId;

          let metadata;
          try {
            metadata = await getMetadataFromUint8Array(creditClass.metadata);
          } catch (e) {
            console.error(e); // eslint-disable-line no-console
          }

          const className = metadata && metadata['schema:name'];

          return {
            value: creditClassId,
            label: className
              ? `${className} (${creditClassId})`
              : creditClassId,
          };
        }),
      );

      // optionally, saved in parent container
      if (saveOptions) saveOptions(creditClassesOptions);

      const creditClassOptions = [defaultCCOption, ...creditClassesOptions];
      setCreditClassOptions(creditClassOptions);
    }

    prepareData();
  }, [data, saveOptions]);

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
