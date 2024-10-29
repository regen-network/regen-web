/* eslint-disable lingui/no-unlocalized-strings */
import { useState } from 'react';
import { ButtonBase, Menu, MenuItem } from '@mui/material';
import { useAtom } from 'jotai';

import BreadcrumbIcon from 'web-components/src/components/icons/BreadcrumbIcon';
import { cn } from 'web-components/src/utils/styles/cn';

import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';

import { ReactComponent as GlobeIcon } from 'assets/svgs/globe.svg';

type Props = {
  className?: string;
};

export const LanguageSwitcher = ({ className }: Props) => {
  const [selectedLanguage, setSelectedLanguage] = useAtom(selectedLanguageAtom);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={cn('text-sc-text-header w-[90px]', className)}>
      <ButtonBase
        className="font-bold text-xs flex items-center"
        id="language-switcher-button"
        aria-controls={open ? 'language-switcher-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <GlobeIcon className="mr-[6px] text-[14px] font-normal" />
        {selectedLanguage === 'en' ? 'English' : 'Español'}
        <BreadcrumbIcon className="w-[12px] h-[12px] ml-10" />
      </ButtonBase>
      <Menu
        id="language-switcher-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'language-switcher-button',
        }}
        className="mt-10"
      >
        <MenuItem
          onClick={() => {
            handleClose();
            setSelectedLanguage('en');
          }}
        >
          English
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            setSelectedLanguage('es');
          }}
        >
          Español
        </MenuItem>
      </Menu>
    </div>
  );
};
