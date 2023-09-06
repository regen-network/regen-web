import { createContext, MutableRefObject, useRef, useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import { DeliverTxResponse } from '@cosmjs/stargate';

type ContextType = {
  deliverTxResponse?: DeliverTxResponse;
  setDeliverTxResponse: (deliverTxResponse?: DeliverTxResponse) => void;
  creditClassId?: string;
  setCreditClassId: (creditClassId?: string) => void;
  formRef?: MutableRefObject<
    { submitForm: () => void; isFormValid: () => boolean } | undefined
  >;
  shouldNavigateRef?: MutableRefObject<boolean>;
};

const defaultProjectCreateContext = createContext<ContextType>({
  deliverTxResponse: undefined,
  setDeliverTxResponse: () => void 0,
  creditClassId: undefined,
  setCreditClassId: () => void 0,
  formRef: undefined,
  shouldNavigateRef: undefined,
});

export const ProjectCreate = (): JSX.Element => {
  // TODO: possibly replace these with `useMsgClient` and pass downstream
  const [deliverTxResponse, setDeliverTxResponse] =
    useState<DeliverTxResponse>();
  const [creditClassId, setCreditClassId] = useState<string>('');
  const formRef = useRef();
  const shouldNavigateRef = useRef(true);

  return (
    <Outlet
      context={{
        deliverTxResponse,
        setDeliverTxResponse,
        creditClassId,
        setCreditClassId,
        formRef,
        shouldNavigateRef,
      }}
    />
  );
};

export const useCreateProjectContext = (): ContextType => {
  const context =
    useOutletContext<ContextType>() ?? defaultProjectCreateContext;

  return context;
};
