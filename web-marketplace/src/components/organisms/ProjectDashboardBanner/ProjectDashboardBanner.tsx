import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLingui } from '@lingui/react';
import { useMediaQuery, useTheme } from '@mui/material';

import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';
import ArrowDownIcon from 'web-components/src/components/icons/ArrowDownIcon';
import ClipboardIcon from 'web-components/src/components/icons/ClipboardIcon';
import { DraftDocumentIcon } from 'web-components/src/components/icons/DraftDocumentIcon';
import EditIcon from 'web-components/src/components/icons/EditIcon';
import EyeIcon from 'web-components/src/components/icons/EyeIcon';
import { HorizontalDotsIcon } from 'web-components/src/components/icons/HorizontalDotsIcon';
import TrashIcon from 'web-components/src/components/icons/TrashIcon';
import ProjectPlaceInfo from 'web-components/src/components/place/ProjectPlaceInfo';
import { Title } from 'web-components/src/components/typography';

import { OptimizedImage } from 'components/atoms/OptimizedImage';

import {
  BACKGROUND_IMAGE_ALT,
  CONVERT_TO_DRAFT,
  DELETE_PROJECT,
  DESKTOP_GRADIENT,
  EDIT,
  MAX_ADDRESS_LENGTH_DESKTOP,
  MAX_ADDRESS_LENGTH_MOBILE,
  MIGRATE_PROJECT,
  MOBILE_GRADIENT,
  REGISTER_WITH_PROTOCOL,
  UNTITLED_PROJECT,
  VIEW,
} from './ProjectDashboardBanner.constants';
import { ProjectBannerProps } from './ProjectDashboardBanner.types';
import { truncateEnd } from './ProjectDashboardBanner.utils';

const ProjectDashboardBanner: React.FC<ProjectBannerProps> = ({
  project,
  canEdit,
}) => {
  const { _ } = useLingui();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const truncatedPlace = truncateEnd(
    project.place ?? '',
    isMobile ? MAX_ADDRESS_LENGTH_MOBILE : MAX_ADDRESS_LENGTH_DESKTOP,
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const menuItems = [
    {
      label: _(REGISTER_WITH_PROTOCOL),
      color: 'text-bc-neutral-700',
      icon: <ClipboardIcon />,
      action: () => setIsMenuOpen(false),
    },
    {
      label: _(CONVERT_TO_DRAFT),
      color: 'text-bc-neutral-700',
      icon: <DraftDocumentIcon className="w-6 h-6" hasGradient />,
      action: () => setIsMenuOpen(false),
    },
    {
      label: _(MIGRATE_PROJECT),
      color: 'text-bc-neutral-700',
      icon: <ArrowDownIcon direction="next" fontSize="medium" hasGradient />,
      action: () => setIsMenuOpen(false),
    },
    {
      label: _(DELETE_PROJECT),
      color: 'text-bc-neutral-700',
      icon: <TrashIcon className="w-6 h-6 text-bc-red-400" />,
      action: () => setIsMenuOpen(false),
    },
  ];

  const projectName = project.name || _(UNTITLED_PROJECT);

  return (
    <div className="relative w-full mt-20 ">
      <div className="relative border-solid border-[1px] border-bc-neutral-300 rounded-lg overflow-hidden">
        <div className="absolute inset-0">
          <OptimizedImage
            src={project.imgSrc || '/default-project-image.jpg'}
            alt={`${BACKGROUND_IMAGE_ALT} ${projectName}`}
            className="w-full h-full object-cover"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            maskImage: isMobile ? MOBILE_GRADIENT : DESKTOP_GRADIENT,
            WebkitMaskImage: isMobile ? MOBILE_GRADIENT : DESKTOP_GRADIENT,
          }}
        >
          <OptimizedImage
            src={project.imgSrc || '/default-project-image.jpg'}
            alt=""
            className="w-full h-full object-cover scale-110 blur-sm"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-20" />

        {/* Content */}
        <div className="relative z-10 p-20 pb-30 flex flex-col">
          {/* Top right menu button */}
          <div className="flex justify-end">
            <div className="absolute top-4 right-4">
              <button
                ref={buttonRef}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center justify-center w-[39px] h-[39px] cursor-pointer rounded-full border-solid border-bc-neutral-500 bg-bc-neutral-700 p-5 transition-colors"
              >
                <HorizontalDotsIcon sx={{ color: 'white' }} />
              </button>
            </div>
          </div>

          {/* Project info and buttons */}
          <div className="flex flex-col justify-end max-w-[251px] md:max-w-[596px]">
            <Title className="text-bc-neutral-0 mb-2 text-[21px] md:text-[32px] line-clamp-2 mb-20">
              {projectName}
            </Title>

            {/* Address + area */}
            <div className="mb-20 max-h-[40px] max-w-[251px] md:max-w-[596px]">
              <ProjectPlaceInfo
                place={truncatedPlace}
                area={project.area}
                areaUnit={project.areaUnit}
                smFontSize="0.8125rem"
                fontSize="14px"
                color="white"
                iconClassName="text-bc-neutral-0"
              />
            </div>

            <div className="flex flex-row gap-15 h-[42px]">
              <OutlinedButton
                startIcon={<EyeIcon />}
                onClick={() =>
                  navigate(`/project/${project.slug || project.id}`)
                }
              >
                {_(VIEW)}
              </OutlinedButton>

              {canEdit && (
                <ContainedButton
                  startIcon={<EditIcon sx={{ color: 'white' }} />}
                  onClick={() =>
                    navigate(`/project-pages/${project.id}/edit/basic-info`)
                  }
                >
                  {_(EDIT)}
                </ContainedButton>
              )}
            </div>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div
          ref={menuRef}
          className="absolute top-[60px] right-[20px] w-[199px] bg-bc-neutral-100 rounded-md shadow-lg z-50 p-15 pr-10 flex flex-col gap-10"
        >
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              className={`flex items-center justify-start p-0 gap-10 w-full bg-transparent border-none text-left text-[16px] ${item.color} hover:bg-gray-100 cursor-pointer font-sans`}
              onClick={item.action}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectDashboardBanner;
