import React, { useState, useEffect } from 'react';
import { Field, useFormikContext } from 'formik';
import { startCase } from 'lodash';

import SelectTextField, {
  Option,
} from 'web-components/lib/components/inputs/SelectTextField';
import { queryProjectsByClass } from '../../lib/ecocredit/api';
import { ProjectInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

interface FieldProps {
  name?: string;
  required?: boolean;
  initialSelection?: string;
  creditClassId?: string;
  saveOptions?: (options: Option[]) => void;
}

const defaultProjectOption = { value: '', label: 'Choose Project' };

const ProjectSelect: React.FC<FieldProps> = ({
  creditClassId,
  name = "metadata['regen:vcsProjectId']",
  required,
  initialSelection,
  saveOptions,
  ...props
}) => {
  const { setFieldValue } = useFormikContext();
  const [projectOptions, setProjectOptions] = useState<Option[]>([]);

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      if (!creditClassId) return;
      const data = await queryProjectsByClass(creditClassId);

      const options =
        data?.projects.map((project: ProjectInfo) => {
          return {
            label:
              `${startCase(project?.metadata?.['schema:name' as any] || '')} ${
                project.id ? '(' + project.id + ')' : ''
              }` || '',
            value: project.id || '',
          };
        }) || [];

      if (!ignore) {
        if (saveOptions) saveOptions(options);
        setProjectOptions([defaultProjectOption, ...options]);
      }
    };

    setProjectOptions([]);
    // reset options when creditClassID no longer has a selected element
    if (creditClassId === '') return;

    // reset project if creditClassID changes
    if (!initialSelection) setFieldValue(name, '');

    fetchData();

    return () => {
      ignore = true;
    };
  }, [setFieldValue, name, initialSelection, saveOptions, creditClassId]);

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
