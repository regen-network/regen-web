import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeliverTxResponse } from '@cosmjs/stargate';
import { Box, Grid, SelectChangeEvent } from '@mui/material';
import { QueryProjectsResponse } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { Flex } from 'web-components/lib/components/box';
import { ProjectCard } from 'web-components/lib/components/cards/ProjectCard';
import SelectTextFieldBase from 'web-components/lib/components/inputs/SelectTextFieldBase';
import { Loading } from 'web-components/lib/components/loading';
import { ProcessingModal } from 'web-components/lib/components/modal/ProcessingModal';
import { TxErrorModal } from 'web-components/lib/components/modal/TxErrorModal';

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
    <Box
      justifyContent={'center'}
      sx={{
        bgcolor: 'grey.50',
        borderTop: 1,
        borderColor: 'grey.100',
        p: 8.75,
      }}
    >
      <Grid
        container
        rowGap={4.5}
        columnGap={5}
        flexWrap="wrap"
        justifyContent="center"
      >
        <Flex flex={1}>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            flex={1}
            sx={{ pb: 5 }}
          >
            <span>Projects ({projectsWithOrderData.length})</span>
            <Flex alignItems="center">
              <Box sx={{ width: 75 }}>
                <span>Sort by:</span>
              </Box>
              <SelectTextFieldBase
                options={sortOptions}
                defaultStyle={false}
                onChange={handleSort}
              />
            </Flex>
          </Flex>
        </Flex>
      </Grid>
      <Grid
        container
        rowGap={4.5}
        columnGap={5}
        flexWrap="wrap"
        justifyContent="center"
      >
        {sortedProjects?.map(project => (
          <Grid item key={project?.id}>
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
          </Grid>
        ))}
      </Grid>
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
    </Box>
  );
};
