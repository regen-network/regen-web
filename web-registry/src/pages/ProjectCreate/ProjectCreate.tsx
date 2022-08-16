import { useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import { DeliverTxResponse } from '@cosmjs/stargate';

type ContextType = {
  deliverTxResponse?: DeliverTxResponse;
  setDeliverTxResponse: (deliverTxResponse?: DeliverTxResponse) => void;
};

export const ProjectCreate = (): JSX.Element => {
  // TODO: possibly replace these with `useMsgClient` and pass downstream
  const [deliverTxResponse, setDeliverTxResponse] =
    useState<DeliverTxResponse>();

  return <Outlet context={{ deliverTxResponse, setDeliverTxResponse }} />;
};

export const useCreateProjectContext = (): ContextType => {
  const context = useOutletContext<ContextType>();
  if (context === undefined) {
    throw new Error(
      'useCreateProjectContext must be used within a nested ProjectCreate route',
    );
  }
  return context;
};
