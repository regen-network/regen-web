import React, { useEffect, useState } from 'react';
import { useParams, Routes, Route } from 'react-router-dom';

import { useAllCreditClassQuery } from '../generated/sanity-graphql';
import {
  useCreditClassByOnChainIdQuery,
  useCreditClassByUriQuery,
} from '../generated/graphql';
import { client } from '../sanity';
import { CreditClassDetailsWithContent } from './CreditClassDetailsWithContent';
import { CreditClassDetailsSimple } from './CreditClassDetailsSimple';
import { queryEcoClassInfo } from '../lib/ecocredit';
import { getMetadata } from '../lib/metadata-graph';
import { ClassInfo } from '../types/ledger/ecocredit';

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

  const { data: contentData } = useAllCreditClassQuery({ client });
  const content = contentData?.allCreditClass?.find(
    creditClass => creditClass.path === creditClassId,
  );

  const onChainClassRegExp = /[A-Z]{1,3}[0-9]{2,}/;
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
    if (creditClassId && isOnChainClassId) {
      queryEcoClassInfo(creditClassId)
        .then(res => {
          const classInfo = res?.info;
          if (classInfo) {
            setOnChainClass(classInfo);
            getMetadata(classInfo.metadata).then(res => {
              if (res?.data?.metadata) {
                setMetadata(res.data.metadata);
              }
            });
          }
          // eslint-disable-next-line
        }).catch(console.error);;
    }
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
      />
    );
  } else {
    return <></>;
  }
}

export { CreditClassDetails };
