import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLingui } from '@lingui/react';
import { useMediaQuery, useTheme } from '@mui/material';
import { useAtom } from 'jotai';
import { CREATE_POST } from 'legacy-pages/Dashboard/MyProjects/MyProjects.constants';
import { projectsCurrentStepAtom } from 'legacy-pages/ProjectCreate/ProjectCreate.store';
import { useRouter } from 'next/navigation';
import useClickOutside from 'utils/hooks/useClickOutside';

import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';
import { getAbbreviation } from 'web-components/src/components/cards/ProjectCard/ProjectCard.utils';
import ArrowDownIcon from 'web-components/src/components/icons/ArrowDownIcon';
// import ClipboardIcon from 'web-components/src/components/icons/ClipboardIcon';
// import { DraftDocumentIcon } from 'web-components/src/components/icons/DraftDocumentIcon';
import EditIcon from 'web-components/src/components/icons/EditIcon';
import EyeIcon from 'web-components/src/components/icons/EyeIcon';
import { HorizontalDotsIcon } from 'web-components/src/components/icons/HorizontalDotsIcon';
// import TrashIcon from 'web-components/src/components/icons/TrashIcon';
import ProjectPlaceInfo from 'web-components/src/components/place/ProjectPlaceInfo';
import InfoTooltip from 'web-components/src/components/tooltip/InfoTooltip';
import { Title } from 'web-components/src/components/typography/Title';

import { getAreaUnit, qudtUnit } from 'lib/rdf';

import { OptimizedImage } from 'components/atoms/OptimizedImage';

import defaultProject from '../../../../public/jpg/default-project.jpg';
import {
  BACKGROUND_IMAGE_ALT,
  // CONVERT_TO_DRAFT,
  // DELETE_PROJECT,
  DESKTOP_GRADIENT,
  EDIT,
  MAX_ADDRESS_LENGTH_DESKTOP,
  MAX_ADDRESS_LENGTH_MOBILE,
  MIGRATE_PROJECT,
  MOBILE_GRADIENT,
  // REGISTER_WITH_PROTOCOL,
  TOGGLE_PROJECT_OPTIONS,
  UNTITLED_PROJECT,
  VIEW,
} from './ProjectDashboardBanner.constants';
import { ProjectBannerProps } from './ProjectDashboardBanner.types';
import { truncateEnd } from './ProjectDashboardBanner.utils';

const ProjectDashboardBanner = ({
  project,
  canEdit,
  canCreatePost,
  onCreatePost,
  migrateProject,
  createPostDisabled,
  createPostTooltipText,
}: ProjectBannerProps) => {
  const { _ } = useLingui();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [projectsCurrentStep] = useAtom(projectsCurrentStepAtom);
  const router = useRouter();
  const navigate = useNavigate();

  const truncatedPlace = truncateEnd(
    project.place ?? '',
    isMobile ? MAX_ADDRESS_LENGTH_MOBILE : MAX_ADDRESS_LENGTH_DESKTOP,
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuContainerRef = useClickOutside<HTMLDivElement>(() => {
    setIsMenuOpen(false);
  });

  const menuItems = [
    // Commented items are fully not implemented yet
    // {
    //   label: _(REGISTER_WITH_PROTOCOL),
    //   color: 'text-bc-neutral-700',
    //   icon: <ClipboardIcon />,
    //   action: () => setIsMenuOpen(false),
    // },
    // {
    //   label: _(CONVERT_TO_DRAFT),
    //   color: 'text-bc-neutral-700',
    //   icon: <DraftDocumentIcon className="w-6 h-6" hasGradient />,
    //   action: () => setIsMenuOpen(false),
    // },
    {
      label: _(MIGRATE_PROJECT),
      color: 'text-bc-neutral-700',
      icon: <ArrowDownIcon direction="next" fontSize="medium" hasGradient />,
      action: migrateProject,
      hidden: !!project.adminDaoAddress || !migrateProject,
    },
    // {
    //   label: _(DELETE_PROJECT),
    //   color: 'text-bc-neutral-700',
    //   icon: <TrashIcon className="w-6 h-6 text-bc-red-400" />,
    //   action: () => setIsMenuOpen(false),
    // },
  ].filter(item => !item.hidden);

  const projectName = project.name || _(UNTITLED_PROJECT);

  const defaultImagePosition =
    project.imgSrc === defaultProject.src ? 'object-[0%_20%]' : '';

  return (
    <div className="relative w-full mt-20 ">
      <div className="relative border-solid border-[1px] border-bc-neutral-300 rounded-lg overflow-hidden">
        <div className="absolute inset-0">
          <OptimizedImage
            src={project.imgSrc}
            alt={`${BACKGROUND_IMAGE_ALT} ${projectName}`}
            className={`w-full h-full object-cover ${defaultImagePosition}`}
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
            src={project.imgSrc}
            alt=""
            className={`w-full h-full object-cover scale-110 blur-sm ${defaultImagePosition}`}
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-grey-700 bg-opacity-20" />

        {/* Content */}
        <div className="relative z-10 p-20 pb-30 flex flex-col">
          {/* Top right menu button */}
          {menuItems.length > 0 && (
            <div className="flex justify-end" ref={menuContainerRef}>
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => setIsMenuOpen(o => !o)}
                  aria-haspopup="true"
                  aria-expanded={isMenuOpen}
                  aria-label={_(TOGGLE_PROJECT_OPTIONS)}
                  className="flex items-center justify-center w-[39px] h-[39px] cursor-pointer rounded-full border-solid border-bc-neutral-500 bg-bc-neutral-700 p-5 transition-colors"
                >
                  <HorizontalDotsIcon sx={{ color: 'white' }} />
                </button>
              </div>
              {isMenuOpen && (
                <div className="absolute top-[60px] right-[20px] w-[199px] bg-bc-neutral-100 rounded-md shadow-lg z-50 p-15 pr-10 flex flex-col gap-10">
                  {menuItems.map((item, idx) => (
                    <button
                      key={idx}
                      className={`flex items-center justify-start p-0 gap-10 w-full bg-transparent border-none text-left text-[16px] ${item.color} hover:bg-gray-100 cursor-pointer font-sans`}
                      onClick={() => {
                        setIsMenuOpen(false);
                        item.action && item.action();
                      }}
                    >
                      {item.icon}
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Project info and buttons */}
          <div className="flex flex-col justify-end xl:max-w-[70%]">
            <Title
              variant="h3"
              /* Added p-15 (padding) and -m-15 (negative margin) to offset the layout shift */
              className="text-bc-neutral-0 line-clamp-2 text-ellipsis [overflow-wrap:anywhere] [text-shadow:0_0_20px_rgba(0,0,0,0.25)] p-15 -m-15 mb-15"
            >
              {projectName}
            </Title>

            {/* Address + area */}
            <div className="max-h-[40px] max-w-[251px] md:max-w-[596px] text-ellipsis [overflow-wrap:anywhere] [text-shadow:0_0_20px_rgba(0,0,0,0.25)] p-15 -m-15 mb-20">
              <ProjectPlaceInfo
                place={truncatedPlace}
                area={project.area}
                areaUnit={getAbbreviation(
                  getAreaUnit(_, project.areaUnit as qudtUnit, project.area),
                )}
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
                  // project page belongs to next app router so we need to use next router
                  router.push(`/project/${project.slug || project.id}`)
                }
              >
                {_(VIEW)}
              </OutlinedButton>

              {canEdit && (
                <ContainedButton
                  startIcon={<EditIcon sx={{ color: 'white' }} />}
                  onClick={() => {
                    const id = project?.id;
                    if (!id) return;

                    const isDraft = project.offChain && project.draft;
                    if (isDraft) {
                      const currentStep =
                        projectsCurrentStep[id] || 'basic-info';
                      navigate(`/project-pages/${id}/${currentStep}`);
                    } else {
                      navigate(`/project-pages/${id}/edit/basic-info`);
                    }
                  }}
                >
                  {_(EDIT)}
                </ContainedButton>
              )}
              {canCreatePost &&
                (createPostDisabled ? (
                  <InfoTooltip
                    arrow
                    title={createPostTooltipText}
                    placement="top"
                  >
                    <span>
                      <ContainedButton
                        onClick={onCreatePost}
                        disabled
                        className="h-full"
                      >
                        {_(CREATE_POST)}
                      </ContainedButton>
                    </span>
                  </InfoTooltip>
                ) : (
                  <ContainedButton onClick={onCreatePost}>
                    {_(CREATE_POST)}
                  </ContainedButton>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* menu moved inside positioned container above */}
    </div>
  );
};

export default ProjectDashboardBanner;
