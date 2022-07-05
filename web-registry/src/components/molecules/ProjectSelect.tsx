import React, { useState, useEffect } from 'react';
import { Field, useFormikContext } from 'formik';
import { startCase } from 'lodash';

import SelectTextField, {
  Option,
} from 'web-components/lib/components/inputs/SelectTextField';
// import { useCreditClassByOnChainIdQuery } from '../../generated/graphql';
import useEcocreditQuery from '../../hooks/useEcocreditQuery';
import {
  ProjectInfo,
  QueryProjectsResponse,
} from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

interface FieldProps {
  // creditClassId: string;
  name?: string;
  required?: boolean;
  initialSelection?: number;
  saveOptions?: (options: Option[]) => void;
}

const defaultProjectOption = { value: '', label: 'Choose Project' };

const ProjectSelect: React.FC<FieldProps> = ({
  // creditClassId,
  name = "metadata['regen:vcsProjectId']",
  // name = 'projectId',
  required,
  initialSelection,
  saveOptions,
  ...props
}) => {
  const { data } = useEcocreditQuery<QueryProjectsResponse>({
    query: 'projects',
    params: {},
  });
  // const { projects } = data;
  // console.log('response: projects', data?.projects);

  // const { data: dbDataByOnChainId } = useCreditClassByOnChainIdQuery({
  //   variables: { onChainId: creditClassId as string },
  // });
  const { setFieldValue } = useFormikContext();
  const [projectOptions, setProjectOptions] = useState<Option[]>([]);

  useEffect(() => {
    setProjectOptions([]);
    // reset options when creditClassID no longer has a selected element
    // if (creditClassId === '') return;

    // reset project if creditClassID changes
    if (!initialSelection) setFieldValue(name, '');

    // const projects =
    //   dbDataByOnChainId?.creditClassByOnChainId?.projectsByCreditClassId?.nodes;

    // const dbOptions =
    //   projects?.map(project => {
    //     const projectId = project?.metadata?.['regen:vcsProjectId'];
    //     return {
    //       label:
    //         `${startCase(project?.metadata?.['schema:name'] || '')} ${
    //           projectId ? '(' + projectId + ')' : ''
    //         }` || '',
    //       value: projectId || '',
    //     };
    //   }) || [];

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

    if (saveOptions) saveOptions(options);

    setProjectOptions([defaultProjectOption, ...options]);
  }, [
    data,
    // creditClassId,
    setFieldValue,
    name,
    // dbDataByOnChainId?.creditClassByOnChainId?.projectsByCreditClassId?.nodes,
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
