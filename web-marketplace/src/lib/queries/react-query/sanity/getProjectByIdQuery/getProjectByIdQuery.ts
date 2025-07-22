import { getLocalizedData } from 'utils/sanity/getLocalizedData';

import {
  ProjectByIdDocument,
  ProjectByIdQuery,
} from 'generated/sanity-graphql';

import { getProjectByIdKey } from './getProjectByIdQuery.constants';
import {
  ReactQueryGetProjectByIdQueryParams,
  ReactQueryGetProjectByIdResponse,
} from './getProjectByIdQuery.types';

export const getProjectByIdQuery = ({
  sanityClient,
  id,
  languageCode,
  ...params
}: ReactQueryGetProjectByIdQueryParams): ReactQueryGetProjectByIdResponse => ({
  queryKey: [getProjectByIdKey(id), languageCode],
  queryFn: async () => {
    const { data: projectById } = await sanityClient.query<ProjectByIdQuery>({
      query: ProjectByIdDocument,
      variables: { id },
    });
    const projectArr = projectById.allProject;

    return {
      allProject: getLocalizedData({
        data: projectArr,
        languageCode,
      }),
    };
  },
  ...params,
});
