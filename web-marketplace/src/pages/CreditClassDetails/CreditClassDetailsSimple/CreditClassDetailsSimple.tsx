import React from 'react';
import { Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import Box from '@mui/material/Box';
import { ClassInfo } from '@regen-network/api/regen/ecocredit/v1/query';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { getClassImageWithGreyDefault } from 'utils/image/classImage';

import { CardRibbon } from 'web-components/src/components/atoms/CardRibbon/CardRibbon';
import { CreditClassCardItem } from 'web-components/src/components/cards/CreditClassCard/CreditClassCard.Item';
import { ProjectImpactCardProps } from 'web-components/src/components/cards/ProjectImpactCard/ProjectImpactCard';
import { ImpactTags } from 'web-components/src/components/organisms/ImpactTags/ImpactTags';
import ReadMore from 'web-components/src/components/read-more';
import InfoTooltipWithIcon from 'web-components/src/components/tooltip/InfoTooltipWithIcon';
import { Label, Title } from 'web-components/src/components/typography';
import { Account } from 'web-components/src/components/user/UserInfo';

import { CreditClassByOnChainIdQuery } from 'generated/graphql';
import { CreditClass } from 'generated/sanity-graphql';
import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import {
  ECOSYSTEM_LABEL,
  LESS,
  MORE,
  READ,
  SEE_LESS,
  SEE_MORE,
} from 'lib/constants/shared.constants';
import { CreditClassMetadataLD } from 'lib/db/types/json-ld';
import { getAllCreditClassPageQuery } from 'lib/queries/react-query/sanity/getAllCreditClassPageQuery/getAllCreditClassPageQuery';
import { useWallet } from 'lib/wallet/wallet';

import { OFFSET_GENERATION_METHOD } from 'pages/Buyers/Buyers.constants';
import { EcocreditsSection } from 'components/molecules';
import { DetailsSection } from 'components/organisms/DetailsSection/DetailsSection';
import { parseMethodologies } from 'components/organisms/ProjectTopSection/ProjectTopSection.utils';
import { useFetchPaginatedBatches } from 'hooks/batches/useFetchPaginatedBatches';
import { useTags } from 'hooks/useTags';

import { client as sanityClient } from '../../../lib/clients/sanity';
import { MemoizedProjects as Projects } from '../CreditClassDetails.Projects';
import { CreditClassDetailsTableTabs } from '../tables/CreditClassDetails.TableTabs';
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
  program?: Account;
  admin?: Account;
  issuers?: Account[];
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
  const { _ } = useLingui();
  const { classes: styles, cx } = useCreditClassDetailsSimpleStyles();
  const [selectedLanguage] = useAtom(selectedLanguageAtom);

  const displayName = getCreditClassDisplayName(onChainClass.id, metadata);
  const image = content?.image;
  const imageSrc = getClassImageWithGreyDefault({
    metadata,
    sanityClass: content,
  });

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

  const { batchesWithSupply, setPaginationParams, paginationParams } =
    useFetchPaginatedBatches({ creditClassId: onChainClass.id });

  const { data: sanityCreditClassPageData } = useQuery(
    getAllCreditClassPageQuery({
      sanityClient,
      enabled: !!sanityClient,
      languageCode: selectedLanguage,
    }),
  );
  const sanityCreditClassPage =
    sanityCreditClassPageData?.allCreditClassPage?.[0];

  const methodology = parseMethodologies({
    methodologies: metadata?.['regen:approvedMethodologies'],
    _,
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
                    icon={{
                      src: creditTypeSanity?.category?.icon?.asset?.url ?? '',
                    }}
                    label={
                      (creditTypeSanity?.category?.name ||
                        creditTypeSanity?.name) ??
                      ''
                    }
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
                <Trans>
                  credit class{' '}
                  <InfoTooltipWithIcon
                    title={
                      <p>
                        <Box component="span" sx={{ fontWeight: 700 }}>
                          Credit class:
                        </Box>
                        {` ${_(CREDIT_CLASS_TOOLTIP)}`}
                      </p>
                    }
                    outlined
                    sx={{ ml: 1 }}
                  />
                </Trans>
              </Label>
              <Title variant="h1">{displayName}</Title>
              {generationMethods && (
                <CreditClassCardItem
                  items={generationMethods}
                  label={_(OFFSET_GENERATION_METHOD)}
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
                mobileSize="md"
                classes={{
                  root: styles.marginBottom,
                  textContainer: styles.textContainer,
                  description: styles.description,
                }}
                text={_(READ)}
                lessText={_(LESS)}
                moreText={_(MORE)}
              >
                {metadata?.['schema:description']}
              </ReadMore>
            )}
          </Box>
          <ImpactTags
            seeMoreText={_(SEE_MORE)}
            seeLessText={_(SEE_LESS)}
            impact={impactCards}
            activities={activityTags}
            ecosystems={ecosystemTags}
            activitiesLabel={_(ELIGIBLE_ACTIVITIES)}
            ecosystemLabel={_(ECOSYSTEM_LABEL)}
          />
        </Box>
      </EcocreditsSection>
      <CreditClassDetailsStakeholders
        admin={admin}
        issuers={issuers}
        program={program}
      />
      <DetailsSection
        header={sanityCreditClassPage?.creditClassDetailsSection}
        credibilityCards={content?.credibilityCards}
        methodology={methodology}
        credit={{
          creditImage: sanityCreditClassPage?.creditImage?.asset?.url,
          creditTypeUnit:
            creditTypeSanity?.unit || creditTypeData?.creditType?.unit,
          creditTypeImage:
            creditTypeSanity?.largeImage?.asset?.url ||
            creditTypeSanity?.category?.largeImage?.asset?.url,
          creditTypeUnitDefinition: creditTypeSanity?.unitDefinitionRaw,
        }}
      ></DetailsSection>

      <Projects classId={onChainClass.id} />
      <div
        className={cx('topo-background-alternate', isKeplrMobileWeb && 'dark')}
      >
        <CreditClassDetailsTableTabs
          creditClassMetadata={metadata}
          onChainCreditClassId={onChainClass.id}
          creditBatches={batchesWithSupply}
          initialPaginationParams={paginationParams}
          onTableChange={setPaginationParams}
          _={_}
        />
      </div>
    </Box>
  );
};

export { CreditClassDetailsSimple };
