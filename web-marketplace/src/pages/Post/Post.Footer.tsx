import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';
import ArrowDownIcon from 'web-components/src/components/icons/ArrowDownIcon';
import Section from 'web-components/src/components/section';

import { NEXT, PREV } from './Post.constants';

export const PostFooter = () => {
  // TODO add button features (APP-23)
  return (
    <Section className="flex justify-between sm:px-0 pb-[100px] py-0 max-w-[750px] m-auto">
      <OutlinedButton className="text-sm">
        <ArrowDownIcon className="w-[24px] h-[24px] mr-10" direction="prev" />
        {PREV}
      </OutlinedButton>
      <OutlinedButton className="text-sm">
        {NEXT}
        <ArrowDownIcon className="w-[24px] h-[24px] ml-10" direction="next" />
      </OutlinedButton>
    </Section>
  );
};
