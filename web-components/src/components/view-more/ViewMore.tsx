import React, { useEffect, useState } from 'react';
import { TextButton } from 'web-components/src/components/buttons/TextButton';

interface ViewMoreProps {
  items: React.ReactNode[];
  viewLessText: string;
  viewMoreText: string;
  id?: number;
  isOpen?: boolean;
  handleToggle?: (id: number) => void;
}

/**
 * ViewMore component displays a list of items with an option to expand and view more items.
 *
 * Additionally, by passing the same `id` to multiple ViewMore components, they can be associated together and toggled as a group.
 * They can be controlled from the parent component by passing the optional props `id`, `isOpen` and `handleToggle`.
 */
export const ViewMore = ({
  items,
  id,
  isOpen,
  handleToggle,
  viewLessText: showLessText,
  viewMoreText: showMoreText,
}: ViewMoreProps) => {
  const [isExpanded, setIsExpanded] = useState(!!isOpen);

  const hiddenItemsCount = items.length - 1;
  const visibleItems = isExpanded ? items : items.slice(0, 1);

  const handleIsExpanded = (isExpanded: boolean) => {
    setIsExpanded(isExpanded);
    if (handleToggle && id !== undefined) {
      handleToggle(id);
    }
  };

  useEffect(() => {
    if (isOpen !== undefined) {
      setIsExpanded(isOpen);
    }
  }, [isOpen]);

  if (items.length === 0) return null;

  return (
    <div>
      <ul className="list-none p-0">
        {visibleItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      {hiddenItemsCount > 0 && (
        <TextButton
          onClick={() => handleIsExpanded(!isExpanded)}
          className="uppercase text-grey-400 hover:text-grey-300 text-[11px] font-lato border-l-0 border-r-0 border-t-0 border-b border-solid border-grey-400 hover:border-grey-300 leading-3"
        >
          {isExpanded
            ? `- ${showLessText}`
            : `+ ${hiddenItemsCount} ${showMoreText}`}
        </TextButton>
      )}
    </div>
  );
};
