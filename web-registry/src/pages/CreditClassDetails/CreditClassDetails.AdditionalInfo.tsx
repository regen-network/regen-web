import { Box } from '@mui/material';
import { ClassInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { startCase } from 'lodash';

import SmallArrowIcon from 'web-components/lib/components/icons/SmallArrowIcon';
import { Body, Title } from 'web-components/lib/components/typography';

import { CreditClassMetadataLD } from 'generated/json-ld';

import { Link } from 'components/atoms';
import { LineItemLabelAbove } from 'components/molecules';

import { ApprovedMethodologiesList } from './CreditClassDetails.ApprovedMethodologies';

interface AdditionalInfoProps {
  onChainClass: ClassInfo;
  metadata?: CreditClassMetadataLD;
}

const AdditionalInfo: React.FC<AdditionalInfoProps> = ({
  onChainClass,
  metadata,
}) => {
  const offsetGenerationMethods = metadata?.['regen:offsetGenerationMethod'];
  const sectoralScopes = metadata?.['regen:sectoralScope'];
  const verificationMethod = metadata?.['regen:verificationMethod'];
  const sourceRegistry = metadata?.['regen:sourceRegistry'];

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
    <Box sx={{ pt: 8 }}>
      <Title variant="h5">Additional Info</Title>
      <LineItemLabelAbove
        label="credit type"
        data={
          <Body size="xl" sx={{ mr: 1 }}>
            {getCreditType(onChainClass.creditTypeAbbrev)}
          </Body>
        }
      />
      {sourceRegistry?.['schema:name'] && (
        <LineItemLabelAbove
          label="registry"
          data={
            <Link
              href={sourceRegistry?.['schema:url']?.['@value']}
              target="_blank"
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Body size="xl" sx={{ mr: 1 }}>
                  {sourceRegistry?.['schema:name']}
                </Body>
                <SmallArrowIcon sx={{ mt: '-2px', fontSize: 16 }} />
              </Box>
            </Link>
          }
        />
      )}
      <ApprovedMethodologiesList
        methodologyList={metadata?.['regen:approvedMethodologies']}
      />
      {offsetGenerationMethods && offsetGenerationMethods?.length > 0 && (
        <LineItemLabelAbove
          label={`offset generation method${
            offsetGenerationMethods.length > 1 ? 's' : ''
          }`}
          data={
            <>
              {offsetGenerationMethods.map((method: any, i: number) => (
                <Body key={i} size="xl">
                  {startCase(method)}
                </Body>
              ))}
            </>
          }
        />
      )}
      {verificationMethod && (
        <LineItemLabelAbove
          label="verification method"
          data={<Body size="xl">{startCase(verificationMethod)}</Body>}
        />
      )}
      {sectoralScopes && sectoralScopes?.length > 0 && (
        <LineItemLabelAbove
          label={`sectoral scope${sectoralScopes.length > 1 ? 's' : ''}`}
          data={
            <>
              {sectoralScopes.map((sector: string, i: number) => (
                <Body key={i} size="xl">
                  {sector}
                </Body>
              ))}
            </>
          }
        />
      )}
    </Box>
  );
};

export { AdditionalInfo };
