import React, { useEffect, useState } from 'react';
import { QueryClassesResponse } from '@regen-network/api/lib/generated/regen/ecocredit/v1alpha1/query';
import { Field } from 'formik';

import SelectTextField, {
  Option,
} from 'web-components/lib/components/inputs/SelectTextField';

import { getMetadataFromUint8Array } from 'lib/metadata-graph';

import { useEcocreditQuery } from 'hooks';

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
