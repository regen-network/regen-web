import { CryptoCurrencies } from 'web-components/src/components/DenomIconWithCurrency/DenomIconWithCurrency.constants';
import { Option } from 'web-components/src/components/inputs/new/CustomSelect/CustomSelect.types';

type SelectOptionProps = {
  option: Option;
  handleSelect: (currency: CryptoCurrencies | string) => void;
};

export const SelectOption = ({ option, handleSelect }: SelectOptionProps) => {
  const handleClick = () => {
    if (option?.value && 'value' in option) {
      handleSelect(option.value);
    } else if (option?.component?.label) {
      handleSelect(option.component.label as CryptoCurrencies);
    }
  };

  return (
    <button
      aria-label="Select option"
      className="w-full py-5 px-5 text-sm border-t-grey-0 border-r-grey-0 border-l-grey-0 border-b-grey-0 border-solid items-end bg-grey-0 hover:border-b-brand-300"
      role="menuitem"
      onClick={handleClick}
    >
      {'value' in option ? option.label : <option.component.element />}
    </button>
  );
};
