import { useState, useEffect } from 'react';
import { DeliverTxResponse } from '@cosmjs/stargate';

const useGetProjectId = (deliverTxResponse?: DeliverTxResponse): string => {
  const [projectId, setProjectId] = useState('');

  useEffect(() => {
    console.log('deliverTxResponse', deliverTxResponse);
    if (deliverTxResponse?.rawLog) {
      const rawLog = JSON.parse(deliverTxResponse?.rawLog);
      const event = rawLog?.[0]?.events?.find(
        (event: any) => event?.type?.includes('EventCreateProject'), //regen.ecocredit.v1.EventCreateProject
      );
      const _projectId = event?.attributes
        ?.find((att: any) => att?.key === 'project_id')
        ?.value?.replace('"', '');
      console.log('_projectId', _projectId);
      setProjectId(_projectId);
    }
  }, [deliverTxResponse]);

  return projectId;
};

export { useGetProjectId };
