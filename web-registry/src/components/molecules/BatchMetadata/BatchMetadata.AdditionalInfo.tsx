import { CreditBatchMetadataIntersectionLD } from 'lib/db/types/json-ld';
import {
  getBatchUnknownFields,
  getFieldLabel,
  getFieldType,
} from 'lib/rdf/rdf.unknown-fields';

import { BatchMetadataMetaDetail } from './BatchMetadata.MetaDetail';

export const BatchMetadataAdditionalInfo = <
  T extends CreditBatchMetadataIntersectionLD,
>({
  data,
}: {
  data?: T;
}): JSX.Element | null => {
  if (!data) return null;

  const context = data?.['@context'];

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
      <BatchMetadataMetaDetail
        label="vcs retirement serial number"
        value={vcsRetirementSerialNumber}
      />
      <BatchMetadataMetaDetail
        label="additional certifications"
        value={additionalCertifications}
      />

      {/* CFC */}
      <BatchMetadataMetaDetail
        label="cfc retirement serial numbers"
        value={serialNumbers}
      />

      <BatchMetadataMetaDetail
        label="cfc vintage year"
        value={cfcVintageYear}
      />
      <BatchMetadataMetaDetail
        label="verification reports"
        value={
          reports?.map(report => ({
            'schema:name': 'Verification report',
            ...report,
          })) ?? []
        }
      />

      {/* Toucan */}
      <BatchMetadataMetaDetail
        label="Toucan Vintage Token Id"
        value={
          toucanVintageTokenId && {
            'schema:name': toucanVintageTokenId,
            'schema:url': toucanURI,
          }
        }
      />

      {/* Unknown fields */}
      {unknownFields.map(([fieldName, value]) => (
        <BatchMetadataMetaDetail
          key={fieldName}
          label={getFieldLabel(fieldName)}
          value={value}
          rdfType={getFieldType(fieldName, context)}
        />
      ))}
    </>
  );
};
