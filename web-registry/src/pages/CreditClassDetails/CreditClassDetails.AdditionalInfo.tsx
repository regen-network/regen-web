import { Box, Grid } from '@mui/material';
import { ClassInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { startCase } from 'lodash';

import { Body } from 'web-components/lib/components/typography';

import { CreditClassMetadataLD } from 'lib/db/types/json-ld';

import { ArrowLink } from 'components/atoms/MetadataArrowLink';
import { MetaDetail } from 'components/molecules';

import { ApprovedMethodologiesList } from './CreditClassDetails.ApprovedMethodologies';

interface AdditionalInfoProps {
  onChainClass: ClassInfo;
  metadata?: Partial<CreditClassMetadataLD>;
}

const AdditionalInfo: React.FC<React.PropsWithChildren<AdditionalInfoProps>> =
  ({ onChainClass, metadata }) => {
    const offsetGenerationMethods = metadata?.['regen:offsetGenerationMethod'];
    const sectoralScopes = metadata?.['regen:sectoralScope'];
    const verificationMethod = metadata?.['regen:verificationMethod'];
    const sourceRegistry = metadata?.['regen:sourceRegistry'];
    const ecosystemTypes = metadata?.['regen:ecosystemType'];
    const projectActivities = metadata?.['regen:projectActivities'];
    const carbonOffsetStandard = metadata?.['regen:carbonOffsetStandard'];

    // This can be deleted if all class metadata is updated to latest standard
    const getValue = (val: any): string => {
      let value = val;
      if (val?.['@value']) value = val['@value'];
      return startCase(value);
    };

    const getCreditType = (creditTypeAbbrev: string): string => {
      // TODO: add credit types as they come online, or fetch from ledger somehow
      return (
        {
          // eslint-disable-next-line prettier/prettier
          C: 'Carbon',
        }[creditTypeAbbrev] || creditTypeAbbrev
      );
    };

    return (
      <Box sx={{ py: 8 }}>
        <Grid container spacing={8}>
          <MetaDetail
            label="credit type"
            data={
              <Body size="xl" sx={{ mr: 1 }}>
                {getCreditType(onChainClass.creditTypeAbbrev)}
              </Body>
            }
          />
          {sourceRegistry?.['schema:name'] && (
            <MetaDetail
              label="registry"
              data={
                <ArrowLink
                  label={sourceRegistry?.['schema:name']}
                  href={sourceRegistry?.['schema:url']?.['@value']}
                />
              }
            />
          )}
          {carbonOffsetStandard?.['schema:name'] && (
            <MetaDetail
              label="carbon offset standard"
              data={
                <ArrowLink
                  label={carbonOffsetStandard?.['schema:name']}
                  href={carbonOffsetStandard?.['schema:url']?.['@value']}
                />
              }
            />
          )}
          <ApprovedMethodologiesList
            methodologyList={metadata?.['regen:approvedMethodologies']}
          />
          {offsetGenerationMethods && offsetGenerationMethods?.length > 0 && (
            <MetaDetail
              label={`offset generation method${
                offsetGenerationMethods.length > 1 ? 's' : ''
              }`}
              data={
                <>
                  {offsetGenerationMethods.map((method: any, i: number) => (
                    <Body key={i} size="xl">
                      {getValue(method)}
                    </Body>
                  ))}
                </>
              }
            />
          )}
          {projectActivities && projectActivities?.length > 0 && (
            <MetaDetail
              label="project activities"
              data={
                <>
                  {projectActivities.map((projectActivity: any, i: number) => (
                    <Body key={i} size="xl">
                      {getValue(projectActivity)}
                    </Body>
                  ))}
                </>
              }
            />
          )}
          {sectoralScopes && sectoralScopes?.length > 0 && (
            <MetaDetail
              label={`sectoral scope${sectoralScopes.length > 1 ? 's' : ''}`}
              data={
                <>
                  {sectoralScopes.map((sector: any, i: number) => (
                    <Body key={i} size="xl">
                      {getValue(sector)}
                    </Body>
                  ))}
                </>
              }
            />
          )}
          {ecosystemTypes && ecosystemTypes?.length > 0 && (
            <MetaDetail
              label="ecosystem type"
              data={
                <>
                  {ecosystemTypes.map((ecosystemType: any, i: number) => (
                    <Body key={i} size="xl">
                      {getValue(ecosystemType)}
                    </Body>
                  ))}
                </>
              }
            />
          )}
          {verificationMethod && (
            <MetaDetail
              label="verification method"
              data={<Body size="xl">{getValue(verificationMethod)}</Body>}
            />
          )}
        </Grid>
      </Box>
    );
  };

export { AdditionalInfo };
