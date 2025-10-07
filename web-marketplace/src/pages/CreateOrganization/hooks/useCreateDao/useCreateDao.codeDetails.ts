import { fromBase64, toHex } from '@cosmjs/encoding';
import {
  QueryCodeRequest,
  QueryCodeResponse,
} from 'cosmjs-types/cosmwasm/wasm/v1/query';

// Local noop logger to avoid console usage (lint compliance)
const logLegacyQueryFailure = (_message: string, _error: unknown): void => {
  // intentionally silent
};

const UNKNOWN_QUERY_PATH_REGEX = /unknown query path/i;

export type CodeDetailsLike = {
  id: number;
  checksum: string;
  creator: string;
  data?: Uint8Array;
};

export type WasmCodeClient = {
  getCodeDetails: (codeId: number) => Promise<CodeDetailsLike>;
  getQueryClient?: () => {
    queryAbci?: (path: string, data: Uint8Array) => Promise<any>;
  };
  queryClient?: {
    queryAbci?: (path: string, data: Uint8Array) => Promise<any>;
  };
};

export function isUnknownQueryPathError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  return UNKNOWN_QUERY_PATH_REGEX.test(error.message);
}

export async function getCodeDetailsWithFallback(
  client: WasmCodeClient,
  codeId: number,
): Promise<CodeDetailsLike> {
  try {
    const details = await client.getCodeDetails(codeId);
    return normalizeCodeDetails(details, codeId);
  } catch (error) {
    if (!isUnknownQueryPathError(error)) {
      throw error;
    }

    const legacyDetails = await getLegacyCodeDetails(client, codeId);
    if (!legacyDetails) {
      throw error;
    }
    return legacyDetails;
  }
}

function normalizeCodeDetails(
  details: any,
  fallbackId: number,
): CodeDetailsLike {
  if (!details) {
    return {
      id: fallbackId,
      checksum: '',
      creator: '',
    };
  }

  if ('checksum' in details || 'id' in details) {
    return {
      id: details.id ?? details.codeId ?? fallbackId,
      checksum: details.checksum ?? toHex(details.dataHash ?? new Uint8Array()),
      creator: details.creator ?? '',
      data: details.data,
    };
  }

  if ('codeInfo' in details) {
    const info = details.codeInfo;
    return {
      id: info?.codeId ?? fallbackId,
      checksum: info?.checksum ?? toHex(info?.dataHash ?? new Uint8Array()),
      creator: info?.creator ?? '',
      data: details.data,
    };
  }

  return {
    id: fallbackId,
    checksum: '',
    creator: '',
  };
}

async function getLegacyCodeDetails(
  client: WasmCodeClient,
  codeId: number,
): Promise<CodeDetailsLike | undefined> {
  const queryClient = client.getQueryClient?.() ?? client.queryClient;

  if (!queryClient || typeof queryClient.queryAbci !== 'function') {
    return undefined;
  }

  const requestMessage = QueryCodeRequest.fromPartial({
    // cosmjs-types expects bigint for codeId
    codeId: BigInt(codeId),
  });
  const requestBytes = QueryCodeRequest.encode(requestMessage).finish();
  const emptyRequest = new Uint8Array();
  const encoderFallbacks: Uint8Array[] = [requestBytes, emptyRequest];

  const legacyPaths = [
    (id: number) => `/cosmwasm.wasm.v1.Query/Code`,
    (id: number) => `/custom/wasm/code`,
    (id: number) => `/custom/wasm/code/${id}`,
    (id: number) => `/wasm/code`,
    (id: number) => `/wasm/code/${id}`,
    (id: number) => `/wasm/code?id=${id}`,
  ];

  for (const buildPath of legacyPaths) {
    try {
      for (const request of encoderFallbacks) {
        const response = await queryClient.queryAbci(
          buildPath(codeId),
          request,
        );

        if (!response?.value || response.value.length === 0) continue;

        const decodedProto = decodeCodeResponse(response.value, codeId);
        if (decodedProto) {
          return decodedProto;
        }

        const decodedJson = decodeJsonCodeResponse(response.value, codeId);
        if (decodedJson) {
          return decodedJson;
        }
      }
    } catch (legacyError) {
      const LEGACY_WASM_QUERY_FAILED = 'Legacy wasm code query failed';
      logLegacyQueryFailure(LEGACY_WASM_QUERY_FAILED, legacyError);
      continue;
    }
  }

  return undefined;
}

function decodeCodeResponse(
  value: Uint8Array,
  codeId: number,
): CodeDetailsLike | undefined {
  try {
    const decoded = QueryCodeResponse.decode(value);
    const info = decoded.codeInfo;
    const data = decoded.data?.length ? decoded.data : undefined;

    if (!info?.dataHash?.length) return undefined;

    return {
      id: info.codeId !== undefined ? Number(info.codeId) : Number(codeId),
      checksum: toHex(info.dataHash),
      creator: info.creator || '',
      data,
    };
  } catch (err) {
    return undefined;
  }
}

function decodeJsonCodeResponse(
  value: Uint8Array,
  codeId: number,
): CodeDetailsLike | undefined {
  try {
    const decodedString = new TextDecoder().decode(value);
    if (!decodedString) return undefined;

    const parsed = JSON.parse(decodedString);
    const codeInfo =
      parsed?.code_info ||
      parsed?.CodeInfoResponse ||
      parsed?.codeInfo ||
      parsed?.code;

    if (!codeInfo) return undefined;

    const checksumBase64 =
      codeInfo.data_hash ||
      codeInfo.dataHash ||
      codeInfo.code_hash ||
      codeInfo.codeHash ||
      parsed?.data_hash ||
      parsed?.dataHash;

    if (!checksumBase64) return undefined;

    const checksumHex = toHex(fromBase64(checksumBase64));
    const dataBase64 = parsed?.data || parsed?.Data || parsed?.data_base64;
    const data = dataBase64 ? fromBase64(dataBase64) : undefined;

    return {
      id: Number(codeInfo.code_id || codeInfo.codeId || codeId),
      checksum: checksumHex,
      creator: codeInfo.creator || '',
      data,
    };
  } catch (err) {
    return undefined;
  }
}
