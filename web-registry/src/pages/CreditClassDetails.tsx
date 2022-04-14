import React, { useEffect, useState } from 'react';
import { useParams, Routes, Route } from 'react-router-dom';

import mock from '../mocks/mock.json';
import { useAllCreditClassQuery } from '../generated/sanity-graphql';
import { useCreditClassByOnChainIdQuery } from '../generated/graphql';
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
  const [ledgerClass, setLedgerClass] = useState<ClassInfo | undefined>(
    undefined,
  );
  const [metadata, setMetadata] = useState<any>(undefined);

  const { data: contentData } = useAllCreditClassQuery({ client });
  const { data: dbData } = useCreditClassByOnChainIdQuery({
    variables: { onChainId: creditClassId || '' },
  });

  useEffect(() => {
    const fetch = async (): Promise<void> => {
      if (creditClassId) {
        try {
          const res = await queryEcoClassInfo(creditClassId);
          const classInfo = res?.info;
          if (classInfo) {
            setLedgerClass(classInfo);
            const data = await getMetadata(classInfo.metadata);
            setMetadata(data);
          }
        } catch (err) {
          // eslint-disable-next-line
          console.error(err);
        }
      }
    };
    fetch();
  }, [creditClassId]);

  const dbCreditClass = dbData?.creditClassByOnChainId;
  const content = contentData?.allCreditClass?.find(
    creditClass => creditClass.path === creditClassId,
  );
  const creditClassMock = mock?.creditClasses.find(
    creditClass => creditClass.id === creditClassId,
  );

  if (creditClassMock && content) {
    return (
      <CreditClassDetailsWithContent
        creditClass={creditClassMock}
        content={content}
        isLandSteward={isLandSteward}
      />
    );
  } else if (ledgerClass && dbCreditClass) {
    return (
      <CreditClassDetailsSimple
        dbClass={dbCreditClass}
        ledgerClass={ledgerClass}
        metadata={metadata}
      />
    );
  } else {
    return <></>;
  }
}

export { CreditClassDetails };
