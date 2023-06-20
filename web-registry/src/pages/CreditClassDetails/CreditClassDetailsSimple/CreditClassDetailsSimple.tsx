import React from 'react';
import Box from '@mui/material/Box';
import { ClassInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import ReadMore from 'web-components/lib/components/read-more';
import { Label, Title } from 'web-components/lib/components/typography';

import { CreditClassByOnChainIdQuery } from 'generated/graphql';
import { CreditClass } from 'generated/sanity-graphql';
import { getAccountUrl } from 'lib/block-explorer';
import { CreditClassMetadataLD } from 'lib/db/types/json-ld';
import { getSanityImgSrc } from 'lib/imgSrc';
import { useWallet } from 'lib/wallet/wallet';

import { AccountLink } from 'components/atoms/AccountLink';
import { EcocreditsSection } from 'components/molecules';
import { CreditBatches } from 'components/organisms';

import { AdditionalInfo } from '../CreditClassDetails.AdditionalInfo';
import { MemoizedProjects as Projects } from '../CreditClassDetails.Projects';
import { SideBarBox } from '../CreditClassDetails.SidebarBox';
import { useCreditClassDetailsSimpleStyles } from './CreditClassDetailsSimple.styles';
import { getCreditClassDisplayName } from './CreditClassDetailsSimple.utils';

interface CreditDetailsProps {
  dbClass?: CreditClassByOnChainIdQuery['creditClassByOnChainId'];
  onChainClass: ClassInfo;
  content?: CreditClass;
  issuers?: string[];
  metadata?: Partial<CreditClassMetadataLD>;
}

const CreditClassDetailsSimple: React.FC<
  React.PropsWithChildren<CreditDetailsProps>
> = ({ dbClass, onChainClass, content, issuers, metadata }) => {
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
            <SideBarBox>
              <div className={styles.sidebarItemMargin}>
                <Label size="xs" color="primary.contrastText" mb={3}>
                  admin
                </Label>
                <AccountLink
                  className={styles.link}
                  address={onChainClass.admin}
                />
              </div>
              <div className={styles.sidebarItemMargin}>
                <Label size="xs" color="primary.contrastText" mb={3}>
                  issuers
                </Label>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  {issuers?.map((issuer: string) => (
                    <AccountLink
                      key={issuer}
                      address={issuer}
                      className={styles.link}
                      href={getAccountUrl(issuer)}
                    />
                  ))}
                </Box>
              </div>
            </SideBarBox>
          </Box>
        </Box>
      </EcocreditsSection>
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
