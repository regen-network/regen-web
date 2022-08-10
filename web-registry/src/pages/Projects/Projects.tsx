import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeliverTxResponse } from '@cosmjs/stargate';
import { Box, SelectChangeEvent } from '@mui/material';
import { QueryProjectsResponse } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { Flex } from 'web-components/lib/components/box';
import { ProjectCard } from 'web-components/lib/components/cards/ProjectCard';
import SelectTextFieldBase from 'web-components/lib/components/inputs/SelectTextFieldBase';
import { Loading } from 'web-components/lib/components/loading';
import { ProcessingModal } from 'web-components/lib/components/modal/ProcessingModal';
import { TxErrorModal } from 'web-components/lib/components/modal/TxErrorModal';
import { Body, Subtitle } from 'web-components/lib/components/typography';

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
} from './Projects.config';

export const Projects: React.FC = () => {
  const navigate = useNavigate();
  const [sort, setSort] = useState<string>(sortOptions[0].value);
  const [txModalTitle, setTxModalTitle] = useState<string | undefined>();
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  // const [bannerError, setBannerError] = useState(''); // TODO setting up for #1055
  const { data, loading } = useEcocreditQuery<QueryProjectsResponse>({
    query: 'projects',
    params: {},
  });
  const { sellOrdersResponse } = useQuerySellOrders();
  const sellOrders = sellOrdersResponse?.sellOrders;
  const projects = data?.projects;
  const projectsWithOrderData = useProjectsSellOrders({
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

  const closeSubmitModal = (): void => setIsSubmitModalOpen(false);

  const handleTxQueued = (): void => {
    setIsSubmitModalOpen(true);
  };

  const handleTxModalClose = (): void => {
    setTxModalTitle(undefined);
    setError(undefined);
  };

  const handleError = (): void => {
    closeSubmitModal();
    setTxModalTitle('Buy Credits Error');
  };

  const handleTxDelivered = async (
    _deliverTxResponse: DeliverTxResponse,
  ): Promise<void> => {
    // console.log('_deliverTxResponse', _deliverTxResponse); TODO #1055
  };

  const { error, setError, deliverTxResponse } = useMsgClient(
    handleTxQueued,
    handleTxDelivered,
    handleError,
  );

  const txHash = deliverTxResponse?.transactionHash;
  const txHashUrl = getHashUrl(txHash);

  if (loading) return <Loading />;
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
          '& :first-child': { gridColumn: '1 / -1' },
        }}
      >
        <Flex flex={1}>
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
              // onButtonClick={() => {}} TODO #1055
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
      <ProcessingModal open={isSubmitModalOpen} onClose={closeSubmitModal} />
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
      {/* {bannerError && <ErrorBanner text={bannerError} />} TODO #1055 */}
    </Flex>
  );
};
