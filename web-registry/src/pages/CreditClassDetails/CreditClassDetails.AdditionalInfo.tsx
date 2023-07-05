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

interface AdditionalInfoProps {
  metadata?: CreditClassMetadataLD;
  creditTypeName?: string;
}

const AdditionalInfo: React.FC<React.PropsWithChildren<AdditionalInfoProps>> =
  ({ metadata, creditTypeName }) => {
    if (!metadata) return null;

    const offsetGenerationMethods = metadata?.['regen:offsetGenerationMethod'];
    const sectoralScopes = metadata?.['regen:sectoralScope'];
    const verificationMethod = metadata?.['regen:verificationMethod'];
    const sourceRegistry = metadata?.['regen:sourceRegistry'];
    const ecosystemTypes = metadata?.['regen:ecosystemType'];
    const projectActivities = metadata?.['regen:projectActivities'];
    const carbonOffsetStandard = metadata?.['regen:carbonOffsetStandard'];
    const tokenizationSource = metadata?.['regen:tokenizationSource'];

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
          <MetaDetail
            label="offset generation methods"
            value={offsetGenerationMethods}
          />
          <MetaDetail label="project activities" value={projectActivities} />
          <MetaDetail label="sectoral scopes" value={sectoralScopes} />
          <MetaDetail label="Tokenization Source" value={tokenizationSource} />
          <MetaDetail label="ecosystem type" value={ecosystemTypes} />
          <MetaDetail label="verification method" value={verificationMethod} />
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
