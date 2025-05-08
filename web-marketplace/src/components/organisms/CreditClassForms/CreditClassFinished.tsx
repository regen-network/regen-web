import { Trans } from "@lingui/react/macro";
import { msg } from "@lingui/core/macro";
import { useLingui } from '@lingui/react';
import { Link, SxProps } from '@mui/material';
import { truncate } from 'lodash';

import { Flex } from 'web-components/src/components/box';
import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';
import OnBoardingCard from 'web-components/src/components/cards/OnBoardingCard';
import { LabeledDetail } from 'web-components/src/components/text-layouts';
import { Body, Title } from 'web-components/src/components/typography';

import { getHashUrl } from 'lib/block-explorer';

const sxs = {
  label: { color: 'black' } as SxProps,
};

export const CreditClassFinished = (props: {
  classId: string;
  hash: string;
}): JSX.Element => {
  const { _ } = useLingui();
  const { classId, hash } = props;
  return (
    <Flex col>
      <OnBoardingCard>
        <Title variant="h5">
          <Trans>Create Credit Class</Trans>
        </Title>
        <Flex col sx={{ mt: 6, gap: 6 }}>
          <LabeledDetail label={_(msg`Credit Class ID`)} sxLabel={sxs.label}>
            <Body size="lg">{classId}</Body>
          </LabeledDetail>
          <LabeledDetail label={_(msg`Hash`)} sxLabel={sxs.label}>
            <Body size="lg">
              <Link href={getHashUrl(hash)} target="_blank">
                {truncate(hash, { length: 13 })}
              </Link>
            </Body>
          </LabeledDetail>
        </Flex>
      </OnBoardingCard>
      <OutlinedButton
        sx={{ alignSelf: 'center' }}
        component={Link}
        href={`/credit-classes/${classId}`}
      >
        <Trans>see credit class page</Trans>
      </OutlinedButton>
    </Flex>
  );
};
