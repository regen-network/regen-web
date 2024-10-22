import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import useClickOutside from 'utils/hooks/useClickOutside';

import ArrowDownIcon from 'web-components/src/components/icons/ArrowDownIcon';
import CloseIcon from 'web-components/src/components/icons/CloseIcon';
import { cn } from 'web-components/src/utils/styles/cn';

import { UseStateSetter } from 'types/react/use-state';

import { TerrasosHeaderItem } from './TerrasosHeader.types';

interface TerrasosHeaderMobileMenuProps {
  items: TerrasosHeaderItem[];
  isOpen: boolean;
  setIsOpen: UseStateSetter<boolean>;
}

export const TerrasosHeaderMobileMenu = ({
  items,
  isOpen,
  setIsOpen,
}: TerrasosHeaderMobileMenuProps) => {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const { pathname } = useLocation();
  const menuRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

  return (
    <motion.div
      className={cn(
        'fixed right-0 top-0 bottom-0',
        'flex flex-col items-start flex-shrink-0 lg:hidden',
        'w-[350px] bg-ac-neutral-600 text-sc-button-text-icon-light',
        'font-montserrat text-[15px] leading-[145%] [font-feature-settings:"liga"off,"clig"off]',
        'overflow-y-auto z-50',
        'p-50',
      )}
      animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : '100%' }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
        duration: 0.3,
      }}
      ref={menuRef}
    >
      <div
        onClick={() => setIsOpen(false)}
        role="button"
        className="cursor-pointer absolute right-[14px] top-[14px] hover:text-brand-300 transition-colors duration-300"
      >
        <CloseIcon className="w-[32px] h-[32px]" />
      </div>
      <ul className="pl-0 my-0 w-full">
        {items.map((item, index) => (
          <li key={index} className={cn('flex flex-col font-bold')}>
            <div
              className={cn(
                'flex items-center cursor-pointer hover:text-brand-300 px-20 py-[8px]',
                pathname === item.href && 'text-brand-300',
              )}
              onClick={e => {
                if (item.items && item.href === '') {
                  e.preventDefault();
                  setSelectedItem(selectedItem === index ? null : index);
                } else if (item.items && selectedItem !== index) {
                  e.preventDefault();
                  setSelectedItem(selectedItem === index ? null : index);
                }
              }}
            >
              <a href={item.href}>{item.label}</a>
              {item.items && (
                <ArrowDownIcon className={cn('text-[18px] ml-5')} />
              )}
            </div>
            <AnimatePresence>
              {item.items && selectedItem === index && (
                <motion.ul
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-sc-surface-page-background-light rounded-[4px] mt-2 overflow-hidden pl-0"
                >
                  {item.items.map((subItem, subIndex) => (
                    <motion.li
                      key={subIndex}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: subIndex * 0.05 }}
                      className={cn(
                        'first:rounded-t-[4px] last:rounded-b-[4px]',
                        'flex items-center px-20 py-10',
                        'text-sc-button-text-icon-dark hover:text-brand-300 bg-sc-surface-page-background-light font-medium',
                      )}
                    >
                      <a href={subItem.href}>{subItem.label}</a>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};
