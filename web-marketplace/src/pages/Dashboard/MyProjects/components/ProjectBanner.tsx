import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';

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

interface Project {
  id: string;
  name?: string;
  place?: string;
  area?: number;
  areaUnit?: string;
  imgSrc?: string;
  slug?: string;
}

export interface ProjectBannerProps {
  project: Project;
  canEdit?: boolean;
}

const ProjectBanner: React.FC<ProjectBannerProps> = ({ project, canEdit }) => {
  const { _ } = useLingui();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = useMemo(
    () => [
      {
        label: _(msg`Register with a crediting protocol`),
        color: 'text-gray-700',
        icon: <ClipboardIcon />,
        action: () => {
          setIsMenuOpen(false);
        },
      },
      {
        label: _(msg`Convert to draft`),
        color: 'text-gray-700',
        icon: <DraftDocumentIcon className="w-6 h-6" useGradient />,
        action: () => setIsMenuOpen(false),
      },
      {
        label: _(msg`Migrate project`),
        color: 'text-gray-700',
        icon: <ArrowDownIcon direction="next" fontSize="medium" useGradient />,
        action: () => setIsMenuOpen(false),
      },
      {
        label: _(msg`Delete project`),
        color: 'text-red-600',
        icon: <TrashIcon className="w-6 h-6" style={{ color: '#f87171' }} />,
        action: () => setIsMenuOpen(false),
      },
    ],
    [_],
  );

  return (
    <div className="relative w-full mt-20">
      {/* Background Image Container */}
      <div
        className="relative w-full min-h-[187px] bg-cover bg-center bg-no-repeat rounded-lg"
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
            <div className="absolute top-4 right-4">
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
          <div className="flex flex-col justify-end">
            <Title sx={{ color: 'white', marginBottom: '4px' }} variant="h3">
              {project.name || _(msg`Untitled Project`)}
            </Title>

            <div className="mb-20">
              <ProjectPlaceInfo
                place={project.place ?? ''}
                area={project.area}
                areaUnit={project.areaUnit}
                smFontSize="0.8125rem"
                fontSize="14px"
                color="white"
                iconClassName="text-bc-neutral-0"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-15">
              <OutlinedButton
                startIcon={<EyeIcon />}
                onClick={() => {
                  navigate(`/project/${project.slug || project.id}`);
                }}
              >
                {_(msg`View`)}
              </OutlinedButton>

              {canEdit && (
                <ContainedButton
                  startIcon={<EditIcon sx={{ color: 'white' }} />}
                  onClick={() => {
                    navigate(`/project-pages/${project.id}/edit/basic-info`);
                  }}
                >
                  {_(msg`Edit`)}
                </ContainedButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectBanner;
