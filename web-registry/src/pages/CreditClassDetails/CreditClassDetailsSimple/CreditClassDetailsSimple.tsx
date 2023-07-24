import React from 'react';
import Box from '@mui/material/Box';
import { ClassInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { useQuery } from '@tanstack/react-query';

import { CardRibbon } from 'web-components/lib/components/atoms/CardRibbon/CardRibbon';
import { CreditClassCardItem } from 'web-components/lib/components/cards/CreditClassCard/CreditClassCard.Item';
import { ProjectImpactCardProps } from 'web-components/lib/components/cards/ProjectImpactCard/ProjectImpactCard';
import { ImpactTags } from 'web-components/lib/components/organisms/ImpactTags/ImpactTags';
import ReadMore from 'web-components/lib/components/read-more';
import InfoTooltipWithIcon from 'web-components/lib/components/tooltip/InfoTooltipWithIcon';
import { Label, Title } from 'web-components/lib/components/typography';
import { Party } from 'web-components/lib/components/user/UserInfo';

import { CreditClassByOnChainIdQuery } from 'generated/graphql';
import { CreditClass } from 'generated/sanity-graphql';
import { CreditClassMetadataLD } from 'lib/db/types/json-ld';
import { getSanityImgSrc } from 'lib/imgSrc';
import { getAllCreditClassPageQuery } from 'lib/queries/react-query/sanity/getAllCreditClassPageQuery/getAllCreditClassPageQuery';
import { useWallet } from 'lib/wallet/wallet';

import { OFFSET_GENERATION_METHOD } from 'pages/Buyers/Buyers.constants';
import { EcocreditsSection } from 'components/molecules';
import { CreditBatches } from 'components/organisms';
import { DetailsSection } from 'components/organisms/DetailsSection/DetailsSection';
import { parseMethodologies } from 'components/organisms/ProjectTopSection/ProjectTopSection.utils';
import { useTags } from 'hooks/useTags';

import { client as sanityClient } from '../../../lib/clients/sanity';
import { AdditionalInfo } from '../CreditClassDetails.AdditionalInfo';
import { MemoizedProjects as Projects } from '../CreditClassDetails.Projects';
import {
  CREDIT_CLASS_TOOLTIP,
  ELIGIBLE_ACTIVITIES,
} from './CreditClassDetailsSimple.constants';
import { CreditClassDetailsStakeholders } from './CreditClassDetailsSimple.Stakeholders';
import { useCreditClassDetailsSimpleStyles } from './CreditClassDetailsSimple.styles';
import { getCreditClassDisplayName } from './CreditClassDetailsSimple.utils';
import { useCreditClassDetails } from './hooks/useCreditClassDetails';

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
  const { creditTypeData, creditTypeSanity, generationMethods } =
    useCreditClassDetails({ onChainClass, metadata });

  const activities =
    metadata?.['regen:projectActivities'] ||
    metadata?.['regen:eligibleActivities'];
  const ecosystemTypes = metadata?.['regen:ecosystemType'];

  const { activityTags, ecosystemTags } = useTags({
    activities,
    ecosystemTypes,
  });

  const { data: sanityCreditClassPageData } = useQuery(
    getAllCreditClassPageQuery({ sanityClient, enabled: !!sanityClient }),
  );
  const sanityCreditClassPage =
    sanityCreditClassPageData?.allCreditClassPage?.[0];

  const methodology = parseMethodologies({
    methodologies: metadata?.['regen:approvedMethodologies'],
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
                    position: 'relative',
                    mb: { sm: 12.5 },
                    mx: { xs: -4, sm: 0 },
                  }}
                >
                  <CardRibbon
                    icon={{ src: creditTypeSanity?.image?.asset?.url ?? '' }}
                    label={creditTypeSanity?.name ?? ''}
                    labelSize="xs"
                    labelMobileSize="xxs"
                    sx={{
                      position: 'absolute',
                      left: 0,
                      top: 30,
                      zIndex: 1,
                      py: { xs: 1, sm: 1.5 },
                    }}
                    sxIcon={{ with: 20, height: 20 }}
                  />
                  <img
                    className={styles.image}
                    alt={image?.imageAlt || imageSrc || displayName}
                    src={imageSrc}
                  />
                </Box>
              )}
              <Label
                size="sm"
                color="info.dark"
                mb={4}
                mt={{ xs: 9, sm: 0 }}
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                credit class{' '}
                <InfoTooltipWithIcon
                  title={
                    <p>
                      <Box component="span" sx={{ fontWeight: 700 }}>
                        Credit class:
                      </Box>
                      {` ${CREDIT_CLASS_TOOLTIP}`}
                    </p>
                  }
                  outlined
                  sx={{ ml: 1 }}
                />
              </Label>
              <Title variant="h1">{displayName}</Title>
              {generationMethods && (
                <CreditClassCardItem
                  items={generationMethods}
                  label={OFFSET_GENERATION_METHOD}
                  sx={{ my: 5 }}
                  sxListContainer={{
                    flexDirection: 'column',
                    alignItems: 'start',
                  }}
                  sxListItem={{
                    mb: 1,
                  }}
                />
              )}
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
      <DetailsSection
        header={sanityCreditClassPage?.creditClassDetailsSection}
        credibilityCards={content?.credibilityCards}
        methodology={methodology}
        credit={{
          creditImage: sanityCreditClassPage?.creditImage?.asset?.url,
          creditTypeUnit: creditTypeData?.creditType?.unit,
          creditTypeImage: creditTypeSanity?.largeImage?.asset?.url,
        }}
      >
        <CreditClassDetailsStakeholders
          admin={admin}
          issuers={issuers}
          program={program}
        />
      </DetailsSection>

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
