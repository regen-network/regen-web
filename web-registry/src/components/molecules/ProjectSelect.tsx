import React, { useState, useEffect } from 'react';
import { Field, useFormikContext } from 'formik';
import { startCase } from 'lodash';

import SelectTextField, {
  Option,
} from 'web-components/lib/components/inputs/SelectTextField';
import { useCreditClassByOnChainIdQuery } from '../../generated/graphql';

interface FieldProps {
  creditClassId: string;
  name?: string;
  required?: boolean;
}

const defaultProjectOption = { value: '', label: 'Choose Project' };

const ProjectSelect: React.FC<FieldProps> = ({
  creditClassId,
  name = "metadata['regen:vcsProjectId']",
  required,
  ...props
}) => {
  const { data: dbDataByOnChainId } = useCreditClassByOnChainIdQuery({
    variables: { onChainId: creditClassId as string },
  });
  const { setFieldValue } = useFormikContext();
  const [projectOptions, setProjectOptions] = useState<Option[]>([]);

  useEffect(() => {
    setProjectOptions([]);
    if (creditClassId === '') {
      // reset options when creditClassID no longer has a selected element
      return;
    }
    // reset project if creditClassID changes
    setFieldValue(name, '');
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
    const options = [defaultProjectOption, ...dbOptions];
    setProjectOptions(options);
  }, [
    creditClassId,
    setFieldValue,
    name,
    dbDataByOnChainId?.creditClassByOnChainId?.projectsByCreditClassId?.nodes,
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
