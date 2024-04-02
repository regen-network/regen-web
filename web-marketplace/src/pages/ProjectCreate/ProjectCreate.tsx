import { createContext, MutableRefObject, useRef, useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import { DeliverTxResponse } from '@cosmjs/stargate';
import { FormRef } from 'components/molecules/Form/Form';

type ContextType = {
  deliverTxResponse?: DeliverTxResponse;
  setDeliverTxResponse: (deliverTxResponse?: DeliverTxResponse) => void;
  creditClassId?: string;
  setCreditClassId: (creditClassId?: string) => void;
  formRef?: FormRef;
  creditClassOnChainId?: string;
  setCreditClassOnChainId: (creditClassId?: string) => void;
  shouldNavigateRef?: MutableRefObject<boolean>;
  isDraftRef?: MutableRefObject<boolean>;
};

const defaultProjectCreateContext = createContext<ContextType>({
  deliverTxResponse: undefined,
  setDeliverTxResponse: () => void 0,
  creditClassId: undefined,
  setCreditClassId: () => void 0,
  creditClassOnChainId: undefined,
  setCreditClassOnChainId: () => void 0,
  formRef: undefined,
  shouldNavigateRef: undefined,
  isDraftRef: undefined,
});

export const ProjectCreate = (): JSX.Element => {
  // TODO: possibly replace these with `useMsgClient` and pass downstream
  const [deliverTxResponse, setDeliverTxResponse] =
    useState<DeliverTxResponse>();
  const [creditClassId, setCreditClassId] = useState<string>('');
  const [creditClassOnChainId, setCreditClassOnChainId] = useState<string>('');
  const formRef = useRef();
  const shouldNavigateRef = useRef(true);
  const isDraftRef = useRef(false);

  return (
    <Outlet
      context={{
        deliverTxResponse,
        setDeliverTxResponse,
        creditClassId,
        setCreditClassId,
        creditClassOnChainId,
        setCreditClassOnChainId,
        formRef,
        shouldNavigateRef,
        isDraftRef,
      }}
    />
  );
};

export const useCreateProjectContext = (): ContextType => {
  const context =
    useOutletContext<ContextType>() ?? defaultProjectCreateContext;

  return context;
};
