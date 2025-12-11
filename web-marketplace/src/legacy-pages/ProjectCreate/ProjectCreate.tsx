import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Outlet,
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from 'react-router-dom';
import { DeliverTxResponse } from '@cosmjs/stargate';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { useAtom } from 'jotai';

import CloseIcon from 'web-components/src/components/icons/CloseIcon';

import { FormRef } from 'components/molecules/Form/Form';

import {
  projectAccountSelectionsAtom,
  projectsDraftState,
  ProjectsDraftStatus,
} from './ProjectCreate.store';

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
  projectCreatorAddress?: string;
  setProjectCreatorAddress: (address?: string) => void;
  isOrganizationAccount: boolean;
  setIsOrganizationAccount: (isOrg: boolean) => void;
};

const defaultProjectCreateContext: ContextType = {
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
  projectCreatorAddress: undefined,
  setProjectCreatorAddress: () => void 0,
  isOrganizationAccount: false,
  setIsOrganizationAccount: () => void 0,
};

export const ProjectCreate = (): JSX.Element => {
  const { _ } = useLingui();
  const navigate = useNavigate();
  const location = useLocation();
  const [showDiscardModal, setShowDiscardModal] = useState(false);

  // Check if coming from dashboard - this means we should NOT restore from localStorage
  const state = location.state as
    | { fromDashboard?: boolean; isOrganization?: boolean }
    | undefined;
  const isFromDashboard = !!state?.fromDashboard;

  // TODO: possibly replace these with `useMsgClient` and pass downstream
  const [deliverTxResponse, setDeliverTxResponse] =
    useState<DeliverTxResponse>();
  const [projectsState] = useAtom<ProjectsDraftStatus>(projectsDraftState);
  const [projectAccountSelections, setProjectAccountSelections] = useAtom(
    projectAccountSelectionsAtom,
  );
  const { projectId } = useParams();
  const [creditClassId, setCreditClassId] = useState<string>('');
  const [creditClassOnChainId, setCreditClassOnChainId] = useState<string>('');

  const [projectCreatorAddress, setProjectCreatorAddress] = useState<
    string | undefined
  >();

  const [isOrganizationAccount, setIsOrganizationAccount] = useState(false);

  const [hasModalBeenViewed, setHasModalBeenViewed] = useState(
    projectsState?.find(project => project.id === projectId)?.draft,
  );
  const formRef = useRef();
  const shouldNavigateRef = useRef(true);
  const isDraftRef = useRef(false);

  // Restore persisted account selection for this project
  // BUT skip if coming from dashboard (we want fresh state from navigation)
  useEffect(() => {
    if (!projectId || isFromDashboard) return;
    const saved = projectAccountSelections[projectId];
    if (saved) {
      setProjectCreatorAddress(saved.address);
      setIsOrganizationAccount(!!saved.isOrganization);
    }
  }, [projectAccountSelections, projectId, isFromDashboard]);

  // Persist current selection for this project
  useEffect(() => {
    // Avoid overwriting a previous selection with an empty payload
    if (!projectId || !projectCreatorAddress) return;
    setProjectAccountSelections(prev => ({
      ...prev,
      [projectId]: {
        address: projectCreatorAddress,
        isOrganization: isOrganizationAccount,
      },
    }));
  }, [
    projectCreatorAddress,
    isOrganizationAccount,
    projectId,
    setProjectAccountSelections,
  ]);

  const handleRequestClose = useCallback(() => {
    setShowDiscardModal(false);
    if (isOrganizationAccount)
      navigate('/dashboard/organization', { replace: true });
    else navigate('/dashboard', { replace: true });
  }, [navigate, isOrganizationAccount]);

  return (
    <>
      <div className="bg-bc-neutral-100 min-h-[100vh] relative">
        <button
          type="button"
          aria-label={_(msg`Close project creation`)}
          onClick={handleRequestClose}
          className="absolute top-0 right-0 mt-10 mr-10 z-50 p-8 rounded-full border-none bg-transparent hover:bg-bc-neutral-200 transition-colors cursor-pointer"
        >
          <CloseIcon className="w-24 h-24 text-bc-neutral-600" />
        </button>
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
            projectCreatorAddress,
            setProjectCreatorAddress,
            isOrganizationAccount,
            setIsOrganizationAccount,
          }}
        />
      </div>
    </>
  );
};

export const useCreateProjectContext = (): ContextType => {
  const context =
    useOutletContext<ContextType>() ?? defaultProjectCreateContext;

  return context;
};
