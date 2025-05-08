import { msg, useLingui } from '@lingui/react';

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
  data?: T | null;
}): JSX.Element | null => {
  const { _ } = useLingui();
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
        label={_(msg`vcs retirement serial number`)}
        value={vcsRetirementSerialNumber}
      />
      <BatchMetadataMetaDetail
        label={_(msg`additional certifications`)}
        value={additionalCertifications}
      />

      {/* CFC */}
      <BatchMetadataMetaDetail
        label={_(msg`cfc retirement serial numbers`)}
        value={serialNumbers}
      />

      <BatchMetadataMetaDetail
        label={_(msg`cfc vintage year`)}
        value={cfcVintageYear}
        rdfType={getFieldType('regen:cfcVintageYear', context)}
      />
      <BatchMetadataMetaDetail
        label={_(msg`verification reports`)}
        value={
          reports?.map(report => ({
            'schema:name': _(msg`Verification report`),
            ...report,
          })) ?? []
        }
      />

      {/* Toucan */}
      <BatchMetadataMetaDetail
        label={_(msg`Toucan Vintage Token Id`)}
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
