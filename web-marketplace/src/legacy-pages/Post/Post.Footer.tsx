import { useNavigate } from 'react-router-dom';
import { useLingui } from '@lingui/react';

import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';
import ArrowDownIcon from 'web-components/src/components/icons/ArrowDownIcon';
import Section from 'web-components/src/components/section';

import { NEXT, PREV } from './Post.constants';

type Props = {
  prevIri?: string;
  nextIri?: string;
};
export const PostFooter = ({ prevIri, nextIri }: Props) => {
  const { _ } = useLingui();
  const navigate = useNavigate();
  return (
    <Section
      className={`flex ${
        prevIri ? 'justify-between' : 'justify-end'
      } sm:px-0 pb-[100px] py-0 max-w-[750px] m-auto`}
    >
      {prevIri && (
        <OutlinedButton
          className="text-sm"
          onClick={() => navigate(`/post/${prevIri}`)}
        >
          <ArrowDownIcon className="w-[24px] h-[24px] mr-10" direction="prev" />
          {_(PREV)}
        </OutlinedButton>
      )}
      {nextIri && (
        <OutlinedButton
          className="text-sm"
          onClick={() => navigate(`/post/${nextIri}`)}
        >
          {_(NEXT)}
          <ArrowDownIcon className="w-[24px] h-[24px] ml-10" direction="next" />
        </OutlinedButton>
      )}
    </Section>
  );
};
