import { useEffect, useState } from 'react';
import { RegenApi } from '@regen-network/api/lib';

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array,
  ): Promise<Uint8Array>;
}

interface Props<ClientType> {
  api?: RegenApi;
  ClientImpl: new (rpc: Rpc) => ClientType;
}

export const useInitClient = <ClientType extends unknown>({
  ClientImpl,
  api,
}: Props<ClientType>): ClientType | undefined => {
  const [client, setClient] = useState<ClientType | undefined>();

  useEffect(() => {
    if (!api?.queryClient) return;
    if (client) return;
    setClient(new ClientImpl(api.queryClient));
  }, [api?.queryClient, client, ClientImpl]);

  return client;
};
