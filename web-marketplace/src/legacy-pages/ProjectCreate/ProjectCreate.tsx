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
  useOutletContext,
  useParams,
} from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import { DeliverTxResponse } from '@cosmjs/stargate';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { DRAFT_ID } from 'legacy-pages/Dashboard/MyProjects/MyProjects.constants';
import { useRouter } from 'next/navigation';

import CloseIcon from 'web-components/src/components/icons/CloseIcon';

import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { getProjectByIdQuery } from 'lib/queries/react-query/registry-server/graphql/getProjectByIdQuery/getProjectByIdQuery';

import { FormRef } from 'components/molecules/Form/Form';
import { useDaoOrganization } from 'hooks/useDaoOrganization';

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

/** Returns true only for same-origin relative paths, blocking open-redirect attacks. */
const isSafeRelativePath = (path: string): boolean => {
  try {
    const resolved = new URL(path, window.location.origin);
    return resolved.origin === window.location.origin;
  } catch {
    return false;
  }
};

export const ProjectCreate = (): JSX.Element => {
  const { _ } = useLingui();
  const router = useRouter();
  const location = useLocation();
  const dao = useDaoOrganization();

  // TODO: possibly replace these with `useMsgClient` and pass downstream
  const [deliverTxResponse, setDeliverTxResponse] =
    useState<DeliverTxResponse>();
  const [projectsState] = useAtom<ProjectsDraftStatus>(projectsDraftState);
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
  const originPathRef = useRef<string | null>(null);

  // Capture the entry path only once, when the layout first mounts.
  // Child subroute navigations will change `location` but we only want the original.
  // We check both React Router state (set by navigate() callers) and a `?from` query
  // param (set by Next.js router.push() callers that can't pass router state).
  useEffect(() => {
    if (originPathRef.current === null) {
      const fromState =
        (location.state as { from?: string } | null)?.from ?? null;
      const fromParam = new URLSearchParams(location.search).get('from');
      const safeFromParam =
        fromParam && isSafeRelativePath(fromParam) ? fromParam : null;
      originPathRef.current = fromState ?? safeFromParam;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const graphqlClient = useApolloClient();
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
  const { data: projectByOffChainIdRes } = useQuery(
    getProjectByIdQuery({
      client: graphqlClient,
      enabled: !!projectId && projectId !== DRAFT_ID,
      id: projectId,
      languageCode: selectedLanguage,
    }),
  );
  const offChainProject = projectByOffChainIdRes?.data?.projectById;

  const handleRequestClose = useCallback(() => {
    // If we know where the user came from, send them back there.
    // We use Next.js router.replace() (not React Router navigate) because the origin
    // may be a Next.js App Router page (e.g. /project/slug) that lives outside
    // React Router's route tree.
    if (originPathRef.current) {
      router.replace(originPathRef.current);
      return;
    }
    // Fallback: new draft projects have no meaningful manage page yet → homepage.
    if (projectId === DRAFT_ID) {
      router.replace('/');
      return;
    }
    // Fallback for existing projects: dashboard manage page.
    const projectPath = `projects/${projectId}/manage`;
    if (
      isOrganizationAccount ||
      (offChainProject?.adminDaoAddress &&
        offChainProject?.adminDaoAddress === dao?.address)
    )
      router.replace(`/dashboard/organization/${projectPath}`);
    else router.replace(`/dashboard/${projectPath}`);
  }, [
    router,
    projectId,
    isOrganizationAccount,
    offChainProject?.adminDaoAddress,
    dao?.address,
  ]);

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
