import { Flex } from 'web-components/lib/components/box';
import { VCSBatchMetadataLD } from 'web-components/lib/types/rdf/C01-verified-carbon-standard-batch';

import { LinkOrDash } from './BatchMetadata.LinkOrDash';
import { MetaDetail } from './BatchMetadata.MetaDetail';

export const BatchMetadataVCS = ({
  data,
}: {
  data?: Partial<VCSBatchMetadataLD>;
}): JSX.Element => {
  const additionalCertifications = data?.['regen:additionalCertifications'];
  return (
    <>
      <MetaDetail label="vcs retirement serial number">
        {data?.['regen:vcsRetirementSerialNumber'] || '-'}
      </MetaDetail>
      <MetaDetail label="additional certifications">
        <Flex col sx={{ gap: 2 }}>
          {additionalCertifications && additionalCertifications?.length > 0
            ? additionalCertifications.map((cert, i) => (
                <LinkOrDash
                  key={i}
                  href={cert?.['schema:url']?.['@value']}
                  label={cert?.['schema:name']}
                />
              ))
            : '-'}
        </Flex>
      </MetaDetail>
    </>
  );
};
