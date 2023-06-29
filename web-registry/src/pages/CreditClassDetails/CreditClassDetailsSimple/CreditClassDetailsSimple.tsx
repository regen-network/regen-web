import React from 'react';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import { ClassInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import ProjectImpactCard, {
  ProjectImpactCardProps,
} from 'web-components/lib/components/cards/ProjectImpactCard/ProjectImpactCard';
import { CollapseList } from 'web-components/lib/components/organisms/CollapseList/CollapseList';
import ReadMore from 'web-components/lib/components/read-more';
import Section from 'web-components/lib/components/section';
import { Label, Title } from 'web-components/lib/components/typography';
import UserInfo, { Party } from 'web-components/lib/components/user/UserInfo';
import UserInfoWithTitle from 'web-components/lib/components/user/UserInfoWithTitle';
import { defaultFontFamily } from 'web-components/lib/theme/muiTheme';

import { CreditClassByOnChainIdQuery } from 'generated/graphql';
import { CreditClass } from 'generated/sanity-graphql';
import { CreditClassMetadataLD } from 'lib/db/types/json-ld';
import { getSanityImgSrc } from 'lib/imgSrc';
import { useWallet } from 'lib/wallet/wallet';

import { EcocreditsSection } from 'components/molecules';
import { CreditBatches } from 'components/organisms';

import { AdditionalInfo } from '../CreditClassDetails.AdditionalInfo';
import { SEE_MORE_ADDITIONAL_TEXT } from '../CreditClassDetails.constants';
import { MemoizedProjects as Projects } from '../CreditClassDetails.Projects';
import { useCreditClassDetailsSimpleStyles } from './CreditClassDetailsSimple.styles';
import { getCreditClassDisplayName } from './CreditClassDetailsSimple.utils';

interface CreditDetailsProps {
  dbClass?: CreditClassByOnChainIdQuery['creditClassByOnChainId'];
  onChainClass: ClassInfo;
  content?: CreditClass;
  admin?: Party;
  issuers?: Party[];
  metadata?: Partial<CreditClassMetadataLD>;
  impactCards: ProjectImpactCardProps[];
}

const CreditClassDetailsSimple: React.FC<
  React.PropsWithChildren<CreditDetailsProps>
> = ({ impactCards, onChainClass, content, admin, issuers, metadata }) => {
  const { classes: styles, cx } = useCreditClassDetailsSimpleStyles();
  const displayName = getCreditClassDisplayName(onChainClass.id, metadata);
  const image = content?.image;
  const imageSrc = metadata?.['schema:image'] || getSanityImgSrc(image);

  const { isKeplrMobileWeb } = useWallet();

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
            <AdditionalInfo onChainClass={onChainClass} metadata={metadata} />
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
      <div
        className={cx('topo-background-alternate', isKeplrMobileWeb && 'dark')}
      >
        <Section sx={{ root: { pb: [20, 21.25] } }}>
          <Grid container>
            {admin && (
              <Grid item xs={12} sm={6} sx={{ mb: { xs: 8.25, sm: 0 } }}>
                <UserInfoWithTitle
                  user={admin}
                  title="admin"
                  tooltip={
                    <>
                      <b>Credit class admin</b>: the entity who can update a
                      given credit class.
                    </>
                  }
                  fontFamily={defaultFontFamily}
                />
              </Grid>
            )}
            {issuers && issuers?.length > 0 && (
              <Grid item xs={12} sm={6}>
                <UserInfoWithTitle
                  user={issuers[0]}
                  title="issuers"
                  tooltip={
                    <>
                      <b>Credit class issuer</b>: the entity who can issue
                      credit batches under the given credit class.
                    </>
                  }
                  fontFamily={defaultFontFamily}
                  sx={{ mb: 2 }}
                />
                <CollapseList
                  max={2}
                  items={issuers.slice(1, issuers.length).map(issuer => (
                    <UserInfo
                      user={issuer}
                      key={issuer.name}
                      fontFamily={defaultFontFamily}
                      sx={{ mb: 2 }}
                    />
                  ))}
                  buttonAdditionalText={SEE_MORE_ADDITIONAL_TEXT}
                />
              </Grid>
            )}
          </Grid>
        </Section>
      </div>

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
