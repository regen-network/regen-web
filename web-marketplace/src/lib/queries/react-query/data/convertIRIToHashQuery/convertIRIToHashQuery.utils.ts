import { IRI_TO_HASH } from './convertIRIToHashQuery.constants';

type ConvertIRIToHashQueryKeyParams = {
  iri?: string;
};

export const convertIRIToHashQueryKey = ({
  iri,
}: ConvertIRIToHashQueryKeyParams): string[] => [IRI_TO_HASH, iri ?? ''];
