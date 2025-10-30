type ReactQueryGetHasPrefinanceProjectsQueryKeyParams = {
  languageCode: string;
};

export const getHasPrefinanceProjectsQueryKey = ({
  languageCode,
}: ReactQueryGetHasPrefinanceProjectsQueryKeyParams) => [
  'has-prefinance-projects',
  languageCode,
];
