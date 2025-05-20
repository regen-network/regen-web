import { useState } from 'react';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { Box, Grid } from '@mui/material';

import {
  BlockContent,
  SanityBlockContent,
} from 'web-components/src/components/block-content';
import { Flex } from 'web-components/src/components/box';
import { TextButton } from 'web-components/src/components/buttons/TextButton';
import SmallArrowIcon from 'web-components/src/components/icons/SmallArrowIcon';
import Modal from 'web-components/src/components/modal';
import { Body, Title } from 'web-components/src/components/typography';

import { CREDIT_UNIT_DEFINITION } from './DetailsSection.constants';

type Props = {
  src: string;
  label: string;
  learnMore?: SanityBlockContent | null;
};

export const DetailsSectionCredit = ({ src, label, learnMore }: Props) => {
  const { _ } = useLingui();
  const [open, setOpen] = useState(false);
  return (
    <>
      <Grid item width={{ xs: '100%', tablet: 163 }}>
        <Flex
          sx={{
            margin: 'auto',
            borderRadius: '50%',
            background:
              'linear-gradient(219deg, #EEF1F3 0%, #F1F9F6 50%, #F9FBF8 100%)',
            width: { xs: 90, sm: 104 },
            height: { xs: 90, sm: 104 },
          }}
        >
          <Box
            sx={{ margin: 'auto', maxWidth: '100%' }}
            component="img"
            src={src}
          />
        </Flex>
        <Title variant="h6" align="center" pt={2.5}>
          {label}
        </Title>
        {learnMore && (
          <TextButton
            className="flex items-center text-[11px] mx-auto mt-[7px]"
            onClick={() => setOpen(true)}
          >
            <Trans>learn more</Trans>&nbsp;
            <SmallArrowIcon />
          </TextButton>
        )}
      </Grid>
      {learnMore && (
        <Modal open={open} onClose={() => setOpen(false)}>
          <Title variant="h4" align="center">
            {_(CREDIT_UNIT_DEFINITION)}
          </Title>
          <Body size="lg" className="pt-20">
            <BlockContent content={learnMore} />
          </Body>
        </Modal>
      )}
    </>
  );
};
