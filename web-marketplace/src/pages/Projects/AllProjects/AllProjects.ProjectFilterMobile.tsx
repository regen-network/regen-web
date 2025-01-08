import { useState } from 'react';
import { useLingui } from '@lingui/react';
import { SxProps, Theme } from '@mui/material';
import { sxToArray } from 'utils/mui/sxToArray';

import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';
import FilterIcon from 'web-components/src/components/icons/FilterIcon';
import Modal from 'web-components/src/components/modal';
import { FilterOptions } from 'web-components/src/components/organisms/ProjectFilters/ProjectFilters';

import { FILTERS_MODAL_BUTTON } from './AllProjects.constants';
import ProjectFilterBody from './AllProjects.ProjectFilterBody';
import { CreditClassFilter, ProjectWithOrderData } from './AllProjects.types';

type Props = {
  allProjects: ProjectWithOrderData[];
  sx?: SxProps<Theme>;
  resetFilters: () => void;
  className?: string;
  showResetButton?: boolean;
  hasCommunityProjects: boolean;
  creditClassFilters?: CreditClassFilter[];
  buyingOptionsFilterOptions: FilterOptions[];
};

const ProjectFilterMobile = ({
  allProjects,
  resetFilters,
  sx = [],
  className = '',
  showResetButton = true,
  hasCommunityProjects,
  creditClassFilters = [],
  buyingOptionsFilterOptions,
}: Props) => {
  const { _ } = useLingui();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <OutlinedButton
        size="small"
        onClick={() => setIsOpen(true)}
        startIcon={
          <FilterIcon
            sx={{
              with: 25,
              height: 24,
            }}
          />
        }
        sx={[
          {
            mr: 4,
          },
          ...sxToArray(sx),
        ]}
        className={className}
      >
        {_(FILTERS_MODAL_BUTTON)}
      </OutlinedButton>
      <Modal open={isOpen} onClose={() => setIsOpen(false)} className="h-full">
        <ProjectFilterBody
          allProjects={allProjects}
          creditClassFilters={creditClassFilters}
          resetFilters={resetFilters}
          showResetButton={showResetButton}
          hasCommunityProjects={hasCommunityProjects}
          buyingOptionsFilterOptions={buyingOptionsFilterOptions}
        />
      </Modal>
    </>
  );
};

export default ProjectFilterMobile;
