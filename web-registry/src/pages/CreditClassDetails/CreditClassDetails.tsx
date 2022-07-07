import React, { useEffect, useState } from 'react';
import { useParams, Routes, Route } from 'react-router-dom';
import { ClassInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { useAllCreditClassQuery } from '../../generated/sanity-graphql';
import {
  useCreditClassByOnChainIdQuery,
  useCreditClassByUriQuery,
} from '../../generated/graphql';
import { client } from '../../sanity';
import CreditClassDetailsWithContent from '../CreditClassDetailsWithContent';
import CreditClassDetailsSimple from '../CreditClassDetailsSimple';
import { queryEcoClassInfo, queryClassIssuers } from '../../lib/ecocredit/api';
import { getMetadata } from '../../lib/metadata-graph';
import { onChainClassRegExp } from '../../lib/ledger';

interface CreditDetailsProps {
  isLandSteward?: boolean;
}

function CreditClassDetails(): JSX.Element {
  return (
    <Routes>
      <Route
        caseSensitive
        path="/*"
        element={<CreditClassDetail isLandSteward={true} />}
      />
      <Route
        path="buyer"
        element={<CreditClassDetail isLandSteward={false} />}
      />
      <Route
        path="land-steward"
        element={<CreditClassDetail isLandSteward={true} />}
      />
    </Routes>
  );
}

function CreditClassDetail({ isLandSteward }: CreditDetailsProps): JSX.Element {
  let { creditClassId } = useParams();
  const [onChainClass, setOnChainClass] = useState<ClassInfo | undefined>(
    undefined,
  );
  const [metadata, setMetadata] = useState<any>(undefined);
  const [issuers, setIssuers] = useState<string[] | undefined>(undefined);

  const { data: contentData } = useAllCreditClassQuery({ client });
  const content = contentData?.allCreditClass?.find(
    creditClass => creditClass.path === creditClassId,
  );

  const isOnChainClassId =
    creditClassId && onChainClassRegExp.test(creditClassId);
  const iri = content?.iri?.current;
  const { data: dbDataByOnChainId } = useCreditClassByOnChainIdQuery({
    variables: { onChainId: creditClassId as string },
    skip: !isOnChainClassId,
  });
  const { data: dbDataByUri } = useCreditClassByUriQuery({
    variables: { uri: iri as string },
    skip: !iri || !!isOnChainClassId,
  });
  const dbCreditClassByOnChainId = dbDataByOnChainId?.creditClassByOnChainId;
  const dbCreditClassByUri = dbDataByUri?.creditClassByUri;

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      if (creditClassId && isOnChainClassId) {
        try {
          const res = await queryEcoClassInfo(creditClassId);
          const classInfo = res?.class;
          if (classInfo) {
            setOnChainClass(classInfo);
            const data = await getMetadata(classInfo.metadata);
            setMetadata(data);
          }
        } catch (err) {
          // eslint-disable-next-line
          console.error(err);
        }
      }
    };
    fetchData();
  }, [creditClassId, isOnChainClassId]);

  useEffect(() => {
    const fetch = async (): Promise<void> => {
      if (creditClassId && isOnChainClassId) {
        try {
          const { issuers } = await queryClassIssuers(creditClassId);
          if (issuers) setIssuers(issuers);
        } catch (err) {
          // eslint-disable-next-line
          console.error(err);
        }
      }
    };
    fetch();
  }, [creditClassId, isOnChainClassId]);

  if (content && dbCreditClassByUri) {
    return (
      <CreditClassDetailsWithContent
        dbClass={dbCreditClassByUri}
        content={content}
        isLandSteward={isLandSteward}
      />
    );
  } else if (onChainClass && dbCreditClassByOnChainId) {
    return (
      <CreditClassDetailsSimple
        dbClass={dbCreditClassByOnChainId}
        onChainClass={onChainClass}
        metadata={metadata}
        issuers={issuers}
      />
    );
  } else {
    // TODO Display not found or error status
    // based on https://github.com/regen-network/regen-registry/issues/886
    return <></>;
  }
}

export { CreditClassDetails };
