import { getLocalizedData } from 'utils/sanity/getLocalizedData';

import {
  ProjectByIdDocument,
  ProjectByIdQuery,
  TerrasosProjectByIdDocument,
  TerrasosProjectByIdQuery,
} from 'generated/sanity-graphql';
import { IS_TERRASOS } from 'lib/env';

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
    const { data: projectById } = IS_TERRASOS
      ? await sanityClient.query<TerrasosProjectByIdQuery>({
          query: TerrasosProjectByIdDocument,
          variables: { id },
        })
      : await sanityClient.query<ProjectByIdQuery>({
          query: ProjectByIdDocument,
          variables: { id },
        });

    const allProject = IS_TERRASOS
      ? (projectById as TerrasosProjectByIdQuery).allTerrasosProject
      : (projectById as ProjectByIdQuery).allProject;

    return {
      allProject: getLocalizedData({
        data: allProject,
        languageCode,
      }),
    };
  },
  ...params,
});
