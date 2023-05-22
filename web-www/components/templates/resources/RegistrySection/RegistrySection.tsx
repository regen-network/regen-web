import React from 'react';
import Box from '@mui/material/Box';

import ResourceCardsSlider from 'web-components/lib/components/sliders/ResourceCards';
import { DocumentationTable } from 'web-components/lib/components/table/DocumentationTable/DocumentationTable';
import { Label, Title } from 'web-components/lib/components/typography';

import { registrySxs, useRegistryStyles } from './RegistrySection.styles';

import BackgroundSection from '@/components/organisms/BackgroundSection/BackgroundSection';
import {
  Doc,
  Resource,
  ResourcesRegistrySectionFieldsFragment,
} from '@/generated/sanity-graphql';
import {
  sanityDocsToDocuments,
  sanityResourcesToCardProps,
} from '@/lib/utils/sanity/sanity-transforms';
import imageGridBg from '@/public/images/resources/image-grid-bg.jpg';

type Props = {
  registrySectionData?: ResourcesRegistrySectionFieldsFragment['registrySection'];
};

const RegistrySection = ({ registrySectionData }: Props): JSX.Element => {
  const { classes: styles } = useRegistryStyles();

  return (
    <BackgroundSection
      className={styles.section}
      linearGradient="unset"
      imageSrc={imageGridBg}
      topSection={false}
    >
      <Title variant="h3" align="left" sx={{ mb: [6.75, 8.5] }}>
        {registrySectionData?.header}
      </Title>
      {registrySectionData?.subsections?.map((sub, i) => (
        <React.Fragment key={i}>
          <Label sx={registrySxs.btn}>{sub?.title}</Label>
          <ResourceCardsSlider
            items={sanityResourcesToCardProps(sub?.cards as Resource[])}
          />
        </React.Fragment>
      ))}
      <Label sx={registrySxs.btn}>
        {registrySectionData?.documentTableTitle}
      </Label>
      <Box className={styles.table}>
        <DocumentationTable
          canClickRow
          rows={sanityDocsToDocuments(registrySectionData?.documents as Doc[])}
        />
      </Box>
    </BackgroundSection>
  );
};

export default RegistrySection;
