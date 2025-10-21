import { QueryKey } from '@tanstack/react-query';

type GetCodeDetailsQueryKeyParams = {
  codeId: number;
};

export const getCodeDetailsQueryKey = ({
  codeId,
}: GetCodeDetailsQueryKeyParams): QueryKey => ['wasm', 'codeDetails', codeId];
