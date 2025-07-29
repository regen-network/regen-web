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

import {
  CONVERT_TO_DRAFT,
  DELETE_PROJECT,
  EDIT,
  MAX_ADDRESS_LENGTH_DESKTOP,
  MAX_ADDRESS_LENGTH_MOBILE,
  MIGRATE_PROJECT,
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

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
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

  return (
    <div className="relative w-full mt-20">
      {/* Background Image Container */}
      <div
        className="relative w-full min-h-[180px] bg-cover bg-center bg-no-repeat rounded-lg"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${
            project.imgSrc || '/default-project-image.jpg'
          })`,
        }}
      >
        {/* Content Container */}
        <div className="relative z-10 p-20 pb-30 flex flex-col">
          {/* Top right menu */}
          <div className="flex justify-end">
            <div className="absolute top-4 right-4" ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center justify-center w-[39px] h-[39px] cursor-pointer rounded-full bg-bc-neutral-700 p-5 transition-colors"
              >
                <HorizontalDotsIcon sx={{ color: 'white' }} />
              </button>

              {isMenuOpen && (
                <div className="absolute top-12 right-0 w-[199px] bg-bc-neutral-100 rounded-md shadow-lg z-10 p-15 pr-10 flex flex-col gap-10">
                  {menuItems.map((item, idx) => (
                    <button
                      key={idx}
                      className={`flex items-center justify-start p-0 gap-10 w-full bg-transparent border-none text-left text-[16px] ${item.color} hover:bg-gray-100 cursor-pointer`}
                      onClick={item.action}
                    >
                      {item.icon}
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Project info and buttons */}
          <div className="flex flex-col justify-end max-w-[251px] md:max-w-[596px]">
            <Title className="text-bc-neutral-0 mb-2 text-[21px] md:text-[32px] line-clamp-2 mb-20">
              {project.name || _(UNTITLED_PROJECT)}
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

            <div className="flex flex-row gap-15">
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
    </div>
  );
};

export default ProjectDashboardBanner;
