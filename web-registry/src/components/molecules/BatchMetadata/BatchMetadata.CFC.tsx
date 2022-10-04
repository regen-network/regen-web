import { Flex } from 'web-components/lib/components/box';
import { Body } from 'web-components/lib/components/typography';
import { CFCBatchMetadataLD } from 'web-components/lib/types/rdf/C02-city-forest-credits-batch';

import { LinkOrDash } from './BatchMetadata.LinkOrDash';
import { MetaDetail } from './BatchMetadata.MetaDetail';

export const BatchMetadataCFC = ({
  data,
}: {
  data?: Partial<CFCBatchMetadataLD>;
}): JSX.Element => {
  const reports = data?.['regen:verificationReports'];
  const serialNumbers = data?.['regen:cfcCreditSerialNumbers'];
  return (
    <>
      <MetaDetail label="cfc retirement serial numbers">
        <Flex col>
          {serialNumbers?.map((serialNumber: string) => (
            <Body mobileSize="md" styleLinks={false}>
              {serialNumber}
            </Body>
          ))}
        </Flex>
      </MetaDetail>
      <MetaDetail label="cfc vintage year">
        {data?.['regen:cfcVintageYear']?.['@value'] || '-'}
      </MetaDetail>
      <MetaDetail label="verification reports">
        <Flex col sx={{ gap: 2 }}>
          {reports && reports?.length > 0
            ? reports.map((report: any, i: number) => (
                <LinkOrDash
                  key={i}
                  href={report?.['schema:url']?.['@value']}
                  label="Verification report"
                />
              ))
            : '-'}
        </Flex>
      </MetaDetail>
    </>
  );
};
