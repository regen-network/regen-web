import { MutableRefObject, useCallback, useRef, useState } from 'react';
import {
  Outlet,
  useNavigate,
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

export const ProjectCreate = (): JSX.Element => {
  const { _ } = useLingui();
  const navigate = useNavigate();
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
    const projectPath = `projects/${projectId}/manage`;
    if (
      isOrganizationAccount ||
      (offChainProject?.adminDaoAddress &&
        offChainProject?.adminDaoAddress === dao?.address)
    )
      navigate(`/dashboard/organization/${projectPath}`, { replace: true });
    else navigate(`/dashboard/${projectPath}`, { replace: true });
  }, [
    navigate,
    isOrganizationAccount,
    offChainProject,
    projectId,
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
