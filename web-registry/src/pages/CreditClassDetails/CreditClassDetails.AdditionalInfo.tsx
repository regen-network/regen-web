import { Box, Grid } from '@mui/material';
import { capitalizeWord } from 'utils/string/capitalizeWord';

import { CreditClassMetadataLD } from 'lib/db/types/json-ld';
import {
  getClassUnknownFields,
  getFieldLabel,
  getFieldType,
} from 'lib/rdf/rdf.unknown-fields';

import { MetaDetail } from 'components/molecules';

import { ApprovedMethodologiesList } from './CreditClassDetails.ApprovedMethodologies';
import { BufferPoolAccounts } from './CreditClassDetails.BufferPoolAccounts';

interface AdditionalInfoProps<T extends CreditClassMetadataLD> {
  metadata?: T;
  creditTypeName?: string;
}

const AdditionalInfo = <T extends CreditClassMetadataLD>({
  metadata,
  creditTypeName,
}: AdditionalInfoProps<T>): JSX.Element | null => {
  if (!metadata) return null;

  const sectoralScopes = metadata?.['regen:sectoralScope'];
  const verificationMethod = metadata?.['regen:verificationMethod'];
  const sourceRegistry = metadata?.['regen:sourceRegistry'];
  const ecosystemTypes = metadata?.['regen:ecosystemType'];
  const projectActivities = metadata?.['regen:projectActivities'];
  const carbonOffsetStandard = metadata?.['regen:carbonOffsetStandard'];
  const tokenizationSource = metadata?.['regen:tokenizationSource'];
  const coBenefits = metadata?.['regen:coBenefits'];
  const measuredGHGs = metadata?.['regen:measuredGHGs'];
  const bufferPoolAccounts = metadata?.['regen:bufferPoolAccounts'];

  const unknownFields = getClassUnknownFields(metadata);

  return (
    <Box sx={{ py: 8 }}>
      <Grid container spacing={8}>
        <MetaDetail
          label="credit type"
          value={capitalizeWord(creditTypeName)}
        />
        <MetaDetail label="registry" value={sourceRegistry} />
        <MetaDetail
          label="carbon offset standard"
          value={carbonOffsetStandard}
        />
        <ApprovedMethodologiesList
          methodologyList={metadata['regen:approvedMethodologies']}
        />
        <MetaDetail label="project activities" value={projectActivities} />
        <MetaDetail label="sectoral scopes" value={sectoralScopes} />
        <MetaDetail label="Tokenization Source" value={tokenizationSource} />
        <MetaDetail label="ecosystem type" value={ecosystemTypes} />
        <MetaDetail label="verification method" value={verificationMethod} />
        <MetaDetail label="co-benefits" value={coBenefits} />
        <MetaDetail label="measured GHGs" value={measuredGHGs} />
        <BufferPoolAccounts
          bufferPoolAccounts={bufferPoolAccounts?.['schema:itemListElement']}
        />
        {unknownFields.map(([fieldName, value]) => (
          <MetaDetail
            key={fieldName}
            label={getFieldLabel(fieldName)}
            value={value}
            rdfType={getFieldType(fieldName, metadata['@context'])}
          />
        ))}
      </Grid>
    </Box>
  );
};

export { AdditionalInfo };
