/* eslint-disable lingui/no-unlocalized-strings */
import { useState } from 'react';
import { ButtonBase, Menu, MenuItem } from '@mui/material';
import { useAtom } from 'jotai';
import Image from 'next/image';

import BreadcrumbIcon from 'web-components/src/components/icons/BreadcrumbIcon';
import { cn } from 'web-components/src/utils/styles/cn';

import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';

import enFlag from '../../../../public/svg/flags/en.svg';
import esFlag from '../../../../public/svg/flags/es.svg';

type Props = {
  className?: string;
};

export const LanguageSwitcher = ({ className }: Props) => {
  const [selectedLanguage, setSelectedLanguage] = useAtom(selectedLanguageAtom);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const isEnglish = selectedLanguage === 'en';
  const flagImg = isEnglish ? enFlag : esFlag;
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={cn('text-sc-text-header w-fit md:w-[90px]', className)}>
      <ButtonBase
        className="flex items-center md:text-[15px]"
        id="language-switcher-button"
        aria-controls={open ? 'language-switcher-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
          fontFamily: 'var(--font-montserrat)',
          fontWeight: '500',
        }}
      >
        <Image
          src={flagImg.src}
          alt={isEnglish ? 'English' : 'Español'}
          className="mt-5 mr-[6px] w-[25px] md:mt-0 md:w-fit"
          width="18"
          height="12"
        />
        <span className="hidden md:flex md:items-center">
          {isEnglish ? 'English' : 'Español'}
          <BreadcrumbIcon className="w-[6px] h-[6px] ml-10" />
        </span>
      </ButtonBase>
      <Menu
        id="language-switcher-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'language-switcher-button',
        }}
        sx={{
          '& .MuiList-root': {
            paddingY: '0',
          },
        }}
        className="mt-10"
      >
        {!isEnglish && (
          <MenuItem
            onClick={() => {
              handleClose();
              setSelectedLanguage('en');
            }}
            className="flex items-center py-2 md:font-medium md:text-[15px]"
          >
            <Image
              src={enFlag.src}
              alt="English"
              className="mr-[6px]"
              width="18"
              height="12"
            />
            English (Inglés)
          </MenuItem>
        )}
        {isEnglish && (
          <MenuItem
            onClick={() => {
              handleClose();
              setSelectedLanguage('es');
            }}
            className="flex items-center py-2 md:font-medium md:text-[15px]"
          >
            <Image
              src={esFlag.src}
              alt="Español"
              className="mr-[6px]"
              width="18"
              height="12"
            />
            Español (Spanish)
          </MenuItem>
        )}
      </Menu>
    </div>
  );
};
