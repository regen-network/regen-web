import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Box, ButtonBase } from '@mui/material';

import {
  BlockContent,
  SanityBlockContent,
} from 'web-components/src/components/block-content';
import SmallArrowIcon from 'web-components/src/components/icons/SmallArrowIcon';
import { LinkType } from 'web-components/src/types/shared/linkType';

type Props = {
  learnMoreLink: LinkType;
  description: SanityBlockContent;
  complianceCredits?: JSX.Element;
};

const ComplianceInfo = ({
  learnMoreLink,
  description,
  complianceCredits,
}: Props) => {
  const { _ } = useLingui();

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
            src="/svg/tebu-badge.svg"
            alt={_(msg`Tebu badge`)}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[20px] mt-4 justify-items-center sm:justify-items-start"></div>
      </div>
    </Box>
  );
};

export default ComplianceInfo;
