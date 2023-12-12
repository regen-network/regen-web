import React, { useEffect, useState } from 'react';
import { Field, useFormikContext } from 'formik';
import { startCase } from 'lodash';

import SelectTextField, {
  Option,
} from 'web-components/src/components/inputs/SelectTextField';

import { useCreditClassByOnChainIdQuery } from '../../generated/graphql';

interface FieldProps {
  creditClassId: string;
  name?: string;
  required?: boolean;
  initialSelection?: number;
  saveOptions?: (options: Option[]) => void;
}

const defaultProjectOption = { value: '', label: 'Choose Project' };

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
  const { setFieldValue } = useFormikContext();
  const [projectOptions, setProjectOptions] = useState<Option[]>([]);

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
  ]);

  return (
    <Field
      label="Project"
      name={name}
      component={SelectTextField}
      options={projectOptions}
      required={required}
      {...props}
    />
  );
};

export { ProjectSelect };
