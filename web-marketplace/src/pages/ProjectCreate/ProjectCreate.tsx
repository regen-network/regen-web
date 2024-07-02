import { createContext, MutableRefObject, useRef, useState } from 'react';
import { Outlet, useOutletContext, useParams } from 'react-router-dom';
import { DeliverTxResponse } from '@cosmjs/stargate';
import { useAtom } from 'jotai';

import { FormRef } from 'components/molecules/Form/Form';

import { projectsDraftState, ProjectsDraftStatus } from './ProjectCreate.store';

type ContextType = {
  deliverTxResponse?: DeliverTxResponse;
  setDeliverTxResponse: (deliverTxResponse?: DeliverTxResponse) => void;
  creditClassId?: string;
  setCreditClassId: (creditClassId?: string) => void;
  creditClassOnChainId?: string;
  setCreditClassOnChainId: (creditClassId?: string) => void;
  formRef?: FormRef;
  shouldNavigateRef?: MutableRefObject<boolean>;
  isDraftRef?: MutableRefObject<boolean>;
  hasModalBeenViewed?: boolean;
  setHasModalBeenViewed: (state: boolean) => void;
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
  hasModalBeenViewed: false,
  setHasModalBeenViewed: () => {},
});

export const ProjectCreate = (): JSX.Element => {
  // TODO: possibly replace these with `useMsgClient` and pass downstream
  const [deliverTxResponse, setDeliverTxResponse] =
    useState<DeliverTxResponse>();
  const [projectsState] = useAtom<ProjectsDraftStatus>(projectsDraftState);
  const { projectId } = useParams();
  const [creditClassId, setCreditClassId] = useState<string>('');
  const [creditClassOnChainId, setCreditClassOnChainId] = useState<string>('');
  const [hasModalBeenViewed, setHasModalBeenViewed] = useState(
    projectsState?.find(project => project.id === projectId)?.draft,
  );
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
        hasModalBeenViewed,
        setHasModalBeenViewed,
      }}
    />
  );
};

export const useCreateProjectContext = (): ContextType => {
  const context =
    useOutletContext<ContextType>() ?? defaultProjectCreateContext;

  return context;
};
