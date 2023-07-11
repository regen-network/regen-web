import React from 'react';
import Box from '@mui/material/Box';
import { ClassInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { useQuery } from '@tanstack/react-query';

import { ProjectImpactCardProps } from 'web-components/lib/components/cards/ProjectImpactCard/ProjectImpactCard';
import { ImpactTags } from 'web-components/lib/components/organisms/ImpactTags/ImpactTags';
import ReadMore from 'web-components/lib/components/read-more';
import { Label, Title } from 'web-components/lib/components/typography';
import { Party } from 'web-components/lib/components/user/UserInfo';

import { CreditClassByOnChainIdQuery } from 'generated/graphql';
import { CreditClass } from 'generated/sanity-graphql';
import { useLedger } from 'ledger';
import { CreditClassMetadataLD } from 'lib/db/types/json-ld';
import { getSanityImgSrc } from 'lib/imgSrc';
import { getCreditTypeQuery } from 'lib/queries/react-query/ecocredit/getCreditTypeQuery/getCreditTypeQuery';
import { useWallet } from 'lib/wallet/wallet';

import { EcocreditsSection } from 'components/molecules';
import { CreditBatches } from 'components/organisms';
import { useTags } from 'hooks/useTags';

import { AdditionalInfo } from '../CreditClassDetails.AdditionalInfo';
import { MemoizedProjects as Projects } from '../CreditClassDetails.Projects';
import { ELIGIBLE_ACTIVITIES } from './CreditClassDetailsSimple.constants';
import { CreditClassDetailsStakeholders } from './CreditClassDetailsSimple.Stakeholders';
import { useCreditClassDetailsSimpleStyles } from './CreditClassDetailsSimple.styles';
import { getCreditClassDisplayName } from './CreditClassDetailsSimple.utils';

interface CreditDetailsProps {
  dbClass?: CreditClassByOnChainIdQuery['creditClassByOnChainId'];
  onChainClass: ClassInfo;
  content?: CreditClass;
  program?: Party;
  admin?: Party;
  issuers?: Party[];
  metadata?: CreditClassMetadataLD;
  impactCards: ProjectImpactCardProps[];
}

const CreditClassDetailsSimple: React.FC<
  React.PropsWithChildren<CreditDetailsProps>
> = ({
  impactCards,
  onChainClass,
  content,
  program,
  admin,
  issuers,
  metadata,
}) => {
  const { classes: styles, cx } = useCreditClassDetailsSimpleStyles();

  const displayName = getCreditClassDisplayName(onChainClass.id, metadata);
  const image = content?.image;
  const imageSrc = metadata?.['schema:image'] || getSanityImgSrc(image);

  const { isKeplrMobileWeb } = useWallet();
  const { ecocreditClient } = useLedger();
  const { data: creditTypeData } = useQuery(
    getCreditTypeQuery({
      client: ecocreditClient,
      request: {
        abbreviation: onChainClass.creditTypeAbbrev,
      },
      enabled: !!ecocreditClient && !!onChainClass.creditTypeAbbrev,
    }),
  );

  const activities =
    metadata?.['regen:projectActivities'] ||
    metadata?.['regen:eligibleActivities'];
  const ecosystemTypes = metadata?.['regen:ecosystemType'];

  const { activityTags, ecosystemTags } = useTags({
    activities,
    ecosystemTypes,
  });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'primary.main',
      }}
    >
      <EcocreditsSection classes={{ root: styles.topSection }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              mr: { xs: 0, md: 12 },
              flex: 1,
            }}
          >
            <Box sx={{ mb: 6 }}>
              {imageSrc && (
                <Box
                  sx={{
                    mb: { sm: 12.5 },
                    mx: { xs: -4, sm: 0 },
                  }}
                >
                  <img
                    className={styles.image}
                    alt={image?.imageAlt || imageSrc || displayName}
                    src={imageSrc}
                  />
                </Box>
              )}
              <Label size="sm" color="info.dark" mb={4} mt={{ xs: 9, sm: 0 }}>
                credit class
              </Label>
              <Title variant="h1">{displayName}</Title>
            </Box>
            {metadata?.['schema:description'] && (
              <ReadMore
                classes={{
                  root: styles.marginBottom,
                  textContainer: styles.textContainer,
                  description: styles.description,
                }}
              >
                {metadata?.['schema:description']}
              </ReadMore>
            )}
            <AdditionalInfo
              metadata={metadata}
              creditTypeName={creditTypeData?.creditType?.name}
            />
          </Box>
          <ImpactTags
            impact={impactCards}
            activities={activityTags}
            ecosystems={ecosystemTags}
            activitiesLabel={ELIGIBLE_ACTIVITIES}
          />
        </Box>
      </EcocreditsSection>

      <CreditClassDetailsStakeholders
        admin={admin}
        issuers={issuers}
        program={program}
      />

      <Projects classId={onChainClass.id} />
      <div
        className={cx('topo-background-alternate', isKeplrMobileWeb && 'dark')}
      >
        <CreditBatches
          creditClassId={onChainClass.id}
          titleAlign="left"
          withSection
        />
      </div>
    </Box>
  );
};

export { CreditClassDetailsSimple };
