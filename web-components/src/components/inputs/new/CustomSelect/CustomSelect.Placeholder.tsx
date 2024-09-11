import { ComponentType } from 'react';
import BreadcrumbIcon from 'web-components/src/components/icons/BreadcrumbIcon';
import { Option } from 'web-components/src/components/inputs/new/CustomSelect/CustomSelect.types';

export function Placeholder({
  setIsOpen,
  isOpen,
  options,
  selectedOption,
  OptionComponent,
}: {
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  options: Option[];
  selectedOption: string;
  OptionComponent: ComponentType;
}) {
  return (
    <button
      aria-label="Select options"
      type="button"
      className="inline-flex justify-center w-full border-none px-4 py-2 bg-grey-0 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
      onClick={() => setIsOpen(!isOpen)}
    >
      {'value' in options[0] ? (
        options.find(opt => opt.value === selectedOption)?.label
      ) : (
        <OptionComponent />
      )}
      <BreadcrumbIcon className="mr-1 ml-10 mt-[7px] h-10 w-10" />
    </button>
  );
}
