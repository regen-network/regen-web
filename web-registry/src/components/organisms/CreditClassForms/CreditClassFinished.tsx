import { ReactNode } from 'react';
import { truncate } from 'lodash';
import { FlexCol } from 'web-components/lib/components/box';
import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import { LabeledDetail } from 'web-components/lib/components/text-layouts';
import { Body, Title } from 'web-components/lib/components/typography';

import { getHashUrl } from 'lib/block-explorer';
import { Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const CreditClassFinished = (props: {
  classId: string;
  hash: string;
}): JSX.Element => {
  const { classId, hash } = props;
  const navigate = useNavigate();
  return (
    <FlexCol>
      <OnBoardingCard>
        <Title variant="h5">Create Credit Class</Title>
        <FlexCol sx={{ mt: 6, gap: 6 }}>
          <Item label="Credit Class ID">
            <Body size="lg">{classId}</Body>
          </Item>
          <Item label="Hash">
            <Body size="lg">
              <Link href={getHashUrl(hash)} target="_blank">
                {truncate(hash, { length: 13 })}
              </Link>
            </Body>
          </Item>
        </FlexCol>
      </OnBoardingCard>
      <OutlinedButton
        sx={{ alignSelf: 'center' }}
        role="link"
        onClick={() => navigate(`/credit-classes/${classId}`)}
      >
        see credit class page
      </OutlinedButton>
    </FlexCol>
  );
};

const Item = (props: { label: string; children: ReactNode }): JSX.Element => (
  <LabeledDetail
    label={props.label}
    sx={{ width: '100%' }}
    sxLabel={{ color: 'black' }}
  >
    {props.children}
  </LabeledDetail>
);
