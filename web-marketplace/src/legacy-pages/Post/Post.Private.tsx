import { useLingui } from '@lingui/react';

import { LockIcon } from 'web-components/src/components/icons/LockIcon';
import Section from 'web-components/src/components/section';
import { Body, Title } from 'web-components/src/components/typography';

import { PRIVATE_POST_BODY, PRIVATE_POST_TITLE } from './Post.constants';

export const PostPrivate = () => {
  const { _ } = useLingui();
  return (
    <Section className="m-auto max-w-[738px] py-[100px] text-center">
      <div className="m-auto h-[110px] w-[110px] flex items-center justify-center bg-grey-300 rounded-[50%]">
        <LockIcon className="text-grey-400 w-30 h-30" />
      </div>
      <Title className="py-20 sm:py-30" variant="h3">
        {_(PRIVATE_POST_TITLE)}
      </Title>
      <Body size="lg">{_(PRIVATE_POST_BODY)}</Body>
    </Section>
  );
};
