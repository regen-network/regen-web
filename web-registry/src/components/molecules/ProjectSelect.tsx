import React, { useState, useEffect } from 'react';
import { Field, useFormikContext } from 'formik';
import { startCase } from 'lodash';

import SelectTextField, {
  Option,
} from 'web-components/lib/components/inputs/SelectTextField';
import useEcocreditQuery from '../../hooks/useEcocreditQuery';
import {
  ProjectInfo,
  QueryProjectsResponse,
} from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

interface FieldProps {
  name?: string;
  required?: boolean;
  initialSelection?: string;
  saveOptions?: (options: Option[]) => void;
}

const defaultProjectOption = { value: '', label: 'Choose Project' };

const ProjectSelect: React.FC<FieldProps> = ({
  // TODO - name = 'projectId'
  name = "metadata['regen:vcsProjectId']",
  required,
  initialSelection,
  saveOptions,
  ...props
}) => {
  const { data } = useEcocreditQuery<QueryProjectsResponse>({
    query: 'projects',
    params: {},
  });

  const { setFieldValue } = useFormikContext();
  const [projectOptions, setProjectOptions] = useState<Option[]>([]);

  useEffect(() => {
    setProjectOptions([]);
    // reset project if creditClassID changes
    if (!initialSelection) setFieldValue(name, '');

    const options =
      data?.projects.map((project: ProjectInfo) => {
        return {
          // TODO - project name from metadata
          label:
            `${startCase(project?.metadata?.['schema:name' as any] || '')} ${
              project.id ? '(' + project.id + ')' : ''
            }` || '',
          value: project.id || '',
        };
      }) || [];

    if (saveOptions) saveOptions(options);

    setProjectOptions([defaultProjectOption, ...options]);
  }, [data, setFieldValue, name, initialSelection, saveOptions]);

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
