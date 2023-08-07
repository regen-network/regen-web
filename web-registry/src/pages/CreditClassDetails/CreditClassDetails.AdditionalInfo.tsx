import { Box, Grid } from '@mui/material';

import InfoTooltipWithIcon from 'web-components/lib/components/tooltip/InfoTooltipWithIcon';
import { Body, Label } from 'web-components/lib/components/typography';

import { CreditClassMetadataLD } from 'lib/db/types/json-ld';
import {
  getClassUnknownFields,
  getFieldLabel,
  getFieldType,
} from 'lib/rdf/rdf.unknown-fields';

import { MetaDetail } from 'components/molecules';

import { ApprovedMethodologiesList } from './CreditClassDetails.ApprovedMethodologies';
import { BufferPoolAccounts } from './CreditClassDetails.BufferPoolAccounts';
import {
  CREDIT_CLASS_DETAILS_ADDITIONAL_INFO_CLASS_ID_TOOLTIP,
  CREDIT_CLASS_DETAILS_ADDITIONAL_INFO_HELPER_TEXT,
} from './CreditClassDetails.constants';

interface AdditionalInfoProps<T extends CreditClassMetadataLD> {
  classId?: string;
  metadata?: T;
}

const AdditionalInfo = <T extends CreditClassMetadataLD>({
  classId,
  metadata,
}: AdditionalInfoProps<T>): JSX.Element | null => {
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

  const unknownFields = metadata ? getClassUnknownFields(metadata) : [];

  return (
    <Box
      sx={{
        p: 8,
        backgroundColor: 'primary.main',
        border: '1px solid',
        borderColor: 'info.light',
        borderRadius: '0 0 8px 8px',
      }}
    >
      <Body size="lg">{CREDIT_CLASS_DETAILS_ADDITIONAL_INFO_HELPER_TEXT}</Body>
      <Box sx={{ pt: 7 }}>
        <Grid container spacing={8}>
          <Grid item xs={12} sm={6} sx={{ flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Label size="xs" sx={{ mr: 1 }}>
                class id
              </Label>
              <InfoTooltipWithIcon
                title={CREDIT_CLASS_DETAILS_ADDITIONAL_INFO_CLASS_ID_TOOLTIP}
                outlined
              />
            </Box>
            <Body size="xl">{classId}</Body>
          </Grid>
          <MetaDetail label="registry" value={sourceRegistry} />
          <MetaDetail
            label="carbon offset standard"
            value={carbonOffsetStandard}
          />
          <ApprovedMethodologiesList
            methodologyList={metadata?.['regen:approvedMethodologies']}
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
              rdfType={getFieldType(fieldName, metadata?.['@context'])}
            />
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export { AdditionalInfo };
