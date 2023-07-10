import React from 'react';
import Box from '@mui/material/Box';
import { ClassInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { useQuery } from '@tanstack/react-query';

import ProjectImpactCard, {
  ProjectImpactCardProps,
} from 'web-components/lib/components/cards/ProjectImpactCard/ProjectImpactCard';
import { CollapseList } from 'web-components/lib/components/organisms/CollapseList/CollapseList';
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

import { AdditionalInfo } from '../CreditClassDetails.AdditionalInfo';
import { MemoizedProjects as Projects } from '../CreditClassDetails.Projects';
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
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <CollapseList
              sx={{ pb: [7.5, 10], maxWidth: 367 }}
              items={impactCards.map(card => (
                <Box key={card.name} sx={{ pb: [2.5, 4.25] }}>
                  <ProjectImpactCard {...card} />
                </Box>
              ))}
            />
          </Box>
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
