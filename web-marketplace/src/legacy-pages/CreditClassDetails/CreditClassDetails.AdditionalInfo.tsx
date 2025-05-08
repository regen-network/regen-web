import { Trans } from "@lingui/react/macro";
import { msg } from "@lingui/core/macro";
import { useLingui } from '@lingui/react';
import { Box, Grid } from '@mui/material';

import InfoTooltipWithIcon from 'web-components/src/components/tooltip/InfoTooltipWithIcon';
import { Body, Label } from 'web-components/src/components/typography';

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
  const { _ } = useLingui();
  if (!classId && !metadata) return null;

  const sectoralScopes = metadata?.['regen:sectoralScope'];
  const verificationMethod = metadata?.['regen:verificationMethod'];
  const sourceRegistry = metadata?.['regen:sourceRegistry'];
  const ecosystemTypes = metadata?.['regen:ecosystemType'];
  const projectActivities = metadata?.['regen:projectActivities'];
  const carbonOffsetStandard = metadata?.['regen:carbonOffsetStandard'];
  const tokenizationSource = metadata?.['regen:tokenizationSource'];
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
      {metadata && (
        <Body size="lg" sx={{ pb: 7 }}>
          {_(CREDIT_CLASS_DETAILS_ADDITIONAL_INFO_HELPER_TEXT)}
        </Body>
      )}
      <Grid container spacing={8}>
        <Grid item xs={12} sm={6} sx={{ flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Label size="xs" sx={{ mr: 1 }}>
              <Trans>class id</Trans>
            </Label>
            <InfoTooltipWithIcon
              title={_(CREDIT_CLASS_DETAILS_ADDITIONAL_INFO_CLASS_ID_TOOLTIP)}
              outlined
            />
          </Box>
          <Body size="xl">{classId}</Body>
        </Grid>
        <MetaDetail label="registry" value={sourceRegistry} />
        <MetaDetail
          label={_(msg`carbon offset standard`)}
          value={carbonOffsetStandard}
        />
        <ApprovedMethodologiesList
          methodologyList={metadata?.['regen:approvedMethodologies']}
        />
        <MetaDetail
          label={_(msg`project activities`)}
          value={projectActivities}
        />
        <MetaDetail label={_(msg`sectoral scopes`)} value={sectoralScopes} />
        <MetaDetail
          label={_(msg`Tokenization Source`)}
          value={tokenizationSource}
        />
        <MetaDetail label={_(msg`ecosystem type`)} value={ecosystemTypes} />
        <MetaDetail
          label={_(msg`verification method`)}
          value={verificationMethod}
        />
        <MetaDetail label={_(msg`measured GHGs`)} value={measuredGHGs} />
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
  );
};

export { AdditionalInfo };
