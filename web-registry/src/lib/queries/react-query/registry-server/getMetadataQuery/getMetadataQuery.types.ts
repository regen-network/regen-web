export type ReactQueryMetadataProps = {
  iri?: string;
};

export type ReactQueryMetadataResponse = {
  queryKey: string[];
  queryFn: () => Promise<any>;
  keepPreviousData: boolean;
  staleTime: number;
};
