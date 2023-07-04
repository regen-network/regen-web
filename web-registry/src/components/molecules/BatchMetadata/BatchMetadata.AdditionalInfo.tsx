import { Flex } from 'web-components/lib/components/box';
import { Body } from 'web-components/lib/components/typography';

import { CreditBatchMetadataIntersectionLD } from 'lib/db/types/json-ld';
import {
  getBatchUnknownFields,
  getFieldLabel,
} from 'lib/rdf/rdf.unknown-fields';

import { LinkWithArrow } from 'components/atoms';

import { LinkOrDash } from './BatchMetadata.LinkOrDash';
import { MetaDetail } from './BatchMetadata.MetaDetail';

export const BatchMetadataAdditionalInfo = <
  T extends CreditBatchMetadataIntersectionLD,
>({
  data,
}: {
  data?: T;
}): JSX.Element | null => {
  if (!data) return null;

  // VCS
  const vcsRetirementSerialNumber = data['regen:vcsRetirementSerialNumber'];
  const additionalCertifications = data['regen:additionalCertifications'];

  // CFC
  const reports = data['regen:verificationReports'];
  const serialNumbers = data['regen:cfcCreditSerialNumbers'];
  const cfcVintageYear = data['regen:cfcVintageYear'];

  // Toucan
  const toucanVintageTokenId = data['regen:toucanVintageTokenId']?.toString();
  const toucanURI = data['regen:toucanURI'];

  // Unknown
  const unknownFields = getBatchUnknownFields(data);

  return (
    <>
      {/* VCS */}
      {vcsRetirementSerialNumber && (
        <MetaDetail label="vcs retirement serial number">
          {vcsRetirementSerialNumber}
        </MetaDetail>
      )}
      {additionalCertifications && additionalCertifications?.length > 0 && (
        <MetaDetail label="additional certifications">
          <Flex col sx={{ gap: 2 }}>
            {additionalCertifications.map((cert, i) => (
              <LinkOrDash
                key={i}
                href={cert?.['schema:url']}
                label={cert?.['schema:name']}
              />
            ))}
          </Flex>
        </MetaDetail>
      )}
      {/* CFC */}
      {serialNumbers && serialNumbers?.length > 0 && (
        <MetaDetail label="cfc retirement serial numbers">
          <Flex col>
            {serialNumbers?.map((serialNumber: string) => (
              <Body mobileSize="md" styleLinks={false}>
                {serialNumber}
              </Body>
            ))}
          </Flex>
        </MetaDetail>
      )}
      {cfcVintageYear && (
        <MetaDetail label="cfc vintage year">{cfcVintageYear}</MetaDetail>
      )}
      {reports && reports?.length > 0 && (
        <MetaDetail label="verification reports">
          <Flex col sx={{ gap: 2 }}>
            {reports.map((report, i: number) => (
              <LinkWithArrow
                key={report['schema:url']}
                href={report['schema:url']}
                label="Verification report"
              />
            ))}
          </Flex>
        </MetaDetail>
      )}
      {/* Toucan */}
      {toucanVintageTokenId && (
        <MetaDetail label="Toucan Vintage Token Id">
          <LinkWithArrow href={toucanURI || ''} label={toucanVintageTokenId} />
        </MetaDetail>
      )}
      {/* Unknown fields */}
      {unknownFields.map(([fieldName, value]) => (
        <MetaDetail label={getFieldLabel(fieldName)}></MetaDetail>
      ))}
    </>
  );
};
