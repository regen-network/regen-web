import { ComponentType, useEffect, useState } from 'react';
import { Option } from 'web-components/src/components/inputs/new/CustomSelect/CustomSelect.types';
import { CryptoCurrencies } from 'web-marketplace/src/components/molecules/DenomIconWithCurrency/DenomIconWithCurrency.constants';

import { SelectOption } from './CustomSelect.Option';
import { Placeholder } from './CustomSelect.Placeholder';

const CustomSelect = ({
  options,
  onSelect,
  defaultOption,
  selectAriaLabel,
  placeholderAriaLabel,
}: {
  options: Option[];
  onSelect: (currency: CryptoCurrencies | string) => void;
  defaultOption: string;
  selectAriaLabel: string;
  placeholderAriaLabel: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>(defaultOption);
  const [OptionComponent, setOptionComponent] = useState<ComponentType>(
    () => options[0].component?.element as ComponentType,
  );

  const handleSelect = (option: CryptoCurrencies | string) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const option =
      options.find(opt => opt.value === selectedOption) ||
      options.find(opt => opt.component?.label === selectedOption);
    if (option && 'component' in option) {
      const NextOption = option?.component?.element as ComponentType;
      setOptionComponent(() => NextOption);
    }
  }, [options, selectedOption, setOptionComponent]);

  return (
    <div className="relative items-center inline-block p-10 pt-15 custom-select">
      <Placeholder
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        options={options}
        selectedOption={selectedOption}
        OptionComponent={OptionComponent}
        ariaLabel={placeholderAriaLabel}
      />
      {isOpen && (
        <div
          className="w-auto absolute top-50 left-0 mt-2 shadow-lg bg-grey-0 ring-1 ring-grey-200 p-15 pb-10 pt-5 flex flex-col items-start"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          {options
            .filter(
              option =>
                option.component?.label !== selectedOption &&
                option.label !== selectedOption,
            )
            .map((option, i) => {
              return (
                <SelectOption
                  key={`${option}-${i}`}
                  option={option}
                  ariaLabel={selectAriaLabel}
                  handleSelect={handleSelect}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
