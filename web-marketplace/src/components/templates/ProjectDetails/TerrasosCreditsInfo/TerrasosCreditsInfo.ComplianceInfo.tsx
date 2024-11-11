import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Box, ButtonBase, Grid } from '@mui/material';

import {
  BlockContent,
  SanityBlockContent,
} from 'web-components/src/components/block-content';
import SmallArrowIcon from 'web-components/src/components/icons/SmallArrowIcon';
import { LinkType } from 'web-components/src/types/shared/linkType';

import { ProjectMetadataLD, ProjectPageMetadataLD } from 'lib/db/types/json-ld';
import {
  getFieldLabel,
  getFieldType,
  getProjectUnknownFields,
} from 'lib/rdf/rdf.unknown-fields';

import { MetaDetail } from 'components/molecules';

import ComplianceMarketIcon from 'assets/svgs/checkmarkList.svg';

type Props = {
  learnMoreLink: LinkType;
  description: SanityBlockContent;
  complianceCredits?: JSX.Element;
  projectPageMetadata?: ProjectPageMetadataLD;
  projectMetadata?: ProjectMetadataLD;
};

const ComplianceInfo = ({
  learnMoreLink,
  description,
  complianceCredits,
  projectMetadata,
}: Props) => {
  const { _ } = useLingui();
  const unknownFields = projectMetadata
    ? getProjectUnknownFields(projectMetadata)
    : [];

  return (
    <Box
      sx={{
        px: '30px',
        pb: '30px',
        pt: '10px',
        backgroundColor: 'primary.main',
        border: '1px solid',
        borderColor: 'info.light',
        borderRadius: '0 0 8px 8px',
      }}
    >
      {!!complianceCredits && complianceCredits}
      <div>
        <div className="font-montserrat text-[32px] font-bold gap-[10px] flex items-center">
          {_(msg`Compliance info`)}
          <img
            src={ComplianceMarketIcon}
            alt={_(msg`Checkmark list`)}
            className="h-[50px] w-[50px]"
          />
        </div>
        <div className="my-[10px]">
          <BlockContent content={description} />
        </div>
        <ButtonBase
          href={learnMoreLink.href}
          target="_blank"
          className="cursor-pointer font-montserrat text-sc-text-link font-extrabold text-[14px] tracking-[1px] uppercase mb-[30px]"
        >
          {learnMoreLink.text}
          <SmallArrowIcon sx={{ width: '7px', ml: '4px' }} />
        </ButtonBase>
        <Grid container spacing={8}>
          {unknownFields.map(([fieldName, value]) => (
            <MetaDetail
              key={fieldName}
              label={getFieldLabel(fieldName)}
              value={value}
              rdfType={getFieldType(fieldName, projectMetadata?.['@context'])}
            />
          ))}
        </Grid>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[20px] mt-4 justify-items-center sm:justify-items-start"></div>
      </div>
    </Box>
  );
};

export default ComplianceInfo;
