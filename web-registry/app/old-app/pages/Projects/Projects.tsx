import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeliverTxResponse } from '@cosmjs/stargate';
import { Box, SelectChangeEvent } from '@mui/material';
import { QueryProjectsResponse } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { Flex } from 'web-components/lib/components/box';
import { ProjectCard } from 'web-components/lib/components/cards/ProjectCard';
import { CelebrateIcon } from 'web-components/lib/components/icons/CelebrateIcon';
import SelectTextFieldBase from 'web-components/lib/components/inputs/SelectTextFieldBase';
import { Loading } from 'web-components/lib/components/loading';
import { ProcessingModal } from 'web-components/lib/components/modal/ProcessingModal';
import { TxErrorModal } from 'web-components/lib/components/modal/TxErrorModal';
import { Item } from 'web-components/lib/components/modal/TxModal';
import { TxSuccessfulModal } from 'web-components/lib/components/modal/TxSuccessfulModal';
import { Body, Subtitle } from 'web-components/lib/components/typography';

import useBuySellOrderSubmit from 'pages/Marketplace/Storefront/hooks/useBuySellOrderSubmit';
import { BuyCreditsModal } from 'components/organisms';

import { Link } from '../../components/atoms';
import useEcocreditQuery from '../../hooks/useEcocreditQuery';
import useMsgClient from '../../hooks/useMsgClient';
import { useQuerySellOrders } from '../../hooks/useQuerySellOrders';
import { getHashUrl } from '../../lib/block-explorer';
import { useProjectsSellOrders } from './hooks/useProjectsSellOrders';
import { useSortProjects } from './hooks/useSortProjects';
import {
  API_URI,
  IMAGE_STORAGE_BASE_URL,
  sortOptions,
  VIEW_ECOCREDITS,
} from './Projects.config';
import { ProjectWithOrderData } from './Projects.types';

export const Projects: React.FC = () => {
  const navigate = useNavigate();
  const [sort, setSort] = useState<string>(sortOptions[0].value);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [isProcessingModalOpen, setIsProcessingModalOpen] = useState(false);
  const [txModalTitle, setTxModalTitle] = useState<string>('');
  const [txButtonTitle, setTxButtonTitle] = useState<string>('');
  const [txModalHeader, setTxModalHeader] = useState<string>('');
  const [cardItems, setCardItems] = useState<Item[] | undefined>(undefined);
  const [selectedProject, setSelectedProject] =
    useState<ProjectWithOrderData | null>(null);
  const { data, loading } = useEcocreditQuery<QueryProjectsResponse>({
    query: 'projects',
    params: {},
  });
  const { sellOrdersResponse } = useQuerySellOrders();
  const sellOrders = sellOrdersResponse?.sellOrders;
  const projects = data?.projects;
  const { projectsWithOrderData, loading: loadingOrders } =
    useProjectsSellOrders({
      projects,
      sellOrders,
    });

  const handleSort = (event: SelectChangeEvent<unknown>): void => {
    setSort(event.target.value as string);
  };

  const sortedProjects = useSortProjects({
    projects: projectsWithOrderData,
    sort,
  });

  const closeBuyModal = (): void => setIsBuyModalOpen(false);

  const closeProcessingModal = (): void => setIsProcessingModalOpen(false);

  const openBuyModal = (project: ProjectWithOrderData): void => {
    setSelectedProject(project);
    setIsBuyModalOpen(true);
  };

  const handleTxQueued = (): void => {
    setIsProcessingModalOpen(true);
  };

  const handleTxModalClose = (): void => {
    setCardItems(undefined);
    setTxModalTitle('');
    setTxModalHeader('');
    setDeliverTxResponse(undefined);
    setError(undefined);
  };

  const handleError = (): void => {
    closeProcessingModal();
    setTxModalTitle('Buy Credits Error');
  };

  const handleTxDelivered = async (
    _deliverTxResponse: DeliverTxResponse,
  ): Promise<void> => {
    closeProcessingModal();
    closeBuyModal();
  };

  const onTxSuccessButtonClick = (): void => {
    handleTxModalClose();
    navigate('/ecocredits/dashboard');
  };

  const {
    signAndBroadcast,
    setDeliverTxResponse,
    wallet,
    deliverTxResponse,
    error,
    setError,
  } = useMsgClient(handleTxQueued, handleTxDelivered, handleError);
  const accountAddress = wallet?.address;
  const txHash = deliverTxResponse?.transactionHash;
  const txHashUrl = getHashUrl(txHash);

  const buySellOrderSubmit = useBuySellOrderSubmit({
    accountAddress,
    signAndBroadcast,
    setCardItems,
    setTxButtonTitle,
    setTxModalHeader,
    setTxModalTitle,
    buttonTitle: VIEW_ECOCREDITS,
  });

  if (loading || loadingOrders) return <Loading />;
  return (
    <Flex
      sx={{
        bgcolor: 'grey.50',
        borderTop: 1,
        borderColor: 'grey.100',
        px: [6, 8.75],
        pt: 8.75,
        pb: 25,
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 338px))',
          gridGap: '1.125rem',
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <Flex flex={1} sx={{ gridColumn: '1 / -1' }}>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            flex={1}
            sx={{ pb: 5 }}
          >
            <Flex>
              <Subtitle size="lg">Projects</Subtitle>
              <Body size="lg"> ({projectsWithOrderData.length})</Body>
            </Flex>
            <Flex alignItems="center" sx={{ width: ['60%', 'auto'] }}>
              <Box sx={{ width: [0, 63], visibility: ['hidden', 'visible'] }}>
                <Body size="xs">Sort by:</Body>
              </Box>
              <SelectTextFieldBase
                options={sortOptions}
                defaultStyle={false}
                onChange={handleSort}
              />
            </Flex>
          </Flex>
        </Flex>
        {sortedProjects?.map(project => (
          <Box key={project?.id}>
            <ProjectCard
              name={project?.name}
              imgSrc={project?.imgSrc}
              place={project?.place}
              area={project?.area}
              areaUnit={project?.areaUnit}
              onButtonClick={() => openBuyModal(project)}
              purchaseInfo={project.purchaseInfo}
              onClick={() => navigate(`/projects/${project.id}`)}
              imageStorageBaseUrl={IMAGE_STORAGE_BASE_URL}
              apiServerUrl={API_URI}
              truncateTitle={true}
              sx={{ width: 338, height: 479 }}
            />
          </Box>
        ))}
      </Box>
      <BuyCreditsModal
        open={isBuyModalOpen}
        onClose={closeBuyModal}
        onSubmit={buySellOrderSubmit}
        project={{
          id: selectedProject?.id.toString() ?? '',
          sellOrders: selectedProject?.sellOrders,
        }}
      />
      <ProcessingModal
        open={isProcessingModalOpen}
        onClose={closeProcessingModal}
      />
      <TxSuccessfulModal
        open={!!txHash && !error}
        onClose={handleTxModalClose}
        txHash={txHash ?? ''}
        txHashUrl={txHashUrl}
        title={txModalHeader}
        cardTitle={txModalTitle}
        buttonTitle={txButtonTitle}
        cardItems={cardItems}
        linkComponent={Link}
        onButtonClick={onTxSuccessButtonClick}
        icon={<CelebrateIcon sx={{ width: '85px', height: '106px' }} />}
      />
      {error && txModalTitle && (
        <TxErrorModal
          error={error}
          open={!!error && (!!txModalTitle || !!deliverTxResponse)}
          onClose={handleTxModalClose}
          txHash={txHash || ''}
          txHashUrl={txHashUrl}
          cardTitle={txModalTitle}
          linkComponent={Link}
          onButtonClick={handleTxModalClose}
          buttonTitle="close"
        />
      )}
    </Flex>
  );
};
