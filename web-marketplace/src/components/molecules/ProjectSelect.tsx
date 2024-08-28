import React, { useEffect, useMemo, useState } from 'react';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Field, useFormikContext } from 'formik';
import { startCase } from 'lodash';

import SelectTextField, {
  Option,
} from 'web-components/src/components/inputs/SelectTextField';

import { TranslatorType } from 'lib/i18n/i18n.types';

import { useCreditClassByOnChainIdQuery } from '../../generated/graphql';

interface FieldProps {
  creditClassId: string;
  name?: string;
  required?: boolean;
  initialSelection?: number;
  saveOptions?: (options: Option[]) => void;
}

const getDefaultProjectOption = (_: TranslatorType) => ({
  value: '',
  label: _(msg`Choose Project`),
});

const ProjectSelect: React.FC<React.PropsWithChildren<FieldProps>> = ({
  creditClassId,
  name = "metadata['regen:vcsProjectId']",
  required,
  initialSelection,
  saveOptions,
  ...props
}) => {
  const { data: dbDataByOnChainId } = useCreditClassByOnChainIdQuery({
    variables: { onChainId: creditClassId as string },
  });
  const { _ } = useLingui();
  const { setFieldValue } = useFormikContext();
  const [projectOptions, setProjectOptions] = useState<Option[]>([]);

  const defaultProjectOption = useMemo(() => getDefaultProjectOption(_), [_]);

  useEffect(() => {
    setProjectOptions([]);
    // reset options when creditClassID no longer has a selected element
    if (creditClassId === '') return;

    // reset project if creditClassID changes
    if (!initialSelection) setFieldValue(name, '');

    const projects =
      dbDataByOnChainId?.creditClassByOnChainId?.projectsByCreditClassId?.nodes;

    const dbOptions =
      projects?.map(project => {
        const projectId = project?.metadata?.['regen:vcsProjectId'];
        return {
          label:
            `${startCase(project?.metadata?.['schema:name'] || '')} ${
              projectId ? '(' + projectId + ')' : ''
            }` || '',
          value: projectId || '',
        };
      }) || [];

    if (saveOptions) saveOptions(dbOptions);

    const options = [defaultProjectOption, ...dbOptions];
    setProjectOptions(options);
  }, [
    creditClassId,
    setFieldValue,
    name,
    dbDataByOnChainId?.creditClassByOnChainId?.projectsByCreditClassId?.nodes,
    initialSelection,
    saveOptions,
    defaultProjectOption,
  ]);

  return (
    <Field
      label={_(msg`Project`)}
      name={name}
      component={SelectTextField}
      options={projectOptions}
      required={required}
      {...props}
    />
  );
};

export { ProjectSelect };
