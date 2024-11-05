import React, { useState } from 'react';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import { TextButton } from 'web-components/src/components/buttons/TextButton';

interface SeeMoreProps {
  items: React.ReactNode[];
}

export const SeeMore: React.FC<SeeMoreProps> = ({ items }: SeeMoreProps) => {
  const { _ } = useLingui();

  const [isExpanded, setIsExpanded] = useState(false);

  const hiddenItemsCount = items.length - 1;
  const visibleItems = isExpanded ? items : items.slice(0, 1);

  const viewLessText = _(msg`view less`);
  const moreText = _(msg`more`);

  if (items.length === 0) return null;

  return (
    <div>
      <ul className="list-none">
        {visibleItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      {hiddenItemsCount > 0 && (
        <TextButton
          onClick={() => setIsExpanded(!isExpanded)}
          className="uppercase text-grey-400 hover:text-grey-300 text-[11px] font-lato border-l-0 border-r-0 border-t-0 border-b border-solid border-grey-400 hover:border-grey-300 leading-3"
        >
          {isExpanded
            ? `- ${viewLessText}`
            : `+ ${hiddenItemsCount} ${moreText}`}
        </TextButton>
      )}
    </div>
  );
};
